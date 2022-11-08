export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fungi Turkey',
    htmlAttrs: {
      lang: 'tr-TR',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'static/style.css',
    'static/bootstrap.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/element-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  env: {
    baseUrl: 'http://api2.fungiturkey.org/api/',
    fungi: 'fungitu2_test_fungiturkey',
    simple: 'fungitu2_test_Simple',
    img_base: 'https://api2.fungiturkey.org/uploads/',
  },

  compilerOptions: {
    types: ['@nuxtjs/auth-next'],
  },

  axios: {
    baseURL: 'http://api2.fungiturkey.org/api/', // Used as fallback if no runtime config is provided
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        token: '',
      },
    },
  },
  'cookie-universal-nuxt': {
    //  To make it work for SSR, remember to set `ssr: true` and `target: 'server'`
    ssr: true,
    target: 'server',

    modules: [
      // Simple usage
      'cookie-universal-nuxt',

      // With options
      ['cookie-universal-nuxt', { alias: 'cookiz' }],
    ],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
}
