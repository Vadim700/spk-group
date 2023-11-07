(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                }));
            }));
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.querySelector(".actions-header").addEventListener("click", (event => {
        const target = event.target;
        const locationList = document.querySelector(".actions-header__list");
        let count = 0;
        if (target.closest(".actions-header__item_icon_location") || target.closest(".actions-header__item_location")) {
            for (let i of locationList.children) count += i.clientHeight + parseInt(window.getComputedStyle(i).marginBottom);
            count + 30;
            locationList.animate([ {
                clip: "rect(0, 150px, 0px, 0)"
            }, {
                clip: `rect(0, 150px, ${count / 2}px, 0)`
            }, {
                clip: `rect(0, 150px, ${count}px, 0)`
            } ], {
                duration: 250,
                iterations: 1,
                fill: "forwards"
            });
        } else {
            for (let i of locationList.children) count += i.clientHeight + parseInt(window.getComputedStyle(i).marginBottom);
            locationList.animate([ {
                clip: `rect(0, 150px, ${count}px, 0)`
            }, {
                clip: `rect(0, 150px, ${count / 2}px, 0)`
            }, {
                clip: "rect(0, 150px, 0px, 0)"
            } ], {
                duration: 250,
                iterations: 1,
                fill: "forwards"
            });
        }
    }));
    const actionHeader = document.querySelector(".actions-header");
    const toUp = () => {
        actionHeader.querySelector(".actions-header__item_icon_location").style.transform = "translateY(-5px)";
    };
    actionHeader.querySelector(".actions-header__item_location").addEventListener("mouseover", toUp);
    actionHeader.querySelector(".actions-header__item_location").addEventListener("mouseout", (() => {
        actionHeader.querySelector(".actions-header__item_icon_location").style.transform = "";
    }));
    document.addEventListener("keydown", (event => {
        if ("Escape" === event.code) {
            document.querySelector(".actions-header__list").animate([ {
                clip: "rect(0, 150px, 500px, 0)"
            }, {
                clip: "rect(0, 150px, 250px, 0)"
            }, {
                clip: "rect(0, 150px, 0px, 0)"
            } ], {
                duration: 0,
                iterations: 1,
                fill: "forwards"
            });
            document.querySelectorAll(".menu__grid").forEach((item => item.animate([ {
                clip: "rect(0, 655px, 520px, 0)"
            }, {
                clip: "rect(0, 263px, 520px, 0)"
            }, {
                clip: "rect(0, 263px, 0, 0)"
            } ], {
                duration: 0,
                iterations: 1,
                fill: "forwards"
            })));
        }
    }));
    const menuHeader = document.querySelector(".menu");
    menuHeader.addEventListener("click", (event => {
        const target = event.target;
        const menuGrid = menuHeader?.querySelector(".menu__grid");
        let leftListHeight = 0;
        const fullClose = [ {
            clip: "rect(0, 655px, 520px, 0)"
        }, {
            clip: "rect(0, 263px, 520px, 0)"
        }, {
            clip: "rect(0, 263px, 0, 0)"
        } ];
        const options = {
            duration: 700,
            iterations: 1,
            fill: "forwards",
            easing: "ease-out"
        };
        if (target.parentElement.classList.contains("menu__item")) {
            menuHeader.querySelectorAll(".menu__item").forEach((item => item.classList.remove("active")));
            target.parentNode.classList.toggle("active");
            for (let i of target.parentElement.lastElementChild.firstElementChild.children) leftListHeight += i.clientHeight + parseInt(window.getComputedStyle(i).marginBottom);
            leftListHeight += parseInt(window.getComputedStyle(menuGrid).paddingTop) + 28;
            menuHeader.querySelectorAll(".menu__grid").forEach((item => item.animate(fullClose, {
                duration: 0,
                iterations: 1,
                fill: "forwards"
            })));
            target.parentElement.lastElementChild.animate([ {
                clip: "rect(0, 263px, 0, 0)"
            }, {
                clip: `rect(0, 263px, ${leftListHeight}px, 0)`
            }, {
                clip: `rect(0, 263px, ${leftListHeight}px, 0)`
            } ], options);
        }
        if (target.parentElement.classList.contains("menu__subitem")) {
            menuHeader.querySelectorAll(".menu__subitem").forEach((item => item.classList.remove("active")));
            target.parentNode.classList.add("active");
            console.log();
            for (let i of target.parentElement.parentElement.parentElement.firstElementChild.children) leftListHeight += i.clientHeight + parseInt(window.getComputedStyle(i).marginBottom);
            leftListHeight += parseInt(window.getComputedStyle(menuGrid).paddingTop) + 28;
            target.parentElement.parentElement.parentElement.animate([ {
                clip: `rect(0, 263px, ${leftListHeight}px, 0)`
            }, {
                clip: "rect(0, 263px, 520px, 0)"
            }, {
                clip: "rect(0, 655px, 520px, 0)"
            } ], options);
        }
        if (target.closest(".menu__sub-subitem")) target.parentElement.parentElement.parentElement.animate(fullClose, {
            duration: 500,
            iterations: 1,
            fill: "forwards",
            easing: "ease-out"
        });
    }));
    window["FLS"] = true;
    isWebp();
    menuInit();
    spollers();
})();