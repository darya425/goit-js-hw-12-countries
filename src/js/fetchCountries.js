export default function fetchCountries(searchQuery) {
    
    const SEARCH_FOR = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    return fetch(SEARCH_FOR)
        .then(r => {
            if (r.ok) return r.json();
            throw new Error('Error fetching data');
        })
        .catch(error => { console.error(error) });
 }








