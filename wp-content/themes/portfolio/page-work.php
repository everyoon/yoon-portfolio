<?php
/**
 * Template Name: Work
 */
get_header();
?>

<main id="primary" class="site-main">
  <section class="page-work">
    <h3 class="page-title UhBeepuding">Work</h3>
    <div class="work-filter">
      <?php
  $terms = get_terms([
    'taxonomy' => 'work-categories',
    'hide_empty' => false,
    'orderby' => 'term_order'

  ]);
  foreach ($terms as $term) {
    echo '<button class="filter-btn" data-filter="' . esc_attr($term->slug) . '">' . esc_html($term->name) . '</button>';
  }
  ?>
    </div>

    <div class="work-list">
      <?php
  $args = array(
    'post_type' => 'work',
    'posts_per_page' => -1,
  );
  $works = new WP_Query($args);
  while ($works->have_posts()) : $works->the_post();
    $img = get_field('main_img'); // ACF 이미지 필드
    $terms = get_the_terms(get_the_ID(), 'work-categories'); 
    $cat_classes = '';
    if ($terms && !is_wp_error($terms)) {
      foreach ($terms as $term) {
        $cat_classes .= ' ' . esc_attr($term->slug);
      }
    }
  ?>
      <div class="work-item<?php echo $cat_classes; ?>">
        <a href="<?php echo esc_url($img['url']); ?>" class="lightbox">
          <img src="<?php echo esc_url($img['url']); ?>" alt="<?php echo esc_attr($img['alt']); ?>">
        </a>
      </div>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>

  </section>



</main><!-- #main -->

<?php
get_footer();