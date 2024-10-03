import storeActions from './storeActions'
import storeMutations from './storeMutations'

export const state = () => ({
  devInspector: false,
  devTools: false,
  forms: null,
  posts: null,
  global: null,
  testimonials: null,
  team: null,
  isPhoneLandLg: false,
  isPhoneLg: false,
  isTablet: false,
  isTabletLg: false,
  isTabletMd: false,
  menu: false,
  siteIsLoaded: false,
  videoIsLoading: true,
  accordionSet: false,
  accordionHeight: {}
})

export const actions = storeActions()

export const mutations = storeMutations()
