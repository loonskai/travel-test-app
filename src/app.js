import './styles/main.scss';
import axios from 'axios';

const MOBILE_SCREEN_SIZE = 575;
const menuButton = document.getElementById('menu-button');
const menuContainer = document.getElementById('menu-container');
const menu = document.getElementById('menu');
const searchForm = document.getElementById('search-form');
const clearButton = document.getElementById('button-clear');
const searchButton = document.getElementById('button-search');
const hotelCountrySelect = document.getElementById('hotel-country');
const hotelCitySelect = document.getElementById('hotel-city');
const carCountrySelect = document.getElementById('car-country');
const carCitySelect = document.getElementById('car-city');

window.onload = async () => {
  const res = await axios.get('https://restcountries.eu/rest/v2/all');
  res.data.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.innerText = country.name;
    option2.innerText = country.name;
    hotelCountrySelect.appendChild(option1);
    carCountrySelect.appendChild(option2);
  });
};

// Set date's range limits
const parseDate = day => {
  let dd = day.getDate();
  let mm = day.getMonth() + 1;
  let yyyy = day.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return yyyy + '-' + mm + '-' + dd;
};
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const startDay = parseDate(today);
const endDay = parseDate(tomorrow);
document.getElementById('start-date').setAttribute('min', startDay);
document.getElementById('end-date').setAttribute('min', endDay);

// Define selected tab state
const tabsState = {
  selected: 'flights'
};

const formFields = {
  flights: ['start-date', 'end-date', 'flight-from', 'flight-to'],
  hotels: [
    'start-date',
    'end-date',
    'hotel-amenities',
    'hotel-country',
    'hotel-city'
  ],
  cars: ['start-date', 'end-date', 'car-type', 'car-country', 'car-city']
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
  // clearInputFields();
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

const submitSearchForm = async e => {
  const values = [...searchForm.elements].filter(
    element =>
      element.tagName === 'INPUT' &&
      formFields[tabsState.selected].includes(element.id)
  );
  console.log(values);
};

menuButton.addEventListener('click', toggleMenu);
menu.addEventListener('click', selectMenuTab);
clearButton.addEventListener('click', clearInputFields);
searchButton.addEventListener('click', submitSearchForm);
