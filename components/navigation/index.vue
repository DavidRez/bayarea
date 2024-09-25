<template lang='pug' src='./index.pug'></template>

<script>
import { removeFocus, throttle, trapFocus, debounce } from '~/resources/mixins'
import router from '~/router/index'

export default {
  components: {
  },
  mixins: [ removeFocus, throttle, trapFocus, debounce ],
  data: () => ({
    scrollDir: null,
    scrollPos: '',
    mobile: false,
    windowWidth: 0,
    mobileWidth: 0,
    setMobileWidth: false,
    drawerOpen: false,
    loaded: false
  }),
  computed: {
    navLinks () {
      return router.filter((link) => {
        return link.navigation
      })
    },
    mobileLinks () {
      return router.filter((link) => {
        return link
      })
    },
    isScrolling () {
      if (process.client) {
        if (window.innerWidth > 400) {
          return this.scrollPos > (window.innerHeight * 0.05)
        } else {
          return this.scrollPos > 10
        }
      } else {
        return null
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.setWidth()
    }, 1000)
    window.addEventListener('resize', this.setWidth)
    window.addEventListener('scroll', () => {
      this.adjustScrollPos()
    }, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setWidth)
    window.removeEventListener('scroll', this.adjustScrollPos)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.setWidth, null, 200)
    },
    setWidth () {
      this.windowWidth = window.innerWidth
      this.loaded = true
    },
    top () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    adjustScrollPos () {
      const currPos = window.pageYOffset

      if (currPos > this.scrollPos) {
        this.scrollDir = 'down'
      } else {
        this.scrollDir = 'up'
      }
      this.scrollPos = currPos
    },
    closeDrawer () {
      this.drawerOpen = false
      document.body.classList.remove('body-stop')
    },
    removeFocus () {
      document.activeElement.blur()
    },
    throttleToggleDrawer () {
      this.removeFocus()
      this.throttle(this.toggleDrawer, null, 1000)
    },
    toggleDrawer () {
      this.drawerOpen = !this.drawerOpen
      if (this.drawerOpen) {
        document.body.classList.add('body-stop')
        setTimeout(() => {
          this.$_trapFocus(this.$refs.navDrawer.$el)
        }, 750)
      } else {
        document.body.classList.remove('body-stop')
      }
    },
    mobileOn (state) {
      this.mobile = state

      // once mobile is turned on, set mobile breakpoint
      if (state && !this.setMobileWidth) {
        this.mobileWidth = this.windowWidth
      }
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
