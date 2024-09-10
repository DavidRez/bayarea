<template lang="pug" src="./index.pug"></template>

<script>
import { trapFocus } from '~/resources/mixins'

export default {
  mixins: [trapFocus],
  props: {
    props: {
      type: String,
      default: ''
    },
    disclaimer: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    clientEmail: '',
    formSubmitted: false,
    formSuccess: false
  }),
  mounted () {
    this.$validator.pause()
  },
  methods: {
    validate () {
      this.$validator.resume()
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.onSubmit()
          } else {
            this.$nextTick(() => {
              const errorArr = document.querySelectorAll('.form-subscribe__input--error')
              errorArr[0].focus()
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    onSubmit () {
      try {
        // TO BE FILLED BY DEV DEPENDING ON CLIENT. COULD ALSO APPEND SCRIPT TO DIV.
        // const portalId = ''
        // const formGuid = ''
        // const config = {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // }
        // const postURL = ``
        // this.formSubmitted = true
        // await this.$axios.post(postURL, {
        //   fields: [
        //     {
        //       name: 'email',
        //       value: this.clientEmail
        //     }
        //   ],
        //   context: {
        //     pageUri: '',
        //     pageName: 'Subscribe Page'
        //   }
        // },
        // config
        // )

        this.formSuccess = true

        setTimeout(() => {
          this.$store.dispatch('VIEW_THANK_YOU_MODAL', true)
        }, 750)

        setTimeout(() => {
          this.firstname = ''
          this.lastname = ''
          this.clientEmail = ''
          this.formSuccess = false
          this.formSubmitted = false
        }, 1000)

        setTimeout(() => {
          this.errors.clear()
        }, 1100)
      } catch (e) {
        console.error(e, 'submitted')
      }
    }
  }
}
</script>

<style lang="sass" src="./index.sass" ></style>
