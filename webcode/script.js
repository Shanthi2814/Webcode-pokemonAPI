let lists_pokemon = document.getElementById('lists_pokemon')

let buttons = document.getElementById('buttons')
 
let urlPokemon='https://pokeapi.co/api/v2/pokemon'
let btnNext;
let btnPrevious;
let tempHTML;
console.log('prev next')

let getPokemonAPI = async(url)=>{

    try{
        let response = await fetch(url)

    let results = await response.json();
    console.log(results);
    dataPokemon(results.results)

    btnNext = results.next ? `<button class="btn" data-url=${results.next}>  <b>next </button> ` : " "
    btnPrevious = results.previous ? `<button class="btn" data-url=${results.previous}> <b>prev  </button>`:" "
    buttons.innerHTML = btnPrevious +" " + btnNext

    }catch(error){
        console.log(error)
    }

}
getPokemonAPI(urlPokemon)

let dataPokemon = async(data)=>{
    lists_pokemon.innerHTML="";
    try{
        for(let index of data){ 
            // console.log(index)
        let response1 = await fetch(index.url)
        let result = await response1.json();
         console.log(result)
         tempHTML=`
         <div class="pokemon_img">
         <img src=${result.sprites.other.dream_world.front_default} alt=${result.name} />
        <em> <b><h6>Name:-${result.name}</h6>
         <h6>Weight:-${result.weight}</h6></b></em>
         </div>`
         lists_pokemon.innerHTML += tempHTML;
    }
   
    }catch(error){
        console.log(error)
    }
}
buttons.addEventListener('click',(e)=>{

    if(e.target.classList.contains('btn')){
        let value =  e.target.dataset.url
        console.log(value);
        getPokemonAPI(value)
    }
})