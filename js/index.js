let $ =  document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
let users = 1;
let url = 'https://randomuser.me/api/?results=0';
let btnUsers       = $('[data-btn="gerar"]');
let btnReset       = $('[data-btn="reset"]');
let selectQtd      = $('#qtd');
let card           = $('[data-card="1"]');
let cardsContainer = $('.cardsContainer');
let form           = $('[data-form="1"]');
let fields         = $$('[data-filter]');
let alertField     = $('.alert');
let getData = (url) => {return fetch(url)};


selectQtd.addEventListener("change",event =>{
    users = selectQtd.selectedIndex * 100;
    url =`https://randomuser.me/api/?results=${users}`;
}); 

btnUsers.addEventListener("click",event =>{
    event.preventDefault()
    if(fields[0].value == "" || fields[1].value == ""){
        setMessages("Selecione: Idade Min e Max e quantidade de usuários",alertField)
        return;
    }
    if(fields[0].value >= 76 || fields[1].value >= 76){
        setMessages("Idade Maxima 75",alertField)
        return;
    }
    if(fields[0].value <= 21 || fields[1].value <= 21){
        setMessages("Idade minima 22",alertField)
        return;
    }  

    insertData();     
});

btnReset.addEventListener("click",event =>{ 
    [...cardsContainer.children].forEach(card => card.classList.add('cardFadeOut'));
    setTimeout(()=>{form.reset(); cardsContainer.innerHTML = "";},502);
});

//filter elements
function filterUser(arr,fields){

    let genderM = 0;
    let genderF = 0;
    if(fields[2].checked){genderM = "male"}
    if(fields[3].checked){genderF = "female"}
    if(!fields[2].checked && !fields[3].checked){genderM = "male",genderF = "female"}

    let AgeMin = fields[0].value;
    let AgeMax = fields[1].value;
    let filtro = [];
    arr.forEach(element => {
        if((element.gender == genderM || element.gender == genderF)
        &&(element.dob.age >= AgeMin && element.dob.age <= AgeMax))filtro.push(element);      
    });
    return filtro;

}
//generates cards with Api data
function clone(cloneN,original,target,dados){
    
    for(i=0;i< cloneN;i++){
        if(target.children.length == cloneN/100) return;
        let clone = original.cloneNode(true);
    
            clone.classList.remove('originalCard');
            clone.classList.add('cardFadeIn');
       
        clone.children[0].src = `${dados[i].picture.large}`;
        clone.children[1].innerHTML = `<h4>${dados[i].name.first} ${dados[i].name.last}</h4>`;
        clone.children[2].children[0].innerHTML = `<p>Genero: ${dados[i].gender}</p>`;
        clone.children[2].children[1].innerHTML = `${dados[i].location.city} - ${dados[i].location.country}`;
        clone.children[2].children[2].innerHTML = `${dados[i].email}`;
        clone.children[2].children[3].innerHTML = `Idade: ${dados[i].dob.age}`;
        target.appendChild(clone);
 
    }
}
//resolve fetch promise
function insertData(){
    getData(url)
    .then(data=>data.json())
    .then(cards => {
        let arrUser = cards.results;
        clone(users,card,cardsContainer,filterUser(arrUser,fields));    
    })
    .catch(erro =>  insertData());
}
//show alert Messages
function setMessages(value,target){
    let alert = `<div class="alert alert-primary" role="alert">
                 ${value}
                 </div>`;
    target.innerHTML = alert;

    setTimeout(()=>{
    target.innerHTML = ""; 
    },4000)
   
}

