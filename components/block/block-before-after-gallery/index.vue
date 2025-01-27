<template lang='pug' src='./index.pug'></template>

<script>
import { fadeIn, throttle } from '~/resources/mixins'
import BlockContent from '~/components/block/block-content'

export default {
  components: {
    BlockContent
  },
  mixins: [fadeIn, throttle],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    active: 0,
    next: null,
    prev: null,
    height: '300px',
    loaded: false
  }),
  mounted () {
    // give default height
    this.height = window.innerWidth <= 600 ? '600px' : '300px'

    // calculate height
    this.getHeight()
    setTimeout(() => {
      this.getHeight()
    }, 1000)

    this.handlePrevNext()

    setTimeout(() => {
      this.handleTouch((swipedir) => {
        if (swipedir === 'left') {
          this.changeSlide('next')
        }
        if (swipedir === 'right') {
          this.changeSlide('prev')
        }
      })
    }, 2000)

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

    window.addEventListener('resize', this.getHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getHeight)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.getHeight, null, 300)
    },
    getHeight () {
      this.$nextTick(() => {
        // slider height
        const heightArr = []
        this.$refs.images.map(el => heightArr.push(el.clientHeight))
        this.height = `${Math.max(...heightArr)}px`
      })
    },
    setClasses (i) {
      return {
        'block-before-after-gallery__images--active': i === this.active,
        'block-before-after-gallery__images--next': i === this.next,
        'block-before-after-gallery__images--prev': i === this.prev
      }
    },
    makeActive (i) {
      this.active = i
      this.handlePrevNext()
    },
    changeSlide (str) {
      if (str === 'prev') {
        this.prev()
      }
      if (str === 'next') {
        this.next()
      }
    },
    toPrev () {
      this.active === 0 ? this.active = this.props.images.length - 1 : this.active--
      this.handlePrevNext()
    },
    toNext () {
      this.active === (this.props.images.length - 1) ? this.active = 0 : this.active++
      this.handlePrevNext()
    },
    throttlePrevSlide () {
      this.throttle(this.toPrev, null, 700)
    },
    throttleNextSlide () {
      this.throttle(this.toNext, null, 700)
    },
    handlePrevNext () {
      this.next = this.active === this.props.images.length - 1 ? 0 : this.active + 1
      if (this.props.images.length >= 3) {
        this.prev = this.next === this.props.images.length - 1 ? this.next - 1 : 0
      }
    },
    handleTouch (callback) {
      let swipedir
      let startX
      let startY
      let distX
      let distY
      const threshold = 75 // min dist for swipe
      // let restraint = 100 // max dist allow allowed at the same time in perpendicular direction
      const allowedTime = 300 // max time allowed to travel dist
      let elapsedTime
      let startTime
      const handleSwipe = callback || function (swipedir) {}

      this.$refs.gallery.addEventListener('touchstart', (e) => {
        const touchObj = e.changedTouches[0]
        swipedir = 'none'
        startX = touchObj.pageX
        startY = touchObj.pageY
        startTime = new Date().getTime()
      }, { passive: true })

      this.$refs.gallery.addEventListener('touchend', (e) => {
        const touchObj = e.changedTouches[0]
        distX = touchObj.pageX - startX
        distY = touchObj.pageY - startY
        elapsedTime = new Date().getTime() - startTime
        if (elapsedTime <= allowedTime) {

        }
        if (Math.abs(distX) >= threshold) {
          swipedir = (distX < 0) ? 'left' : 'right'
        } else if (Math.abs(distY) >= threshold) {
          swipedir = (distY < 0) ? 'up' : 'down'
        }
        return handleSwipe(swipedir)
      }, { passive: true })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.images) {
          this.$_fadeIn(this.$refs.gallery, '150%', 0, 'top', 2, 1)
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
