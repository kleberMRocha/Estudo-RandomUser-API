let galery      = $('.galeria');
let alertServer = $('.alertServer');
let btnGbChange = $('[data-btnGbChange="1"]');
let UrlPhotos   = 'https://randomuser.me/api/?results=99';


getPhotos();

btnGbChange.addEventListener("click",event =>{
    galery.innerHTML = "";
    getPhotos();
});

function getPhotos(){
    getData(UrlPhotos)
    .then(data=>data.json())
    .then(photos =>{
        let photosUrl = photos.results;
        for(i =0; i < photos.results.length; i++){
            let photos = $('.img-original');
            let clone = photos.cloneNode(true);
            clone.style ="";
            clone.src = photosUrl[i].picture.large;
            galery.appendChild(clone);
        }           
    })
    .catch(erro => setMessages("Erro 503",alertServer));
}

