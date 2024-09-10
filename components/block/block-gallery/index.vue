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
    next2: null,
    next3: null,
    next4: null,
    activeModal: 0,
    nextModal: null,
    next2Modal: null,
    next3Modal: null,
    next4Modal: null,
    loaded: false,
    modalOpen: false,
    image: null
  }),
  mounted () {
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
  },
  methods: {
    openImage (i) {
      this.activeModal = i
      this.image = this.props.images[i]
      this.modalOpen = !this.modalOpen
    },
    setClasses (i) {
      return {
        'block-gallery__image-container--active': i === this.active,
        'block-gallery__image-container--next': i === this.next,
        'block-gallery__image-container--next2': i === this.next2,
        'block-gallery__image-container--next3': i === this.next3,
        'block-gallery__image-container--next4': i === this.next4
      }
    },
    makeActive (i) {
      this.active = i
      this.handlePrevNext()
    },
    makeActiveImageModal (i) {
      this.activeModal = i
      this.image = this.props.images[this.activeModal]
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
      if (this.modalOpen) {
        this.activeModal === 0 ? this.activeModal = this.props.images.length - 1 : this.activeModal--
        this.image = this.props.images[this.activeModal]
        this.handlePrevNext()
      } else {
        this.active === 0 ? this.active = this.props.images.length - 1 : this.active--
        this.handlePrevNext()
      }
    },
    toNext () {
      if (this.modalOpen) {
        this.activeModal === (this.props.images.length - 1) ? this.activeModal = 0 : this.activeModal++
        this.image = this.props.images[this.activeModal]
        this.handlePrevNext()
      } else {
        this.active === (this.props.images.length - 1) ? this.active = 0 : this.active++
        this.handlePrevNext()
      }
    },
    handlePrevNext () {
      if (this.modalOpen) {
        this.nextModal = this.activeModal === this.props.images.length - 1 ? 0 : this.activeModal + 1
        this.next2Modal = this.nextModal === this.props.images.length - 1 ? 0 : this.nextModal + 1
        if (this.props.images.length > 4) {
          this.next3Modal = this.next2Modal === this.props.images.length - 1 ? 0 : this.next2Modal + 1
          this.next4Modal = this.next3Modal === this.props.images.length - 1 ? 0 : this.next3Modal + 1
        }
      } else {
        this.next = this.active === this.props.images.length - 1 ? 0 : this.active + 1
        this.next2 = this.next === this.props.images.length - 1 ? 0 : this.next + 1
        if (this.props.images.length > 4) {
          this.next3 = this.next2 === this.props.images.length - 1 ? 0 : this.next2 + 1
          this.next4 = this.next3 === this.props.images.length - 1 ? 0 : this.next3 + 1
        }
      }
    },
    throttlePrevSlide () {
      this.throttle(this.toPrev, null, 700)
    },
    throttleNextSlide () {
      this.throttle(this.toNext, null, 700)
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
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
