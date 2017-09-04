import './intra.scss'

class BlogIntraForm {
  constructor (target) {
    this.el = target
    let form = this.el.querySelector('form')

    if (this.el.getAttribute('data-shift') === '1') {
      this.move()
    }

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

  move () {
    let content = (() => {
      let parent = this.el
      while (parent.parentNode && parent.className.indexOf('post_content') < 0) {
        parent = parent.parentNode
      }
      return parent
    })()

    if (content && content.children) {
      let insert = content.children[Math.round(content.children.length / 2)]
      content.insertBefore(this.el, insert)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('.intra-form')
  if (form) {
    return new BlogIntraForm(form)
  }
})
