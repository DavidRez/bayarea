<template lang='pug' src='./index.pug'></template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    icon: {
      // make true to add icon
      type: String,
      default: ''
    },
    handleClick: {
      type: Function,
      default: () => ({})
    },
    color: {
      type: String,
      default: 'dark'
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
