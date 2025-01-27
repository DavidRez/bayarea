<template lang='pug' src='./index.pug'></template>

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
    logos: [],
    loaded: false
  }),
  mounted () {
    this.$nextTick(() => {
      this.splitLogos(this.props.logos)
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
  },
  methods: {
    splitLogos (arr) {
      // make copy of logos
      const logosArr = [...arr]
      let row = 0

      while (logosArr.length) {
        let count = 0
        // set row of logos
        if (logosArr.length) { this.logos[row] = [] }

        // add 3 logos max to row
        while (count < 3 && logosArr.length) {
          this.logos[row].push(logosArr.shift())
          count++
        }
        count = 0
        row++
        // set next row of logos
        if (logosArr.length) { this.logos[row] = [] }

        // add 2 logos max to next row
        while (count < 2 && logosArr.length) {
          this.logos[row].push(logosArr.shift())
          count++
        }
        count = 0
        row++
      }
      this.loaded = true
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.$refs.logos) {
          this.$refs.logos.forEach((el, i) => {
            this.$_fadeIn(el, 0, -48, 'top+=58', 1, 0.5 + (0.2 * i))
          })
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
