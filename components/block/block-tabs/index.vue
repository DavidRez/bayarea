<template lang='pug' src='./index.pug'></template>

<script>
import { debounce } from '~/resources/mixins'

export default {
  mixins: [debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    bodyHeight: null,
    expanded: null,
    paddingLeft: '16px'
  }),
  mounted () {
    this.$nextTick(() => {
      this.toggleAccordion(0)
      this.handleResize()
      setTimeout(() => {
        this.handleResize()
      }, 1000)
    })
    window.addEventListener('resize', this.debounceFunc)
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
    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 200)
    },
    handleResize (time = 300) {
      setTimeout(() => {
        if (this.expanded !== null) {
          this.bodyHeight = this.$refs.body[this.expanded].clientHeight
        }
        this.paddingLeft = this.$refs.numbers[0].clientWidth + 16 + 'px'
      }, time)
    },
    toggleAccordion (i) {
      if (this.expanded !== i) {
        this.expanded = i
        this.bodyHeight = this.$refs.body[i].clientHeight + 32
      }
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        const container = this.$refs.container
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: '+48 bottom',
            toggleActions: 'play none play none'
          }
        })

        if (this.props.reverse) {
          tl.fromTo(this.$refs.image, {
            y: '48',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          }, '<+=0.1')
          tl.fromTo(this.$refs.contentCol, {
            y: '48',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          }, '<+=0.2')
        } else {
          tl.fromTo(this.$refs.contentCol, {
            y: '48',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          }, '<+=0.1')
          tl.fromTo(this.$refs.image, {
            y: '48',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          }, '<+=0.2')
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
