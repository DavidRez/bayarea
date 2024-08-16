<template lang='pug' src='./index.pug'></template>

<script>
export default {
  components: {
  },
  props: {
    props: {
      type: Array,
      default: () => ([])
    },
    closeDrawer: {
      type: Function,
      default: () => ({})
    },
    top: {
      type: Function,
      default: () => ({})
    },
    light: {
      // make true to make text white
      type: Boolean,
      default: false
    },
    stacked: {
      // make true to stack links
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
