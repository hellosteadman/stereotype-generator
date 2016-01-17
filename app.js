(
    function(exp) {
        exp.App = function() {
            var self = {};

            self.flickr = function(term, tag, callback) {
                var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=fc997f78d1b714152ac80a09e4ce3a4a&text=' + escape(term) + '&tags=' + tag + '&sort=relevance&per_page=1&content_type=1&media=photos';

                var c = function(data) {
                    var photo = data.photos.photo.length ? data.photos.photo[0] : null;
                    var url = photo ? ('https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg') : null;

                    callback(url);
                };

                if(typeof($) != 'undefined') {
                    $.getJSON(url + '&jsoncallback=?', c);
                } else {
                    require('https').get(url + '&nojsoncallback=1',
                        function(res) {
                            var body = '';

                            res.on('data',
                                function(chunk) {
                                    body += chunk;
                                }
                            );

                            res.on('end',
                                function() {
                                    c(JSON.parse(body));
                                }
                            );
                        }
                    ).on('error',
                        function(err) {
                            console.log(err);
                        }
                    );
                }
            };

            self.json = function(url, callback) {
                if(typeof($) != 'undefined') {
                    $.ajax(
                        {
                            url: url + '.json',
                            dataType: 'json',
                            success: callback
                        }
                    );
                } else {
                    callback(require('./' + url))
                }
            }

            self.factoids = [
                // Afraid of animals
                function(callback) {
                    self.json('animals',
                        function(data) {
                            var animal = data[Math.floor(Math.random() * data.length)];
                            var plural = animal;

                            switch(animal) {
                                case 'fish': case 'sheep': case 'byson': case 'deer':
                                    break;
                                case 'monkey':
                                    plural += 's';
                                    break;
                                case 'ox':
                                    plural += 'en';
                                    break;
                                default:
                                    switch(animal.substr(animal.length - 1)) {
                                        case 'h': case 's': case 'x':
                                            plural += 'es';
                                            break;
                                        case 'y':
                                            plural = animal.substr(0, animal.length - 1) + 'ies';
                                            break;
                                        default:
                                            plural += 's';
                                    }
                            }

                            callback(
                                {
                                    connector: 'are afraid of',
                                    word: plural.substr(0, 1).toUpperCase() + plural.substr(1),
                                    className: 'animal',
                                    images: ['http://www.randomlists.com/img/animals/' + animal + '.jpg']
                                }
                            );
                        }
                    );
                },

                // Can't pronounce the letter
                function(callback) {
                    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
                    var letter = alphabet[Math.floor(Math.random() * alphabet.length)];

                    callback(
                        {
                            connector: 'can\'t pronounce the letter',
                            word: letter.toUpperCase(),
                            className: 'letter',
                            images: []
                        }
                    );
                },

                // Pet
                function(callback) {
                    var animals = ['Rhino', 'Ape', 'Tiger', 'Giraffe', 'Donkey', 'Bacon', 'Cat', 'Puppies', 'Labrador', 'Horse']
                    var index = Math.floor(Math.random() * 10);

                    callback(
                        {
                            connector: 'secretly love the taste of',
                            word: animals[index],
                            className: 'pet',
                            images: ['http://lorempixel.com/400/200/animals/' + (index + 1) + '/']
                        }
                    );
                },

                // Business
                function(callback) {
                    var connectors = [
                        'conclude all their business transactions by singing',
                        'begin all their business transactions by',
                        'have never actually had a successful',
                        'can never find the',
                        'conclude all their business transactions by singing',
                        'have monthly mandated',
                        'are the leading cause of',
                        'conclude all their business transactions by performing',
                        'secretly love the taste of',
                        'are secretly afraid of their'
                    ];

                    var words = [
                        'I\'m Sexy and I Know it, by LMFAO',
                        'Undressing the intern',
                        'Skype teleconference',
                        '# key',
                        'Closing Time, by Semisonic',
                        'LAN parties',
                        'RSI',
                        'the Macarena',
                        'Pie charts',
                        'Ties'
                    ]

                    var index = Math.floor(Math.random() * connectors.length);

                    callback(
                        {
                            connector: connectors[index],
                            word: words[index],
                            className: 'business',
                            images: ['http://lorempixel.com/400/200/business/' + (index + 1) + '/']
                        }
                    );
                },

                // Food
                function(callback) {
                    var words = [
                        'Stir fries',
                        'Salads',
                        'Tapas',
                        'Salads',
                        'Salads',
                        'Stir fries',
                        'Bread',
                        'Sushi',
                        'Sandwiches',
                        'Bread'
                    ]

                    var index = Math.floor(Math.random() * words.length);

                    callback(
                        {
                            connector: 'make terrible',
                            word: words[index],
                            className: 'business',
                            images: ['http://lorempixel.com/400/200/food/' + (index + 1) + '/']
                        }
                    );
                },

                // Nightlife
                function(callback) {
                    var connectors = [
                        'make terrible',
                        'secretly hate',
                        'can\'t hold their',
                        'are afraid of',
                        'don\'t like',
                        'don\'t like',
                        'drink too much',
                        'love to get drunk at',
                        'drink too much',
                        'marry after their'
                    ];

                    var words = [
                        'Cocktails',
                        'Christmas',
                        'Alcohol',
                        'Bright lights',
                        'Music',
                        'Music',
                        'Alcohol',
                        'Networking events',
                        'Alcohol',
                        'First date'
                    ]

                    var index = Math.floor(Math.random() * connectors.length);

                    callback(
                        {
                            connector: connectors[index],
                            word: words[index],
                            className: 'business',
                            images: ['http://lorempixel.com/400/200/nightlife/' + (index + 1) + '/']
                        }
                    );
                },

                // Nightlife
                function(callback) {
                    var connectors = [
                        'hate the colour',
                        'secretly hate',
                        'secretly hate',
                        'openly hate',
                        'openly hate',
                        'have never actually seen a',
                        'hate the smell of',
                        'don\'t know the difference between',
                        'hate the colour',
                        'are allergic to'
                    ];

                    var words = [
                        'green',
                        'Sunsets',
                        'Beaches',
                        'Autumn',
                        'Sunsets',
                        'Flower',
                        'Flowers',
                        'Weather and whether',
                        'Yellow',
                        'Water'
                    ]

                    var index = Math.floor(Math.random() * connectors.length);

                    callback(
                        {
                            connector: connectors[index],
                            word: words[index],
                            className: 'business',
                            images: ['http://lorempixel.com/400/200/nature/' + (index + 1) + '/']
                        }
                    );
                },

                // Sport
                function(callback) {
                    var connectors = [
                        'rubbish',
                        'wonderful',
                        'brilliant',
                        'terrible',
                        'awful',
                        'amazing',
                        'incredible'
                    ];

                    var words = [
                        'Cricket',
                        'Bodyboarding',
                        'Cycling',
                        'Surfing',
                        'Cycling',
                        'Football',
                        'Swimming',
                        'Kickboxing',
                        'Running',
                        'Baseball'
                    ]

                    var index = Math.floor(Math.random() * words.length);

                    callback(
                        {
                            connector: 'are ' + (
                                connectors[Math.floor(Math.random() * connectors.length)]
                            ) + ' at',
                            word: words[index],
                            className: 'business',
                            images: ['http://lorempixel.com/400/200/sports/' + (index + 1) + '/']
                        }
                    );
                },

                // Senses
                function(callback) {
                    var senses = ['Touch', 'Hearing', 'Smell', 'Taste', 'Humour', 'Fashion', 'Irony']
                    var photos = ['hands', 'hearing aid', 'toilet', 'burger', 'clown putting on his makeup', 'london fashion week', 'shiba inu']
                    var index = Math.floor(Math.random() * senses.length);

                    self.flickr(
                        photos[index], '', function(image) {
                            callback(
                                {
                                    connector: 'have no sense of',
                                    word: senses[index],
                                    className: 'sense',
                                    images: [image]
                                }
                            );
                        }
                    );
                },

                // Spelling
                function(callback) {
                    self.json('words',
                        function(words) {
                            var word = words[Math.floor(Math.random() * words.length)];

                            self.flickr(word, '',
                                function(image) {
                                    callback(
                                        {
                                            connector: 'can\'t spell the word',
                                            word: word,
                                            className: 'spelling',
                                            images: [image]
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            ];

            self.country = function(callback) {
                self.json('countries',
                    function(data) {
                        var country = data[Math.floor(Math.random() * data.length)];

                        country.code = country.code.toLowerCase();
                        callback(country);
                    }
                );
            };

            return self;
        };
    }
)(typeof(module) != 'undefined' ? module.exports : window)
