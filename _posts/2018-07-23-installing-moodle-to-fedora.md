---
description: "Настройка SELinux в операционной системе Fedora для корректной работы Moodle."
title: "Установка Moodle в Fedora"
layout: post
---

Во время установки Moodle, сталкиваешься со следующими проблемами:
- Веб-интерфейс не продолжает установку после настройки базы данных;
- Если установить через консольный интерфейс, проявляются артефакты;
- Нет доступа к сети, появляется ошибка `unexpected cURL error`.

Главная причина, это
[SELinux](https://en.wikipedia.org/wiki/Security-Enhanced_Linux).
Решение, это настроить правила доступа:
```bash
# Доступ к сторонним каталогам и сети
/usr/sbin/setsebool -P httpd_can_network_connect true
/usr/sbin/setsebool -P httpd_enable_homedirs true
# Смена контекста безопасности
/usr/bin/chcon -R -h -t httpd_sys_content_t /path/to/moodle
/usr/bin/chcon -R -h -t httpd_sys_script_rw_t /path/to/moodle_data
```
