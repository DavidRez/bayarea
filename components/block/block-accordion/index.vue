<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [ fadeIn ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    accordionBodyHeight: null,
    columns: 1,
    expanded: null
  }),
  mounted () {
    this.setColumns()
    this.$nextTick(() => {
      this.handleGsapAnimation()
    })
    this.$nextTick(() => {
      this.handleResize()
    })
    window.addEventListener('resize', () => {
      this.setColumns()
      this.handleResize()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.setColumns)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleGsapAnimation () {
      this.$nextTick(() => {
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: 'top+=48 bottom',
            toggleActions: 'play none play none'
          }
        })

        if (this.$refs.title) {
          const childTitle = new this.$SplitText(this.$refs.title, {
            type: 'lines',
            linesClass: 'split-child'
          })
          const parentTitle = new this.$SplitText(this.$refs.title, {
            linesClass: 'split-parent'
          })
          if (childTitle && parentTitle) {
            tl.from(childTitle.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              ease: 'customEaseOut'
            })
          }
        }

        if (this.$refs.gsap2 && this.$refs.gsap2.length) {
          this.$refs.gsap2.forEach((el, i) => {
            this.$_fadeIn(el, 0, 48, '+58', 1, i * 0.25)
          })
        }
      })
    },
    handleResize (time = 300) {
      setTimeout(() => {
        if (this.expanded !== null) {
          this.accordionBodyHeight = this.$refs.content[this.expanded].clientHeight
        }
      }, time)
    },
    pauseVideos () {
      const videos = this.$refs.video
      const videosEmbed = this.$refs.videoEmbed
      if (videos) {
        videos.forEach((vid) => { vid.pause() })
      }
      if (videosEmbed) {
        videosEmbed.forEach((vid) => { vid.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*') })
      }
    },
    setColumns () {
      this.columns = window.innerWidth <= 1280 ? 1 : +this.props.columns
    },
    toggleAccordion (i, column = 0) {
      this.pauseVideos()
      this.expanded === i + column ? this.expanded = null : this.expanded = i + column
      if (this.expanded !== null) {
        this.accordionBodyHeight = this.$refs.content[i + column].clientHeight
      } else {
        this.accordionBodyHeight = 0
      }
      this.handleResize(200)
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
