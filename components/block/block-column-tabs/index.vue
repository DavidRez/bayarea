<template lang='pug' src='./index.pug'></template>

<script>
import ColumnTabsDesktop from './block-column-tabs-desktop'
import ColumnTabsMobile from './block-column-tabs-mobile'

export default {
  components: {
    ColumnTabsDesktop,
    ColumnTabsMobile
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
