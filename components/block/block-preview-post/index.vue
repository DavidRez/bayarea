<template lang="pug" src="./index.pug"></template>

<script>
import BaseImage from '~/components/base/base-image'

export default {
  components: {
    BaseImage
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    addition: 0,
    number: '01'
  }),
  mounted () {
    this.addition = this.$store.state.posts.postsPerPage[1].length * (Number(this.$route.params.page) - 1)
    this.number = this.index + this.addition + 1 <= 9 ? '0' + (this.index + this.addition + 1) : this.index + this.addition

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
        const tlTitle = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: '+48 bottom',
            toggleActions: 'play none play none'
          }
        })
        const tlExcerpt = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: '+48 bottom',
            toggleActions: 'play none play none'
          }
        })
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: this.$refs.container,
            start: '+48 bottom',
            toggleActions: 'play none play none'
          }
        })

        if (this.props.title) {
          const childTitle = new this.$SplitText(this.$refs.title, {
            type: 'lines',
            linesClass: 'split-child'
          })
          const parentTitle = new this.$SplitText(this.$refs.title, {
            linesClass: 'split-parent'
          })
          if (childTitle && parentTitle && this.animate) {
            tlTitle.from(childTitle.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }

        if (this.props.excerpt) {
          const childExcerpt = new this.$SplitText(this.$refs.excerpt, {
            type: 'lines',
            linesClass: 'split-child'
          })
          const parentExcerpt = new this.$SplitText(this.$refs.excerpt, {
            linesClass: 'split-parent'
          })
          if (childExcerpt && parentExcerpt && this.animate) {
            tlExcerpt.from(childExcerpt.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2,
              stagger: 0.115,
              ease: 'customEaseOut'
            })
          }
        }

        tl.fromTo(this.$refs.cover, {
          width: '100%'
        }, {
          width: '0%',
          duration: 2,
          ease: 'customEaseOut'
        }, '<+=0.1')
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
