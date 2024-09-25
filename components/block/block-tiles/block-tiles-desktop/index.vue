<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'
export default {
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
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
  },
  methods: {
    handleAnimation () {
      if (this.props.tiles) {
        this.$refs.tiles.forEach((tile, i) => {
          const delay = 0.1 + (0.05 * i)
          this.$_fadeIn(tile, 0, 48, 'top', 2, delay)
        })
      }
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
