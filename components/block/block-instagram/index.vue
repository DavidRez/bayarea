<template lang="pug" src="./index.pug"></template>

<script>
import { api } from '~/resources/api'
import { fadeIn } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'

export default {
  components: {
    BaseImage
  },
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    loaded: false,
    instagram: null,
    windowWidth: 0
  }),
  async mounted () {
    this.instagram = await this.$axios.$get(`${api}/rg-instagram/v1/get-photos`).then((response) => {
      return response
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
    handleAnimation () {
      this.$nextTick(() => {
        this.$refs.images.forEach((el, i) => {
          this.$_fadeIn(el, 0, 48, 'top+=58', 1, 0.5 + (0.05 * i))
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
