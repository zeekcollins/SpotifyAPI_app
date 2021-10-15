window.onload = () => {
    const spotAuth = "https://accounts.spotify.com/authorize";
    const spotUri = "https://api.spotify.com/v1/search";

    const getUrlParameter = (sParam) => {
        let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
            sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
            sParameterName,
            i;
        let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
        sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    const accessToken = getUrlParameter('access_token');
    const client_id = "7bc91a436e9c4482bc405fb3bfa9b9f4";
    const redirect_uri = "https%3A%2F%2Fzeekcollins.github.io%2FSpotifyAPI_app";

    const get = `${spotAuth}?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
    if (accessToken == null || accessToken == undefined || accessToken == "") {
        window.location.replace(get);
    }

    const searchBtn = document.querySelector(".search-btn");
    searchBtn.addEventListener("click", () => {
        let rawQuery = document.querySelector(".search-text").value;
        let searchQuery = encodeURI(rawQuery);
        $.ajax({
            url: `${spotUri}?=${searchQuery}&type=track`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                console.log(response);
            }
        });
    });

};