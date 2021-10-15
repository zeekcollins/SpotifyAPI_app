window.onload = () => {
  const spotAuth = "https://accounts.spotify.com/authorize";
  const spotUri = "https://api.spotify.com/v1/search";

  const getAccessToken = (key) => {
    let sPageURL = window.location.search.substring(1);
    let urlVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [];
    let param;

    let split_str = (window.location.href.length > 0) ? window.location.href.split("#") : [];
    urlVariables = (split_str != undefined && split_str.length > 1 && split_str[1].length > 0) ? split_str[1].split("&") : [];

    for (let i = 0; i < urlVariables.length; i++) {
        param = urlVariables[i].split("=");
        if (param[0] === key) {
            return param[1];
            // return (param[1] === undefined) ? true : decodeURIComponent(param[1]);
        }
    }
  }

  const accessToken = getAccessToken('access_token');
  const client_id = "7bc91a436e9c4482bc405fb3bfa9b9f4";
  
  // let now = 340;
  const redirect_uri = "https%3A%2F%2Fspotifyapi-app.herokuapp.com";
  // const redirect_uri = "https%3A%2F%2Fzeekcollins.github.io%2FSpotifyAPI_app";
  // const redirect_uri = "http%3A%2F%2Flocalhost%3A5500%2Findex.html";

  const get = `${spotAuth}?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
  if (accessToken == null || accessToken == undefined || accessToken == "") {
      window.location.replace(get);
  }

  $(".search-btn").click(() => {
    let rawQuery = $(".search-text").val();
    let searchQuery = encodeURI(rawQuery);
    
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
      type: 'GET',
      headers: {
          'Authorization' : 'Bearer ' + accessToken
      },
      success: function(data) {
        // Load our songs from Spotify into our page
        let num_of_tracks = data.tracks.items.length;
        let count = 0;
        // Max number of songs is 12
        const max_songs = 12;
        while(count < max_songs && count < num_of_tracks){
          // Extract the id of the FIRST song from the data object
          let id = data.tracks.items[count].id;
          // Constructing two different iframes to embed the song
          let src_str = `https://open.spotify.com/embed/track/${id}`;
          let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
          let parent_div = $('.song'+ (count+1));
          parent_div.html(iframe);
          count++;
        }
      }
    });
  });
};