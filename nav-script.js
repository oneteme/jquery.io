
const { readDirectory } = require('./map-script');
const fs = require("fs").promises;
const mdPath = './tutorials/java';
const outputPath = "./navbar.html";
var javaSyntaxesMd = [];

readDirectory(mdPath)
    .then(files => {
        // console.log(files);
        javaSyntaxesMd = files;
    })
    .catch(err => {
        console.error(err);
    });

function readNavbarJSON(path = "./menu.json", parentTitle = null) {
    return fs.readFile(path, "utf8")
        .then(content => JSON.parse(content))
        .then(data => createNavbar(data, parentTitle));
}

function createNavbar(data, parentTitle = null) {
    const promises = data
        .filter(navElement => !navElement.dev)
        .map((navElement, key) => {

            if ("items" in navElement) {
                return readNavbarJSON(
                    "./subMenu/" + navElement.items,
                    navElement.title
                )
                    .then(subMenuHtml => {
                        return `
<div class="parent-element">

    <div
        class="parent_title"
        isloaded="false"
    >
        <span>${navElement.title}</span>

        <img
            class="nav-accordion accordion"
            src="./assets/images/accordion.svg"
        >
    </div>

    <div
        class="sub-nav"
        data-title="${navElement.title}"
        style="display:none;"
    >
        ${subMenuHtml}
    </div>

</div>
`;
                    });
            }

            const [next, prev] = getSteps(data, key);
            console.log("next : ", next, " prev : ", prev)
            return Promise.resolve(
                createSubNavItem(
                    navElement,
                    next,
                    prev,
                    parentTitle
                )
            );
        });

    return Promise.all(promises)
        .then(results => results.join(""));
}

function getSteps(arr, key) {

    const next =
        key + 1 < arr.length && !("items" in arr[key + 1])
            ? arr[key + 1].title
            : null;

    const prev =
        key - 1 >= 0 && !("items" in arr[key - 1])
            ? arr[key - 1].title
            : null;

    return [next, prev];
}

function createSubNavItem(navItem, next, prev, parentTitle = null) {

    const javapath =
        (parentTitle ? parentTitle.toLowerCase() + "/" : "") +
        (navItem.label ?? navItem.title).toLowerCase() +
        ".md";

    let navFields = {
        class: "nav-item jq-example",
        "data-learn": navItem.title.toLowerCase()
    };

    if (javaSyntaxesMd.includes(javapath)) {
        navFields["data-java"] = javapath;
    }

    if (navItem.tooltip) {
        navFields["data-tippy-content"] = navItem.tooltip;
    }

    if (next) {
        navFields["data-next"] = next
    }

    if (prev) {
        navFields["data-prev"] = prev
    }
    Object.entries(navItem).forEach(([key, value]) => {

        if (key === "examples") {
            value = String(JSON.stringify(value))
                .replace(/&/g, "&amp;")
                .replace(/"/g, "&quot;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

        }

        navFields["data-" + key] = value;
    });

    const attributes = Object.entries(navFields)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");

    return `<li ${attributes}>${navItem.title}</li>\n`;
}

readNavbarJSON().then(html => {
    return fs.writeFile(outputPath, html, "utf8");
})
