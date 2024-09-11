<template lang='pug' src='./index.pug'></template>

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
  computed: {
    dataValues () {
      return this.props.block.map(block => ({ value: 0, target: block.number, inline_label: block.inline_label, label: block.label }))
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
    // add commas to counter values
    numberWithCommas (str) {
      return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
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

        this.$refs.numbers.forEach((item) => {
          const target = +item.dataset.target
          this.$ScrollTrigger.create({
            trigger: this.$refs.container,
            start: 'top+=48 bottom',
            onEnter: () => {
              this.$gsap.to(item, {
                innerText: target,
                snap: {
                  innerText: 1
                },
                modifiers: {
                  innerText: value => this.numberWithCommas(Number(value).toFixed())
                },
                duration: 2
              })
            },
            // make animation play once
            onLeaveBack: self => self.disable()
          })
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
