<template lang='pug' src='./index.pug'></template>

<script>
export default {
  components: {
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    light: {
      // make true to make icons and text white
      type: Boolean,
      default: false
    },
    inline: {
      // make true to make locations inline
      type: Boolean,
      default: false
    },
    title: {
      // make true to add title
      type: Boolean,
      default: false
    },
    icon: {
      // make true to add icon
      type: Boolean,
      default: false
    },
    center: {
      // make true to center align locations
      type: Boolean,
      default: false
    },
    phone: {
      // make true to add phone number
      type: Boolean,
      default: false
    },
    address: {
      // make true to add address
      type: Boolean,
      default: false
    },
    email: {
      // make true to add email
      type: Boolean,
      default: false
    },
    hours: {
      // make true to add hours
      type: Boolean,
      default: false
    },
    toggleMenu: {
      type: Function,
      default: () => ({})
    }
  },
  data: () => ({
    locations: [],
    loaded: false
  }),
  mounted () {
    this.props.locations.forEach((location, i) => {
      location.hours.forEach((hours) => {
        this.locations[i] = hours.day + ' ' + hours.time
      })
    })
    this.loaded = true
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
