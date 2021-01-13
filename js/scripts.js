var elForm = $_('.form__search');
var elFormInput = $_('.form__search-input', elForm);
var elPokemonsListResult = $_('.pokemons__list', elForm);
var pokemonsTemplate = $_('.pokemons__template').content;
var pokemonsList = $_('.pokemons__list');



// var activeType = localStorage.getItem(`activeType`);
// console.log(activeType);

var makeVisible = function (pokemonsArray) {

    pokemonsList.innerHTML = '';
    var pokemonsFragment = document.createDocumentFragment();
    pokemonsArray.forEach(water => {
        var clonePokemonTemp = pokemonsTemplate.cloneNode(true);

        $_('.pokemons__img', clonePokemonTemp).src = water.img;
        $_('.card-title', clonePokemonTemp).textContent = water.name;
        $_('.pokemons__height', clonePokemonTemp).textContent = water.height;
        $_('.pokemons__weight', clonePokemonTemp).textContent = water.weight;
        $_('.pokemons__type', clonePokemonTemp).textContent = water.type.join(' ');

        pokemonsFragment.appendChild(clonePokemonTemp);
    });

    pokemonsList.appendChild(pokemonsFragment);
}


if (!elFormInput.value.length) {
    makeVisible(pokemons);
}
elForm.addEventListener('submit', function (evt) { 
    evt.preventDefault();
});

elForm.addEventListener('keyup', evt => {
    evt.preventDefault();

    var inputRegexp = new RegExp(elFormInput.value, 'gi');

    var filteredArray = pokemons.filter(pokemon => {
        if (elFormInput.value.trim() !== '') {
            return pokemon.name.toString().match(inputRegexp);
        }
        else if (elFormInput.value.trim() === '') {
            makeVisible(filteredArray);
        }
    });


    makeVisible(filteredArray);
})



var typesTemplate = $_('.types__template').content;
var typesFragment = document.createDocumentFragment();
var typesList = $_('.types__list');
var emptyArray = [];
var pokemonsFragment = document.createDocumentFragment();
var counterResult = $_('.counter-result');


for (let pokemon of pokemons) {
    for (let type of pokemon.type) {
        if (!emptyArray.includes(type)) {
            emptyArray.push(type);
        }
    }
}

emptyArray.forEach(type => {
    var cloneOfTemplate = typesTemplate.cloneNode(true);

    $_('.types__link', cloneOfTemplate).textContent = type;
    $_('.types__link', cloneOfTemplate).className = `types__link h5 ${type.toLocaleLowerCase()}`;
    $_('.types__link', cloneOfTemplate).dataset.type = type;

    typesFragment.appendChild(cloneOfTemplate);
});

typesList.appendChild(typesFragment);


typesList.addEventListener('click', evt => {

    if (evt.target.matches(`a`)) {
        var clickFiltered = pokemons.filter(pokemon => pokemon.type.includes(evt.target.dataset.type) || evt.target.dataset.type === "all");

        makeVisible(clickFiltered);
        // localStorage.setItem(`activeType`, evt.target.dataset.type)
    }
});

