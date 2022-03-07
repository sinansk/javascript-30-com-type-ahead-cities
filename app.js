const endPoint = "https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json"
const cities = [];

console.log(cities)

fetch(endPoint)
.then(response => response.json())
.then(responseJSON => cities.push(...responseJSON));
// console.log(cities)

const findMatches = (wordToMatch, cities) => {
    return cities.filter(place => {

        //we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.region.match(regex)
    });
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function displayMatches() {
/// I first wrote function with const and then remembered this cannot used in const func///
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        //regex for highlighted keyword in results//
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
        const region = place.region.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
            <span class="name">${cityName}, ${region}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join("")
    suggestions.innerHTML = html;
}


const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener("keyup", displayMatches);