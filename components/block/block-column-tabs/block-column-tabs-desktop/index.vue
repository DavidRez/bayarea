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
    maxTabsWidth: 'fit-content',
    maxWidth: '100%',
    maxContainerWidth: '100%',
    height: '50vh'
  }),
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

          // get max width of tabs
          const tabs = this.$refs.tab
          let tabsWidths = []
          tabsWidths = tabs.map((a) => {
            return a.clientWidth
          })
          this.maxTabsWidth = (Math.max(...tabsWidths) * this.props.tabs.length) + this.props.tabs.length

          // max width for open drawer
          this.maxWidth = `${container - this.maxTabsWidth}px`

          this.maxContainerWidth = `${container}px` // container width

          // get max height of content tab
          const content = this.$refs.content
          let contentHeights = []
          contentHeights = content.map((a) => {
            return a.clientHeight
          })
          const maxContentHeight = Math.max(...contentHeights) + 16

          this.height = `${maxContentHeight}px`

          // set accordion dimensions in store
          this.$store.dispatch('SET_ACCORDION', true)
          this.$store.dispatch('SET_ACCORDION_DIMENSIONS', { window: window.innerWidth, height: `${maxContentHeight}px`, width: `${container - this.maxTabsWidth}px` })
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
        tl.add(async () => {
          // if dimensions have not been added to store, calculate
          if ((!this.$store.state.accordionSet) || (this.$store.state.accordionSet && this.$store.state.accordionHeight.window !== window.innerWidth)) {
            this.getDimensions()
            await setTimeout(() => {
              this.getDimensions()
            }, 1000)
          // get dimensions from store
          } else if (this.$store.state.accordionSet && this.$store.state.accordionHeight.window === window.innerWidth) {
            this.height = this.$store.state.accordionHeight.height
            this.maxWidth = this.$store.state.accordionHeight.width
          }
          this.toggleTabs(0)
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
