<template lang="pug" src="./index.pug"></template>

<script>
// import MenuContact from '~/components/menu/menu-contact'
// import MenuLinks from '~/components/menu/menu-links'
// import MenuSocialMedia from '~/components/menu/menu-social-media'

export default {
  components: {
    // MenuContact,
    // MenuLinks,
    // MenuSocialMedia
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => ([])
    },
    top: {
      type: Function,
      default: () => ({})
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
