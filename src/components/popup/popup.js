import './popup.scss'

class BlogPopup {
  constructor (target) {
    this.el = target

    let form = this.el.querySelector('form')
    let close = this.el.querySelector('.popup-form-close')
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
      if (!lead.SM_Blog__c) {
        this.autoOpen()
      }
    })
  }

  open () {
    console.log('open')
    if (!this.dismissed) {
      this.el.setAttribute('aria-live', 'assertive')
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
    return new BlogPopup(form)
  }
})
