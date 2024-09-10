<template lang="pug" src="./index.pug"></template>

<script>
import router from '~/router/index'

export default {
  computed: {
    links () {
      return router.filter((link) => {
        return link.footer
      })
    }
  },
  methods: {
    top () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
