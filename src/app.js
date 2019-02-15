import './styles/main.scss';

const MOBILE_SCREEN_SIZE = 575;

window.onresize = e => {
  const screenWidth = window.innerWidth;
  if (screenWidth > MOBILE_SCREEN_SIZE) {
    menuContainer.style.display = 'block';
  } else {
    menuContainer.style.display = 'none';
  }
};

const menuButton = document.getElementById('menu-button');
const menuContainer = document.getElementById('menu-container');

const toggleMenu = () => {
  const screenWidth = window.innerWidth;
  menuContainer.style.display =
    menuContainer.style.display === 'block' && screenWidth <= MOBILE_SCREEN_SIZE
      ? 'none'
      : 'block';
};

menuButton.addEventListener('click', toggleMenu);
