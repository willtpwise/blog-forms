import './popup.scss'

class Popup {
  constructor (target) {
    this.el = false
    this.target = target
  }

  open () {
    let content = this.clone(this.target)
    this.build(content)
    document.body.className += ' blog-popup-open'
  }

  close () {
    document.body.className = document.body.className.replace(/ blog-popup-open/g, '')
    setTimeout(() => {
      this.el.parentNode.removeChild(this.el)
    }, 1000)
  }

  clone (target) {
    return target.cloneNode(true)
  }

  build (content) {
    let popup = document.createElement('div')
    let underlay = document.createElement('div')
    let body = document.createElement('div')
    let close = document.createElement('a')

    popup.className = 'popup-form'
    underlay.className = 'popup-form-underlay'
    body.className = 'popup-form-body'
    close.className = 'popup-form-close'

    body.appendChild(content)
    popup.appendChild(underlay)
    popup.appendChild(body)
    popup.appendChild(close)

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
  new Popup(form)
})
