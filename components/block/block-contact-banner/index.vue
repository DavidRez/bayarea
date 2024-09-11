<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
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
            start: 'top+=48 bottom',
            toggleActions: 'play none play none'
          }
        })
        const tlSubheader = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: 'top+=48 bottom',
            toggleActions: 'play none play none'
          }
        })
        const tlBody = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: 'top+=48 bottom',
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

        if (this.$refs.body) {
          const childBody = new this.$SplitText(this.$refs.body, {
            type: 'lines',
            linesClass: 'split-child'
          })
          const parentBody = new this.$SplitText(this.$refs.body, {
            linesClass: 'split-parent'
          })
          if (childBody && parentBody && this.animate) {
            tlBody.from(childBody.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }

        if (this.props.button.label) {
          this.$_fadeIn(this.$refs.button.$el, 0, 24, '+50', 1, 0.45)
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
