---
title: "Компиляция Rust на TL-MR3020"
description: 'Как настроить и оптимизировать проект Rust для кросс-компиляции на TP-Link TL-MR3020 с использованием Fedora Linux 38 и OpenWrt 22.03.4. Шаг за шагом от базового "Hello, World!" до асинхронного TCP сервера.'
datePublished: "2023-05-01"
dateModified: "2023-05-01"
lang: "ru"
---

Информация в статье актуальна для дистрибутива [Fedora Linux 38](https://docs.fedoraproject.org/en-US/releases/f38/), прошивки [OpenWrt 22.03.4](https://openwrt.org/releases/22.03/notes-22.03.4) и устройства [TP-Link TL-MR3020](https://www.tp-link.com/en/home-networking/3g-4g-router/tl-mr3020/) ревизии v3.20.

Потребуется:

- Установленный [rustup](https://rustup.rs/) инструментарий.
- Установленный пакет [cross-rs](https://github.com/cross-rs/cross) для кросс-компиляции.
- Упаковщик исполняемых файлов [upx](https://github.com/upx/upx).
- Контейнеризатор [Docker](https://docs.docker.com/engine/install/) (рекомендуется) или [Podman](https://podman.io/getting-started/installation).
- SSH подключение к маршрутизатору.
- Установленный [SFTP сервер](https://openwrt.org/docs/guide-user/services/nas/sftp.server) на TL-MR3020.

> Требуется rustup инструментарий с официального сайта. Rust и Cargo из репозитория дистрибутива не подойдут. Пакет кросс-компиляции требует rustup, который в репозиториях дистрибутива отсутствует.

## "Hello, World!" ver. 1

Начнем с базы. Соберем и запустим "Hello, World" на маршрутизаторе. Инициализируем проект на Rust:

```bash
cargo init --bin ramips-rs
```

Далее, чтобы выполнить кросс-компиляцию, определим архитектуру процессора:

```bash
cat /proc/cpuinfo
# system type               : MediaTek MT7628AN ver:1 eco:2
# machine                   : TP-Link TL-MR3020 v3
# processor                 : 0
# cpu model                 : MIPS 24KEc V5.5
# BogoMIPS                  : 385.84
# wait instruction          : yes
# microsecond timers        : yes
# tlb_entries               : 32
# extra interrupt vector    : yes
# hardware watchpoint       : yes, count: 4, address/irw mask: [0x0ffc, 0x0ffc, 0x0ffb, 0x0ffb]
# isa                       : mips1 mips2 mips32r1 mips32r2
# ASEs implemented          : mips16 dsp
# Options implemented       : tlb 4kex 4k_cache prefetch mcheck ejtag llsc pindexed_dcache userlocal vint perf_cntr_intr_bit perf
# shadow register sets      : 1
# kscratch registers        : 0
# package                   : 0
# core                      : 0
# VCED exceptions           : not available
# VCEI exceptions           : not available
```

Видим, что процессор архитектуры MIPS. Теперь определим целевую архитектуру для компиляции:

```bash
rustup target list | grep mips
# mips-unknown-linux-gnu
# mips-unknown-linux-musl
# mips64-unknown-linux-gnuabi64
# mips64-unknown-linux-muslabi64
# mips64el-unknown-linux-gnuabi64
# mips64el-unknown-linux-muslabi64
# mipsel-unknown-linux-gnu
# mipsel-unknown-linux-musl
```

Опытным путем определяем, что в случае с TL-MR3020 v3.20 подходит архитектура `mipsel-unknown-linux-musl`. Далее компилируем проект под целевую архитектуру:

```bash
cross build --release --target mipsel-unknown-linux-musl
```

Получаем исполняемый бинарный файл, который загружаем и запускаем на маршрутизаторе. Выгружаем в раздел `/tmp`, потому что доступной памяти на основном разделе меньше двух мегабайт.

```bash
scp ./target/mipsel-unknown-linux-musl/release/ramips-rs openwrt:/tmp/
ssh openwrt /tmp/ramips-rs
# Hello, world!
```

## Оптимизация размера бинарника

После сборки и запуска "Hello, World" можно обратить внимание, что исполняемый файл весит **4.1 мегабайта**. Для устройства с 8 мегабайтами постоянной памяти это катастрофически много.

Уменьшим размер исполняемого файла до приемлемого минимума. Для этого настроим release профиль сборки и компиляции проекта. Дополним Cargo.toml файл:

```toml
[profile.release]
strip = true        # Уменьшает бинарник до 383K
lto = "fat"         # Уменьшает бинарник до 334K
opt-level = "z"     # Уменьшает бинарник до 326K
panic = "abort"     # Уменьшает бинарник да 332K
codegen-units = 1   # Включает дополнительные оптимизации кода
```

Получаем исполняемый файл размером в **332 килобайта**. Далее сжимаем исполняемый файл инструментом upx:

```bash
upx --best --lzma target/mipsel-unknown-linux-musl/release/ramips-rs
```

И получаем исходный файл размером в **118 килобайт**. Приемлемый результат.

Сильнее уменьшить бинарник можно отказом от стандартной std библиотеки и другими экстремальными unsafe приемами, что не подходит в моем случае.

## "Hello, World!" ver. 2

Теперь сделаем пример посерьезней. Например, асинхронный TCP сервер. Подключаем зависимости:

```toml
[dependencies]
hyper = { version = "1.0.0-rc.3", features = ["full"] }
tokio = { version = "1", features = ["full"] }
http-body-util = "0.1.0-rc.2"
```

Пишем код:

```rust
use std::convert::Infallible;
use std::net::SocketAddr;

use http_body_util::Full;
use hyper::body::Bytes;
use hyper::server::conn::http1;
use hyper::service::service_fn;
use hyper::{Request, Response};
use tokio::net::TcpListener;

async fn hello(_: Request<hyper::body::Incoming>) -> Result<Response<Full<Bytes>>, Infallible> {
    Ok(Response::new(Full::new(Bytes::from("Hello, World!"))))
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    let listener = TcpListener::bind(addr).await?;

    loop {
        let (stream, _) = listener.accept().await?;

        tokio::task::spawn(async move {
            if let Err(err) = http1::Builder::new()
                .serve_connection(stream, service_fn(hello))
                .await
            {
                println!("Error serving connection: {:?}", err);
            }
        });
    }
}
```

Проверяем, компилируем и сжимаем. Получаем бинарник размером в **236 килобайт**. Теперь загружаем в устройство, запускаем и проверяем:

```bash
scp ./target/mipsel-unknown-linux-musl/release/ramips-rs openwrt:/tmp/
ssh openwrt /tmp/ramips-rs

curl -L "http://10.0.0.2:3000"
# Hello, World!
```

Работает как и задумано.

## Полезные ссылки и источники

- [Building Rust code for my OpenWrt Wi-Fi router](https://blog.dend.ro/building-rust-for-routers/)
- [Cross Compile Rust For OpenWRT](https://www.kiloleaf.com/posts/cross-compile-rust-for-openwrt/)
- [Minimizing Rust Binary Size](https://github.com/johnthagen/min-sized-rust)
- [Кросс-компиляция программ Rust для запуска на маршрутизаторе](https://dzen.ru/media/nuancesprog.ru/krosskompiliaciia-programm-rust-dlia-zapuska-na-marshrutizatore-5f6457b8bdfa745d402cd1ec)
