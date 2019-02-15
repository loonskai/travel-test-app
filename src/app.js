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

const selectMenuTab = e => {
  const selectedTab = e.target;
  const menuTabs = [...e.target.parentElement.children];
  menuTabs.forEach(tab => {
    if (tab === selectedTab) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
};

menuButton.addEventListener('click', toggleMenu);
menuContainer.addEventListener('click', selectMenuTab);
