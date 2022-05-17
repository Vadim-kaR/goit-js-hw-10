import oneCountryTpl from './templates/oneCountry.hbs'
import someCoutriesTpl from './templates/someCounries.hbs'
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries.js'
import refs from './refs.js'

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

function wrongCountryName() { 
    refs.countryList.innerHTML = "";
}

function onInputValue(e) {
    e.preventDefault();
    if (e.target.value.trim() === '') {
        return;
    }
    fetchCountries(e.target.value.trim()).then(renderData).catch(wrongCountryName)
}

    refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function renderData(data) {

    if (data.length > 10) { 
         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }
    
    if (data.length > 2 || data.length >= 10) { 
        refs.countryList.innerHTML = someCoutriesTpl({ data});
        return;
    } 
     refs.countryList.innerHTML = oneCountryTpl({data}); 
}

