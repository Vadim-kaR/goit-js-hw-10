var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

import './css/styles.css';
import { fetchCountries }  from'./fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list')
}

refs.input.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY) );

function onInputValue(e) {
    e.preventDefault();
    if (e.target.value.trim() === '') {
        return;
    }
    fetchCountries(e.target.value.trim()).then(renderData)
}


function renderData(data) { 

    if (data.length > 10) { 
         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
     }
    
    const markup = data.map(({ name, capital, population, flags, languages }) => {

    if (data.length > 2 || data.length >= 10) { 
        return `<li class="item">
        <img style="width:40px; height:30px" src="${flags.svg}">
        <p>${name.official}</p>
        </li>`
            
    }
        return `<li>
        <div class="item"><img style="width:40px; height:30px" src="${flags.svg}">
        <h1>${name.official}</h1></div>
        <p><b>Capital:&nbsp</b>${capital}</p>
        <p><b>Population</b>:&nbsp${population}</p>
        <p><b>Languages</b>:&nbsp${(Object.values(languages)).join(", ")}</p>
        </li>`
        }).join("");

        refs.list.innerHTML = markup; 
}
    


  