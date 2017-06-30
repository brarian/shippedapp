$(document).ready(function() {
    function getTdResults() {
        console.log('function run');
        var userInput = $('.input').val();
        $.ajax({
            type: 'GET',
            url: 'https://tastedive.com/api/similar',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {
                'q': userInput,
                'k': '274917-Stuffyou-HUM4RB26',
                'limit': 5,
                'type': "music"
            },
            success: function(data) {
                var loop = data.Similar.Results;
                console.log(data.Similar.Results);
                for (var i = 0; i < loop.length; i++) {
                    console.log(loop[i].Name);

                    $('.container').append(' <h4>' + loop[i].Name + ' </h4> ');
                }
            }

        })

    }
    $('form').submit(function(event) {
        event.preventDefault();
        var userInput = $('input').val();
        getTdResults();
    });
});