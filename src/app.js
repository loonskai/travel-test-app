import './styles/main.scss';

const MOBILE_SCREEN_SIZE = 575;
const menuButton = document.getElementById('menu-button');
const menuContainer = document.getElementById('menu-container');
const searchForm = document.getElementById('search-form');

const formSections = {
  flights: document.getElementById('flights-section'),
  hotels: document.getElementById('hotels-section'),
  cars: document.getElementById('cars-section')
};

window.onresize = e => {
  const screenWidth = window.innerWidth;
  if (screenWidth > MOBILE_SCREEN_SIZE) {
    menuContainer.style.display = 'block';
  } else {
    menuContainer.style.display = 'none';
  }
};

const toggleMenu = () => {
  const screenWidth = window.innerWidth;
  menuContainer.style.display =
    menuContainer.style.display === 'block' && screenWidth <= MOBILE_SCREEN_SIZE
      ? 'none'
      : 'block';
};

const displaySection = id => {
  const sectionTitle = id.split('-')[1];
  Object.keys(formSections).forEach(section => {
    if (section === sectionTitle) {
      formSections[section].style.display = 'block';
    } else {
      formSections[section].style.display = 'none';
    }
  });
};

const selectMenuTab = e => {
  const selectedTab = e.target;
  const menuTabs = [...e.target.parentElement.children];
  displaySection(selectedTab.id);
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
