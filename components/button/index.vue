<template lang='pug' src='./index.pug'></template>

<script>

export default {
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    handleClick: {
      type: Function,
      default: () => ({})
    },
    tabindex: {
      type: String,
      default: '0'
    }
  }
}
</script>
