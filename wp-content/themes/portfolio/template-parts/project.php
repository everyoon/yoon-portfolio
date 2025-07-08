<div class="swiper project-slide">
  <ul class="swiper-wrapper">
    <?php
  $args = array(
    'post_type' => 'project',
    'posts_per_page' => -1
  );
  $projects = new WP_Query($args);
  while($projects->have_posts()) : $projects->the_post();
    $date = get_field('date');
    $part = get_field('part');
    $program = get_field('program');
    $production = get_field('production');
    $figma = get_field('figma_link');
    $github = get_field('github_link');
    $site = get_field('site_link');
    $main_img = get_field('main_img');
    $logo_img = get_field('logo_img');
    $desc = get_field('desc');
  ?>
    <li class="swiper-slide">
      <div class="pf-info">
        <p class="pf-title"><?php the_title(); ?></p>
        <div><span class="pf-subtitle">제작기간</span><span><?php echo $date; ?></span></div>
        <div><span class="pf-subtitle">참여도</span><span><?php echo $part; ?></span></div>
        <div><span class="pf-subtitle">사용 프로그램</span><span><?php echo $program; ?></span></div>
        <div><span class="pf-subtitle">제작 페이지</span><span><?php echo $production; ?></span></div>
        <ul class="link">
          <li class="button black"><a href="<?php echo $figma; ?>" target="_blank">Figma</a></li>
          <li class="button black"><a href="<?php echo $github; ?>" target="_blank">Github</a></li>
          <li class="button black"><a href="<?php echo $site; ?>" target="_blank">Go Site</a></li>
        </ul>
      </div>
      <div class="pf-img">
        <div class="img">
          <img src="<?php echo esc_url($main_img['url']); ?>" alt="<?php echo esc_attr($main_img['alt']); ?>">
        </div>
        <div class="pf-img-info">
          <div class="pf-img-info-inner">
            <div class="logo">
              <img src="<?php echo esc_url($logo_img['url']); ?>" alt="<?php echo esc_attr($logo_img['alt']); ?>">
            </div>
            <span class="desc"><?php echo $desc; ?></span>
            <div class="button white"><a href="<?php echo $site; ?>" target="_blank">Go Site</a></div>
          </div>
        </div>
      </div>
    </li>
    <?php endwhile; wp_reset_postdata(); ?>
  </ul>
</div>