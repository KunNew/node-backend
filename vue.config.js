const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: `https://node-backend-9eq1.onrender.com`
        }
      }
    }
    },
    transpileDependencies: true,
})
