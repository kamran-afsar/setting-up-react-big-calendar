export async function postData<T>(url: string, parameters: {} = {}, headers?: {}, isBearer: boolean = true): Promise<T> {
url = `http://localhost:7071/api/CalandersFunction?code=vXDmem8YfMRGNw7PoRTJ3u7qoP4zHBI1nfFr0wQUsEqaI9Zl9HwVCQ==`;
url = `https://inlogicapipod.azurewebsites.net/api/CalandersFunction?code=D/YXz5YNBobB5auLshcaHgMy1Lsvpv8gjOcTQGWePaDr47ah1jt6Xg==`;
    let bearer = isBearer ? "Bearer " : "";
    const actualUrl = url;
    let isOkay = false;
    const jsonToSend = JSON.stringify(parameters);
    const toSendHeaders = new Headers();
    toSendHeaders.append("Content-Type", "application/json");
    toSendHeaders.append("Authorization", bearer + token);
    toSendHeaders.append("Access-Control-Allow-Origin", "true");
    return fetch(actualUrl, {
        mode: "cors",
        method: "POST",
        //credentials: "include",
        body: jsonToSend,
        headers: toSendHeaders,
    })
        .then((response) => {
            //check here if the server returns 401 9unauthorized, ask to login again.
            if (response.status === 401) {
               
                return "unauthorized";
                //window.location.assign(currentUrl);
            }
            else if (response.status === 404) {
                return "NotFound";
            }
            else {
                isOkay = response.ok;
                return response.text();
            }
        })
        .then((text) => {
            if (text === "unauthorized") {
                throw new Error("unauthorized");
            }
            else if (text === "NotFound") {
                throw new Error("NotFound");
            }
            let jsonString = text;
            // tslint:disable-next-line:quotemark
            if (jsonString.indexOf('{"d":null}') > 0) {
                // tslint:disable-next-line:quotemark
                jsonString = text.substring(0, text.indexOf('{"d":null}'));
            }
            if (jsonString && isOkay) {
                return JSON.parse(jsonString);
            }
            if(jsonString && !isOkay){
                    const err = JSON.parse(jsonString);
                    throw err.error.message;
            }
        })
        .then((data: T) => data);
};

export const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiJhcGk6Ly9jMTczMjQyYS1kODE5LTRhNDYtYmU5Ni0wZDU2MWMwNDk4ZGQiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NGJlOWNhNS1mYzZjLTQ0OGYtODUyOS1kODc1OGVmZjQwMWEvIiwiaWF0IjoxNjEwNDI5NjI4LCJuYmYiOjE2MTA0Mjk2MjgsImV4cCI6MTYxMDUxNjMyNywiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhTQUFBQVpMM0pUT3BBelY5MnFsUTZHQ3JURk1MNGo1Tnh0bmdUbExzWitPV3k2Z0U9IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImZlNTgxZjVjLWUxOTctNDExMC1hMGNiLWZlM2Y2N2Y4ZTliOCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTWFqaWQiLCJnaXZlbl9uYW1lIjoiUmFtZWV6IiwiaXBhZGRyIjoiNTguNjUuMTY0LjE1MCIsIm5hbWUiOiJSYW1lZXogTWFqaWQiLCJvaWQiOiJlMjIwOWM4NC03MjIzLTQ5ZDctYjdkMi04NGQxNTkxNDYzYWQiLCJyaCI6IjAuQVRrQXBaeS1oR3o4ajBTRktkaDFqdjlBR2x3ZldQNlg0UkJCb012LVAyZjQ2Ymc1QURjLiIsInNjcCI6InVzZXIuYXV0aGVudGljYXRpb24iLCJzdWIiOiItVVhPd0E1aHJlcXZINnBpOE5WNFNBdUxVdllqNzFrcFJVYWlfWEpJQUdzIiwidGlkIjoiODRiZTljYTUtZmM2Yy00NDhmLTg1MjktZDg3NThlZmY0MDFhIiwidW5pcXVlX25hbWUiOiJydW1AaW5sb2dpY2Rldi5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJydW1AaW5sb2dpY2Rldi5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJmckFBVGg4MDEwMm9FMXVsOHA4ZkFBIiwidmVyIjoiMS4wIn0.G7bq5W6kccZjXjYBmpdEGcrMselMUDfS0akrzgdElrA0B31jo69Ec_WKRucpM2JKk5AlxiaPrN-8yI8L38-9XFJ1-DQg0O2-uTGK-DEDtubV8YGFRBjSUGCLtkAU7PcuFjQe2ni2a0ltiyTvoOgT6xPfuxYkJvrqrv_xlkXMEZr7mddRtW685JJscoIJVZ8wGX1QNy7maHnXPd-0SonpUdaPIMbm-jnelyd0jx3cxd5EgCXQXQcKt2MqmtsxC5GuKPMgRJ_ZFA3c9ZJcZOTje8uYy9dkfR0hgC5rrXU49gTy_7dO6mzeV1vbFuTAJ0wDv44rQxON-Nry0smhcyFlKw`;