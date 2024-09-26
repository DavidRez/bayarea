<template lang="pug" src="./index.pug" ></template>

<script>
import { fadeIn, throttle } from '~/resources/mixins'

export default {
  mixins: [ fadeIn, throttle ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    currIndex: 0,
    maxHeight: '200px',
    sliderLength: null
  }),
  mounted () {
    this.getHeight()
    setTimeout(() => {
      this.getHeight()
    }, 1000)
    this.sliderLength = this.$store.state.testimonials.length - 1
    window.addEventListener('resize', this.getHeight)

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
  beforeDestroy () {
    window.removeEventListener('resize', this.getHeight)
  },
  methods: {
    getHeight () {
      this.$nextTick(() => {
        // slider height
        const heightArr = []
        this.$refs.content.map(el => heightArr.push(el.clientHeight))
        this.maxHeight = `${Math.max(...heightArr)}px`
      })
    },
    makeActive (i) {
      this.currIndex = i
    },
    changeSlide (str = 'next') {
      if (str === 'prev') {
        this.currIndex === 0 ? this.currIndex = this.sliderLength : this.currIndex--
      }
      if (str === 'next') {
        this.currIndex === this.sliderLength ? this.currIndex = 0 : this.currIndex++
      }
    },
    toPrev () {
      this.changeSlide('prev')
    },
    toNext () {
      this.changeSlide('next')
    },
    throttlePrevSlide () {
      this.throttle(this.toPrev, null, 700)
    },
    throttleNextSlide () {
      this.throttle(this.toNext, null, 700)
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$_fadeIn(this.$refs.slider, 0, '75%', 'top+=58', 2, 0.15)
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
