const router = [
  {
    name: 'Home',
    path: '/',
    navigation: true,
    footer: true
  },
  {
    name: 'About',
    path: '/about',
    navigation: true,
    footer: true
  },
  {
    name: 'Treatments',
    path: '/treatments',
    navigation: true,
    footer: true,
    children: [
      {
        name: 'All Ages',
        hash: 'all-ages'
      },
      {
        name: 'Braces',
        hash: 'braces'
      },
      {
        name: 'Invisalign',
        hash: 'invisalign'
      },
      {
        name: 'TMJ Treatment',
        hash: 'tmj'
      },
      {
        name: 'Smile Gallery',
        hash: 'before-after'
      },
      {
        name: 'Orthognathic Surgery',
        hash: 'orthognathic-surgery'
      },
      {
        name: 'Palatal Expanders',
        hash: 'expanders'
      },
      {
        name: 'Technology',
        hash: 'technology'
      }
    ]
  },
  {
    name: 'New Patients',
    path: '/new-patients',
    navigation: true,
    footer: true
  },
  {
    name: 'Contact Us',
    path: '/contact-us',
    navigation: true,
    footer: true
  },
  {
    name: 'Blog',
    path: '/blog',
    navigation: false,
    footer: true
  },
  {
    name: 'FAQ',
    path: '/faq',
    navigation: false,
    footer: true
  },
  {
    name: 'Promotions',
    path: '/promotions',
    navigation: false,
    footer: true
  }
]

export default router
