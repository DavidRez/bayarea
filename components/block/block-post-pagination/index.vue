<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BaseIcon from '~/components/base/base-icon'

export default {
  components: {
    BaseIcon
  },
  mixins: [fadeIn],
  props: {
    pageCount: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    windowWidth: 0
  }),
  mounted () {
    this.$nextTick(() => {
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
    })
  },
  methods: {
    handleAnimation () {
      this.$nextTick(() => {
        if (this.$refs.left) {
          this.$_fadeIn(this.$refs.left, '100', 0, 'top+=58', 1, 0)
        }
        if (this.$refs.right) {
          this.$_fadeIn(this.$refs.right, '100', 0, 'top+=58', 1, 0)
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
