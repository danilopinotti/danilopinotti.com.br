import getArticlesRoutes from "./utils/getArticlesRoutes";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Danilo Pinotti',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: 'Este é meu site sobre tecnologia, programação e outros assuntos. Sou desenvolvedor Web Fullstack Laravel/VueJs/TailwindCSS, desenvolvedor IoT e eterno estudante.'
      },
      {name: 'format-detection', content: 'telephone=no'},
      {name: 'robots', content: 'index, follow'},
      {name: 'author', content: 'Danilo Pinotti'},
      {name: 'type', content: 'website'},
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'blog, danilopinotti, dev, desenvolvimento, laravel, performance, git, infra, tailwindcss'
      },

      {hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: 'Danilo Pinotti'},
      {hid: 'og:type', name: 'og:type', property: 'og:type', content: 'website'},
      {hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://danilopinotti.com.br'},
      {hid: 'og:title', name: 'og:title', property: 'og:title', content: 'Danilo Pinotti'},
      {hid: 'og:updated_time', name: 'og:updated_time', property: 'og:updated_time', content: '1658357215'},
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: 'Este é meu site sobre tecnologia, programação e outros assuntos. Sou desenvolvedor Web Full-Stack Laravel/VueJs/TailwindCSS, desenvolvedor IoT e eterno estudante.'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        itemprop: 'image',
        content: '/android-chrome-512x512.png'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
      {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
      {rel: 'manifest', href: '/site.webmanifest'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: './plugins/inject-helpers.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/google-analytics',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    ['@nuxtjs/fontawesome', {component: 'fa'}]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },


  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },

  moment: {
    locales: ['pt-br'],
  },

  sitemap: {
    hostname: 'https://danilopinotti.com.br',
    gzip: true,
    routes() {
      return getArticlesRoutes();
    },
  },

  robots: [
    {
      UserAgent: '*',
      Allow: '/'
    },
    {
      Sitemap: 'https://danilopinotti.com.br/sitemap.xml'
    }
  ],

  fontawesome: {
    icons: require('./icons').default
  },
}
