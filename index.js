/* global $ */
$(document).ready(function() {
    $('.row2').hide();
    $('form').submit(onSubmit);
})

//function which calls TasteDive data 
function getTdResults(userInput) {
    return $.ajax({
        type: 'GET',
        url: 'https://tastedive.com/api/similar',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
            'q': userInput,
            'k': '274917-Stuffyou-HUM4RB26',
            'limit': 6,
            'type': 'shows, movies',
            'info': 1
        }

    })
};
console.log(getTdResults("veep"));

function onSubmit(event) {
    console.log(event);
    var userInput = $('.input').val();

    //search term for both API calls 

    console.log(userInput);
    console.log("hello");
    //returns both promises at the same time 
    $('.loading_container').show();
    $('.row2').show();
    $('.etsy_images').show();
    $('.tagline').remove();
    event.preventDefault();
    $.when(getTdResults(userInput), getEtsyResults(userInput)).done((tdResult, etsyResult) => {
        $('.loading_container').hide();
        showEtsyResults(etsyResult[0]);
        showTasteDiveData(tdResult[0]);
        $('.row2').fadeIn().delay(25000);

    })
}

function showTasteDiveData(data) {
    var loop = data.Similar.Results
        //loops through the Taste Dive data and returns video and title 
    for (var i = 0; i < loop.length; i++) {
        var videoUrl = loop[i].yUrl;
        var youtubeFrame = (`<iframe width="475" height="350" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`);
        //adds video and title onto card
        $('.results').append(`<div class="card">${youtubeFrame}<div class="ybtext">${loop[i].Name}</div></div>`)
    }
}

function getEtsyResults(terms) {
    var apiKey = 'oq7bg648maai6ptutm16v8lk';
    var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?keywords=tv%20' +
        terms + '&limit=12&includes=Images:1&api_key=' + apiKey;

    return $.ajax({
        url: etsyURL,
        dataType: 'jsonp'
    })

};


function showEtsyResults(data) {
    //$.each -> iterates though the Etsy data
    $.each(data.results, function(key, value) {
        console.log(value.title);
        //appends title and etsy product image to the card 
        $('.card2').attr('src', value.Images[0].url_170x135);
        var image = '<img src=' + value.Images[0].url_170x135 + '>';
        $('.etsy_images').append("<div class='card2'> <a href=" + value.url + '>' + image + '</a><div class=text>' + value.title + '</div></div>');
    })
}