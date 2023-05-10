async function renderizarCard(){

  const lista = document.querySelector('#cardList');
  lista.innerHTML = " ";  
  
  const listaDeDados = await fetch('https://swapi.dev/api/people', {
    method: "GET"
  })
  .then(function(resposta){
    return resposta.json();
  })

  for(let i = 0; i < listaDeDados.results.length; i++){
    
    const elementos = listaDeDados.results[i];

    const listaDados = document.createElement('ul');
    const li = document.createElement('li');
    const anoNascimento = document.createElement('li');
    const planeta = document.createElement('li');
    const imagem = document.createElement('img');
    const divFrente = document.createElement('div');
    const divVerso = document.createElement('div');
    const divNomeFrente = document.createElement('div');
    const divNomeVerso = document.createElement('div');

    li.classList.add('card', 'listCard');
    divFrente.classList.add('face', 'front');

    divNomeFrente.classList.add('titleCard');
    divNomeFrente.innerText = elementos.name

    listaDados.classList.add('cardData');
    
    anoNascimento.innerText = 'Ano de nascimento: ' + elementos.birth_year;

    const nomePlaneta = await fetch(elementos.homeworld, {
      method: "GET"
    })
    .then(function(resposta){
      return resposta.json();
    })

    planeta.innerText = 'Planeta: ' + nomePlaneta.name;

    divVerso.classList.add('face', 'back');

    imagem.src = '../assets/img/starduck.png';
    imagem.alt = 'starduck';

    listaDados.append(anoNascimento, planeta);
    divFrente.append(divNomeFrente, listaDados);
    divVerso.append(divNomeVerso, imagem);
    li.append(divFrente, divVerso);
    lista.append(li);

  }
  viraCard();
  console.log(listaDeDados);

}

function viraCard(){

  const cards = document.querySelectorAll('.listCard');

  for(let i = 0; i < cards.length; i++){

    const card = cards[i];
    card.addEventListener('click', function(){
      card.classList.toggle('flip');
    })

  }

}

renderizarCard();