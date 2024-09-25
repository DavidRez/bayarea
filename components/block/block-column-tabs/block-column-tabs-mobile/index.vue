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
    expanded: 0
  }),
  mounted () {
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
  },
  methods: {
    handleAnimation () {
      if (this.$refs.gsap1) {
        this.$_fadeIn(this.$refs.gsap1, 0, 24, 'top+=58', 0, 1.2)
      }
      if (this.$refs.gsap2 && this.$refs.gsap2.length) {
        this.$refs.gsap2.forEach((el, i) => {
          this.$_fadeIn(el, 0, 24, 'top+=58', 0, 1.2)
        })
      }
    },
    toggleAccordion (i) {
      this.$nextTick(() => {
        if (this.expanded !== i) {
          this.expanded = i
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
