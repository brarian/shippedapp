$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();
        getEtsyResults();
    });
});

function getEtsyResults() {
    console.log('function run');
    api_key = "oq7bg648maai6ptutm16v8lk";
    //var shared secrect ="j9z07m17dg"; 
    terms = $('.etsySearch').val();
    etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
        terms + "&limit=12&includes=Images:1&api_key=" + api_key;


    $.ajax({
        url: etsyURL,
        dataType: 'jsonp',
        success: showEtsyResults
    })

};

function showEtsyResults(data) {
    console.log(data.results);
    $.each(data.results, function(key, value) {
        console.log(value.title);
        $('.etsy-images').append(`${ value.title } <br>`);
        $("<img/>").attr("src", value.Images[0].url_170x135).appendTo('.etsy-images').wrap("<a href='" + value.url + "'></a>");
    });

}

showEtsyResults(mockEtsyResults);

function showEtsyResults(data) {
    console.log(data.results);
    $.each(data.results, function(key, value) {
        console.log(value.title);
        $('.etsy-images').append(`${ value.title } <br>`);
        $("<img/>").attr("src", value.Images[0].url_170x135).appendTo('.etsy-images').wrap("<a href='" + value.url + "'></a>");
    });

}

showEtsyResults(mockEtsyResults);