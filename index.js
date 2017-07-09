$(document).ready(function() {

    $('form').submit(onSubmit);

});

function getTdResults() {
    console.log('function run');
    var userInput = $('.input').val();

    var tasteTerms = $.ajax({
        type: 'GET',
        url: 'https://tastedive.com/api/similar',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
            'q': userInput,
            'k': '274917-Stuffyou-HUM4RB26',
            'limit': 4,
            'type': "shows, movies",
            'info': 1
        },

    })
    return Promise.resolve(tasteTerms);
};


function onSubmit(event) {
    $('.results').empty();
    event.preventDefault();
    getTdResults();
}

function showTasteDiveData(data) {
    var loop = data.Similar.Results;
    console.log(data.Similar.Results);
    for (var i = 0; i < loop.length; i++) {
        var videoUrl = loop[i].yUrl;
        var youtubeFrame = (`<iframe width="400" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`);
        console.log(loop[i].Name);
        var teaser = (loop[i].wTeaser);

        $('.results').append(`<div class="card">${youtubeFrame}<h4>${loop[i].Name} </h4> <p>${teaser} </p></div>`);

    }
}

function getEtsyResults() {
    console.log('function run');
    var api_key = "oq7bg648maai6ptutm16v8lk";
    //var shared secrect ="j9z07m17dg"; 
    var terms = $('.input').val();
    var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
        terms + "&limit=12&includes=Images:1&api_key=" + api_key;


    var etsyTerms = $.ajax({
        url: etsyURL,
        dataType: 'jsonp',

    });

    return Promise.resolve(etsyTerms);

};

//var promise = Promise.resolve(2);
Promise.all([getEtsyResults(), getTdResults()]).then(values => {
    console.log(values);
}, function error() {
    console.log("error");
});


showTasteDiveData(mockTasteDiveData);

function showEtsyResults(data) {
    console.log(data.results);
    $.each(data.results, function(key, value) {
        console.log(value.title);
        $('.card2').attr("src", value.Images[0].url_170x135);
        var link = ("<a href=" + value.url + "></a>");
        var image = "<img src=" + value.Images[0].url_170x135 + ">";
        $('.etsy_images').append("<div class='card2' > <a href=" + value.url + ">" + image + "</a>" + value.title + "</div>");

    });

}

showEtsyResults(mockEtsyResults);