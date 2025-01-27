import { url } from '../resources/api'

export const siteHead = (meta) => {
  return {
    htmlAttrs: { lang: 'en' },
    link: [
      {
        href: '/favicon.ico',
        rel: 'icon',
        type: 'image/x-icon'
      },
      { href: 'https://www.google.com', rel: 'dns-prefetch' },
      { href: 'https://fonts.googleapis.com', rel: 'dns-prefetch' },
      {
        hid: 'canonical',
        href: url,
        rel: 'canonical'
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      {
        content: meta.seo.page_description,
        hid: 'description',
        name: 'description'
      },
      {
        content: meta.seo.page_keywords ? meta.seo.page_keywords : '',
        hid: 'keywords',
        name: 'keywords'
      },
      // OG Meta
      {
        content: 'Website',
        hid: 'og:type',
        property: 'og:type'
      },
      meta.seo.social_meta.og_meta.title && {
        content: meta.seo.social_meta.og_meta.title,
        hid: 'og:title',
        property: 'og:title'
      },
      meta.seo.social_meta.og_meta.description && {
        content: meta.seo.social_meta.og_meta.description,
        hid: 'og:description',
        property: 'og:description'
      },
      meta.seo.social_meta.og_meta.image && {
        content: meta.seo.social_meta.og_meta.image,
        hid: 'og:image',
        property: 'og:image'
      },
      {
        content: url,
        hid: 'og:url',
        property: 'og:url'
      }
    ],
    title: meta.seo.page_title ? meta.seo.page_title : meta.title
  }
}
