import './intra.scss'

class BlogIntraForm {
  constructor (target) {
    this.el = target
    let form = this.el.querySelector('form')

    form.addEventListener('prefilled', (e) => {
      let lead = e.detail
      if (lead.SM_Blog__c) {
        this.hide()
      }
    })
  }

  hide () {
    this.el.className += ' intra-form--disabled'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('.intra-form')
  if (form) {
    return new BlogIntraForm(form)
  }
})
