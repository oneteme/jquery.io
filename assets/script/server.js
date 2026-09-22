import * as constants from "./constants.js"

var pingTimeOut;

function pingServer() {
    pingTimeOut = setTimeout(() => {
        callServer();
    }, 420000);
}
export function callServer(overrideUrl = null) {
    clearTimeout(pingTimeOut);
    const url = overrideUrl ?? constants.demoServer + "/db/h2/customers?";

    return fetch(url).then(response => {
        pingServer();
        if (!response.ok) {
            const err = new Error(`HTTP ${response.status}`);
            err.status = response.status;
            throw err; // turns 4xx/5xx into a rejection
        }
        return response;
    });
}