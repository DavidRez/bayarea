<template lang='pug' src='./index.pug'></template>

<script>
import { debounce, fadeIn, throttle } from '~/resources/mixins'

export default {
  mixins: [debounce, fadeIn, throttle],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    active: 0,
    nextTile: null,
    prevTile: null,
    height: '100%'
  }),
  mounted () {
    this.getDimensions()
    this.handlePrevNext()

    setTimeout(() => {
      this.getDimensions()
    }, 1000)

    this.handleTouch((swipedir) => {
      if (swipedir === 'left') {
        this.changeSlide('next')
      }
      if (swipedir === 'right') {
        this.changeSlide('prev')
      }
    })
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
        // get max height of tiles
        const tiles = this.$refs.tiles
        let tilesHeights = []
        tilesHeights = tiles.map((a) => {
          return a.clientHeight
        })
        const maxTilesHeight = Math.max(...tilesHeights) + 16

        this.height = `${maxTilesHeight}px`
      })
    },
    makeActive (i) {
      this.active = i
      this.handlePrevNext()
    },
    changeSlide (str) {
      if (str === 'prev') {
        this.active === 0 ? this.active = this.props.tiles.length - 1 : this.active--
        this.handlePrevNext()
      }
      if (str === 'next') {
        this.active === (this.props.tiles.length - 1) ? this.active = 0 : this.active++
        this.handlePrevNext()
      }
    },
    toPrev () {
      this.changeSlide('prev')
    },
    toNext () {
      this.changeSlide('next')
    },
    throttlePrevSlide () {
      this.throttle(this.toPrev, null, 700)
    },
    throttleNextSlide () {
      this.throttle(this.toNext, null, 700)
    },
    setClasses (i) {
      return {
        'block-tiles-mobile__tile--active': i === this.active,
        'block-tiles-mobile__tile--next': i === this.nextTile,
        'block-tiles-mobile__tile--prev': i === this.prevTile
      }
    },
    handlePrevNext () {
      this.prevTile = this.active === 0 ? this.props.tiles.length - 1 : this.active - 1
      this.nextTile = this.active === this.props.tiles.length - 1 ? 0 : this.active + 1
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

      this.$refs.tilesContainer.addEventListener('touchstart', (e) => {
        const touchObj = e.changedTouches[0]
        swipedir = 'none'
        startX = touchObj.pageX
        startY = touchObj.pageY
        startTime = new Date().getTime()
      }, { passive: true })

      this.$refs.tilesContainer.addEventListener('touchend', (e) => {
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
