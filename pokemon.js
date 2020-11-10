// FURTHER STUDY

// Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.
const totalPokemonCount = 1050

$('#btn').on('click', function(evt) {
    evt.preventDefault()
    $('#3-pokemon').empty()
    
    let allPokemon = []
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${totalPokemonCount}?json`)
    .then(resp => {
        for (let pokemon of resp.data.results) {
            allPokemon.push(pokemon)
        }
        return allPokemon
    })
    .then(allPokemon => {
        // Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.
        for (i = 0; i < 3; i++) {
            let rand = Math.ceil(Math.random() * totalPokemonCount)
            let thisPokemon = allPokemon[rand]
            axios.get(`https://pokeapi.co/api/v2/pokemon/${thisPokemon.name}/`)
            .then(resp => {
                // Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.
                let name = resp.data.name
                let img = resp.data.sprites.front_default
                axios.get(`${resp.data.species.url}`)
                .then(resp => {
                    addPokemonToDOM(resp, name, img)
                })
            })
        }
    })
})

function addPokemonToDOM(resp, name, img) {
    let flavorText = determineFlavorText(resp)
    html = generatePokemonHTML(name, img, flavorText)
    $('#3-pokemon').append(html)
}

function determineFlavorText(resp) {
    let flavorText
        for (let entry of resp.data.flavor_text_entries) {
            if (entry.language.name === 'en' && !flavorText) {
                flavorText = entry.flavor_text
            }
        }
        return flavorText
}

function generatePokemonHTML(name, img, flavorText) {
    return `
    <div class="col-sm-6 col-lg-4">
        <div class="jumbotron-fluid bg-primary rounded p-2 my-2">
            <h1 class="display-6 text-center">${name}</h1>
            <p class="text-center"><img src="${img}" /></p>
            <hr class="my-4">
            <p class="text-center">${flavorText}</p>
        </div>
    </div>
    
    `
}

// BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.