Frontend Pipeline
===================

Frontend Pipeline - простой функциональный инструмент для сборки фронтэнда с удобным API. 
Основан на менеджере задач [Gulp](http://gulpjs.com/) и собран как отдельный npm-модуль. 
В сборщик включены типичные задачи для подготовки изображений, сборки клиентских JS-скриптов и стилей.

## Особенности
- **CSS:** [Sass](http://sass-lang.com/) (scss and sass)
  - автопрефиксы
  - поддержка [Sass](http://sass-lang.com/) препроцессора 
    - scss and sass синтаксис
      - libSass (node-sass)
- **JS:** ES6 с [Babel](http://babeljs.io/) и [Webpack](http://webpack.github.io/)
    - карты источников (source maps)
    - асинхронное подключение зависимостей
- **Изображения:**
    - сжатие с помощью image-min ([image-pngquant](https://github.com/imagemin/imagemin-pngquant) для *.png)
- **Шрифты:**
    - перенос в публичную директорию
- **Режим разработки:**
    - наблюдение за файлами
    - карты источников
- **Режим production:**
    - минимизация JS и CSS
    - версионирование JS и CSS файлов и хранение ссылок на них в `rev-manifest.json`

## Установка

### Node
Перед запуском сборщика, необходимо убедиться, что [Node.js](https://nodejs.org/en/) установлен в вашей системе
```shell
$ node -v
```

### Gulp
Далее, необходимо установить [Gulp](http://gulpjs.com/) как глобальный модуль:
```shell
$ sudo npm install -g gulp
```

### Frontend Pipeline
Установка сборщика:
```shell
$ npm install frontend-pipeline
```

## Использование
Конфигурация сборщика выполняется в файле `gulpfile.js` в корне вашего проекта.

**Базовая настройка**
```javascript
  var Builder = require('frontend-pipeline');
  
  // Указываем путь к папке со скриптами и стилями
  Builder.config.set('assetsPath', 'path/to/assets/folder');
  
  // Путь к директории с результатом работы сборщика
  Builder.config.set('publicPath', 'path/to/public/folder');
  
  // Инициализируем сборщик
  Builder.start();
```

После этого у нас появятся основные gulp-задачи для подготовки и сборки исходников.
```bash
$ gulp --tasks

 ├── default
 ├── revision:css
 ├── revision:replace
 ├── revision:report
 ├── watch
 ├── clean
 ├── fonts
 ├── images
 ├── revision
 ├── sass
 ├── styles
 └── webpack
```

Запуск в режиме разработчика без наблюдения за исходниками (собранные стили и скрипты не будут ужаты + генерация карт ресурсов):
```bash
$ gulp
```

с наблюдением:
```bash
$ gulp watch
```

Запуск в продакшн режиме (минимизация скриптов и стилей + версионирование)
```bash
$ gulp --production
```

**Расширенная настройка**
```javascript
  var Builder = require('frontend-pipeline');
  var config = Builder.config;
  
  // Указываем путь к папке со скриптами и стилями
  config.set('assetsPath', 'path/to/assets/folder');
  
  // Путь к директории с результатом работы сборщика
  config.set('publicPath', 'path/to/public/folder');
  
  /**
  * JS (пути относительно `assetsPath` и `publicPath`)
  */
  
  // Путь к директории с JS скриптами (по умолчанию `js`)
  config.set('js.folder', 'path/to/src/js');
  
  // Путь к директории с собранными скриптами (по умолчанию `js`)
  config.set('js.outputFolder', 'path/to/public/js');
  
  /**
  * CSS (пути относительно `assetsPath` и `publicPath`)
  */
  
  // Путь к папке с .css файлами
  config.set('css.folder', 'path/to/src/css');
  
  // Путь к папке с результатом конкатенации стилей (на выходе получаем один файл -  `styles.css`)
  config.set('css.outputFolder', 'path/to/public/css');

  
  // Инициализируем сборщик
  Builder.start();
```

Так как сборщик Frontend pipeline включает в себя webpack (утилита сборки бандлов и модулей javascript), то у нас появляются
некоторые дополнительные возможности по сборке javascript-скриптов:
 + поддержка ES6 (благодаря транскомпилятору Babel)
 + асинхронное подключение модулей
 + прозрачное подключение npm/bower зависимостей
 
По умолчанию webpack ищет точку входа ([webpack entry](https://webpack.github.io/docs/configuration.html#entry)) 
вашего JS-приложения с названием app.js
Для изменения точки входа (или добавления/удаления), необходимо переопределить параметр конфигурации `js.entry`:
```javascript
/**
* Файлы относительно `assetsPath/js/folder`. Расширение ".js" можно не указывать
*/
config.set('js.entry', ['./app', './app2', '...']);
```
