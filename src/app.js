import Form from './components/Form';
import './styles/main.scss';

const MOBILE_SCREEN_SIZE = 575;
const menuContainer = document.getElementById('menu-container');
const menu = document.getElementById('menu');
const menuButton = document.getElementById('menu-button');
const menuTabs = {
  flights: document.getElementById('flights-tab'),
  hotels: document.getElementById('hotels-tab'),
  cars: document.getElementById('cars-tab')
};

const formElements = {
  formContainer: document.getElementById('form-container'),
  form: document.getElementById('search-form'),
  clearButton: document.getElementById('button-clear'),
  submitButton: document.getElementById('button-search'),
  startDate: document.getElementById('start-date'),
  endDate: document.getElementById('end-date'),
  hotelCountrySelect: document.getElementById('hotel-country'),
  hotelCitySelect: document.getElementById('hotel-city'),
  carCountrySelect: document.getElementById('car-country'),
  carCitySelect: document.getElementById('car-city')
};
const formSections = {
  flights: document.getElementById('flights-section'),
  hotels: document.getElementById('hotels-section'),
  cars: document.getElementById('cars-section')
};

window.onload = async () => {
  const appState = { selectedTab: 'flights' };
  const form = new Form(formElements, formSections, appState.selectedTab);

  const toggleMenu = () => {
    const screenWidth = window.innerWidth;
    menuContainer.style.display =
      menuContainer.style.display === 'block' &&
      screenWidth <= MOBILE_SCREEN_SIZE
        ? 'none'
        : 'block';
  };

  const selectMenuTab = e => {
    menuTabs[appState.selectedTab].classList.remove('active');
    formSections[appState.selectedTab].style.display = 'none';
    appState.selectedTab = e.target.id.split('-')[0];
    menuTabs[appState.selectedTab].classList.add('active');
    formSections[appState.selectedTab].style.display = 'block';
    form.changeSection(appState.selectedTab);
  };

  menu.addEventListener('click', selectMenuTab);
  menuButton.addEventListener('click', toggleMenu);
};

window.onresize = e => {
  const screenWidth = window.innerWidth;
  if (screenWidth > MOBILE_SCREEN_SIZE) {
    menuContainer.style.display = 'block';
  } else {
    menuContainer.style.display = 'none';
  }
};
