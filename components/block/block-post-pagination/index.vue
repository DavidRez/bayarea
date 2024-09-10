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
      this.$_fadeIn(this.$refs.left, 100, 0, '+58', 1, 3)
      this.$_fadeIn(this.$refs.right, -100, 0, '+58', 1, 3)
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
