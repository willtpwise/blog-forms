import './popup.scss'

class BlogPopupForm {
  constructor (target) {
    this.el = target

    let form = this.el.querySelector('form')
    let close = this.el.querySelector('.blog-form-close')
    let underlay = this.el.querySelector('.popup-form-underlay')

    close.addEventListener('click', (e) => {
      e.preventDefault()
      this.close()
    })
    underlay.addEventListener('click', () => {
      this.close()
    })

    form.addEventListener('prefilled', (e) => {
      let lead = e.detail
      if (lead.SM_Blog__c) {
        this.dismissed = true
      }
    })

    document.addEventListener('blogSignUp', (e) => {
      this.dismissed = true
    })

    setTimeout(() => {
      this.autoOpen()
    }, 4000);
  }

  open () {
    if (!this.dismissed) {
      this.el.setAttribute('aria-live', 'assertive')
      this.el.querySelector('[name="FirstName"]').focus()
    }
  }

  close () {
    this.dismissed = true
    this.el.setAttribute('aria-live', 'off')
  }

  autoOpen () {
    let content = document.querySelector('.post_content')
    let parent = content.parentNode
    let bodyRect = document.body.getBoundingClientRect()
    let elemRect = parent.getBoundingClientRect()
    let offset = elemRect.bottom - bodyRect.top
    let waypoint = offset

    let shouldOpen = () => {
      if (window.scrollY + window.innerHeight >= waypoint) {
        this.open()
      }
    }

    document.addEventListener('scroll', () => {
      shouldOpen()
    })
    shouldOpen()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('.popup-form')
  if (form) {
    return new BlogPopupForm(form)
  }
})
