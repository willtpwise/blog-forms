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

    $intra_form = $this->intra_form();

    if (preg_match("/{{blog_form}}/", $content)) {
      $content = preg_replace("/{{blog_form}}/", $intra_form, $content);
    } else {
      $content = $this->split($content);
      $content = $content[0] . $intra_form . $content[1];
    }

    return $content;
  }

  /**
   * Takes the content and splits it into based on the HTML structure
   *
   * @param $content: The HTML content to splits
   * @return An array with two halves of the content.
   */
  public function split ($content) {
    // We need a unique identifier – hence the 'woohoo' ;)
    $content = "<div id='blog-form-woohoo'>$content</div>";
    $dom = new DOMDocument();
    $dom->preserveWhiteSpace = false;
    libxml_use_internal_errors(true);
    $dom->loadHTML($content);
    $xpath = new DOMXPath($dom);
    $obj = $xpath->query('//div[@id="blog-form-woohoo"]');
    $nodes = $obj->item(0)->childNodes;

    $i = 1;
    $split = array();
    for ($i = 0; $i < $nodes->length; $i++) {
      $html = $nodes[$i]->ownerDocument->saveHTML($nodes[$i]);
      if ($i < ($nodes->length / 2)) {
        $split[0] .= $html;
      } else {
        $split[1] .= $html;
      }
    }

    $split[0] = utf8_decode($split[0]);
    $split[1] = utf8_decode($split[1]);

    return $split;
  }

  /**
   * Returns the template for the form
   *
   * @return The HTML form content as a string
   */
  private function intra_form () {
    return "
    <div class='intra-form' role='banner' aria-labelledby='intra-form-title'>
      <h4 id='intra-form-title'>
        " . __("Want insights delivered straight to your inbox?", "blog_form") . "
      </h4>
      " . $this->form() . "
    </div>";
  }
}
$BlogIntraForm = new BlogIntraForm();
