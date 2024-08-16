<template lang="pug" src="./index.pug"></template>

<script>
import { removeFocus, throttle, trapFocus, debounce } from '~/resources/mixins'
import Button from '~/components/button'

export default {
  components: {
    Button
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
    toggleDrawer: {
      type: Function,
      default: () => ({})
    },
    top: {
      type: Function,
      default: () => ({})
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
