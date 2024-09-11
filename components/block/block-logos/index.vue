<template lang='pug' src='./index.pug'></template>

<script>
import { debounce, fadeIn } from '~/resources/mixins'

export default {
  mixins: [debounce, fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    logos: [],
    loaded: false
  }),
  mounted () {
    this.$nextTick(() => {
      this.splitLogos(this.props.logos)
    })
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
    splitLogos (arr) {
      const logosArr = [...arr]
      let row = 0

      while (logosArr.length) {
        let count = 0
        if (logosArr.length) { this.logos[row] = [] }
        while (count < 3 && logosArr.length) {
          this.logos[row].push(logosArr.shift())
          count++
        }
        count = 0
        row++
        if (logosArr.length) { this.logos[row] = [] }
        while (count < 2 && logosArr.length) {
          this.logos[row].push(logosArr.shift())
          count++
        }
        count = 0
        row++
      }
      this.loaded = true
    },
    handleAnimation () {
      this.$nextTick(() => {
        const tl = this.$gsap.timeline({
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
          if (childHeader && parentHeader) {
            tl.from(childHeader.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }

        if (this.$refs.logos) {
          this.$refs.logos.forEach((el, i) => {
            this.$_fadeIn(el, 0, -48, 'top+=58', 1, 0.5 + (0.2 * i))
          })
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
