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

const ul = document.getElementById("authors");

var url = Get("https://pokeapi.co/api/v2/pokemon");
var JSONurl = JSON.parse(url);
var ArrayJson = Array(JSONurl);
var ResultsJson = ArrayJson[0].results;

for (let i = 0; i < ResultsJson.length; i++) {
  var linkPokemon = ResultsJson[i].url;
  fetch(linkPokemon)
    .then((resp) => resp.json())
    .then(function (data) {
      
      let ids = data.id;

      let authors = data.sprites.front_default;
      let li = createNode("li");

      let img = createNode("img");

      img.style.cssText = "width: 100%;height: 100%;background-size: auto;";

      let span = createNode("h1")
      let h2 = createNode("h2")
      h2.style.cssText = "color: white"

      span.style.cssText = ""
      img.src = authors;

      span.innerHTML = `${ResultsJson[i].name}`;
      h2.innerHTML = `N°${ids}`
      append(li, img);
      append(li, span);
      append(li, h2)
      append(ul, li);
    })
    .catch(function (error) {

    });
}
