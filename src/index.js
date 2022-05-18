import oneCountryTpl from './templates/oneCountry.hbs'
import someCountriesTpl from './templates/someCounries.hbs'
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js'
import refs from './js/refs.js'

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

function eareseCountryInfo() { 
    refs.countryList.innerHTML = "";
    refs.countryBox.innerHTML = ""; 
}

function onInputValue(e) {
    e.preventDefault();
    if (e.target.value.trim() === '') {
        eareseCountryInfo();
        return;
    }
    fetchCountries(e.target.value.trim()).then(renderData).catch(eareseCountryInfo)
}


refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));


function renderData(data) {

    if (data.length > 10) { 
         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }
    
    if (data.length > 2 || data.length >= 10) { 
        eareseCountryInfo();
        refs.countryList.innerHTML = someCountriesTpl(data);
        return;
    } 
    eareseCountryInfo();
    refs.countryBox.innerHTML = oneCountryTpl(data); 
}



