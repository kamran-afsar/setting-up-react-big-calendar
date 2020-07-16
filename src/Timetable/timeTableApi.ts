export async function postData<T>(url: string, parameters: {} = {}, headers?: {}, isBearer: boolean = true): Promise<T> {
url = `http://localhost:7071/api/CalandersFunction?code=vXDmem8YfMRGNw7PoRTJ3u7qoP4zHBI1nfFr0wQUsEqaI9Zl9HwVCQ==`;
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

export const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiJhcGk6Ly9jMTczMjQyYS1kODE5LTRhNDYtYmU5Ni0wZDU2MWMwNDk4ZGQiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NGJlOWNhNS1mYzZjLTQ0OGYtODUyOS1kODc1OGVmZjQwMWEvIiwiaWF0IjoxNTk0ODc5MDg3LCJuYmYiOjE1OTQ4NzkwODcsImV4cCI6MTU5NDk2NTc4NiwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhRQUFBQW1lcmhpZjI4QmhSMzhwYWowcFpDTVp4ZmIrUDlMSmY0MlRhM1hzS2UvSVE9IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImZlNTgxZjVjLWUxOTctNDExMC1hMGNiLWZlM2Y2N2Y4ZTliOCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiSG93c29uIiwiZ2l2ZW5fbmFtZSI6Ikp1c3RpbiIsImlwYWRkciI6IjM5LjMzLjIwMC4xNzIiLCJuYW1lIjoiSnVzdGluIEhvd3NvbiIsIm9pZCI6IjE1YzQ2Mzg2LWZjNDQtNGM4MC05YmU3LTkzZGU5YjQ3MzFlNSIsInB3ZF9leHAiOiI4NzI1NzQiLCJwd2RfdXJsIjoiaHR0cHM6Ly9wb3J0YWwubWljcm9zb2Z0b25saW5lLmNvbS9DaGFuZ2VQYXNzd29yZC5hc3B4Iiwic2NwIjoidXNlci5hdXRoZW50aWNhdGlvbiIsInN1YiI6IlQyTWF3VzQ2d3Fadmk3cTBpMzIzdjZoMVNEa21yQ2doaWlpbWpmOW5nY2ciLCJ0aWQiOiI4NGJlOWNhNS1mYzZjLTQ0OGYtODUyOS1kODc1OGVmZjQwMWEiLCJ1bmlxdWVfbmFtZSI6Imp1aEBpbmxvZ2ljZGV2Lm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6Imp1aEBpbmxvZ2ljZGV2Lm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6InRickh0VVlYVzBlVC1jaG5hNzRFQVEiLCJ2ZXIiOiIxLjAifQ.Cko15lttXsldzZLoIz6RZ9iRbz6bzH4GEp0bF0JxA-42X2epFc9pRxtv4FiLdBam7eNCS3MgZwJvLvcTf7n_eYi7m_J7_6uQRtyBaeND5N5gAipVJOF4-Ve3jKPaLDz60YXNlwvWhhcvb-sqtWg-GzHaE2oupClCbkLxdY4Tvxen44jNjmhb5VynqnBl-ByvSu9xKJhMZ8tmEtSSR9AHUfMUdIREr95fEbpitvbX6T_pRPGtvfG4qug4wkDsvaXUCkY4h6gvyNLUaE2jErwKmByBGsbSyxXmsXzE6m94tsGBjlbsmPNcQUPvNXRu6k2QIofCxusMqYtlIRnqAvSvzA`;