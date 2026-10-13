import { loadJson } from "./utils.js";

export function setupIntroList() {
    $("#jq2-select").empty();
    loadJson("./use-case.json").then(json => {
        console.log("json : ", json)
        json.forEach(option => {
            console.log("adding option : ", option)
            $("#jq2-select").append(
                $("<option>").attr({ "value": option.value, "data-sql": option.sql }).html(option.label)
            )
        });
        $("#jq2-select").val(json[0].value).trigger("change");
    });
}
$(".jq2-needs li").on("click", (e) => {
    const selectOption = $(e.currentTarget);
    $("#jq2-select").val(selectOption.attr("data-example")).trigger("change");
})
$("#jq2-select").on("change", (e) => {
    const selectedOption = $(e.currentTarget).find(":selected"),
        sql = selectedOption.data("sql"),
        formattedSQL = sqlFormatter.format(sql, {
            language: "postgresql"
        }),
        sqlContainer = document.querySelector(".jq2-code.jq2-without code"),
        JQueryContainer = document.querySelector(".jq2-code.jq2-with code");
    sqlContainer.textContent = formattedSQL;
    JQueryContainer.textContent = $("#jq2-select").val();

    delete sqlContainer.dataset.highlighted;
    delete JQueryContainer.dataset.highlighted;
    hljs.highlightElement(sqlContainer);
    hljs.highlightElement(JQueryContainer);

});

showWithScroll();
function showWithScroll() {
    var $rows = $('.jq3-rows');
    if (!$rows.length || !('IntersectionObserver' in window)) return; // sans support : tout reste visible

    $rows.addClass('jq3-js');

    var io = new IntersectionObserver(function (entries) {
        $.each(entries, function (_, e) {
            if (e.isIntersecting) {
                $(e.target).addClass('is-visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.25 });

    $rows.find('.jq3-row').each(function () { io.observe(this); });
}
