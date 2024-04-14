// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

  // router: {
  //   // ミドルウェアをグローバルに適用
  //   middleware: ['middlewareCheck']
  // },
  
  // // ルーターのその他のオプションを指定
  // router: {
  //   options: {
  //     end: true,
  //     sensitive: false,
  //     // 他のオプションを追加
  //   }
  // },
  

  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
})
