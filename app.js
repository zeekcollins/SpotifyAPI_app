window.onload = () => {
    const xhttp = new XMLHttpRequest;
    const spotAuth = "https://accounts.spotify.com/authorize";
    const spotUri = "https://api.spotify.com/v1/search";

    const getAccessToken = (key) => {
        let pageUrl = window.location.search.substring(1);
        let urlVariables = (pageUrl != undefined && pageUrl.length > 0) ? pageUrl.split('#') : [];
        let param;
        let i;

        let split_str = (window.location.href.length > 0) ? window.location.href.split("#") : [];
        urlVariables = (split_str != undefined && split_str.length > 1 && split_str[1].length > 0) ? split_str[1].split("&") : [];
        
        urlVariables.forEach((item) => {
            param = item.split("=");
            if (param[0] == key) {
                return (param[1] === undefined) ? true : decodeURIComponent(param[1]);
            }
        });
    }

    const accessToken = getAccessToken('access_token');
    const CLIENT_ID = "7bc91a436e9c4482bc405fb3bfa9b9f4";
    const REDIRECT_URI = "https%3A%2F%2Fzeekcollins.github.io%2FSpotifyAPI_app";

    const get = `${spotAuth}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}`;
    if (accessToken == null || accessToken == undefined || accessToken == "") {
        window.location.replace(get);
    }

    const searchBtn = document.querySelector(".search-btn");
    searchBtn.addEventListener("click", () => {
        let rawQuery = document.querySelector(".search-text").value;
        let searchQuery = encodeURI(rawQuery);
        $.ajax({
            url: `spotUri?=${searchQuery}&type=track`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: (response) => {
                console.log(response);
            }
        });
    });

};