<template lang="pug" src="./index.pug"></template>

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
      this.$nextTick(() => {
        if (this.props.header) {
          this.$_fadeIn(this.$refs.header, 0, 24, 'top+=58', 1, 0)
        }
        if (this.props.subheader) {
          this.$_fadeIn(this.$refs.subheader, 0, 24, 'top+=58', 1, 0.25)
        }
        if (this.props.body) {
          this.$_fadeIn(this.$refs.body, 0, 24, 'top+=58', 1, 0.75)
        }
        if (this.props.button.label) {
          this.$_fadeIn(this.$refs.button.$el, 0, 24, 'top', 1, 1)
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
