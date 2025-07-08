<div class="swiper work-slide">
  <ul class="swiper-wrapper">
    <?php
    $args = array(
      'post_type' => 'work',
      'posts_per_page' => -1,
    );
    $works = new WP_Query($args);
    while ($works->have_posts()) : $works->the_post();
      $img = get_field('main_img'); 
    ?>
    <li class="swiper-slide">
      <div>
        <a href="<?php echo esc_url($img['url']); ?>" class="lightbox work-link">
          <img src="<?php echo esc_url($img['url']); ?>" alt="<?php echo esc_attr($img['alt']); ?>">
        </a>
      </div>
    </li>
    <?php endwhile; wp_reset_postdata(); ?>
  </ul>
</div>