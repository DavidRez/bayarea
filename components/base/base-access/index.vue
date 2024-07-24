<template lang="pug">
.base-access(v-if="$route.path !== '/accessibility'")
    .base-access__container(tabindex='0')
    p(v-html='`${companyName} Accessibility Statement. ${companyName} is committed to facilitating the accessibility and usability of its website, ${domain}, for everyone. ${companyName} aims to comply with all applicable standards, including the World Wide Web Consortiums Web Content Accessibility Guidelines 2.0 up to Level AA (WCAG 2.0 AA). ${companyName} is proud of the efforts that we have completed and that are in-progress to ensure that our website is accessible to everyone. We highly recommend using the userway accessibility widget linked in the footer, but should you experience any difficulty in accessing any part of this website, please feel free to ${phone ? "call us at " + phone : ""} ${phone && email ? "or" : ""} ${email ? "email us at " + email : ""} and we will work with you to provide the information or service you seek through an alternate communication method that is accessible for you consistent with applicable law (for example, through telephone support).`')
    nuxt-link.base-access__link(to='/accessibility' aria-label='Links to Accessibility page')
    .base-access__pixel
</template>

<script>
import { url } from '~/resources/api'
export default {
  data () {
    return {
      companyName: this.$store.state.global.company_name, // Fill this in
      domain: url, // Fill this in
      email: this.$store.state.global.email, // Fill this in
      phone: this.$store.state.global.phone.number // Fill this in
    }
  }
}
</script>

<style lang="sass" src="./index.sass"></style>
