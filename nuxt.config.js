export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AIHealthPro',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/mainStyle.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/fontawesome"],
  fontawesome: {
    autoAddCss: false,
    component: "fa",
    icons: {
      solid: [
        "faComment",
        "faCirclePlus",
        "faNewspaper",
        "faUser",
        "faUserPlus",
        "faBars",
        "faPaperPlane",
        "faTriangleExclamation",
        "faCircleCheck",
        "faXmark"
      ],
      brands: [
        "faGoogle",
        "faLinkedin",
        "faTwitter",
        "faFacebook",
        "faInstagram",
        "faPinterest",
        "faVuejs",
        "faReact",
      ]
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],
  server: {
    port: 3300,
  },
  env: {
    OPENAI_API_KEY: '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',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
