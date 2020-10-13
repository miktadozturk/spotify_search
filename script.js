var nextUrl;

$('#submit-button').on('click', function() {
    var userInput = $('input').val();
    var artistOrAlbum = $('.album-or-artist').val();
    var baseUrl = 'https://elegant-croissant.glitch.me/spotify';

    $.ajax({
        url: baseUrl,
        data: {
            query: userInput,
            type: artistOrAlbum
        },
        success: function(data) {
            data = data.albums || data.artists;
            nextUrl = data.next && data.next.replace('https://api.spotify.com/v1/search', baseUrl);
            var html = '';
            var img = '';

            if (data.items.length > 0) {
                for (var i = 0; i < data.items.length; i++) {
                    $('#results').html(`Results for "${userInput}"`);
                    if (data.items[i].images.length > 0) {
                        img = data.items[i].images[Math.floor(Math.random() * data.items[i].images.length)].url;
                    } else {
                        img = 'noimage.png';
                    }
                    html += '<a href="' + data.items[i].external_urls.spotify + '"><div class="result">  <img src=' + img + '> <p>' + data.items[i].name + '</p></div></a>';
                    if (data.total > 20) {
                        $('#more').show();
                    }
                }
                $('#results-container').html(html);
            } else {
                $('#results').html(`No results for "${userInput}" found...`);
            }

            $('#more').on('click', function() {
                $.ajax({
                    url: nextUrl,
                    success: function (data) {
                        data = data.albums || data.artists;
                        nextUrl = data.next && data.next.replace('https://api.spotify.com/v1/search', baseUrl);

                        if (data.items.length > 0) {
                            for (var i = 0; i < data.items.length; i++) {
                                $('#results').html(`Results for "${userInput}"`);
                                if (data.items[i].images.length > 0) {
                                    img = data.items[i].images[Math.floor(Math.random() * data.items[i].images.length)].url;
                                } else {
                                    img = 'noimage.png';
                                }
                                html += '<a href="' + data.items[i].external_urls.spotify + '"><div class="result">  <img src=' + img + '> <p>' + data.items[i].name + '</p></div></a>';
                                if (data.total > 20) {
                                    $('#more').show();
                                }
                            }
                            $('#results-container').append(html);
                        } else {
                            $('#results').html(`No results for "${userInput}" found...`);
                        }
                    }
                });
            });
        }
    });
});