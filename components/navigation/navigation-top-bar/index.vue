<template lang="pug" src="./index.pug"></template>

<script>
import { bodyScroll, removeFocus, trapFocus } from '~/resources/mixins'

export default {
  components: {
  },
  mixins: [
    bodyScroll,
    trapFocus,
    removeFocus
  ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    modalOpen: false,
    windowWidth: null,
    globalSocialMedia: {},
    topSocialMedia: [],
    social: false,
    hideBar: false
  }),
  mounted () {
    this.setWindowWidth()
    window.addEventListener('resize', this.setWindowWidth)
    this.props.social_media.forEach((el) => {
      this.globalSocialMedia[el.account] = el.href
    })
    if (this.props.top_bar.include_social_media && this.props.top_bar.social_media) {
      this.props.top_bar.social_media.forEach((account) => {
        this.topSocialMedia.push({ account: account.account, href: this.globalSocialMedia[account.account] })
      })
    }
    this.social = true
  },
  destroyed () {
    window.removeEventListener('resize', this.setWindowWidth)
  },
  methods: {
    closeBar () {
      this.hideBar = true
      setTimeout(() => {
        this.$refs.main.style.zIndex = '-1'
      }, 500)
      setTimeout(() => {
        this.$refs.main.style.display = 'none'
      }, 1000)
    },
    setWindowWidth () {
      this.windowWidth = window.innerWidth
    },
    openModal () {
      console.log('open')
      this.modalOpen = true
      this.$_stopBodyScroll()
      this.$_removeFocus()
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
