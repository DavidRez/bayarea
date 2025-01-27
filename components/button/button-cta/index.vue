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
    color: {
      type: String,
      default: 'dark'
    },
    tabindex: {
      type: String,
      default: '0'
    }
  },
  computed: {
    // set capitalization for label
    label () {
      return this.props.case === 'sentence' ? this.props.label.toLowerCase() : this.props.label
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
