import axios from 'axios'
import { api, url } from '../resources/api'

export const siteMap = {
  hostname: url,
  gzip: true,
  lastmod: new Date(),
  path: '/sitemap.xml',
  sitemaps: [
    {
      path: '/sitemap-pages.xml',
      defaults: {
        changefreq: 'daily',
        lastmod: new Date(),
        priority: 0.9
      },
      routes: [
        {
          priority: 1,
          url: '/'
        }
      ]
    },
    {
      path: '/blog/sitemap-blog.xml',
      defaults: {
        changefreq: 'daily',
        priority: 0.1,
        lastmod: new Date()
      },
      exclude: ['/**'],
      routes: async () => {
        try {
          // Get All Blog Posts
          const response = await axios.get(`${api}/wp/v2/posts?per_page=4`)
          const dataPages = response.headers['x-wp-totalpages']
          const routes = []
          let blogArray = response.data
          routes.push('/blog/page/1')
          for (let i = 2; i <= dataPages; i++) {
            const nextPage = await axios.get(
              `${api}/wp/v2/posts?per_page=4&page=${i}`
            )
            blogArray = [...blogArray, ...nextPage.data]
            routes.push('/blog/page/' + i)
          }
          blogArray.map((post) => {
            routes.push('/blog/' + post.slug)
          })
          return routes
        } catch (e) {
          console.error('SITEMAP BLOG API: ' + e)
        }
      }
    }
  ]
}

export const setRobots = {
  Disallow: '',
  UserAgent: '*',
  Sitemap: url + 'sitemap.xml'
}
