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
  url = Get("https://pokeapi.co/api/v2/pokemon?limit=96&offset=0"),
  JSONurl = JSON.parse(url),
  ArrayJson = Array(JSONurl),
  ResultsJson = ArrayJson[0].results;

var pokeName, pokemon, card;

pokeName = searchInput.value;

function getColor(imageElem, ratio) {
  const canvas = document.createElement("canvas");

  let width = (canvas.width = imageElem.width);
  let height = (canvas.height = imageElem.height);

  const context = canvas.getContext("2d");
  context.drawImage(imageElem, 0, 0);

  let data, length;
  let i = -4,
    count = 0;

  try {
    data = context.getImageData(0, 0, width, height);
    length = data.data.length;
  } catch (err) {
    console.log("ERROR", err);
    return {
      R: 0,
      G: 0,
      B: 0,
    };
  }
  let R, G, B;
  R = G = B = 0;

  while ((i += ratio * 4) < length) {
    ++count;

    R += data.data[i];
    G += data.data[i + 1];
    B += data.data[i + 2];
  }
  R = ~~(R / count);
  G = ~~(G / count);
  B = ~~(B / count);

  return {
    R,
    G,
    B,
  };
}
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

      animatedImage =
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default;
      image = createNode("img");
      image.crossOrigin = "";
      image.src = animatedImage;
      image.style.cssText =
        "width: 55%;height: 55%;background-size: auto; background-attachment: fixed";

      img.crossOrigin = "";
      img.src = authors;
      img.style.cssText =
        "width: 55%;height: 55%;background-size: auto; background-attachment: fixed";

      img.onload = function () {
        const { R, G, B } = getColor(img, 4);
        li.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
        if ((R, G, B == 0)) {
          li.style.backgroundColor = "#444273";
        }
      };

      h2.style.cssText = "color: white";

      span.style.cssText = "";
      span.innerHTML = `${data.name}`;
      h2.innerHTML = `N°${ids}`;

      append(li, image);
      append(li, span);
      append(li, h2);
      append(ul, li);
    })
    .catch(function (error) {
      console.log(error);
    });
}
