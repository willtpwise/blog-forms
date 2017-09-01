<?php

class BlogForm {
  public $intra_form_id;
  public $popup_form_id;
  function __construct () {
    $this->intra_form_id = 2075;
    $this->popup_form_id = 2078;
  }
  /**
   * Checks to see if the current page is a blog that needs a form
   *
   * @return Bool indicating the evaluation
   */
  public function is_blog () {
    return defined('ADD_BLOG_FORM');
  }

  /**
   * Returns the template for the form
   *
   * @param $id: The form id
   *
   * @return The HTML form content as a string
   */
  public function form ($id) {
    return "<form id='mktoForm_$id' class='mktoForm--lt' data-submit-text='" . __("Subscribe", "blog_forms") . "'></form>";
  }

  /**
   * Returns the template for the success message
   *
   * @return The HTML form content as a string
   */
  public function thanks () {
    $title_id = "success-title-" . uniqid();
    $describe_id = "success-describe-" . uniqid();
    return "
      <div class='blog-form-success' aria-live='off' aria-labelledby='$title_id' aria-describedby='$describe_id'>
        <h4 id='$title_id'>" . __("Thanks for subscribing to the SiteMinder industry newsletter.", "blog_forms") . "</h4>
        <p id='$describe_id'>" . __("Check your inbox, we've sent you an email.", "blog_forms") . "</p>
        <a href='#' aria-label='" . __("Close", "blog_forms") . "' class='blog-form-close'></a>
      </div>";
  }
}
