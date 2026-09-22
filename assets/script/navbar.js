var navStyleFields = {};

export function toggleNavBar(animationTime = 100) {
    $(".navbar-container").animate(navStyleFields, animationTime, () => {
        $(".navbar-container").css("display", navStyleFields.display);
    }); // duration in milliseconds
}

export function hideNavBar(element = $("#jq-show-examples")) {
    navStyleFields = {
        height: "0",
        display: "none",
    };
    element.attr("data-show", "show");
    element.find("img:first").show();
    element.find("img:last").hide();
    // element.animate(navStyleFields, 300, () => {
    //     element.find("img:first").css("width",)
    //     element.find("img:last").hide();
    // });
    toggleNavBar();
}

export function showNavBar(element = $("#jq-show-examples")) {
    navStyleFields = {
        height: "100%",
        display: "block",
    };
    element.attr("data-show", "hide");
    element.find("img:first").hide();
    element.find("img:last").show();
    // element.animate(navStyleFields, 300, () => {
    //     element.find("img:first").hide();
    //     element.find("img:last").show();
    // });
    toggleNavBar();
}

export function toggleNavSubElements(e, subElement = ".sub-nav") {
    const parent = $(e.currentTarget);
    if (parent.find(".accordion").hasClass("rot-accordion")) {
        parent.find(".accordion").removeClass("rot-accordion");
        parent.siblings(subElement).hide(".sub-nav");
        parent.closest(".parent-element").removeClass("active")
    } else {
        parent.find(".accordion").addClass("rot-accordion");
        parent.siblings(subElement).show();
        parent.closest(".parent-element").addClass("active")
        $(".navbar-container").animate({
            scrollTop: $(".navbar-container").scrollTop()
                + parent.offset().top
                - $(".navbar-container").offset().top
        }, 600);
    }
}

$(document).on(
    "click",
    ".navbar-container .parent_title",
    (e) => {

        if (!$(event.target).closest(".jq-example").length) {
            toggleNavSubElements(e);
        }
    }
);