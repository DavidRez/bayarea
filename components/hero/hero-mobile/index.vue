<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn, debounce } from '~/resources/mixins'

export default {
  mixins: [fadeIn, debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    compOpacity: 1,
    currentImg: null,
    loading: true,
    windowWidth: null,
    paddingTop: '100px',
    active: 0,
    video: {},
    play: false
  }),
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  mounted () {
    this.$nextTick(() => {
      this.handleResize()
      if (this.props.media_type === 'video') {
        this.video = document.querySelector('.hero-mobile__video')
      }
    })
    window.addEventListener('resize', this.debounceFunc)

    if (this.props.images && this.props.media_type === 'image') {
      this.loadImage()
      this.compOpacity = 1
      if (!this.$store.state.siteIsLoaded) {
        this.$store.dispatch('SITE_IS_LOADED', true)
      }
      this.handleAnimation()
    } else if (this.$refs.video && this.props.media_type === 'video') {
      this.$refs.video.addEventListener('loadeddata', () => {
        if (!this.$store.state.siteLoaded) {
          this.$store.dispatch('SITE_IS_LOADED', true)
        }
        this.compOpacity = 1
        this.handleAnimation()
        // this.toggleVideo()
      })
    }
    if (!this.$refs.video && !this.props.images[0].mobile_image.src) {
      if (!this.$store.state.siteLoaded) {
        this.$store.dispatch('SITE_IS_LOADED', true)
      }
      this.compOpacity = 1
      this.handleAnimation()
    }
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    toggleVideo () {
      this.play = !this.play
      this.play ? this.video.play() : this.video.pause()
    },
    makeActive (i) {
      this.active = i
    },
    handleResize () {
      this.paddingTop = `${document.querySelector('.navigation').clientHeight + 16}px`
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
        const container = this.$refs.container
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top+=48 bottom',
            toggleActions: 'play none play none'
          }
        })

        if (this.props.media_type === 'image' && this.props.images.length > 1) {
          this.$refs.dots.forEach((dot, i) => {
            const delay = 0.1 + (0.05 * i)
            tl.fromTo(dot, {
              opacity: 0
            }, {
              opacity: 1,
              delay,
              duration: 0.15,
              ease: 'customEaseOut'
            }, '<+=0.1')
          })
        }

        if (this.props.social_media) {
          this.$refs.icons.forEach((icon, i) => {
            const delay = 0.1 + (0.25 * i)
            this.$_fadeIn(icon, 0, 48, '+48', 2, delay)
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
