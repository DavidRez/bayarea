<template lang="pug" src="./index.pug"></template>

<script>
import { debounce, fadeIn } from '~/resources/mixins'

export default {
  mixins: [debounce, fadeIn],
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
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.title,
            start: 'top+=48 bottom',
            toggleActions: 'play none play none'
          }
        })

        if (this.$refs.title) {
          const childTitle = new this.$SplitText(this.$refs.title, {
            type: 'lines',
            linesClass: 'split-child'
          })
          const parentTitle = new this.$SplitText(this.$refs.title, {
            linesClass: 'split-parent'
          })
          if (childTitle && parentTitle) {
            tl.from(childTitle.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
