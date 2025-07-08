document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    //active 제거
    document.querySelectorAll('.filter-btn').forEach((button) => {
      button.classList.remove('active');
    });

    //active 추가
    btn.classList.add('active');

    document.querySelectorAll('.work-item').forEach((item) => {
      if (filter === 'all') {
        item.style.display = 'block';
      } else {
        item.style.display = item.classList.contains(filter) ? 'block' : 'none';
      }
    });
  });
});
