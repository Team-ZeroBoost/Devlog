console.log('header.js load')

const devtalkBtn = document.getElementById('devtalk')


devtalkBtn?.addEventListener('click', e => {
    location.href = '/devtalk'
})

// 사이드바, 프로필 모달, 배경 오버레이
const profile = document.getElementById("profile");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

profile.addEventListener("click", () => {
  profile.classList.toggle("active");
});

window.addEventListener("click", (e) => {
  if (!profile.contains(e.target)) {
    profile.classList.remove("active");
  }
});

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});