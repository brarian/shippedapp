$(document).ready(function() {
    function getTdResults() {
        console.log('function run');
        $.ajax({
            type: 'GET',
            url: 'https://tastedive.com/api/similar',
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {
                'q': user_input,
                'k': '274917-Stuffyou-HUM4RB26',
                'limit': 20,
                'type': "music"
            },
            success: function(data) {
                var loop = data.Similar.Results;
                console.log(data.Similar.Results);
                for (var i = 0; i < loop.length; i++) {
                    console.log(loop[i].Name);
                }
            }

        })
    }
    getTdResults();
});