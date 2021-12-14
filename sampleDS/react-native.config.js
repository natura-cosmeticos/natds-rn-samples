const copyFontsByBrand = require('@naturacosmeticos/natds-rn/tools/copyFontsByBrand');

module.exports = {
  assets: ['./src/assets/fonts'],
  commands: [
    {
      name: 'copy-fonts',
      func: () => copyFontsByBrand('natura', `${__dirname}/src/assets/fonts`),
    },
  ],
};
