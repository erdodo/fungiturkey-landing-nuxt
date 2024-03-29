const test = {
  baseUrl: 'https://api2.fungiturkey.org/api/',
  fungi: 'fungitu2_test_fungiturkey',
  simple: 'fungitu2_test_Simple',
  img_base: 'https://api2.fungiturkey.org/uploads/',
}
const production = {
  baseUrl: 'https://api.fungiturkey.org/api/',
  fungi: 'fungitu2_fungiturkey',
  simple: 'fungitu2_Simple',
  img_base: 'https://api.fungiturkey.org/uploads/',
}
const state = 'test-'
let data = state == 'test' ? test : production

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fungi Turkey',
    htmlAttrs: {
      lang: 'tr-TR',
    },
    bodyAttrs: {
      class: 'body',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content:
          "Fungi Turkey 2018 yılında mantar türlerini topluma tanıtabilmek ve bilinçli bir şekilde mantar avcılığı yapabilmek adına Ömer Üngör tarafından kurulmuştur. Sosyal medya üzerinden yaptığımız detaylı tür tanımlamaları, online mantar eğitimleri, saha eğitimleri, etkinlikler ve mantar gastronomisi etkinlikleriyle bu alanda Türkiye'de ilkleri gerçekleştirmiştir. Birbirinden değerli katılımcılara sahip Fungi Turkey topluluğu her geçen gün büyüyerek ilerlemeye devam ediyor.( Mantar etkinliği, Mantar avı, Mantar Türkiye)",
      },
      {
        name: 'robots',
        content:
          'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
      },
      {
        property: 'og:locale',
        content: 'tr_TR',
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'article:author',
        content: 'Erdoğan Yeşil',
      },
      {
        property: 'og:title',
        content: 'Fungi Turkey',
      },
      {
        name: 'keywords',
        content:
          'Mantar etkinliği, mantar, mantarcılık, Mantar, mantar etkinlik, mantarcı',
      },
      {
        name: 'author',
        content: 'Erdoğan Yeşil',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.jpg' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css',
      },
    ],
    script: [
      {
        src: 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
        async: true,
      },
      { src: '/google.js', async: true },
    ],
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
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/sitemap',
  ],

  env: {
    baseUrl: data.baseUrl,
    fungi: data.fungi,
    simple: data.simple,
    img_base: data.img_base,
  },

  compilerOptions: {
    types: ['@nuxtjs/auth-next'],
  },

  axios: {
    baseURL: data.baseUrl, // Used as fallback if no runtime config is provided
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        token: '',
      },
    },
  },

  sitemap: {
    hostname: 'https://fungiturkey.org/',
    gzip: true,
    routes: [
      '/blog-detay/',
      '/prrofil/',
      '/blog/',
      '/hakkimizda/',
      '/iletisim/',
      '/index/',
      '/organizasyon/',
      '/takim/',
      '/uye-ol/',
    ],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
}
