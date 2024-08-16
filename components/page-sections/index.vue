<template lang='pug' src='./index.pug'></template>

<script>
import BlockAccordion from '~/components/block/block-accordion'
import BlockColumnTabs from '~/components/block/block-column-tabs'
import BlockContactBanner from '~/components/block/block-contact-banner'
import BlockForm from '~/components/block/block-form'
import BlockGallerySlider from '~/components/block/block-gallery-slider'
import BlockImageText from '~/components/block/block-image-text'
import BlockTabs from '~/components/block/block-tabs'
import BlockTiles from '~/components/block/block-tiles'
import BlockTitle from '~/components/block/block-title'
import DevModeTools from '~/components/dev-mode/dev-mode-tools'
import DevModeOverlay from '~/components/dev-mode/dev-mode-overlay'
import Hero from '~/components/hero'

export default {
  components: {
    BlockAccordion,
    BlockColumnTabs,
    BlockContactBanner,
    BlockForm,
    BlockGallerySlider,
    BlockImageText,
    BlockTabs,
    BlockTiles,
    BlockTitle,
    DevModeTools,
    DevModeOverlay,
    Hero
  },
  props: {
    props: {
      type: Array,
      default: () => ([])
    },
    pageTitle: {
      type: String,
      default: () => ('')
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$store.dispatch('SITE_IS_LOADED', true)
      }, 100)
    })
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
