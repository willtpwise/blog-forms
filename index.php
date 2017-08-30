<?php
/*
  Plugin Name: Blog Forms
  Plugin URI: #
  Description: #
  Author: #
  Version: 0.0.0
*/
require __DIR__ . "/inc/environment.php";
require_once __DIR__ . "/inc/dependencies.php";

class BlogForm {
  public $form_id;
  function __construct () {
    add_filter('the_content', array($this, 'add'));
  }

  /**
   * Checks to see if the current page is a blog that needs a form
   *
   * @return Booleon indicating the evaluation
   */
  public function is_blog () {
    return true; //defined('ADD_BLOG_FORM');
  }

  /**
   * Adds the blog form markup for the passed content
   *
   * @param $content: The HTML content to splits
   * @return The original HTMl with the form markup included
   */
  public function add ($content) {
    if (!$this->is_blog()) {
      return $content;
    }

    $content = $this->split($content);
    $intra_form = $this->intra_form();
    $popup_form = $this->popup_form();

    add_action('wp_footer', function () {
      echo $this->popup_form();
    });

    return $content[0] . $intra_form . $content[1];
  }

  /**
   * Takes the content and splits it into based on the HTML structure
   *
   * @param $content: The HTML content to splits
   * @return An array with two halves of the content.
   */
  private function split ($content) {
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
    $markup = '';
    foreach ($nodes as $node) {
      if ($i === $nodes->length || $i === ($nodes->length / 2)) {
        $split[] = utf8_decode($markup);
        $markup = '';
      }
      $markup .= $node->ownerDocument->saveHTML($node);
      $i ++;
    }

    return $split;
  }

  /**
   * Returns the template for the form
   *
   * @return The HTML form content as a string
   */
  private function form () {
    return "<form id='mktoForm_2075' class='blog-form mktoForm--lt' data-submit-text='" . __("Subscribe", "blog_forms") . "'></form>";
  }

  /**
   * Returns the template for the form
   *
   * @return The HTML form content as a string
   */
  private function intra_form () {
    return "
    <div class='intra-form' role='banner' aria-labelledby='intra-form-title'>
      <h3 id='intra-form-title'>
        " . __("Want insights delivered straight to your inbox?", "blog_form") . "
      </h3>
      " . $this->form() . "
    </div>";
  }

  /**
   * Returns the template for the popup
   *
   * @return The HTML form content as a string
   */
  private function popup_form () {
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
$BlogForm = new BlogForm();
