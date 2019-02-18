import axios from 'axios';

class Form {
  constructor(elements = {}, sections = {}, sectionSelected, values = {}) {
    this.form = elements.form;
    this.clearButton = elements.clearButton;
    this.submitButton = elements.submitButton;
    this.startDate = elements.startDate;
    this.endDate = elements.endDate;
    this.hotelCountrySelect = elements.hotelCountrySelect;
    this.hotelCitySelect = elements.hotelCitySelect;
    this.carCountrySelect = elements.carCountrySelect;
    this.carCitySelect = elements.carCitySelect;
    this.flightSection = sections.flights;
    this.hotelSection = sections.hotels;
    this.carSection = sections.cars;
    this.sectionSelected = sectionSelected;
    this.values = values;

    this.formFields = {
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

    /* Binding event handlers */
    this.populateCities = this.populateCities.bind(this);
    this.submit = this.submit.bind(this);
    this.clear = this.clear.bind(this);
    this.checkInputVoid = this.checkInputVoid.bind(this);

    /* Attach handlers to form elements */
    this.form.addEventListener('keyup', this.checkInputVoid);
    this.form.addEventListener('paste', this.checkInputVoid);
    this.form.addEventListener('change', this.checkInputVoid);
    this.hotelCountrySelect.addEventListener('change', this.populateCities);
    this.carCountrySelect.addEventListener('change', this.populateCities);
    this.clearButton.addEventListener('click', this.clear);
    this.submitButton.addEventListener('click', this.submit);

    /* Init date limits and country list inside select */
    this.setDateLimits();
    this.populateCountries();
  }

  clear(e) {
    e.preventDefault();
    const elements = [...this.form.elements];
    elements.forEach(element => {
      element.value = '';
    });
    this.values = {};
    this.toggleSubmitDisability();
  }

  submit(e) {
    e.preventDefault();
    // Here to save history in Local Storage
    console.log(this.values);
  }

  changeSection(section) {
    this.sectionSelected = section;
    this.values = this.getFormValues();
    this.toggleSubmitDisability();
  }

  checkInputVoid(e) {
    e.preventDefault();
    setTimeout(() => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') return;
      const values = this.getFormValues();
      this.values = values;
      this.toggleSubmitDisability(values);
    }, 0);
  }

  toggleSubmitDisability() {
    if (!this.values || Object.keys(this.values) < 1) {
      this.submitButton.setAttribute('disabled', 'disabled');
      return;
    }
    this.submitButton.removeAttribute('disabled');
  }

  async populateCountries() {
    const res = await axios.get('https://restcountries.eu/rest/v2/all');
    res.data.forEach(country => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.innerText = country.name;
      option2.innerText = country.name;
      this.hotelCountrySelect.appendChild(option1);
      this.carCountrySelect.appendChild(option2);
    });
  }

  async populateCities(e) {
    const select = e.target;
    const countrySelected = select.options[select.selectedIndex].value;
    console.log(select);
    console.log(countrySelected);
    // Here to get cities list from API and populate city option list
    // console.log(select);
    if (select.id === 'hotel-country') {
      this.hotelCitySelect.removeAttribute('disabled');
    }
    if (select.id === 'car-country') {
      this.carCitySelect.removeAttribute('disabled');
    }
  }

  getFormValues() {
    return [...this.form.elements]
      .filter(
        element =>
          (element.tagName === 'INPUT' || element.tagName === 'SELECT') &&
          this.formFields[this.sectionSelected].includes(element.id) &&
          element.value
      )
      .reduce((acc, elem) => {
        acc[elem.id] = elem.value;
        return acc;
      }, {});
  }

  setDateLimits() {
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
    this.startDate.setAttribute('min', startDay);
    this.endDate.setAttribute('min', endDay);
  }
}

export default Form;
