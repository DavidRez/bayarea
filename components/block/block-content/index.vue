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
    },
    tabindex: {
      type: String,
      default: '0'
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
        const tlPreheader = this.$gsap.timeline({
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

        if (this.$refs.preheader) {
          const childPreheader = new this.$SplitText(this.$refs.preheader, {
            type: 'lines',
            linesClass: 'split-child'
          })
          const parentPreheader = new this.$SplitText(this.$refs.preheader, {
            linesClass: 'split-parent'
          })
          if (childPreheader && parentPreheader && this.animate) {
            tlPreheader.from(childPreheader.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }

        if (this.$refs.header) {
          const childHeader = new this.$SplitText(this.$refs.header, {
            type: 'words, lines',
            linesClass: 'split-child'
          })
          const parentHeader = new this.$SplitText(this.$refs.header, {
            linesClass: 'split-parent'
          })
          if (childHeader && parentHeader && this.animate) {
            tlHeader.from(childHeader.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 1.5,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }

        if (this.$refs.body) {
          const childBody = new this.$SplitText(this.$refs.body, {
            type: 'words, lines',
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

        if (this.props.buttons && this.animate) {
          this.$_fadeIn(this.$refs.buttons, 0, 24, 'top', 1, 0.75)
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
