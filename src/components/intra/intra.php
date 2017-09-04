<?php

class BlogIntraForm extends BlogForm {
  function __construct () {
    add_filter('the_content', array($this, 'add'));
  }

  /**
   * Adds the blog form markup to the passed content
   *
   * @param $content: The HTML content
   * @return The original HTMl with the form markup included
   */
  public function add ($content) {
    if (!$this->is_blog()) {
      return $content;
    }

    if (preg_match("/{{blog_form}}/", $content)) {
      $intra_form = $this->intra_form();
      $content = preg_replace("/{{blog_form}}/", $intra_form, $content);
    } else {
      $intra_form = $this->intra_form(true);
      $content = $content . $intra_form;
    }

    return $content;
  }

  /**
   * Returns the template for the form
   *
   * @return The HTML form content as a string
   */
  private function intra_form ($shift = false) {
    return "
    <div class='intra-form blog-form' data-shift='" . $shift . "' role='banner' aria-labelledby='intra-form-title'>
      <h4 id='intra-form-title'>
        " . __("Want insights delivered straight to your inbox?", "blog_form") . "
      </h4>
      " . $this->form(2075) . "
      " . $this->thanks() . "
    </div>";
  }
}
$BlogIntraForm = new BlogIntraForm();
