import './form.scss'

/* global MktoForms2 */
document.addEventListener('DOMContentLoaded', () => {
  MktoForms2.loadForm(
    '//app-sn01.marketo.com',
    '994-UJA-976',
    2075
  )

  let forms = document.querySelectorAll('.blog-form')
  ;[].forEach.call(forms, (form) => {
    form.addEventListener('ready', () => {
      let signup = form.querySelectorAll('[name="SM_Blog__c"], [name="LH_Blog__c"]')
      ;[].forEach.call(signup, (field) => {
        field.checked = true
      })
    })
  })
})
