const copyFontsByBrand = require('@naturacosmeticos/natds-rn/tools/copyFontsByBrand');

module.exports = {
  assets: [
    './src/assets/fonts',
    'node_modules/@naturacosmeticos/natds-icons/dist/fonts',
  ],
  commands: [
    {
      name: 'copy-fonts',
      func: () => copyFontsByBrand('natura', `${__dirname}/src/assets/fonts`),
    },
  ],
};
