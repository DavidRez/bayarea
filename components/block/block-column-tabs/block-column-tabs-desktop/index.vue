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
    expanded: null,
    maxWidth: '100%',
    height: '100%'
  }),
  mounted () {
    this.toggleTabs(0)
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
      this.debounce(this.getDimensions, null, 200)
    },
    getDimensions () {
      this.$nextTick(() => {
        if (this.$refs.container) {
          // get max width of content tab
          const container = this.$refs.container.clientWidth
          const tabs = (this.$refs.tab[0].clientWidth * this.props.tabs.length) + this.props.tabs.length
          this.maxWidth = `${container - 64 - tabs}px`

          // get max height of content tab
          const content = this.$refs.content
          let contentHeights = []
          contentHeights = content.map((a) => {
            return a.clientHeight
          })
          const maxContentHeight = Math.max(...contentHeights) + 16

          this.height = `${maxContentHeight}px`
        }
      })
    },
    toggleTabs (i) {
      if (this.expanded !== i) {
        this.expanded = i
        this.getDimensions()
      }
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
        if (this.props.tabs) {
          this.$_fadeIn(this.$refs.tabs, 96, 0, 'top+=58', 2, 1)
        }
        tl.add(() => {
          setTimeout(() => {
            console.log('animate')
            this.getDimensions()
          }, 1000)
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
