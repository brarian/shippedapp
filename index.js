$(document).ready(function() {

    $('form').submit(onSubmit);

});

function getTdResults() {
    console.log('function run');
    var userInput = $('.input').val();
    $('.col-sm-2').append('<h4> Search for similar to:   ' + userInput + '</h4>');

    $.ajax({
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
        success: showTasteDiveData
    })

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
        var youtubeFrame = (`<iframe width="390" height="235" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`);
        console.log(loop[i].Name);
        var teaser = (loop[i].wTeaser);

        $('.results').append(`<div class="card">${youtubeFrame}<h4>${loop[i].Name} </h4> <p>${teaser} </p></div>`);

    }
}
showTasteDiveData(mockTasteDiveData);

function showEtsyResults(data) {
    console.log(data.results);
    $.each(data.results, function(key, value) {
        console.log(value.title);
        $('.etsy-images').append(`${ value.title } <br>`);
        $("<img/>").attr("src", value.Images[0].url_170x135).appendTo('.etsy-images').wrap("<a href='" + value.url + "'></a>");
        //$("<img/>").attr("src", value.Images[0].url_75x75).appendTo("#etsy-images").wrap(
        //"<a href='" + value.url + "'></a>");
    });

}

showEtsyResults(mockEtsyResults);