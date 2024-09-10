<template lang="pug" src="./index.pug"></template>

<script>
import BlockLocationsMapMultiple from './block-locations-map-multiple'
import BlockLocationsMapMultipleMobile from './block-locations-map-multiple-mobile'
import BlockLocationsMapSingle from './block-locations-map-single'

export default {
  components: {
    BlockLocationsMapMultiple,
    BlockLocationsMapMultipleMobile,
    BlockLocationsMapSingle
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<!-- <style lang='sass' src='./index.sass'></style> -->
