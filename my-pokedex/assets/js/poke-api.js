const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
       
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
    /*
        .then((response) => response.json())//Sempre que colocar .then, seria como uma ação apos o outro .then 

        //Logo, nesse casso eu posso tratar a informnação em um .then, e em seguida, exibir no .then de baixo
        .then((responseJsonBody) => responseJsonBody.results)

        .then((pokemons) => pokemons.map((pokeApi.getPokemonsDetail))) //=> fetch(pokemon.url).then((response) => response.json())))//pega o json transformado a cima, e transforma em uma nova lista de promise

        .then((detailRequests) => Promise.all(detailRequests))//Aqui esperarei a promise ser resolvida para apresentar o resultado

        .then((pokemonsDetails) => {
            debugger
            console.log(pokemonsDetails)
        })

        .catch((error) => { console.log(error) })//Se o primeiro falhar, esse metodo motrara o fracaso Error*/
}
/*

Promise.all([ //Arry de promessas
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4'),
]).then((results) => {
    console.log(results)
})*/

