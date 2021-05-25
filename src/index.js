import './styles.css';

import { error } from '@pnotify/core';
import "../node_modules/@pnotify/core/dist/PNotify.css";
import "../node_modules/@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "../node_modules/@pnotify/confirm/dist/PNotifyConfirm.css";

import _ from 'lodash';
import fetchCountries from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/country-list.hbs';


const inputRef = document.querySelector('.js-form');
const countryRef = document.querySelector('.card-container');
inputRef.addEventListener('input', _.debounce(onSearchCountry, 500));


function onSearchCountry(evt) {
    evt.preventDefault();
    clearContainer();

    const searchQuery = evt.target.value.trim();

    if (searchQuery.trim() === '') {
        return;
    }

    fetchCountries(searchQuery)
        .then(countries => {
            console.log(countries);
            
            if (countries.length === 1) {
                renderCountryCard(countries);
                inputRef.reset();
            }

            if (countries.length >= 2 && countries.length <= 10) {
                renderCountriesList(countries);
            }

            if (countries.length > 10) {
                error({
                    text: "Too many matches found. Please enter a more specyfic query!"
                });
            }
        })
        .catch(showNotFound);
}


// create country card
function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    countryRef.innerHTML = markup;
}

// create country list
function renderCountriesList(country) {
    const markup = countriesListTpl(country);
    countryRef.innerHTML = markup;
}

function clearContainer() {
    countryRef.innerHTML = '';
}

// not found
function showNotFound() {
    error({
        text:"No such country! Try again!",
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons: [
                        {
                        text: "Ok",
                        primary: true,
                        click: notice => {
                            notice.close();
                        }
                        }
                    ]
                }
            ]
        ])
    });
}

