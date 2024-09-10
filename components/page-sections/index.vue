<template lang='pug' src='./index.pug'></template>

<script>
import BlockAccordion from '~/components/block/block-accordion'
import BlockColumnTabs from '~/components/block/block-column-tabs'
import BlockBannerWithBackground from '~/components/block/block-banner-with-background'
import BlockBeforeAfterGallery from '~/components/block/block-before-after-gallery'
import BlockContactBanner from '~/components/block/block-contact-banner'
import BlockCountUpBlocks from '~/components/block/block-count-up-blocks'
import BlockForm from '~/components/block/block-form'
import BlockGallery from '~/components/block/block-gallery'
import BlockImageText from '~/components/block/block-image-text'
import BlockInstagram from '~/components/block/block-instagram'
import BlockLocationsMap from '~/components/block/block-locations-map'
import BlockLogos from '~/components/block/block-logos'
import BlockPatientForms from '~/components/block/block-patient-forms'
import BlockPosts from '~/components/block/block-repeater-post'
import BlockTabs from '~/components/block/block-tabs'
import BlockTeam from '~/components/block/block-team-slider'
import BlockTestimonials from '~/components/block/block-testimonials'
import BlockTiles from '~/components/block/block-tiles'
import BlockTitle from '~/components/block/block-title'
import DevModeTools from '~/components/dev-mode/dev-mode-tools'
import DevModeOverlay from '~/components/dev-mode/dev-mode-overlay'
import Hero from '~/components/hero'

export default {
  components: {
    BlockAccordion,
    BlockBannerWithBackground,
    BlockBeforeAfterGallery,
    BlockColumnTabs,
    BlockContactBanner,
    BlockCountUpBlocks,
    BlockForm,
    BlockGallery,
    BlockImageText,
    BlockInstagram,
    BlockLocationsMap,
    BlockLogos,
    BlockPatientForms,
    BlockPosts,
    BlockTabs,
    BlockTeam,
    BlockTestimonials,
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
