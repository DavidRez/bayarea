<template lang="pug" src="./index.pug"></template>

<script>
import { trapFocus } from '~/resources/mixins'
import { api, url } from '~/resources/api'

export default {
  mixins: [trapFocus],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    selectedForm: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    formModels: {},
    formRecipient: '',
    formBCC: '',
    formSubject: '',
    formSubmitted: false,
    formSuccess: false,
    fullName: '',
    inputFields: [],
    modalOpen: false,
    postUrl: ``,
    storagePostUrl: ``,
    submissionAttempted: false
  }),
  mounted () {
    this.formRecipient = this.selectedForm.recipient || 'david.ramirez@roostergrin.com'
    this.formBCC = this.selectedForm.bcc
    this.formSubject = this.selectedForm.subject || this.selectedForm.title.rendered || 'Website Contact Form'
    this.initiateFields()
  },
  methods: {
    initiateFields () {
      // Creates input fields
      this.inputFields = this.selectedForm.input_fields
      this.inputFields.forEach((field, i) => {
        // Assigns unique ID
        const fieldID = `field-${i.toString().padStart(5, '0')}`
        field._id = fieldID
        // Assigns unique ID to each sub input field (for radio or checkbox)
        if (field.inputs) {
          field.inputs.forEach((input, e) => {
            input._id = 'subfield-' + i.toString().padStart(5, '0') + '-' + e.toString().padStart(5, '0')
          })
        }

        // Sets validation rules
        if (field.acf_fc_layout === 'phone') {
          field.vValidate = { required: field.required, regex: /^[\d\s\-+()]{7,20}$/ }
        } else if (field.acf_fc_layout === 'email') {
          // field.vValidate = field.required ? 'required|email' : 'email'
          field.vValidate = { required: field.required, regex: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/ }
        } else {
          field.vValidate = field.required ? 'required' : ''
        }

        // Creates model
        this.formModels[fieldID] = {
          _id: fieldID,
          label: field.label,
          model: field.acf_fc_layout === 'checkbox' ? [] : null
        }

        // Sets default inputs (for radio and checkbox)
        if (field.inputs) {
          field.inputs.forEach((input) => {
            if (input.checked) {
              if (field.acf_fc_layout === 'radio') {
                this.formModels[fieldID].model = input.label
              } else if (field.acf_fc_layout === 'checkbox') {
                this.formModels[fieldID].model.push(input.label)
              }
            }
          })
        }
      })
    },
    validate () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.onSubmit(this.formBCC, this.formRecipient, this.formSubject)
          } else {
            const errorArr = document.querySelectorAll('.form-flexible__input--error')
            errorArr[0].focus()
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    closeModal () {
      this.formSuccess = false
      this.formSubmitted = false
      setTimeout(() => {
        this.modalOpen = false
        const mainEl = document.getElementById('main-content')
        mainEl.focus()
      }, 150)
    },
    async onSubmit (formBCC, formRecipient, formSubject) {
      this.submissionAttempted = true

      try {
        this.formSubmitted = true

        // Creates an array of html tables, one for each input field
        const tables = []
        this.inputFields.forEach((inputField) => {
          if (this.formModels[inputField._id]) {
            const formModel = this.formModels[inputField._id]
            tables.push(`
              <table style="width: 100%; text-align: left">
                <tr>
                  <th>
                    <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">${formModel.label}</p>
                  </th>
                </tr>
                <tr>
                  <td style="width: 100%; font-size: 20px;">
                    <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${Array.isArray(formModel.model) ? formModel.model.join(', ') : formModel.model}</h5></td>
                </tr>
              </table>
            `)
          }
        })

        // Creates email body (including tables)
        const emailTemplate = `
          <!DOCTYPE html>
          <html>
          <body>
            <div class="container" style="background-color: #ebf5ff; padding: 1.5rem 0;">
              <div style="padding: 2rem 0; margin: 0 auto;"><img style="width: auto; height: 6rem; display: block; margin-left: auto; margin-right: auto; margin-bottom: 1rem;" src="https://www.roostergrin.com/wp-content/uploads/2019/11/rg-logo.png">
                <h1 style="font-size: 40px; margin: 0; text-align: center; width: 100%; color: #003b75;">Form Received!</h1></div>
            </div>
            <div class="section" style="background-color: #fdfdfd;">
              <div class="container" style="padding: 4rem 32px 1rem 32px; max-width: 1440px; margin: 0 auto">
                <div class="card-holder" style="padding: 7px; background-color: #e6e6e6;">
                  <div class="card-holder" style="padding: 2rem; background-color: white;">
                    ${tables.join(`<br>`)}
                  </div>
                </div>
              </div>
              <div class="container" style="padding: 0 32px 4rem 32px; max-width: 1440px; margin: 0 auto">
                <p style="color: #3f3f3f;">This form was generated from <a href=${url} target="_blank" style="text-decoration: none">${url}</a></p>
              </div>
            </div>
          </body>
          </html>
        `
        await this.$axios.$post(this.postUrl, null, {
          params: {
            bcc: formBCC,
            body: emailTemplate,
            from: `no-reply@roostergrin.com`, // TODO: update to client domain before launch
            subject: formSubject,
            to: formRecipient
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })

        await this.$axios.$post(this.storagePostUrl, null, {
          params: {
            bcc: formBCC,
            api,
            body: emailTemplate,
            subject: formSubject,
            to: formRecipient
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })

        this.formSuccess = true

        setTimeout(() => {
          this.modalOpen = true
          this.$_trapFocus(this.$refs.formModal)
        }, 750)

        // Resets input fields and their modals
        setTimeout(() => {
          this.initiateFields()
        }, 1000)

        // Resets validation errors
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
