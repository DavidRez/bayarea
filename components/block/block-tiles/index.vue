<template lang='pug' src='./index.pug'></template>

<script>
import BlockTilesDesktop from './block-tiles-desktop'
import BlockTilesMobile from './block-tiles-mobile'
import { fadeIn } from '~/resources/mixins'

export default {
  components: {
    BlockTilesDesktop,
    BlockTilesMobile
  },
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
