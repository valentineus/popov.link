---
title: "Горячая перезагрузка ElectronJS приложения"
description: "Руководство по автоматической перезагрузке приложений на Electron с помощью пакетов electron-reload и electron-webpack. Обход проблем с совместимостью и использование HMR для renderer процесса."
datePublished: "2019-08-15"
dateModified: "2019-08-15"
lang: "ru"
---

## Main процесс

Для перезагрузки основного процесса можно использовать готовый пакет [electron-reload]. Или перезагружать приложение средствами пакета [electron-webpack].

Если сборщик кода отличный от WebPack или нет возможности использовать вышеуказанные пакеты, можно обойтись инструментом [nodemon]. Команда запуска будет выглядеть следующим образом:

```bash
nodemon --watch ./assets/main.js --exec 'electron .'
```

Приложение будет автоматически перезапускаться при модификациях указанного файла.

## Renderer процесс

Для обновления renderer процесса, перезагружать полностью приложение нет необходимости. Достаточно обновить страницу. Самый простой способ, горячие клавиши: `Ctrl` + `F5`. Так как рендер процесс по своей сути является обычным окном браузера, можно настроить [HMR] технологию. Конечно, если используются соответствующие инструменты.

Мне симпатичен способ использования пакета [electron-reload]. В алгоритме пакета лежит простое слежение за каталогом файлов и обновление активных окон приложения.

Но мною была найдена досадная [проблема], не позволяющая использовать версии `1.5.0` и `1.4.1` со сборщиком WebPack, который используется в проекте.

Решение было продублировать основной функционал пакета в проекте:

```javascript
import { app } from "electron";
import chokidar from "chokidar";

const browserWindows = [];

app.on("browser-window-created", (event, window) => {
	browserWindows.push(window);

	window.on("closed", () => {
		const index = browserWindows.indexOf(window);
		browserWindows.splice(index, 1);
	});
});

if (process.env.NODE_ENV !== "production") {
	const watcher = chokidar.watch(__dirname, { ignored: [/node_modules|[/\\]\./] });

	watcher.on("change", () => {
		browserWindows.forEach((window) => {
			window.webContents.reloadIgnoringCache();
		});
	});
}
```

[HMR]: https://webpack.js.org/concepts/hot-module-replacement/
[electron-reload]: https://www.npmjs.com/package/electron-reload
[electron-webpack]: https://www.npmjs.com/package/electron-webpack
[nodemon]: https://www.npmjs.com/package/nodemon
[проблема]: https://github.com/yan-foto/electron-reload/issues/66
