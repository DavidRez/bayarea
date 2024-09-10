<template lang="pug" src="./index.pug"></template>

<script>
import BaseImage from '~/components/base/base-image'

export default {
  components: {
    BaseImage
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    addition: 0,
    number: '01'
  }),
  mounted () {
    this.addition = this.$store.state.posts.postsPerPage[1].length * (Number(this.$route.params.page) - 1)
    this.number = this.index + this.addition + 1 <= 9 ? '0' + (this.index + this.addition + 1) : this.index + this.addition

    // if (this.$store.state.siteIsLoaded) {
    //   this.handleAnimation()
    // } else {
    //   this.$store.watch(
    //     state => this.$store.state.siteIsLoaded,
    //     (newVal) => {
    //       if (newVal) {
    //         this.handleAnimation()
    //       }
    //     }
    //   )
    // }
  },
  methods: {
    handleAnimation () {
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
