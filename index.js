

function Get(yourUrl) {
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", yourUrl, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("authors"),
      searchInput = document.getElementById("user-search"),
      url = Get("https://pokeapi.co/api/v2/pokemon?limit=24&offset=0"),
      JSONurl = JSON.parse(url),
      ArrayJson = Array(JSONurl),
      ResultsJson = ArrayJson[0].results;

var pokeName,
    pokemon, 
    card;

pokeName = searchInput.value;
console.log(pokeName)

for (let i = 0; i < ResultsJson.length; i++) {
  var linkPokemon = ResultsJson[i].url;
  fetch(linkPokemon)
    .then((resp) => resp.json())
    .then(function (data) {  

      let ids = data.id,
          authors = data.sprites.other.dream_world.front_default,
          li = createNode("li"),
          img = createNode("img"),
          span = createNode("h1"),
          h2 = createNode("h2");

      img.style.cssText = "width: 55%;height: 55%;background-size: auto;";
      img.src = authors;


      h2.style.cssText = "color: white"

      span.style.cssText = ""
      span.innerHTML = `${ResultsJson[i].name}`;
      h2.innerHTML = `N°${ids}`
      

      append(li, img);
      append(li, span);
      append(li, h2)
      append(ul, li);
    })
    .catch(function (error) {
      console.log(error)
    });
}