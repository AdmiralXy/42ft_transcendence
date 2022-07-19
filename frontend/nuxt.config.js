export default {
  ssr: false,

  target: 'static',

  // Server
  server: {
    host: '0.0.0.0'
  },

  // Environment
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI
  },

  // Axios
  axios: {
    baseURL: process.env.BASE_URL + '/api' || 'http://localhost/api'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Transcendence App',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Transcendence App - online multiplayer Pong game' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~assets/scss/app.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/v-mask.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Router settings
  router: {
    middleware: ['auth']
  },

  // Auth strategies
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          maxAge: '5960'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: false
        }
      },
      localTfa: {
        scheme: 'local',
        token: {
          property: 'access_token',
          maxAge: '5960'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login-2fa', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: false
        }
      }
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/router',
    '@nuxtjs/auth-next'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Google fonts
  googleFonts: {
    download: true,
    inject: true,
    overwriting: true,
    families: {
      'Noto+Sans': [100, 200, 300, 400, 500, 600, 700, 800, 900]
    }
  }
}
