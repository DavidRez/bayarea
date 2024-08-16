<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BlockButton from '~/components/button'

export default {
  components: {
    BlockButton
  },
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    forceLeft: {
      type: Boolean,
      default: false
    },
    forceRight: {
      type: Boolean,
      default: false
    },
    forceCenter: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: false
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
        if (this.props.header && this.animate) {
          this.$_fadeIn(this.$refs.header, 0, 24, 'top+=58', 1, 0)
        }
        if (this.props.subheader && this.animate) {
          this.$_fadeIn(this.$refs.subheader, 0, 24, 'top+=58', 1, 0.25)
        }
        if (this.props.body && this.animate) {
          this.$_fadeIn(this.$refs.body, 0, 24, 'top+=58', 1, 0.5)
        }
        if (this.props.buttons && this.animate) {
          this.$_fadeIn(this.$refs.buttons, 0, 24, 'top+=58', 1, 0.75)
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
