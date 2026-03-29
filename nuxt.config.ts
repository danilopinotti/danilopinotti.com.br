import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s | Danilo Pinotti',
      title: 'Danilo Pinotti',
      htmlAttrs: {
        lang: 'pt-BR',
      },
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {
          name: 'description',
          content: 'Este é meu site sobre tecnologia, programação e outros assuntos. Sou desenvolvedor Web Fullstack Laravel/VueJs/TailwindCSS, desenvolvedor IoT e eterno estudante.',
        },
        {name: 'format-detection', content: 'telephone=no'},
        {name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'},
        {name: 'author', content: 'Danilo Pinotti'},
        {
          name: 'keywords',
          content: 'blog, danilopinotti, dev, web development, laravel, performance, git, aws, tailwindcss, vue.js, docker, iot',
        },
        {name: 'generator', content: 'Nuxt'},
        {property: 'og:site_name', content: 'Danilo Pinotti'},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://danilopinotti.com.br'},
        {property: 'og:title', content: 'Danilo Pinotti'},
        {
          property: 'og:description',
          content: 'Este é meu site sobre tecnologia, programação e outros assuntos. Sou desenvolvedor Web Full-Stack Laravel/VueJs/TailwindCSS, desenvolvedor IoT e eterno estudante.',
        },
        {property: 'og:image', content: 'https://danilopinotti.com.br/android-chrome-512x512.png'},
        {property: 'og:image:width', content: '512'},
        {property: 'og:image:height', content: '512'},
        {property: 'og:locale', content: 'pt_BR'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@danilopinotti'},
        {name: 'twitter:creator', content: '@danilopinotti'},
        {name: 'twitter:title', content: 'Danilo Pinotti'},
        {
          name: 'twitter:description',
          content: 'Este é meu site sobre tecnologia, programação e outros assuntos. Sou desenvolvedor Web Full-Stack Laravel/VueJs/TailwindCSS, desenvolvedor IoT e eterno estudante.',
        },
        {name: 'twitter:image', content: 'https://danilopinotti.com.br/android-chrome-512x512.png'},
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
        {rel: 'manifest', href: '/site.webmanifest'},
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
  ],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'date-fns',
        'date-fns/locale',
      ]
    }
  },

  sitemap: {
    sources: ['/api/_sitemap/urls'],
    autoLastmod: true,
  },

  site: {
    url: 'https://danilopinotti.com.br',
  },

  icon: {
    serverBundle: 'remote',
  },

  compatibilityDate: '2025-04-01',
})

