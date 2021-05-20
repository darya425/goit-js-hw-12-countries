export default function fetchCountries(searchQuery) {
    
    const SEARCH_FOR = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    return fetch(SEARCH_FOR)
        .then(r => {
            if (r.ok) { return r.json() }
            else { throw new Error }
        });

    // return fetch(SEARCH_FOR)
    //     .then(r => r.json());
 }








