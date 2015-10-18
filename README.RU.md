Frontend Pipeline
===================

Frontend Pipeline - простой функциональный инструмент для сборки фронтэнда с удобным API. 
Основан на менеджере задач [Gulp](http://gulpjs.com/) и собран как отдельный npm-модуль. 
В сборщик включены типичные задачи для подготовки изображений, сборки клиентских JS-скриптов и стилей.

## Установка
[![frontend-pipeline](https://nodei.co/npm/frontend-pipeline.png?mini=true)](https://nodei.co/npm/frontend-pipeline)

## Особенности
- **CSS:** [Sass](http://sass-lang.com/) (scss and sass)
  - автопрефиксы
  - поддержка [Sass](http://sass-lang.com/) препроцессора 
    - scss and sass синтаксис
	  - libSass (node-sass)
- **JS:** ES6 с [Babel](http://babeljs.io/) и [Webpack](http://webpack.github.io/)
	- карты источников (source maps)
	- асинхронное подключение зависимостей
	- shared modules
- **Images:**
	- compression with image-min ([image-pngquant](https://github.com/imagemin/imagemin-pngquant) for *.png)
- **Fonts:**
	- just copying to public directory
- **Development Mode:**
	- file watching
	- source maps
- **Production Mode:**
	- JS and CSS are uglified and minified
	- JS and CSS filenames are revisioned with md5 hash, and stored in `rev-manifest.json` file
	- File size reporting
