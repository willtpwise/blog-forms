import './popup.scss'

class BlogPopup {
  constructor (target) {
    this.el = false
    this.target = target
    this.open()
  }

  open () {
    this.marker = document.createElement('div')
    this.target.parentNode.insertBefore(this.marker, this.target)
    this.build()
    this.el.setAttribute('aria-live', 'assertive')
  }

  close () {
    this.marker.parentNode.insertBefore(this.target, this.marker)
    this.el.setAttribute('aria-live', 'off')
    setTimeout(() => {
      this.el.parentNode.removeChild(this.el)
    }, 1000)
  }

  build () {
    let popup = document.createElement('div')
    let underlay = document.createElement('div')
    let body = document.createElement('div')
    let close = document.createElement('a')

    popup.className = 'popup-form'
    underlay.className = 'popup-form-underlay'
    body.className = 'popup-form-body'
    close.className = 'popup-form-close'

    body.appendChild(this.target)
    body.appendChild(close)
    popup.appendChild(underlay)
    popup.appendChild(body)

    popup.setAttribute('aria-live', 'assertive')
    close.setAttribute('aria-label', 'Close')

    underlay.addEventListener('click', () => {
      this.close()
    })
    close.addEventListener('click', (e) => {
      e.preventDefault()
      this.close()
    })

    this.el = popup

    document.body.appendChild(popup)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('.blog-form')
  let popup = new BlogPopup(form)
  return popup
})
