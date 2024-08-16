<template lang='pug' src='./index.pug'></template>

<script>
import BaseIcon from '~/components/base/base-icon'

export default {
  components: {
    BaseIcon
  },
  props: {
    props: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    toggleMenu: {
      type: Function,
      default: () => ({})
    },
    light: {
      // make true to make icons and text white
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
