var app = require('./app').App();

app.country(
    function(country) {
        var index = Math.floor(Math.random() * app.factoids.length);
        var factoid = app.factoids[index];

        factoid(
            function(factoid) {
                var status = country.denonym + ' ' + factoid.connector + ' ' + factoid.word;
                var util = require('util');
                var Twitter = require('twitter');
                var twitter = new Twitter(
                    {
                        consumer_key: 'WkrVgA5PwBfpIN9u1FVXBr7NR',
                        consumer_secret: 'lcVziOB1iW3ljzfZbOtno1vhpHrVKxPDR3dffF9GfQHKYtSnwY',
                        access_token_key: '2683595270-15VN3OCvyyTmcCyfiVivUvRRw63YsIP2vzoT6hF',
                        access_token_secret: 'RnGPBLMccyCaOdpIgLTjizNcxLgKzDjKIwsuP9WdjQGxa'
                    }
                );

                if(factoid.images) {
                    for(var i = 0; i < factoid.images.length; i ++) {
                        var ext = factoid.images[i].substr(factoid.images[i].length - 4);

                        switch(ext) {
                            case '.jpg': case '.png': case '.gif':
                                status += ' ' + factoid.images[i];
                        }
                    }
                }

                twitter.post('/statuses/update.json',
                    {
                        status: status
                    },
                    function(res) {
                        console.log(res);
                    }
                );
            }
        );
    }
);
