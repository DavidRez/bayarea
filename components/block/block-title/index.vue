<template lang="pug" src="./index.pug"></template>

<script>
import { debounce } from '~/resources/mixins'

export default {
  mixins: [debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    compOpacity: 0,
    windowWidth: null,
    paddingTop: '100px'
  }),
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  mounted () {
    this.$nextTick(() => {
      this.handleResize()
    })
    window.addEventListener('resize', this.debounceFunc)

    if (this.$store.state.siteIsLoaded) {
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteIsLoaded,
        (newVal) => {
          if (newVal) {
            this.handleAnimation()
          }
        }
      )
    }
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      window.innerWidth > 768 ? this.paddingTop = `${document.querySelector('.navigation').clientHeight + 64}px` : this.paddingTop = `${document.querySelector('.navigation').clientHeight + 32}px`
    },
    loadImage () {
      this.$refs.images[0].$el.loading = () => {
        if (!this.$store.state.siteIsLoaded) {
          this.$store.dispatch('SITE_IS_LOADED', true)
        }
        this.handleAnimation()
      }

      window.addEventListener('resize', this.debounceFunc)
    },
    handleAnimation () {
      this.$nextTick(() => {
        // const container = this.$refs.container
        // const tl = this.$gsap.timeline({
        //   scrollTrigger: {
        //     trigger: container,
        //     start: 'center bottom',
        //     toggleActions: 'play none play none'
        //   }
        // })
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
