import './styles/main.scss';

const MOBILE_SCREEN_SIZE = 575;
const menuButton = document.getElementById('menu-button');
const menuContainer = document.getElementById('menu-container');
const searchForm = document.getElementById('search-form');
const clearButton = document.getElementById('button-clear');
const searchButton = document.getElementById('button-search');

const tabsState = {
  selected: 'flights'
};

const formFields = {
  flights: ['start-date', 'end-date', 'flight-from', 'flight-to'],
  hotels: ['start-date', 'end-date', 'hotel-amenities', 'hotel-location'],
  cars: ['start-date', 'end-date', 'car-type', 'car-location']
};

const formSections = {
  flights: document.getElementById('flights-section'),
  hotels: document.getElementById('hotels-section'),
  cars: document.getElementById('cars-section')
};

const formTabs = {
  flights: document.getElementById('flights-tab'),
  hotels: document.getElementById('hotels-tab'),
  cars: document.getElementById('cars-tab')
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

const selectMenuTab = e => {
  clearInputFields();
  formTabs[tabsState.selected].classList.remove('active');
  formSections[tabsState.selected].style.display = 'none';
  tabsState.selected = e.target.id.split('-')[0];
  formTabs[tabsState.selected].classList.add('active');
  formSections[tabsState.selected].style.display = 'block';
};

const clearInputFields = () => {
  const elements = [...searchForm.elements];
  elements.forEach(element => {
    element.value = '';
  });
};

const submitSearchForm = e => {
  const values = [...searchForm.elements].filter(
    element =>
      element.tagName === 'INPUT' &&
      formFields[tabsState.selected].includes(element.id)
  );
  console.log(values);
};

menuButton.addEventListener('click', toggleMenu);
menuContainer.addEventListener('click', selectMenuTab);
clearButton.addEventListener('click', clearInputFields);
searchButton.addEventListener('click', submitSearchForm);
