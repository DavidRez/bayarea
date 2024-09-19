<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [ fadeIn ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    accordionBodyHeight: null,
    expanded: null
  }),
  mounted () {
    this.$nextTick(() => {
      this.toggleAccordion(0)
      this.handleResize(1000)
    })

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
    this.handleAnimation()

    window.addEventListener('resize', () => {
      this.handleResize()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleAnimation () {
      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: this.$refs.container,
          start: 'top+=48 bottom',
          toggleActions: 'play none play none'
        }
      })
      if (this.$refs.gsap1) {
        this.$_fadeIn(this.$refs.gsap1, 0, 24, 'top+=58', 0, 1.2)
      }
      if (this.$refs.gsap2 && this.$refs.gsap2.length) {
        this.$refs.gsap2.forEach((el, i) => {
          this.$_fadeIn(el, 0, 24, 'top+=58', 0, 1.2)
        })
      }
      tl.add(() => {
        this.toggleAccordion(0)
      })
    },
    handleResize (time = 300) {
      setTimeout(() => {
        this.accordionBodyHeight = this.$refs.content[this.expanded].clientHeight
      }, time)
    },
    toggleAccordion (i) {
      this.$nextTick(() => {
        if (this.expanded !== i) {
          this.expanded = i
          this.handleResize(0)
        }
        this.handleResize(500)
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
