import './form.scss'

/* global MktoForms2 */
class BlogForms {
  constructor () {
    this.forms = document.querySelectorAll('.blog-form form')
    if (this.forms) {
      this.load()
      this.signUp()
    }
  }

  load () {
    let forms = [2075, 2078]
    forms.forEach((id) => {
      MktoForms2.loadForm(
        '//app-sn01.marketo.com',
        '994-UJA-976',
        id,
        (form) => {
          form.onSuccess(() => {
            let event = new CustomEvent('blogSignUp')
            document.dispatchEvent(event)
            this.showThankyou(form.getFormElem()[0])
            return false
          })
        }
      )
    })
  }

  signUp () {
    ;[].forEach.call(this.forms, (form) => {
      form.addEventListener('ready', () => {
        let signup = form.querySelectorAll('[name="SM_Blog__c"]')
        ;[].forEach.call(signup, (field) => {
          field.checked = true
        })
      })
    })
  }

  showThankyou (form) {
    let component = (() => {
      let parent = form
      while (parent.parentNode && parent.className.indexOf('blog-form') < 0) {
        parent = parent.parentNode
      }
      return parent
    })()
    let success = component.querySelector('.blog-form-success')
    let dismiss = success.querySelector('.blog-form-close')

    dismiss.addEventListener('click', (e) => {
      e.preventDefault()
      this.hideForm(component)
    })

    success.setAttribute('aria-live', 'assertive')
    component.className += ' blog-form--success'
  }

  hideForm (form) {
    form.parentNode.removeChild(form)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  return new BlogForms()
})
