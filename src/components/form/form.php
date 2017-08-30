<?php

class BlogForm {
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
   * @return The HTML form content as a string
   */
  public function form () {
    return "<form id='mktoForm_2075' class='blog-form mktoForm--lt' data-submit-text='" . __("Subscribe", "blog_forms") . "'></form>";
  }
}
