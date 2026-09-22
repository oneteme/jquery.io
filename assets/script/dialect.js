import { loadJson } from "./utils.js";
import * as constants from "./constants.js";
import { showError } from "./status.js";

export function loadDialects() {
    $("#db-select-popup").empty()
    loadJson("./dialect.json").then(dialects => {
        $("#db-select-popup").append(
            $("<div>", { class: "db-select-popup-arrow" })
        )
        dialects = dialects.filter(dialect => !dialect.hide);
        console.log("dialect : ", dialects)

        const connectionChecks = []

        $.each(dialects, (key, value) => {
            let div;
            switch (value.type) {
                case "div":
                    const type = value.metadata.type,
                        content = value.metadata.content,
                        attributes = value.metadata.attr;
                    div = $("<" + type + ">", attributes).html(content ?? "")
                    break;
                case "icon":
                    div = $("<i>", { class: value.metadata })
                    break;

                case "img":
                    div = $("<img>", { src: value.metadata, class: "img-class" })
                    break;

                default:
                    break;
            }

            const $label = $("<span>").html(value.label)
            const $option = $("<div>", { class: "db-option", "data-value": value.value, "data-label": value.label })
                .append(div, $label)

            $("#db-select-popup").append($option)

            const check = fetch(constants.demoServer + "/db/" + value.value + "/customers")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Server responded with an error")
                    }
                    $("#db-select-popup").prepend($option.attr("connected", true))
                    return { value: value.value, connected: true }
                })
                .catch(() => {
                    $("#db-select-popup").append($option)
                    $label.css("color", "red")
                    tippy($option[0], {
                        content: `Could not connect to ${value.label} server`,
                        placement: 'left',
                    })
                    return { value: value.value, connected: false }
                })

            connectionChecks.push(check)
        })

        Promise.all(connectionChecks).then(results => {
            const savedDialect = localStorage.getItem("jarvis.demo.dialect")
            const savedResult = results.find(r => r.value === savedDialect)

            if (savedResult && savedResult.connected) {
                setOptionActive($(".db-option[data-value=" + savedDialect + "]"))
            } else {
                const firstConnected = results.find(r => r.connected)
                if (firstConnected) {
                    setOptionActive($(".db-option[data-value=" + firstConnected.value + "]"))
                }
            }
        })
    })
}

$(document).on(
    "click",
    "#db-select-wrapper",
    (e) => {
        e.stopPropagation();
        $('#db-select-popup').toggleClass('show');
        $(e.currentTarget).toggleClass('active');
    });

$(document).on('click', '.db-option', (e) => {
    const option = $(e.currentTarget);
    if (option.attr("connected")) {
        setOptionActive(option);
        $("#jq-execute").click();
    } else {
        showError(option.attr("data-label") + " server not available")
    }
});

function setOptionActive(option) {
    const value = option.data('value'),
        label = option.data('label'),
        icon = option.children().first().clone();

    $('.db-option').removeClass('active');
    option.addClass('active');
    $('#db-select-label').html(label);
    $('#db-select-icon-slot').html(icon);
    localStorage.setItem("jarvis.demo.dialect", value);
}
