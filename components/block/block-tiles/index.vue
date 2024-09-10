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
        const tlHeader = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: '+48 bottom',
            toggleActions: 'play none play none'
          }
        })
        const tlSubheader = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: '+48 bottom',
            toggleActions: 'play none play none'
          }
        })

        if (this.$refs.header) {
          const childHeader = new this.$SplitText(this.$refs.header, {
            type: 'lines',
            linesClass: 'split-child'
          })
          const parentHeader = new this.$SplitText(this.$refs.header, {
            linesClass: 'split-parent'
          })
          if (childHeader && parentHeader && this.animate) {
            tlHeader.from(childHeader.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }

        if (this.$refs.subheader) {
          const childSubheader = new this.$SplitText(this.$refs.subheader, {
            type: 'lines',
            linesClass: 'split-child'
          })
          const parentSubheader = new this.$SplitText(this.$refs.subheader, {
            linesClass: 'split-parent'
          })
          if (childSubheader && parentSubheader && this.animate) {
            tlSubheader.from(childSubheader.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
