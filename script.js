//Objeto com informações para realizar o Request//
const api = {
  base: "https://gateway.marvel.com/v1/public/characters", //URL Base da API
  ts: "1662849118", //TimeStamp realizado com Math.floor(Date.now() / 1000)
  apiKey: "104948b4b898853515daede8e328ca7c", //Key pública recebida
  hash: "ed725b1e0774d632776870d0b9e1b1ab", // Hash realizada com md5 da Key privada, pública e Timestamp
};
let count = 0;

//Conexão API
const apiMarvel = fetch(
  `${api.base}?ts=${api.ts}&apikey=${api.apiKey}&hash=${api.hash}`
)
  .then((response) => {
    return response.json(); //Retornar em formato Json
  })
  .then((jsonParsed) => {
    console.log(jsonParsed);
    const toAppend = document.querySelector(".main-content"); //Selecionar o elemento HTML que será colocado os filhos

    //Na API "results" retornava um Array com as informações de 20 personagens, então foi realizado um forEach para cada elemento
    jsonParsed.data.results.forEach((element) => {
      //"path" é o caminho da imagem e "extension" o formato (jpeg, png, etc)
      const srcThumb = `${element.thumbnail.path}.${element.thumbnail.extension}`;
      const descriptionHero = element.description;
      const nameHero = element.name;

      //Função para criar Div dentro do elemento HTML selecionado anteriormente
      createDivHero(srcThumb, nameHero, descriptionHero, toAppend);

      //Contagem de personagens
      const pCount = document.querySelector(".count");
      count++;
      pCount.innerText = `Personagens: ${count}`;
    });
  });

function createDivHero(srcThumb, nameHero, descriptionHero, toAppend) {
  //Criando os elementos
  const img = document.createElement("img");
  const divHeroCard = document.createElement("div");
  const divCardHeroImg = document.createElement("div");
  const heroDescription = document.createElement("div");
  const spanNameHero = document.createElement("span");

  //Atribuindo o nome das classes dos elementos para a formatação do CSS
  divHeroCard.className = "hero-card";
  divCardHeroImg.className = "card-hero-img";
  heroDescription.className = "hero-description";
  spanNameHero.className = "hero-name";

  //Setando o caminho da imagem, descrição e nome dos personagens nos elementos
  img.src = srcThumb;
  heroDescription.innerText = descriptionHero;
  spanNameHero.innerText = nameHero;

  //Menssagem padrão para os personagens que não tem descrição
  if (descriptionHero === "") {
    heroDescription.innerText = "Sem descrição";
  }

  //Linkando os elementos
  divHeroCard.appendChild(divCardHeroImg);
  divHeroCard.appendChild(heroDescription);
  divCardHeroImg.appendChild(spanNameHero);
  divCardHeroImg.appendChild(img);
  toAppend.appendChild(divHeroCard);
}
