let workSwiper = new Swiper('.work-slide', {
  speed: 3000,
  loop: true,
  slidesPerView: 'auto',
  freeMode: true,
  grabCursor: true,
});

let workSlideTimer = null;

function startWorkSlide() {
  if (workSlideTimer !== null) return;
  workSlideTimer = setInterval(() => {
    workSwiper.slideNext();
  }, 16);
}

function stopWorkSlide() {
  clearInterval(workSlideTimer);
  workSlideTimer = null;
}

startWorkSlide();

// 탭 복귀 시 슬라이드 재시작
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startWorkSlide();
  }
});

// PhotoSwipe 이벤트 대응
document.addEventListener('pswp:close', () => {
  startWorkSlide();
});

window.projectSwiper = new Swiper('.project-slide', {
  direction: 'vertical',
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 800,
  loop: true,
  slidesPerView: 'auto',
  freeMode: false,
});
