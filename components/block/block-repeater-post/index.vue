<template lang="pug" src="./index.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'
import BlockPagination from '~/components/block/block-post-pagination'
import BlockPost from '~/components/block/block-post'

export default {
  components: {
    BlockPagination,
    BlockPost
  },
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    havePosts: false
  }),
  mounted () {
    if (this.$store.state.posts.postsPerPage[this.$route.params.page]) {
      this.havePosts = true
    }

    this.$nextTick(() => {
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
    })
  },
  methods: {
    handleAnimation () {
      this.$nextTick(() => {
        if (this.havePosts) {
          this.$refs.posts.forEach((post, i) => {
            const delay = 0.1 + (0.1 * i)
            this.$_fadeIn(post.$el, 0, 48, '+58', 1, delay)
          })
        }
      })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
