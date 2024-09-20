<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn, debounce } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'

export default {
  components: {
    BaseImage
  },
  mixins: [fadeIn, debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    active: null,
    height: ''
  }),
  mounted () {
    if (this.$store.state.team.length > 4) {
      this.setDimensions()
      setTimeout(() => {
        this.setDimensions()
      }, 500)
      window.addEventListener('resize', this.debounceFunc)
    }
    if (this.$store.state.siteLoaded) {
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteLoaded,
        (newVal) => {
          if (newVal) {
            this.handleAnimation()
          }
        }
      )
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.setDimensions, null, 200)
    },
    makeActive (i) {
      this.active = this.active === i ? null : i
    },
    setDimensions () {
      this.$nextTick(() => {
        // get max height of cards
        const card = this.$refs.items
        let cardHeights = []
        cardHeights = card.map((a) => {
          return a.clientHeight
        })
        this.height = Math.max(...cardHeights) + 48 + 'px'
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.$store.state.team.length > 0) {
          this.$_fadeIn(this.$refs.container, 100, 0, 'top+=58', 1, 3)
        }
      })
    }
  }
}

</script>

<style lang="sass" src="./index.sass"></style>
