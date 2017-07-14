/* global $ */
$(document).ready(function() {
    //Hides 'Watch Next' title
    $('.row2').hide();
    $('form').submit(onSubmit);
})

//function which calls TasteDive data 
function getTdResults(userInput) {
    var tasteTerms = $.ajax({
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
    return Promise.resolve(tasteTerms) //first promise 
};

function onSubmit(event) {
    $('.results').empty();
    $('.etsy_images').empty();
    $('.tagline').remove();
    $('.row2').fadeIn().delay(25000); //supposed to delay visibility of 'Watch Next' does not work 
    event.preventDefault();
    //search term for both API calls 
    var userInput = $('.input').val();
    //returns both promises at the same time 
    var promiseRequests = [getTdResults(userInput), getEtsyResults(userInput)]
    Promise.all(promiseRequests).then(values => {
        showEtsyResults(values[1])
        showTasteDiveData(values[0])
    })
}

function showTasteDiveData(data) {
    var loop = data.Similar.Results
    for (var i = 0; i < loop.length; i++) {
        var videoUrl = loop[i].yUrl;
        var youtubeFrame = (`<iframe width="400" height="350" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`);
        //adds video and title onto card
        $('.results').append(`<div class="card">${youtubeFrame}<h4>${loop[i].Name}</div>`)
    }
}

function getEtsyResults(terms) {
    var apiKey = 'oq7bg648maai6ptutm16v8lk';
    var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?keywords=tv%20' +
        terms + '&limit=12&includes=Images:1&api_key=' + apiKey;

    var etsyTerms = $.ajax({
        url: etsyURL,
        dataType: 'jsonp'
    })

    return Promise.resolve(etsyTerms) //second promise 
};

function showEtsyResults(data) {
    $.each(data.results, function(key, value) {
        console.log(value.title);
        //appends title and etsy product image to the card 
        $('.card2').attr('src', value.Images[0].url_170x135);
        var image = '<img src=' + value.Images[0].url_170x135 + '>';
        $('.etsy_images').append("<div class='card2'> <a href=" + value.url + '>' + image + '</a>' + value.title + '</div>');
    })
}