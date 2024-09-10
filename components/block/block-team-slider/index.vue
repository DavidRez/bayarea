<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'

export default {
  components: {
    BaseImage
  },
  mixins: [
    fadeIn
  ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    active: null,
    height: '',
    width: ''
  }),
  mounted () {
    this.setDimensions()
    setTimeout(() => {
      this.setDimensions()
    }, 500)
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
    window.addEventListener('resize', () => {
      this.setDimensions()
      setTimeout(() => {
        this.setDimensions()
      }, 1000)
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.setDimensions)
    window.removeEventListener('resize', setTimeout)
  },
  methods: {
    makeActive (i) {
      this.active = this.active === i ? null : i
    },
    setDimensions () {
      this.$nextTick(() => {
        let columns = 4
        if (window.innerWidth <= 1100) {
          columns = 3
        }
        if (window.innerWidth <= 768) {
          columns = 2
        }
        if (window.innerWidth <= 600) {
          columns = 1
        }
        const widthRef = this.$refs.getWidth
        const heightRefs = this.$refs.getHeight
        if (widthRef && heightRefs) {
          this.height = heightRefs.scrollHeight + 'px'
          // this.width = widthRef.clientWidth / columns + 'px'

          // The 12px will offset the end of the slider
          this.width = columns === 1 ? widthRef.clientWidth / columns - 48 + 'px' : widthRef.clientWidth / columns - 12 + 'px'
        }
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.$store.state.team.length > 0) {
          this.$_fadeIn(this.$refs.container, 100, 0, '+58', 1, 3)
        }
      })
    }
  }
}

</script>

<style lang="sass" src="./index.sass"></style>
