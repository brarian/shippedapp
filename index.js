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
        var youtubeFrame = (`<iframe width="400" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`);
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
        $('.card2').attr("src", value.Images[0].url_170x135);
        var link = ("<a href=" + value.url + "></a>");
        var image = "<img src=" + value.Images[0].url_170x135 + ">";
        $('.etsy_images').append("<div class='card2' > <a href=" + value.url + ">" + image + "</a>" + value.title + "</div>");

        //$("<img/>").attr(.attr("src", value.Images[0].url_170x135).appendTo(`.etsy_images `).wrap("<a href='" + value.url + "'></a>");
        //$('.img').attr(value.Images[0].url_170x135).appendTo(".etsy_images").wrap("<a href='" + value.url + "'> </a>");
        //$('.etsy_images').append(` < span class = "image_tags" > $ { title } < /span>`);
        /*$('.img').hover(
            function() {
                console.log("hover works", value.title);
                $(this).append($(`<span>${value.title} </span>`));
            },
            function() {
                $(this).find("span:last").remove();
            }
        );*/

    });

}

showEtsyResults(mockEtsyResults);