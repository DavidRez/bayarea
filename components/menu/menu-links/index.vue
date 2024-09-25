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
    },
    wrap: {
      // make true to wrap links
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    active: null
  }),
  methods: {
    toggleSubnav (i) {
      if (this.active === i) {
        this.active = null
      } else {
        this.active = i
      }
    },
    closeSubnav (i) {
      this.active = null
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
