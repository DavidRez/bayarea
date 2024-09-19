<template lang='pug' src='./index.pug'></template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    light: {
      // make true to make icons and text white
      type: Boolean,
      default: false
    },
    icon: {
      // make true to add icon
      type: String,
      default: ''
    },
    center: {
      // make true to center align label
      type: Boolean,
      default: false
    },
    external: {
      // make true to open new tab
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
