$(document).ready(function() {
    $('.row2').hide();
    $('form').submit(onSubmit);


});

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
            'type': "shows, movies",
            'info': 1
        },

    })
    return Promise.resolve(tasteTerms);
};


function onSubmit(event) {
    $('.results').empty();
    $('.etsy_images').empty();
    $('.tagline').remove();
    $('.row2').fadeIn().delay(15000);
    event.preventDefault();
    var userInput = $('.input').val();
    var promiseRequests = [getTdResults(userInput), getEtsyResults(userInput)];
    Promise.all(promiseRequests).then(values => {
        showEtsyResults(values[1]);
        showTasteDiveData(values[0]);
    });

}


function showTasteDiveData(data) {
    var loop = data.Similar.Results;
    console.log(data.Similar.Results);
    for (var i = 0; i < loop.length; i++) {
        var videoUrl = loop[i].yUrl;
        var youtubeFrame = (`<iframe width="400" height="350" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`);
        console.log(loop[i].Name);
        var teaser = (loop[i].wTeaser);

        $('.results').append(`<div class="card">${youtubeFrame}<h4>${loop[i].Name}</div>`);

    }
}

function getEtsyResults(terms) {
    var api_key = "oq7bg648maai6ptutm16v8lk";
    //var shared secrect ="j9z07m17dg"; 
    var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=tv%20" +
        terms + "&limit=12&includes=Images:1&api_key=" + api_key;


    var etsyTerms = $.ajax({
        url: etsyURL,
        dataType: 'jsonp',

    });

    return Promise.resolve(etsyTerms);

};



function showEtsyResults(data) {
    console.log(data.results);
    $.each(data.results, function(key, value) {
        console.log(value.title);
        $('.card2').attr("src", value.Images[0].url_170x135);
        var link = ("<a href=" + value.url + "></a>");
        var image = "<img src=" + value.Images[0].url_170x135 + ">";
        $('.etsy_images').append("<div class='card2'> <a href=" + value.url + ">" + image + "</a>" + value.title + "</div>");

    });

}