import * as constants from "./constants.js"

const serverStats = {
    100: { icon: "ti-wifi", text: "Connecting to server...", color: "#0080ff", animate: true },
    200: { icon: "ti-wifi", text: "Server is now online", color: "#2ecc71", animate: false },
    400: { icon: "ti-wifi-off", text: "Could not connect to server", color: "#ff0000", animate: false }
},
    $status = $("#server-status"),
    statusTip = tippy($status[0], { content: "" }); // one instance, content updated per status
var pingTimeOut;

function setServerStatus(stat) {
    const status = serverStats[stat];

    $status
        .attr("class", `ti ${status.icon}`)    // swap wifi / wifi-off
        .toggleClass("pulse", status.animate)  // animation only while connecting
        .css("color", status.color);

    statusTip.setContent(status.text);
}

export function establishConnection() {
    setServerStatus(100);
    callServer()
        .then(() => setServerStatus(200))
        .catch(() => setServerStatus(400));
}
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