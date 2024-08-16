<template lang="pug" src="./index.pug"></template>

<script>
import { removeFocus, throttle, trapFocus, debounce } from '~/resources/mixins'
// import Button from '~/components/button'

export default {
  components: {
    // Button
  },
  mixins: [ removeFocus, throttle, trapFocus, debounce ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    drawerOpen: {
      type: Boolean,
      default: false
    },
    setMobileWidth: {
      type: Boolean,
      default: false
    },
    mobileOn: {
      type: Function,
      default: () => ({})
    },
    toggleDrawer: {
      type: Function,
      default: () => ({})
    },
    top: {
      type: Function,
      default: () => ({})
    }
  },
  mounted () {
    this.calculateSpacing()
    setTimeout(() => {
      this.calculateSpacing()
    }, 500)

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
      const container = this.$refs.container.clientWidth
      const logo = this.$refs.logo.$el.clientWidth
      const button = this.$refs.button.$el.clientWidth

      // turn mobile breakpoint before routes reach logo
      if (!this.setMobileWidth) {
        if ((container - logo) <= (button + button + 150)) {
          this.mobileOn(true)
        }
      }
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
