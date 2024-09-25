<template lang="pug" src="./index.pug"></template>

<script>
import { removeFocus, throttle, trapFocus, debounce } from '~/resources/mixins'

export default {
  components: {
  },
  mixins: [ removeFocus, throttle, trapFocus, debounce ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => ([])
    },
    setMobileWidth: {
      type: Boolean,
      default: false
    },
    mobileOn: {
      type: Function,
      default: () => ({})
    },
    top: {
      type: Function,
      default: () => ({})
    }
  },
  data: () => ({
    first: [],
    second: []
  }),
  mounted () {
    // split routes in half
    // this.first = this.links.slice(0, this.links.length / 2)
    // this.second = this.links.slice(this.links.length / 2)

    this.calculateSpacing()

    setTimeout(() => {
      this.calculateSpacing()
    }, 1000)

    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.calculateSpacing, null, 200)
    },
    calculateSpacing () {
      this.$nextTick(() => {
        const container = this.$refs.container ? this.$refs.container.clientWidth : 0
        const logo = this.$refs.logo ? this.$refs.logo.$el.clientWidth : 0
        const links = this.$refs.links ? this.$refs.links.$el.clientWidth : 0
        const button = this.$refs.button ? this.$refs.button.$el.clientWidth : 0

        // turn mobile breakpoint before routes reach logo
        if ((container - logo) <= (links + button + 100)) {
          this.mobileOn(true)
        } else {
          this.mobileOn(false)
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
