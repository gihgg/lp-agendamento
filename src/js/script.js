const mobileBtn = document.querySelector('.btn-mobile');
const navLinks = document.getElementById('nav-links');
const icon = document.querySelector('.btn-mobile i');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    icon.classList.toggle('fa-times');
    icon.classList.toggle('fa-bars');
})


window.addEventListener('scroll', () => {
    const header = document.getElementById('header')

    if (window.scrollY > 0) {
        header.style.boxShadow = '0 4px 10px rgba(255, 255, 255, 0.18)';
    } else {
        header.style.boxShadow = 'none';
    }
})