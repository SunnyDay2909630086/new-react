// craco.config.js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#1DA57A' 
            },
            javascriptEnabled: true,
             sourceMap: true,
          },
          sourceMap: true,
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 设置 source map
      webpackConfig.devtool = env === 'production' ? 'source-map' : 'eval-source-map';
      
       // 移除 resolve-url-loader
      const cssRule = webpackConfig.module.rules.find(rule =>
        rule.oneOf && rule.oneOf.find(r => r.test && r.test.toString().includes('css'))
      );
      
      if (cssRule && cssRule.oneOf) {
        cssRule.oneOf.forEach(rule => {
          if (rule.use && Array.isArray(rule.use)) {
            // 过滤掉 resolve-url-loader
            rule.use = rule.use.filter(use => 
              !(use.loader && use.loader.includes('resolve-url-loader'))
            );
            
            // 确保 css-loader 有 sourceMap
            rule.use.forEach(use => {
              if (use.loader && use.loader.includes('css-loader') && use.options) {
                use.options.sourceMap = true;
              }
            });
          }
        });
      }
      
      return webpackConfig;
    }
  }
};