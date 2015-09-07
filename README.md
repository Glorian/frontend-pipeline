Frontend Pipeline
================

Frontend Pipeline is simple, full featured asset pipeline that provides clear API for defining basic Gulp tasks for your project.
It's totally configurable and delivered as installable module. 

## Installation
[![frontend-pipeline](https://nodei.co/npm/frontend-pipeline.png?mini=true)](https://nodei.co/npm/frontend-pipeline)

## Features
- **CSS:** [Sass](http://sass-lang.com/) (scss and sass)
	- libSass (node-sass)
	- autoprefixer
- **JS:** Modular ES6 with [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)
	- source maps
	- async requires
	- multiple bundles
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
	
## Usage
Just init it in your gulpfile.js
```javascript
var Builder = require('frontend-pipeline');

/**
 *	You can change basic assets and public directories
 *	simply call configuration setter
**/
Builder.config.set('assetsPath', 'path/to/assets/folder');
Builder.config.set('publicPath', 'path/to/public/folder');

// And execute builder
Builder.start();
```
