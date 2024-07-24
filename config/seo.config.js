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
      defaults: {
        changefreq: 'daily',
        lastmod: new Date(),
        priority: 0.1
      },
      exclude: ['/**'],
      path: '/blog/sitemap-blog.xml',
      routes: () =>
        axios
          .get(`${api}/wp/v2/posts`)
          .then(res => res.data.map(post => `/blog/${post.slug}`))
    }
  ]
}

export const setRobots = {
  Disallow: '',
  UserAgent: '*',
  Sitemap: url + 'sitemap.xml'
}
