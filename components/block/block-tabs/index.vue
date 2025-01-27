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
    expanded: null,
    paddingLeft: '16px'
  }),
  mounted () {
    this.$nextTick(() => {
      // open tab that matches current hash
      this.props.tabs.forEach((tab, i) => {
        if (`#${tab.hash}` === this.$route.hash) {
          this.expanded = i
        }
      })
      this.handleResize()
      setTimeout(() => {
        this.handleResize()
        this.toggleAccordion(this.expanded ? this.expanded : 0)
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
        this.paddingLeft = this.$refs.numbers[0].clientWidth + 16 + 'px'
      }, time)
    },
    toggleAccordion (i) {
      if (this.expanded !== i) {
        this.expanded = i
      }
    },
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

        if (this.props.reverse) {
          // animate image
          tl.fromTo(this.$refs.cover, {
            width: '100%'
          }, {
            width: '0%',
            duration: 2,
            ease: 'customEaseOut'
          }, '<+=0.1')
          // animate text
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
          // animate text
          tl.fromTo(this.$refs.contentCol, {
            y: '48',
            opacity: 0
          }, {
            y: '0',
            opacity: 1,
            duration: 1,
            ease: 'customEaseOut'
          }, '<+=0.1')
          // animate image
          tl.fromTo(this.$refs.cover, {
            width: '100%'
          }, {
            width: '0%',
            duration: 2,
            ease: 'customEaseOut'
          }, '<+=0.2')
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
