$(document).ready(function() {
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
            return (param[1] === undefined) ? true : decodeURIComponent(param[1]);
        }
    }
  }

  const accessToken = getAccessToken('access_token');
  const client_id = "7bc91a436e9c4482bc405fb3bfa9b9f4";
  const redirect_uri = encodeURIComponent("https://zeekcollins.github.io/SpotifyAPI_app/");



  const get = `${spotAuth}?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
  if (accessToken == null || accessToken == undefined || accessToken == "") {
      window.location.replace(get);
  }

  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", () => {
    let rawQuery = document.querySelector(".search-text").value;
    let searchQuery = encodeURI(rawQuery);
    let spotSearch = `${spotUri}?q=${searchQuery}&type=track`;

    $.ajax({
      url: spotSearch,
      headers: {
        'Authorization' : 'Bearer ' + accessToken
      }, 
      success: (response) => {
        let trackCount = response.tracks.items.length;
        let i = 0;
        
        const maxSongs = 9;
        while (i < maxSongs && i < trackCount) {
          let trackId = response.tracks.items[i].id;
          let songSrc = `https://open.spotify.com/embed/track/${trackId}`;
          let entry = `<div class="song"><iframe src=${songSrc} allowtransparency="true" allow="encrypted-media"></iframe></div>`
          let parent = document.querySelector(".song" + (i+1));
          parent.innerHTML = entry;
          i++;
        }
      }
    });
  });

  document.querySelector(".search-text").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
});