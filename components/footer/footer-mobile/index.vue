<template lang="pug" src="./index.pug"></template>

<script>

export default {
  components: {
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => ([])
    },
    top: {
      type: Function,
      default: () => ({})
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
