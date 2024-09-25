<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'
import BlockContent from '~/components/block/block-content'

export default {
  components: {
    BaseImage,
    BlockContent
  },
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    if (this.$store.state.siteIsLoaded) {
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteIsLoaded,
        (newVal) => {
          if (newVal) {
            this.handleAnimation()
          }
        }
      )
    }
  },
  methods: {
    handleAnimation () {
      this.$nextTick(() => {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        const container = this.$refs.container
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top+=48 bottom',
            toggleActions: 'play none play none'
          }
        })

        tl.fromTo(this.$refs.cover, {
          width: '100%'
        }, {
          width: '0%',
          duration: 2,
          ease: 'customEaseOut'
        }, '<+=0.1')
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
