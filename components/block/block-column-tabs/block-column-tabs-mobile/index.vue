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
      this.handleResize(0)
      this.handleGsapAnimation()
      this.expanded = 0
      this.handleResize(500)
    })
    window.addEventListener('resize', () => {
      this.handleResize()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleGsapAnimation () {
      if (this.$refs.gsap1) {
        this.$_fadeIn(this.$refs.gsap1, 0, 24, 'top+=58', 0, 1.2)
      }
      if (this.$refs.gsap2 && this.$refs.gsap2.length) {
        this.$refs.gsap2.forEach((el, i) => {
          this.$_fadeIn(el, 0, 24, 'top+=58', 0, 1.2)
        })
      }
    },
    handleResize (time = 300) {
      setTimeout(() => {
        if (this.expanded !== null) {
          this.accordionBodyHeight = this.$refs.content[this.expanded].clientHeight
        }
      }, time)
    },
    toggleAccordion (i) {
      if (this.expanded !== i) {
        this.expanded = i
        this.accordionBodyHeight = this.$refs.content[i].clientHeight
        this.handleResize(200)
      }
      this.handleResize(200)
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
