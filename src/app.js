import axios from 'axios';
import './styles/main.scss';

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

// Define selected tab state
const appState = {
  selectedTab: 'flights',
  values: {}
};

// Sort form inputs for each section
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

// Form sections
const formSections = {
  flights: document.getElementById('flights-section'),
  hotels: document.getElementById('hotels-section'),
  cars: document.getElementById('cars-section')
};

// Form tabs
const formTabs = {
  flights: document.getElementById('flights-tab'),
  hotels: document.getElementById('hotels-tab'),
  cars: document.getElementById('cars-tab')
};

window.onload = async () => {
  // Populate select options with countries
  const res = await axios.get('https://restcountries.eu/rest/v2/all');
  res.data.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.innerText = country.name;
    option2.innerText = country.name;
    hotelCountrySelect.appendChild(option1);
    carCountrySelect.appendChild(option2);
  });
  // Check inputs void
  searchForm.addEventListener('keyup', checkInputVoid);
  searchForm.addEventListener('paste', checkInputVoid);
  searchForm.addEventListener('change', checkInputVoid);
};

window.onresize = e => {
  const screenWidth = window.innerWidth;
  if (screenWidth > MOBILE_SCREEN_SIZE) {
    menuContainer.style.display = 'block';
  } else {
    menuContainer.style.display = 'none';
  }
};

const checkInputVoid = (e) => {
  setTimeout(() => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') return;
    const values = getFormValues();
    appState.values = values;
    setSearchButtonState(values);
  }, 0);
};

const getFormValues = () => [...searchForm.elements]
  .filter(
    element =>
      (element.tagName === 'INPUT' || element.tagName === 'SELECT') &&
      formFields[appState.selectedTab].includes(element.id) &&
      element.value
  )
  .reduce((acc, elem) => {
    acc[elem.id] = elem.value;
    return acc;
  }, {});

const setSearchButtonState = () => {
  if (!appState.values || Object.keys(appState.values) < 1) {
    searchButton.setAttribute('disabled', 'disabled');
    return;
  };
  searchButton.removeAttribute('disabled');
};

const loadCities = async e => {
  const select = e.target;
  const countrySelected = select.options[select.selectedIndex].value;
  console.log(countrySelected);
  // Here to get cities list from API and populate city option list
  // console.log(select);
  if (select.id === 'hotel-country') {
    hotelCitySelect.removeAttribute('disabled');
  }
  if (select.id === 'car-country') {
    carCitySelect.removeAttribute('disabled');
  }
};
hotelCountrySelect.addEventListener('change', loadCities);
carCountrySelect.addEventListener('change', loadCities);

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

// Toggle menu
const toggleMenu = () => {
  const screenWidth = window.innerWidth;
  menuContainer.style.display =
    menuContainer.style.display === 'block' && screenWidth <= MOBILE_SCREEN_SIZE
      ? 'none'
      : 'block';
};

const selectMenuTab = e => {
  // clearInputFields();
  formTabs[appState.selectedTab].classList.remove('active');
  formSections[appState.selectedTab].style.display = 'none';
  appState.selectedTab = e.target.id.split('-')[0];
  formTabs[appState.selectedTab].classList.add('active');
  formSections[appState.selectedTab].style.display = 'block';
  appState.values = getFormValues();
  setSearchButtonState();
};

const clearInputFields = () => {
  const elements = [...searchForm.elements];
  elements.forEach(element => {
    element.value = '';
  });
  appState.values = {};
  setSearchButtonState();
};

const submitSearchForm = appState => async e => {
  e.preventDefault();
  const { values } = appState;
  console.log(values);
};

menuButton.addEventListener('click', toggleMenu);
menu.addEventListener('click', selectMenuTab);
clearButton.addEventListener('click', clearInputFields);
searchButton.addEventListener('click', submitSearchForm(appState));