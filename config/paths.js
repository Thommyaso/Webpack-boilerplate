const common = {
    spritesStylesheetPath: 'images/sprites/',
    spritesFileName: 'sprite', // set name for output css and img sprite file name
    spritesType: '.png', // This sets what extention will be used for sprites in the whole project
    devFolder: 'dev',
};

module.exports = {
    main: {
        mainEntry: './src/js/index.js',
        htmlTemplate: './src/index.html',
        watchHtml: 'src/**/*.html',
        styleFolder: '../src/styles',
    },
    dev: {
        outputFolder: `./${common.devFolder}`,
        serverFolder: `${common.devFolder}`,
    },
    prod: {
        spritesSrcGlob: `*${common.spritesType}`,
        spritesStylesheet: `./${common.spritesStylesheetPath}${common.spritesFileName}.css`,
        spritesStylesOutput: `../dist/${common.spritesStylesheetPath}${common.spritesFileName}.css`,
        spritesImgOutput: `../dist/${common.spritesStylesheetPath}${common.spritesFileName}${common.spritesType}`,
        spritesLocation: '../src/images/sprites',
        spriteCssImgRef: `./${common.spritesFileName}${common.spritesType}`,
        outputFolder: '../dist',
    },
};
