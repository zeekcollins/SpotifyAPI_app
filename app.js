window.onload = () => {
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
    const CLIENT_ID = process.env.CLIENT_ID;
    
};