// pseudo code
// we want to create an app
const artApp = {};

// save your api key in a variable
artApp.key = '0MwUcWm8';

// save end point url in a variable
artApp.endPoint = 'https://www.rijksmuseum.nl/api/en/collection';

artApp.updateTitle = function (name) {
    $("#page-title").find("span").text(name);
};

// get the user selection from the drop down menu
artApp.getSelection = function(){
    $('#animal').on('change',function(){
        const animalName = $(this).find(':selected').text();
        artApp.updateTitle(animalName);
        artApp.getArt(animalName);
    })
};
// get the art work/data form the RIJKMUSEUM api
artApp.getArt = (query)=>{
    $.ajax({
        url:artApp.endPoint,
        method:'GET',
        dataType:'json',
        data:{
            key:artApp.key,
            format:'json',
            // we want to search for artworks related to monkeys
            q:query
        }
    }).then(function(result){
        const artArray = result.artObjects;
        artApp.displayArt(artArray);
    });
}
    
// display the result artworks onto the page
artApp.displayArt = (artArray)=>{
    $('#artwork').empty();
    artArray.forEach(art=>{
        // title
        const title = art.title;
        // author
        const author = art.principalOrFirstMaker;
        // image
        if(art.webImage === null){return;}
        const image = art.webImage.url;
        // const { title, author, imageUrl } = art.title, art.principalOrFirstMaker,art.webImage.url;
        const artEl = `<div class="piece">
            <h2>${title}</h2>
            <p>${author}</p>
            <img src="${image}" alt="${title}">
        </div>`;
        $('#artwork').append(artEl);
    });
}
// do something when page loads
// initialize the app
artApp.init = () => {
    artApp.getArt('Monkeys');
    artApp.getSelection();
}

$(function(){
    artApp.init();
});