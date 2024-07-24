<template lang="pug" src="./index.pug"></template>

<script>
import router from '~/router/index'

export default {
  computed: {
    links () {
      return router
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
