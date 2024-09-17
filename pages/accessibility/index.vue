<template lang="pug">
.pages-accessibility(:style="{ minHeight: `${elemMinHeight}px`, marginTop: `${marginTop}px` }")
  .pages-accessibility__container
    h1.pages-accessibility__title Accessibility Statement
    .pages-accessibility__col
      p {{ $store.state.global.company_name }} is committed to facilitating the accessibility and usability of its website, {{ companyDomain }}, for everyone.  {{ $store.state.global.company_name }} aims to comply with all applicable standards, including the World Wide Web Consortium's Web Content Accessibility Guidelines 2.0 up to Level AA (WCAG 2.0 AA).
      p {{ $store.state.global.company_name }} is proud of the efforts that we have completed and that are in-progress to ensure that our website is accessible to everyone. Should you experience any difficulty in accessing any part of this website #[span(v-if='$store.state.global.phone.number') , please feel free to call us at #[a(:href='$store.state.global.phone.href' tabindex='0') {{ $store.state.global.phone.number }} ] or ] email us at #[a(:href='"mailto:" + $store.state.global.email' tabindex='0') {{ $store.state.global.email }} ] and we will work with you to provide the information or service you seek through an alternate communication method that is accessible for you consistent with applicable law (for example, through telephone support).
</template>

<script>
import { url } from '~/resources/api'
import { debounce } from '~/resources/mixins'

export default {
  transition: 'fade',
  components: {},
  mixins: [
    debounce
  ],
  data: () => ({
    companyDomain: url.slice(0, -1),
    elemMinHeight: 0,
    marginTop: 0,
    windowWidth: 0
  }),
  mounted () {
    this.handleWindowResize()
    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleWindowResize, null, 300)
    },
    handleWindowResize () {
      this.windowWidth = window.innerWidth
      this.setMinHeight()
    },
    setMinHeight () {
      const footerHeight = document.querySelector('.footer').clientHeight
      const navHeight = document.querySelector('.navigation').clientHeight
      this.marginTop = navHeight
      this.elemMinHeight = window.innerHeight - (footerHeight + navHeight)
    }
  },
  head () {
    return {
      title: `Accessibility | ${this.$store.state.global.company_name}`,
      meta: [
        { hid: 'description', name: 'description', content: `${this.$store.state.global.company_name}` },
        { hid: 'og:type', property: 'og:type', content: 'Website' },
        { hid: 'og:url', property: 'og:url', content: `${url}accessibility` }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: `${url}accessibility` }
      ]
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
