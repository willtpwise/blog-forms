<?php

class BlogPopupForm extends BlogForm {
  function __construct () {
    add_action('wp_footer', array($this, 'add'));
  }

  /**
   * Adds the blog form markup
   */
  public function add () {
    if (!$this->is_blog()) {
      return;
    }

    echo $this->popup_form();
  }

  /**
   * Returns the template for the popup
   *
   * @return The HTML form content as a string
   */
  public function popup_form () {
    return "
    <div class='popup-form' aria-alive='off' aria-labelledby='popup-form-title'>
      <div class='popup-form-underlay'></div>
      <div class='popup-form-body'>
        <a href='#' class='popup-form-close' aria-label='" . __("Close", "blog_forms") . "'></a>
        <h3 id='popup-form-title'>
          " . __("Get insights sent straight to your inbox:", "blog_forms") . "
        </h3>
        " . $this->form() . "
      </div>
    </div>";
  }
}
$BlogPopupForm = new BlogPopupForm();
