import axios from 'axios'
import { api } from '../resources/api'
import webFonts from '../resources/fonts.js'
import { setData } from '../resources/utils'
import buildConfig from './build.config.js'
import { siteHead } from './head.config.js'
import { siteMap, setRobots } from './seo.config'

export default async () => {
  const meta = await setData('home')
  return {
    build: buildConfig,
    buildModules: [
      '@nuxtjs/eslint-module',
      '@nuxtjs/stylelint-module',
      'nuxt-gsap-module'
    ],
    components: {
      dirs: [
        '~/components',
        '~/components/custom',
        '~/components/block'
      ]
    },
    css: [
      { lang: 'sass', src: '~/styles/index.sass' },
      { lang: 'sass', src: '~/styles/static/normalize.sass' }
    ],
    generate: {
      async routes () {
        const dyRoutes = []

        await axios.get(`${api}/wp/v2/posts?per_page=4`).then(async (response) => {
          const dataPages = response.headers['x-wp-totalpages']
          let postsArray = response.data
          dyRoutes.push('/blog/page/1')
          for (let i = 2; i <= dataPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/posts?per_page=4&page=${i}`
            )
            postsArray = [...postsArray, ...nextPage.data]
            dyRoutes.push('/blog/page/' + i)
          }
          return postsArray.map((post) => {
            dyRoutes.push('/blog/' + post.slug)
          })
        })

        return dyRoutes
      }
    },
    globalName: 'globalContent',
    gsap: {
      clubPlugins: {
        customEase: true,
        splitText: true
      },
      extraEases: {
        customEase: true
      },
      extraPlugins: {
        scrollTrigger: true
      }
    },
    head: siteHead(meta),
    loading: { color: '#fff' },
    modules: [
      '@nuxtjs/axios',
      '@nuxtjs/gtm',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      '@nuxtjs/style-resources',
      'nuxt-polyfill',
      'nuxt-webfontloader'
    ],
    plugins: [
      '~/resources/components',
      '~/resources/mixins',
      '~/resources/vendors.js',
      {
        src: '~/resources/vendors.client.js',
        mode: 'client'
      }
    ],
    polyfill: {
      features: [
        {
          require: 'intersection-observer',
          detect: () => 'IntersectionObserver' in window
        }
      ]
    },
    robots: setRobots,
    server: {
      port: 8080,
      host: '0.0.0.0'
    },
    sitemap: siteMap,
    stylelint: {
      files: [
        'components/**/*.sass',
        'components/**/**/*.sass',
        'styles/*.sass',
        'styles/**/*.sass'
      ]
    },
    styleResources: {
      sass: [
        '~/styles/base/*.sass',
        '~/styles/grid/*.sass',
        '~/styles/utilities/*.sass'
      ]
    },
    target: 'static',
    webfontloader: webFonts,
    vue: {
      config: {
        productionTip: false
      }
    }
  }
}
