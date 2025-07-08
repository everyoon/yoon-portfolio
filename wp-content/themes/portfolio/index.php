<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Portfolio
 */

get_header();
?>

<main id="primary" class="site-main">
  <section class="bg">
    <div class="shelf_container">
      <div class="lp">
        <img src="http://localhost/wp-content/uploads/2025/06/lp.gif" alt="lp 턴테이블">
      </div>
      <div class="camera">
        <img src="http://localhost/wp-content/uploads/2025/06/camera.png" alt="카메라">
      </div>
      <div class="clock">
        <img src="http://localhost/wp-content/uploads/2025/06/clock.png" alt="시계">
      </div>

    </div>
    <div class="shelf">
      <img src="http://localhost/wp-content/uploads/2025/06/shelf.png" alt="선반">
    </div>
    <div class="picture">
      <img src="http://localhost/wp-content/uploads/2025/06/picture.png" alt="사진 장식">
    </div>
    <div class="desk_container">
      <div class="book">
        <img src="http://localhost/wp-content/uploads/2025/06/book.png" alt="책">
      </div>
      <div class="cat">
        <img src="http://localhost/wp-content/uploads/2025/06/cat.png" alt="고양이 인형">
      </div>
      <div class="headset">
        <img src="http://localhost/wp-content/uploads/2025/06/headset.png" alt="해드셋">
      </div>
      <div class="pc">
        <img class="pc-img" src="http://localhost/wp-content/uploads/2025/06/pc.gif?ver=<?php echo time(); ?>"
          alt="컴퓨터">
      </div>
      <div class="tumbler">
        <img src="http://localhost/wp-content/uploads/2025/06/tumbler.png" alt="텀블러">
      </div>
      <div class="lamp">
        <img src="http://localhost/wp-content/uploads/2025/06/lamp.png" alt="무드등">
      </div>
      <div class="incense">
        <img src="http://localhost/wp-content/uploads/2025/06/incense.png" alt="인센스 홀더">
      </div>
    </div>
    <div class="line">
      <img src="http://localhost/wp-content/uploads/2025/07/line.png" alt="책상">
    </div>
  </section>
  <section id="about" class="about">
    <h3 class="title UhBeepuding">About me</h3>
    <div class="about-container">
      <div class="character">
        <img src="http://localhost/wp-content/uploads/2025/06/character.png" alt="캐릭터 이미지">
      </div>
      <div class="info">
        <p class="subtitle">Profile</p>
        <div class="spacer-a"></div>
        <div class="name">
          김지윤
          <span class="en">Kim Jiyoon</span>
        </div>
        <ul class="right">
          <li>
            <span class="point">Birth</span>
            <span>2001.08.10</span>
          </li>
          <li>
            <span class="point">Phone</span>
            <span>010.8555.9331</span>
          </li>
          <li>
            <span class="point">Mail</span>
            <span>jy.k7377@gmail.com</span>
          </li>
        </ul>
        <div class="spacer-b"></div>
        <div class="education">
          <p class="subtitle">Education</p>
          <ul>
            <li>
              <span class="date">2024.02</span>
              <span class="point">창신대학교 졸업</span>
            </li>
            <li>
              <span class="date">2023.06</span>
              <span class="point">宁波大学 졸업</span>
            </li>
            <li>
              <span class="date">2020.02</span>
              <span class="point">부산정보관광고등학교 졸업</span>
            </li>
          </ul>
        </div>
        <div class="certificate">
          <p class="subtitle">Certificate</p>
          <ul>
            <li>
              <span class="date">2025.07</span>
              <div>
                <p class="point">컴퓨터그래픽기능사</p>
                <p class="issuer">한국산업인력공단</p>
              </div>
            </li>
            <li>
              <span class="date">2024.12</span>
              <div>
                <p class="point">웹디자인개발기능사</p>
                <p class="issuer">한국산업인력공단</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="spacer-c"></div>
        <div class="skill">
          <p class="subtitle">Skill</p>
          <ul>
            <li><img src="http://localhost/wp-content/uploads/2025/06/ps.png" alt="포토샵 스킬"></li>
            <li><img src="http://localhost/wp-content/uploads/2025/06/ai.png" alt="일러스트 스킬"></li>
            <li><img src="http://localhost/wp-content/uploads/2025/06/fig.png" alt="피그마 스킬"></li>
            <li><img src="http://localhost/wp-content/uploads/2025/06/html.png" alt="html 스킬"></li>
            <li><img src="http://localhost/wp-content/uploads/2025/06/css.png" alt="css 스킬"></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="work">
    <h3 class="title UhBeepuding">작업물</h3>
    <div class="work">
      <?php get_template_part('template-parts/work'); ?>
    </div>
    <div class="pf">
      <?php get_template_part('template-parts/project'); ?>
    </div>
  </section>
  <section id="contact" class="contact">
    <h3 class="title UhBeepuding">Contact</h3>
    <div class="textarea UhBeepuding">
      <p>저의 포트폴리오를 읽어주셔서 감사합니다.</p>
      <p>함께 일할 퍼블리셔를 찾고계신다면 메일을 보내주세요.</p>
    </div>
    <div class="mail UhBeepuding">
      <a href="mailto:jy.k7377@gmail.com">
        <span>메일 보내기</span>
        <img src="http://localhost/wp-content/uploads/2025/06/mail.png" alt="메일 아이콘">
      </a>
    </div>
  </section>
</main><!-- #main -->

<?php
get_footer();