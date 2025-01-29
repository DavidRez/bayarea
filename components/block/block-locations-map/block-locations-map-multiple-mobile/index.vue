<template lang="pug" src="./index.pug"></template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import { fadeIn, debounce } from '~/resources/mixins'

export default {
  mixins: [fadeIn, debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    global: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    accordionBodyHeight: null,
    expanded: 0,
    mapPins: [],
    map: null,
    markers: [],
    width: '100%',
    height: '100%'
  }),
  mounted () {
    this.handleResize()
    setTimeout(() => {
      this.getDimensions()
    }, 500)
    this.global.locations.forEach((loc, i) => {
      this.createMap(i)
    })
    window.addEventListener('resize', this.debounceFunc)
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
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 200)
    },
    handleResize () {
      this.accordionBodyHeight = this.$refs.content[this.expanded].clientHeight
      this.getDimensions()
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$_fadeIn(this.$refs.locations, 0, 96, 'top+=48', 1.5, 0)
      })
    },
    toggleAccordion (i) {
      this.expanded = i
      if (this.expanded !== null) {
        this.accordionBodyHeight = this.$refs.content[i].clientHeight
      } else {
        this.accordionBodyHeight = 0
      }
      this.handleResize()
    },
    getDimensions () {
      // get locations container max height
      const titleHeight = this.$refs.title.clientHeight
      const rowArr = []
      this.$refs.rows.map(row => rowArr.push(row.clientHeight))
      const rowHeight = Math.min(...rowArr)
      const contentArr = []
      this.$refs.content.map(content => contentArr.push(content.clientHeight))
      const contentHeight = Math.max(...contentArr)

      const height = titleHeight + ((this.$refs.rows.length - 1) * rowHeight) + contentHeight + 200

      window.innerWidth <= 900 && window.innerHeight <= 480 && window.innerHeight < window.innerWidth ? this.width = '85%' : window.innerWidth > 600 ? this.width = '85%' : this.width = '100%'
      window.innerWidth <= 900 && window.innerHeight <= 480 && window.innerHeight < window.innerWidth ? this.height = height * 1.25 + 'px' : window.innerWidth > 600 ? this.height = height * 1.25 + 'px' : this.height = '90vw'
    },
    createMap (index) {
      this.$nextTick(() => {
        /* eslint-disable */
        const loader = new Loader({
          apiKey: '',
        })
        loader.load().then(() => {
          const map = new google.maps.Map(this.$refs[`map-${index}`][0], {
            center: { lat: Number(this.global.locations[index].address.coordinates.latitude), lng: Number(this.global.locations[index].address.coordinates.longitude) },
            zoom: 12,
            disableDefaultUI: true,
            mapId: ''
          })

          this.addMapMarker(this.global.locations[index].address.coordinates.latitude, this.global.locations[index].address.coordinates.longitude, '#BACAD4', index, this.global.locations[index].title, map)
        })
      })
    },
    addMapMarker (lat, lng, color, pos, title, map) {
      /* eslint-disable */
      const marker = new google.maps.Marker({
        title: title + ' marker',
        position: { lat: +lat, lng: +lng },
        icon: {
          path: 'M25.5468 48.0784C29.888 43.3901 42.001 29.3889 42.001 18.7819C42.001 13.9995 40.1046 9.41305 36.729 6.03142C33.3533 2.64978 28.7749 0.75 24.001 0.75C19.2271 0.75 14.6487 2.64978 11.2731 6.03142C7.89743 9.41305 6.001 13.9995 6.001 18.7819C5.97983 29.4313 18.0928 43.3901 22.4552 48.0784C22.6532 48.2903 22.8926 48.4593 23.1585 48.5748C23.4244 48.6903 23.7112 48.75 24.001 48.75C24.2908 48.75 24.5775 48.6903 24.8434 48.5748C25.1094 48.4593 25.3487 48.2903 25.5468 48.0784ZM32.4717 19.0788C32.4717 23.7653 28.6793 27.5644 24.0011 27.5644C19.3229 27.5644 15.5305 23.7653 15.5305 19.0788C15.5305 14.3923 19.3229 10.5932 24.0011 10.5932C28.6793 10.5932 32.4717 14.3923 32.4717 19.0788Z',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: color,
          strokeWeight: 1,
          anchor: new google.maps.Point(50, 50),
          scale: 0.8
        },
        map: map,
        zIndex: 4
      })
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
