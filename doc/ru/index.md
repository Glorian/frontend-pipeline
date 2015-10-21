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

**Основные параметры конфигурации:**

```javascript
/**
* Путь к директории исходных файлов фронтенда
*/
assetsPath: 'assets',

/**
* Путь к директории собранных скриптов
*/
publicPath: 'public',

/**
* Включение / отключение записи карт исходников
*/
sourcemaps: true,

/**
|-----------------------------------------------------------------------------------------------------------
| В следующих группах конфигурации используются параметры путей к исходным файлам 
| (folder) и их папкам назначения (outputFolder)
|-----------------------------------------------------------------------------------------------------------
|
| Указанные пути относительны их корневых директорий: 
| (`assetsPath` для `folder` и `publicPath` для `outputFolder` )
*/

/**
* Группа конфигурации путей для шрифтов
*/
fonts: {
    folder: 'fonts',
    outputFolder: 'fonts'
},

/**
* Группа конфигурации путей для изображений
*/
images: {
    folder: 'images',
    outputFolder: 'images',

    /**
    * Плагины для image-min 
    */
    plugins: {
        pngquant: {
            quality: '65-90',
            speed: 4
        }
    },

    /**
    * Настройки image-min
    */
    options: {
        progressive: true,
        interlaced: true,
        multipass: true
    }
},

/**
* Группа конфигурации обработки css
*/
css: {
    // Пути для .css файлов, которые в итоге конкатенируются и сжимаются в один файл
    folder: 'css',
    outputFolder: 'css',
    
    /**
    * Настройка плагина `autoprefixer`, для автоматического определения вендорных префиксов
    */
    autoprefix: {
        enabled: true,

        options: {
            browsers: ['last 2 versions'],
            cascade: false
        }
    },
    
    /**
    * Тут можно указать название итогового файла для сжатых .css файлов из директории `css.folder`
    */
    styles: {
        concatFilename: 'styles.css'
    },
    
    /**
    * Конфигурация препроцессора css - sass. 
    * Для sass-файлов используется общий outputFolder блока css (css.outputFolder)
    */
    sass: {
        folder: 'sass'
    }
},

/*
* Конфигурация сборки js-скриптов
*/
js: {
    folder: 'js',
    outputFolder: 'js',
    
    // Зависимости npm или bower по умолчанию (пример: ['jquery', 'bootstrap-sass', 'etc...'])
    // Данные зависимости будут подключены глобально к вашему js-приложению и потому доуступны в любом
    // модуле вашего проекта
    defaultVendors: [],
    
    // Точка входа в ваш js-проект 
    // Важно! Сборка проекта завершится с ошибкой при отсутствии указанного файла 
    // в директории `assetsPath.js.folder` 
    entry: ['./app'],
    
    /* 
     * Глобальные переменные (алиасы), которые будут доступны в любом модуле js-приложения
      
        Пример: globalVars: {
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          _: 'lodash'
        }
    */
    globalVars: {},
    
    // Загрузчики для утилиты webpack (см. https://webpack.github.io/docs/using-loaders.html)
    loaders: {
      
        // Опции для транскомпилятора Babel
        babel: {
            options: {
                stage: 2,
                compact: true
            }
        }
    }
},

// В продакшн режиме все скрипты на выходе проходят через систему версионирования (названия файлов хешируются, 
// а реальные названия и пути сохраняются в json-файл `manifest.json`)
// в данной настройке можно указать директорию куда файл манифеста будет сохранен (путь относительно `publicPath`)
versioning: {
    buildFolder: 'build'
}
```
Все указанные выше параметры конфигурации можно переопределить в файле gulpfile.js как показано в примерах выше.
Так как конфигурация сбрщика это объект то доступ и переопределение отдельных параметров осуществляется по внутреннему соглашению в виде строки с навигацией по вложенным объектам через точку: 
```javascript
{
  js: {
    folder: 'some/path'
  }
}

// переопроеделение 
config.set('js.folder', 'some/another/path');
```

Так как сборщик Frontend pipeline включает в себя webpack (утилита сборки бандлов и модулей javascript), то у нас появляются
некоторые дополнительные возможности по сборке javascript-скриптов:
 + поддержка ES6 (благодаря транскомпилятору [Babel](http://babeljs.io/))
 + асинхронное подключение модулей
 + прозрачное подключение npm/bower зависимостей
 
По умолчанию webpack ищет точку входа ([webpack entry](https://webpack.github.io/docs/configuration.html#entry)) 
вашего JS-приложения с названием app.js (`js.entry = ['./app']`)
Для изменения точки входа (или добавления/удаления), необходимо переопределить параметр конфигурации `js.entry`:
```javascript
/**
* Файлы относительно `assetsPath/js/folder`. Расширение ".js" можно не указывать
*/
config.set('js.entry', ['./app', './app2', '...']);
```
