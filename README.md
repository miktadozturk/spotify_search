# Spotify Search

Spotify used to have a [search API](https://developer.spotify.com/documentation/web-api/reference/search/search/) that didn't require authentication and supported CORS. It now requires authentication and pretty much can't be used via ajax directly. 

However, instead of ```https://api.spotify.com/v1/search```, you can use the following url, passing to it all of the query string parameters that you would have passed to Spotify's endpoint: ```https://elegant-croissant.glitch.me/spotify```. This url will make a request to the Spotify search API with the parameters you specify and send back the exact JSON that Spotify responds with. 

So let's use this url to conduct searches for artists and albums and then display the results in a pleasing manner.
