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
    maxWidth: '100%',
    maxContainerWidth: '100%',
    height: '50vh'
  }),
  mounted () {
    if (this.$store.state.siteIsLoaded) {
      this.toggleTabs(0)
      this.getDimensions()
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteIsLoaded,
        (newVal) => {
          if (newVal) {
            this.toggleTabs(0)
            this.getDimensions()
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

          const tabs = this.$refs.tab
          let tabsWidths = []
          tabsWidths = tabs.map((a) => {
            return a.clientWidth
          })
          console.log(tabsWidths)
          const maxTabsWidth = (Math.max(...tabsWidths) * this.props.tabs.length) + this.props.tabs.length
          this.maxWidth = `${container - 48 - maxTabsWidth}px`
          this.maxContainerWidth = `${container - 48}px`

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
        tl.add(() => {
          setTimeout(() => {
            this.getDimensions()
          }, 1000)
        })
        if (this.props.tabs) {
          tl.fromTo(this.$refs.tabs, {
            y: 96,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.25,
            delay: 1
          })
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
