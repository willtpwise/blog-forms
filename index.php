<?php
/*
  Plugin Name: Blog Forms
  Plugin URI: #
  Description: #
  Author: #
  Version: 0.0.0
*/
require __DIR__ . "/inc/environment.php";
require __DIR__ . "/inc/dependencies.php";

class BlogForm {
  public $form_id;
  function __construct () {
    $this->form_id = 2008;
    $this->instances = 0;

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

    $this->instances ++;
    if ($this->instances === 1) {
      $this->enqueue();
    }

    $content = $this->split($content);
    $form = $this->form();

    return $content[0] . $form . $content[1];
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
   * Enqueues the blog forms static assets
   */
  private function enqueue () {
    wp_enqueue_script('blog-form', plugin_dir_url(__FILE__) . '/assets/blog-form.js', array(), false, true);
    wp_enqueue_style('blog-form', plugin_dir_url(__FILE__) . '/assets/blog-form.css');
  }

  /**
   * Returns the template for the form
   *
   * @return The HTML form content as a string
   */
  private function form () {
    return "
    <div class='blog-form'>
      <div style='background:purple; height:300px;'>
      
      </div>
      <form id='mktoForm_" . $this->form_id . "' class='mktoForm--lt'></form>
      <script>
        MktoForms2.loadForm(
          '//app-sn01.marketo.com',
          '994-UJA-976',
          " . $this->form_id . "
        );
      </script>
    </div>";
  }
}
$BlogForm = new BlogForm();
