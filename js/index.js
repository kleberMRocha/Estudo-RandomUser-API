let $ =  document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let users = 0;
let url = 'https://randomuser.me/api/?results=0';
let btnUsers       = $('[data-btn="gerar"]');
let selectQtd      = $('#qtd');
let card           = $('[data-card="1"]');
let cardsContainer = $('.cardsContainer');
let getData = (url) => {return fetch(url)};

selectQtd.addEventListener("change",event =>{
    users = selectQtd.selectedIndex;
    url =`https://randomuser.me/api/?results=${users}`;
}); 

btnUsers.addEventListener("click",event =>{
    getData(url)
    .then(data=>data.json())
    .then(cards => clone(users,card,cardsContainer,cards.results))
    .catch(erro => console.log(erro));
});


//generates cards with Api data
function clone(cloneN,original,target,dados){
    for(i=0;i< cloneN;i++){
        let clone = original.cloneNode(true);
        clone.classList.remove('originalCard');
        clone.children[0].src = `${dados[i].picture.large}`;
        clone.children[1].innerHTML = `<h4>${dados[i].name.first} ${dados[i].name.last}</h4>`;
        clone.children[2].children[0].innerHTML = `<p>Genero: ${dados[i].gender}</p>`;
        clone.children[2].children[1].innerHTML = `${dados[i].location.city} - ${dados[i].location.country}`
        clone.children[2].children[2].innerHTML = `${dados[i].email}`
        clone.children[2].children[3].innerHTML = `Idade: ${dados[i].dob.age}`
        console.log(clone);
        target.appendChild(clone);
        console.log(dados);
    }
}
   