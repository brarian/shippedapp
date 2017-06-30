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
                'type': "music",
                'info': 1

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

        //function calling event data --- errr not so good yet 
        var cityInput = $('.city').val();
        $.ajax({
            type: 'GET',
            url: 'rest.bandsintown.com/artists/' + { userInput } + '/events',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {
                app_id: 'Capstone',
                name: '' + loop[i].Name + '',
                city: cityInput,
                date: 2017 - 10 - 31
            },
            success: function(eventData) {
                console.log(eventData);
            }
        });

    }
    $('form').submit(function(event) {
        $('.city').submit(function(event) {
            event.preventDefault();
            getTdResults();
            getEventResults();
        });
    });
});