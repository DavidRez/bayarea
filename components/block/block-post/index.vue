<template lang="pug" src="./index.pug"></template>

<script>
import { url } from '~/resources/api'
import { fadeIn, debounce } from '~/resources/mixins'
import BaseImage from '~/components/base/base-image'
import BaseIcon from '~/components/base/base-icon'
import FormSubscribe from '~/components/form/form-subscribe'

export default {
  components: {
    BaseImage,
    BaseIcon,
    FormSubscribe
  },
  mixins: [fadeIn, debounce, url],
  props: {
    type: {
      type: String,
      default: 'posts'
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    nextPost: null,
    prevPost: null,
    postUrl: '',
    navHeight: '0px',
    translateY: '0px',
    marginBottom: '0px',
    title: 'Meet Us'
  }),
  computed: {
    paths () {
      const pathsArr = this.$store.state.posts.posts.map((post) => {
        return post.path
      })
      return pathsArr
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.debounceFunc)

    const currIndex = this.paths.indexOf(this.$route.path)
    this.nextPost = currIndex === this.paths.length - 1 ? null : this.paths[currIndex + 1]
    this.prevPost = currIndex === 0 ? null : this.paths[currIndex - 1]

    this.postUrl = document.location.href

    this.handleAnimation()
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      this.getHeight()
    },
    getHeight () {
      this.$nextTick(() => {
        // get nav height
        const navHeight = document.querySelector('.navigation').clientHeight
        this.navHeight = `${navHeight}px`

        // get title height
        if (this.$refs.title) {
          const title = this.$refs.title.clientHeight
          this.translateY = window.innerWidth > 1200 ? `${title * -0.65}px` : `${title * -0.25}px`
          this.marginBottom = window.innerWidth > 1200 ? `${title * -0.55}px` : `${title * -0.15}px`
        }
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.intro.image) {
          this.$_fadeIn(this.$refs.image.$el, 0, 48, 'top+=58', 1, 0.25)
        }
        if (this.$refs.paragraphs) {
          this.$refs.paragraphs.forEach((paragraph, i) => {
            const delay = 0.1 + (0.1 * i)
            this.$_fadeIn(paragraph, 0, 48, 'top+=58', 1, delay)
          })
        }
        if (this.$refs.form) {
          this.$_fadeIn(this.$refs.form.$el, 0, 48, 'top+=58', 1, 0.5)
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
