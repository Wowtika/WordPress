(($) => {
  ("use strict");
  const modules_flsModules = {};
  function isWebp() {
    function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
      let className = support === true ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
    });
  }
  let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  function addTouchClass() {
    if (isMobile.any()) document.documentElement.classList.add("touch");
  }
  function getHash() {
    if (location.hash) return location.hash.replace("#", "");
  }
  function setHash(hash) {
    hash = hash ? `#${hash}` : window.location.href.split("#")[0];
    history.pushState("", "", hash);
  }
  function fullVHfix() {
    const fullScreens = document.querySelectorAll("[data-fullscreen]");
    if (fullScreens.length && isMobile.any()) {
      window.addEventListener("resize", fixHeight);
      function fixHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
      fixHeight();
    }
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
      window.setTimeout(() => {
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
        document.dispatchEvent(
          new CustomEvent("slideUpDone", {
            detail: {
              target,
            },
          })
        );
      }, duration);
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
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
        document.dispatchEvent(
          new CustomEvent("slideDownDone", {
            detail: {
              target,
            },
          })
        );
      }, duration);
    }
  };
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) return _slideDown(target, duration);
    else return _slideUp(target, duration);
  };
  let bodyLockStatus = true;
  let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains("lock")) bodyUnlock(delay);
    else bodyLock(delay);
  };
  let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      setTimeout(() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
          el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        document.documentElement.classList.remove("lock");
      }, delay);
      bodyLockStatus = false;
      setTimeout(function () {
        bodyLockStatus = true;
      }, delay);
    }
  };
  let bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px";
      }
      body.style.paddingRight =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px";
      document.documentElement.classList.add("lock");
      bodyLockStatus = false;
      setTimeout(function () {
        bodyLockStatus = true;
      }, delay);
    }
  };
  function spollers() {
    const spollersArray = document.querySelectorAll("[data-spollers]");
    if (spollersArray.length > 0) {
      const spollersRegular = Array.from(spollersArray).filter(function (
        item,
        index,
        self
      ) {
        return !item.dataset.spollers.split(",")[0];
      });
      if (spollersRegular.length) initSpollers(spollersRegular);
      let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
      if (mdQueriesArray && mdQueriesArray.length)
        mdQueriesArray.forEach((mdQueriesItem) => {
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
      function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach((spollersBlock) => {
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
        });
      }
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
        if (spollerTitles.length) {
          spollerTitles = Array.from(spollerTitles).filter(
            (item) => item.closest("[data-spollers]") === spollersBlock
          );
          spollerTitles.forEach((spollerTitle) => {
            if (hideSpollerBody) {
              spollerTitle.removeAttribute("tabindex");
              if (!spollerTitle.classList.contains("_spoller-active"))
                spollerTitle.nextElementSibling.hidden = true;
            } else {
              spollerTitle.setAttribute("tabindex", "-1");
              spollerTitle.nextElementSibling.hidden = false;
            }
          });
        }
      }
      function setSpollerAction(e) {
        const el = e.target;
        if (el.closest("[data-spoller]")) {
          const spollerTitle = el.closest("[data-spoller]");
          const spollersBlock = spollerTitle.closest("[data-spollers]");
          const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
          const spollerSpeed = spollersBlock.dataset.spollersSpeed
            ? parseInt(spollersBlock.dataset.spollersSpeed)
            : 500;
          if (!spollersBlock.querySelectorAll("._slide").length) {
            if (
              oneSpoller &&
              !spollerTitle.classList.contains("_spoller-active")
            )
              hideSpollersBody(spollersBlock);
            spollerTitle.classList.toggle("_spoller-active");
            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
          }
          e.preventDefault();
        }
      }
      function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector(
          "[data-spoller]._spoller-active"
        );
        const spollerSpeed = spollersBlock.dataset.spollersSpeed
          ? parseInt(spollersBlock.dataset.spollersSpeed)
          : 500;
        if (
          spollerActiveTitle &&
          !spollersBlock.querySelectorAll("._slide").length
        ) {
          spollerActiveTitle.classList.remove("_spoller-active");
          _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
        }
      }
      const spollersClose = document.querySelectorAll("[data-spoller-close]");
      if (spollersClose.length)
        document.addEventListener("click", function (e) {
          const el = e.target;
          if (!el.closest("[data-spollers]"))
            spollersClose.forEach((spollerClose) => {
              const spollersBlock = spollerClose.closest("[data-spollers]");
              if (spollersBlock.classList.contains("_spoller-init")) {
                const spollerSpeed = spollersBlock.dataset.spollersSpeed
                  ? parseInt(spollersBlock.dataset.spollersSpeed)
                  : 500;
                spollerClose.classList.remove("_spoller-active");
                _slideUp(spollerClose.nextElementSibling, spollerSpeed);
              }
            });
        });
    }
  }
  function tabs() {
    const tabs = document.querySelectorAll("[data-tabs]");
    let tabsActiveHash = [];
    if (tabs.length > 0) {
      const hash = getHash();
      if (hash && hash.startsWith("tab-"))
        tabsActiveHash = hash.replace("tab-", "").split("-");
      tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add("_tab-init");
        tabsBlock.setAttribute("data-tabs-index", index);
        tabsBlock.addEventListener("click", setTabsAction);
        initTabs(tabsBlock);
      });
      let mdQueriesArray = dataMediaQueries(tabs, "tabs");
      if (mdQueriesArray && mdQueriesArray.length)
        mdQueriesArray.forEach((mdQueriesItem) => {
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            setTitlePosition(
              mdQueriesItem.itemsArray,
              mdQueriesItem.matchMedia
            );
          });
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
    }
    function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach((tabsMediaItem) => {
        tabsMediaItem = tabsMediaItem.item;
        let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
        let tabsTitleItems =
          tabsMediaItem.querySelectorAll("[data-tabs-title]");
        let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
        let tabsContentItems =
          tabsMediaItem.querySelectorAll("[data-tabs-item]");
        tabsTitleItems = Array.from(tabsTitleItems).filter(
          (item) => item.closest("[data-tabs]") === tabsMediaItem
        );
        tabsContentItems = Array.from(tabsContentItems).filter(
          (item) => item.closest("[data-tabs]") === tabsMediaItem
        );
        tabsContentItems.forEach((tabsContentItem, index) => {
          if (matchMedia.matches) {
            tabsContent.append(tabsTitleItems[index]);
            tabsContent.append(tabsContentItem);
            tabsMediaItem.classList.add("_tab-spoller");
          } else {
            tabsTitles.append(tabsTitleItems[index]);
            tabsMediaItem.classList.remove("_tab-spoller");
          }
        });
      });
    }
    function initTabs(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
      if (tabsActiveHashBlock) {
        const tabsActiveTitle = tabsBlock.querySelector(
          "[data-tabs-titles]>._tab-active"
        );
        tabsActiveTitle
          ? tabsActiveTitle.classList.remove("_tab-active")
          : null;
      }
      if (tabsContent.length) {
        tabsContent = Array.from(tabsContent).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsTitles = Array.from(tabsTitles).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsContent.forEach((tabsContentItem, index) => {
          tabsTitles[index].setAttribute("data-tabs-title", "");
          tabsContentItem.setAttribute("data-tabs-item", "");
          if (tabsActiveHashBlock && index == tabsActiveHash[1])
            tabsTitles[index].classList.add("_tab-active");
          tabsContentItem.hidden =
            !tabsTitles[index].classList.contains("_tab-active");
        });
      }
    }
    function setTabsStatus(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      function isTabsAnamate(tabsBlock) {
        if (tabsBlock.hasAttribute("data-tabs-animate"))
          return tabsBlock.dataset.tabsAnimate > 0
            ? Number(tabsBlock.dataset.tabsAnimate)
            : 500;
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);
      if (tabsContent.length > 0) {
        const isHash = tabsBlock.hasAttribute("data-tabs-hash");
        tabsContent = Array.from(tabsContent).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsTitles = Array.from(tabsTitles).filter(
          (item) => item.closest("[data-tabs]") === tabsBlock
        );
        tabsContent.forEach((tabsContentItem, index) => {
          if (tabsTitles[index].classList.contains("_tab-active")) {
            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate);
            else tabsContentItem.hidden = false;
            if (isHash && !tabsContentItem.closest(".popup"))
              setHash(`tab-${tabsBlockIndex}-${index}`);
          } else if (tabsBlockAnimate)
            _slideUp(tabsContentItem, tabsBlockAnimate);
          else tabsContentItem.hidden = true;
        });
      }
    }
    function setTabsAction(e) {
      const el = e.target;
      if (el.closest("[data-tabs-title]")) {
        const tabTitle = el.closest("[data-tabs-title]");
        const tabsBlock = tabTitle.closest("[data-tabs]");
        if (
          !tabTitle.classList.contains("_tab-active") &&
          !tabsBlock.querySelector("._slide")
        ) {
          let tabActiveTitle = tabsBlock.querySelectorAll(
            "[data-tabs-title]._tab-active"
          );
          tabActiveTitle.length
            ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
              (item) => item.closest("[data-tabs]") === tabsBlock
            ))
            : null;
          tabActiveTitle.length
            ? tabActiveTitle[0].classList.remove("_tab-active")
            : null;
          tabTitle.classList.add("_tab-active");
          setTabsStatus(tabsBlock);
        }
        e.preventDefault();
      }
    }
  }
  function menuInit() {
    if (document.querySelector(".icon-menu"))
      document.addEventListener("click", function (e) {
        if (bodyLockStatus && e.target.closest(".icon-menu")) {
          bodyLockToggle();
          document.documentElement.classList.toggle("menu-open");
        }
      });
  }
  function functions_FLS(message) {
    setTimeout(() => {
      if (window.FLS) console.log(message);
    }, 0);
  }
  function uniqArray(array) {
    return array.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
  }
  function dataMediaQueries(array, dataSetValue) {
    const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue])
        return item.dataset[dataSetValue].split(",")[0];
    });
    if (media.length) {
      const breakpointsArray = [];
      media.forEach((item) => {
        const params = item.dataset[dataSetValue];
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });
      let mdQueries = breakpointsArray.map(function (item) {
        return (
          "(" +
          item.type +
          "-width: " +
          item.value +
          "px)," +
          item.value +
          "," +
          item.type
        );
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];
      if (mdQueries.length) {
        mdQueries.forEach((breakpoint) => {
          const paramsArray = breakpoint.split(",");
          const mediaBreakpoint = paramsArray[1];
          const mediaType = paramsArray[2];
          const matchMedia = window.matchMedia(paramsArray[0]);
          const itemsArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType)
              return true;
          });
          mdQueriesArray.push({
            itemsArray,
            matchMedia,
          });
        });
        return mdQueriesArray;
      }
    }
  }
  class Popup {
    constructor(options) {
      let config = {
        logging: true,
        init: true,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-popup-youtube",
        youtubePlaceAttribute: "data-popup-youtube-place",
        setAutoplayYoutube: true,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: true,
        closeEsc: true,
        bodyLock: true,
        hashSettings: {
          location: true,
          goHash: true,
        },
        on: {
          beforeOpen: function () { },
          afterOpen: function () { },
          beforeClose: function () { },
          afterClose: function () { },
        },
      };
      this.youTubeCode;
      this.isOpen = false;
      this.targetOpen = {
        selector: false,
        element: false,
      };
      this.previousOpen = {
        selector: false,
        element: false,
      };
      this.lastClosed = {
        selector: false,
        element: false,
      };
      this._dataValue = false;
      this.hash = false;
      this._reopen = false;
      this._selectorOpen = false;
      this.lastFocusEl = false;
      this._focusEl = [
        "a[href]",
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        "button:not([disabled]):not([aria-hidden])",
        "select:not([disabled]):not([aria-hidden])",
        "textarea:not([disabled]):not([aria-hidden])",
        "area[href]",
        "iframe",
        "object",
        "embed",
        "[contenteditable]",
        '[tabindex]:not([tabindex^="-"])',
      ];
      this.options = {
        ...config,
        ...options,
        classes: {
          ...config.classes,
          ...options?.classes,
        },
        hashSettings: {
          ...config.hashSettings,
          ...options?.hashSettings,
        },
        on: {
          ...config.on,
          ...options?.on,
        },
      };
      this.bodyLock = false;
      this.options.init ? this.initPopups() : null;
    }
    initPopups() {
      // this.popupLogging(`Проснулся`);
      this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const buttonOpen = e.target.closest(
            `[${this.options.attributeOpenButton}]`
          );
          if (buttonOpen) {
            e.preventDefault();
            this._dataValue = buttonOpen.getAttribute(
              this.options.attributeOpenButton
            )
              ? buttonOpen.getAttribute(this.options.attributeOpenButton)
              : "error";
            this.youTubeCode = buttonOpen.getAttribute(
              this.options.youtubeAttribute
            )
              ? buttonOpen.getAttribute(this.options.youtubeAttribute)
              : null;
            if (this._dataValue !== "error") {
              if (!this.isOpen) this.lastFocusEl = buttonOpen;
              this.targetOpen.selector = `${this._dataValue}`;
              this._selectorOpen = true;
              this.open();
              return;
            } else
              this.popupLogging(
                `Ой ой, не заполнен атрибут у ${buttonOpen.classList}`
              );
            return;
          }
          const buttonClose = e.target.closest(
            `[${this.options.attributeCloseButton}]`
          );
          if (
            buttonClose ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
          ) {
            e.preventDefault();
            this.close();
            return;
          }
        }.bind(this)
      );
      document.addEventListener(
        "keydown",
        function (e) {
          if (
            this.options.closeEsc &&
            e.which == 27 &&
            e.code === "Escape" &&
            this.isOpen
          ) {
            e.preventDefault();
            this.close();
            return;
          }
          if (this.options.focusCatch && e.which == 9 && this.isOpen) {
            this._focusCatch(e);
            return;
          }
        }.bind(this)
      );
      if (this.options.hashSettings.goHash) {
        window.addEventListener(
          "hashchange",
          function () {
            if (window.location.hash) this._openToHash();
            else this.close(this.targetOpen.selector);
          }.bind(this)
        );
        window.addEventListener(
          "load",
          function () {
            if (window.location.hash) this._openToHash();
          }.bind(this)
        );
      }
    }
    open(selectorValue) {
      if (bodyLockStatus) {
        this.bodyLock =
          document.documentElement.classList.contains("lock") && !this.isOpen
            ? true
            : false;
        if (
          selectorValue &&
          typeof selectorValue === "string" &&
          selectorValue.trim() !== ""
        ) {
          this.targetOpen.selector = selectorValue;
          this._selectorOpen = true;
        }
        if (this.isOpen) {
          this._reopen = true;
          this.close();
        }
        if (!this._selectorOpen)
          this.targetOpen.selector = this.lastClosed.selector;
        if (!this._reopen) this.previousActiveElement = document.activeElement;
        this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        );
        if (this.targetOpen.element) {
          if (this.youTubeCode) {
            const codeVideo = this.youTubeCode;
            const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
            const iframe = document.createElement("iframe");
            iframe.setAttribute("allowfullscreen", "");
            const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
            iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
            iframe.setAttribute("src", urlVideo);
            if (
              !this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              )
            ) {
              this.targetOpen.element
                .querySelector(".popup__text")
                .setAttribute(`${this.options.youtubePlaceAttribute}`, "");
            }
            this.targetOpen.element
              .querySelector(`[${this.options.youtubePlaceAttribute}]`)
              .appendChild(iframe);
          }
          if (this.options.hashSettings.location) {
            this._getHash();
            this._setHash();
          }
          this.options.on.beforeOpen(this);
          document.dispatchEvent(
            new CustomEvent("beforePopupOpen", {
              detail: {
                popup: this,
              },
            })
          );
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          );
          document.documentElement.classList.add(
            this.options.classes.bodyActive
          );
          if (!this._reopen) !this.bodyLock ? bodyLock() : null;
          else this._reopen = false;
          this.targetOpen.element.setAttribute("aria-hidden", "false");
          this.previousOpen.selector = this.targetOpen.selector;
          this.previousOpen.element = this.targetOpen.element;
          this._selectorOpen = false;
          this.isOpen = true;
          setTimeout(() => {
            this._focusTrap();
          }, 50);
          this.options.on.afterOpen(this);
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", {
              detail: {
                popup: this,
              },
            })
          );
          this.popupLogging(`Открыл попап`);
        } else
          this.popupLogging(
            `Ой ой, такого попапа нет.Проверьте корректность ввода. `
          );
      }
    }
    close(selectorValue) {
      if (
        selectorValue &&
        typeof selectorValue === "string" &&
        selectorValue.trim() !== ""
      )
        this.previousOpen.selector = selectorValue;
      if (!this.isOpen || !bodyLockStatus) return;
      this.options.on.beforeClose(this);
      document.dispatchEvent(
        new CustomEvent("beforePopupClose", {
          detail: {
            popup: this,
          },
        })
      );
      if (this.youTubeCode)
        if (
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          )
        )
          this.targetOpen.element.querySelector(
            `[${this.options.youtubePlaceAttribute}]`
          ).innerHTML = "";
      this.previousOpen.element.classList.remove(
        this.options.classes.popupActive
      );
      this.previousOpen.element.setAttribute("aria-hidden", "true");
      if (!this._reopen) {
        document.documentElement.classList.remove(
          this.options.classes.bodyActive
        );
        !this.bodyLock ? bodyUnlock() : null;
        this.isOpen = false;
      }
      this._removeHash();
      if (this._selectorOpen) {
        this.lastClosed.selector = this.previousOpen.selector;
        this.lastClosed.element = this.previousOpen.element;
      }
      this.options.on.afterClose(this);
      document.dispatchEvent(
        new CustomEvent("afterPopupClose", {
          detail: {
            popup: this,
          },
        })
      );
      setTimeout(() => {
        this._focusTrap();
      }, 50);
      this.popupLogging(`Закрыл попап`);
    }
    _getHash() {
      if (this.options.hashSettings.location)
        this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#");
    }
    _openToHash() {
      let classInHash = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
      const buttons = document.querySelector(
        `[${this.options.attributeOpenButton} = "${classInHash}"]`
      )
        ? document.querySelector(
          `[${this.options.attributeOpenButton} = "${classInHash}"]`
        )
        : document.querySelector(
          `[${this.options.attributeOpenButton} = "${classInHash.replace(
            ".",
            "#"
          )}"]`
        );
      if (buttons && classInHash) this.open(classInHash);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);
      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }
    _focusTrap() {
      const focusable = this.previousOpen.element.querySelectorAll(
        this._focusEl
      );
      if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus();
      else focusable[0].focus();
    }
    popupLogging(message) {
      this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
    }
  }
  modules_flsModules.popup = new Popup({});
  function formFieldsInit(
    options = {
      viewPass: false,
      autoHeight: false,
    }
  ) {
    const formFields = document.querySelectorAll(
      "input[placeholder],textarea[placeholder]"
    );
    if (formFields.length)
      formFields.forEach((formField) => {
        if (!formField.hasAttribute("data-placeholder-nohide"))
          formField.dataset.placeholder = formField.placeholder;
      });
    document.body.addEventListener("focusin", function (e) {
      const targetElement = e.target;
      if (
        targetElement.tagName === "INPUT" ||
        targetElement.tagName === "TEXTAREA"
      ) {
        if (targetElement.dataset.placeholder) targetElement.placeholder = "";
        if (!targetElement.hasAttribute("data-no-focus-classes")) {
          targetElement.classList.add("_form-focus");
          targetElement.parentElement.classList.add("_form-focus");
        }
        formValidate.removeError(targetElement);
      }
    });
    document.body.addEventListener("focusout", function (e) {
      const targetElement = e.target;
      if (
        targetElement.tagName === "INPUT" ||
        targetElement.tagName === "TEXTAREA"
      ) {
        if (targetElement.dataset.placeholder)
          targetElement.placeholder = targetElement.dataset.placeholder;
        if (!targetElement.hasAttribute("data-no-focus-classes")) {
          targetElement.classList.remove("_form-focus");
          targetElement.parentElement.classList.remove("_form-focus");
        }
        if (targetElement.hasAttribute("data-validate"))
          formValidate.validateInput(targetElement);
      }
    });
    if (options.viewPass)
      document.addEventListener("click", function (e) {
        let targetElement = e.target;
        if (targetElement.closest('[class*="__viewpass"]')) {
          let inputType = targetElement.classList.contains("_viewpass-active")
            ? "password"
            : "text";
          targetElement.parentElement
            .querySelector("input")
            .setAttribute("type", inputType);
          targetElement.classList.toggle("_viewpass-active");
        }
      });
    if (options.autoHeight) {
      const textareas = document.querySelectorAll("textarea[data-autoheight]");
      if (textareas.length) {
        textareas.forEach((textarea) => {
          const startHeight = textarea.hasAttribute("data-autoheight-min")
            ? Number(textarea.dataset.autoheightMin)
            : Number(textarea.offsetHeight);
          const maxHeight = textarea.hasAttribute("data-autoheight-max")
            ? Number(textarea.dataset.autoheightMax)
            : 1 / 0;
          setHeight(textarea, Math.min(startHeight, maxHeight));
          textarea.addEventListener("input", () => {
            if (textarea.scrollHeight > startHeight) {
              textarea.style.height = `auto`;
              setHeight(
                textarea,
                Math.min(
                  Math.max(textarea.scrollHeight, startHeight),
                  maxHeight
                )
              );
            }
          });
        });
        function setHeight(textarea, height) {
          textarea.style.height = `${height}px`;
        }
      }
    }
  }
  let formValidate = {
    getErrors(form) {
      let error = 0;
      let formRequiredItems = form.querySelectorAll("*[data-required]");
      if (formRequiredItems.length)
        formRequiredItems.forEach((formRequiredItem) => {
          if (
            (formRequiredItem.offsetParent !== null ||
              formRequiredItem.tagName === "SELECT") &&
            !formRequiredItem.disabled
          )
            error += this.validateInput(formRequiredItem);
        });
      return error;
    },
    validateInput(formRequiredItem) {
      let error = 0;
      if (formRequiredItem.dataset.required === "email") {
        formRequiredItem.value = formRequiredItem.value.replace(" ", "");
        if (this.emailTest(formRequiredItem)) {
          this.addError(formRequiredItem);
          error++;
        } else this.removeError(formRequiredItem);
      } else if (
        formRequiredItem.type === "checkbox" &&
        !formRequiredItem.checked
      ) {
        this.addError(formRequiredItem);
        error++;
      } else if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        error++;
      } else this.removeError(formRequiredItem);
      return error;
    },
    addError(formRequiredItem) {
      formRequiredItem.classList.add("_form-error");
      formRequiredItem.parentElement.classList.add("_form-error");
      let inputError =
        formRequiredItem.parentElement.querySelector(".form__error");
      if (inputError) formRequiredItem.parentElement.removeChild(inputError);
      if (formRequiredItem.dataset.error)
        formRequiredItem.parentElement.insertAdjacentHTML(
          "beforeend",
          `<div class="form__error">${formRequiredItem.dataset.error}</div>`
        );
    },
    removeError(formRequiredItem) {
      formRequiredItem.classList.remove("_form-error");
      formRequiredItem.parentElement.classList.remove("_form-error");
      if (formRequiredItem.parentElement.querySelector(".form__error"))
        formRequiredItem.parentElement.removeChild(
          formRequiredItem.parentElement.querySelector(".form__error")
        );
    },
    formClean(form) {
      form.reset();
      setTimeout(() => {
        let inputs = form.querySelectorAll("input,textarea");
        for (let index = 0; index < inputs.length; index++) {
          const el = inputs[index];
          el.parentElement.classList.remove("_form-focus");
          el.classList.remove("_form-focus");
          formValidate.removeError(el);
        }
        let checkboxes = form.querySelectorAll(".checkbox__input");
        if (checkboxes.length > 0)
          for (let index = 0; index < checkboxes.length; index++) {
            const checkbox = checkboxes[index];
            checkbox.checked = false;
          }
        if (modules_flsModules.select) {
          let selects = form.querySelectorAll(".select");
          if (selects.length)
            for (let index = 0; index < selects.length; index++) {
              const select = selects[index].querySelector("select");
              modules_flsModules.select.selectBuild(select);
            }
        }
      }, 0);
    },
    emailTest(formRequiredItem) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
        formRequiredItem.value
      );
    },
  };

  class FilterCore {
    Select = null;
    $block = null;
    $selects = null;

    constructor(block, Select) {
      let _this = this;
      this.Select = Select;

      this.$block = $(block);
      if (this.$block.length) {
        this.$selects = this.$block.find("select");
        if (_this.$selects && _this.$selects.length) {
          _this.$selects.attr("disabled", true);

          document.addEventListener("selectCallback", function (e) {
            let current_select = e.detail.select;

            _this.$selects.each(function (i, select) {
              if (select == current_select) {
                $(select).trigger("change");
              }
            });
          });
        }
      }
    }

    setOptions(data, $select, selected = false) {
      $select = $($select);

      for (let i = 0; i < data.length; i++) {
        let val = data[i];
        let opt = document.createElement("option");
        opt.value = val;
        opt.innerHTML = val;

        if (selected && selected == val) {
          opt.setAttribute("selected", "selected");
        }

        $select.append(opt);
      }

      $select.attr("disabled", false);

      this.rebuildSelect($select);
    }

    setOptionsInner(data, $select, key, selected = false) {
      $select = $($select);

      let opt = document.createElement("option");
      opt.value = "I Don't Know";
      opt.innerHTML = "I Don't Know";

      $select.append(opt);

      for (let i = 0; i < data.length; i++) {
        let val = data[i];
        let opt = document.createElement("option");
        opt.value = val[key];
        opt.innerHTML = val[key];
        // console.log("val[key]", val[key]);
        // if (key === 'engine') {
        //   opt.innerHTML = val.engine_short;
        // } else {
        //   opt.innerHTML = val[key];
        // }
        if (selected && selected == val[key]) {
          opt.setAttribute("selected", "selected");
        }

        $select.append(opt);
      }

      if (data.length === 1) {
        // Устанавливаем селект как disabled
        // $select.attr("disabled", true);
        // тут показывается один двигатель и блокируется блок чтобы не было выбора
        let selectOptionButtonAll = $select[0].querySelectorAll("option");
        // console.log("selectOptionButtonAll", selectOptionButtonAll);
        let selectOption = selectOptionButtonAll[0];
        // console.log("selectOption", selectOption);
        let selectOptionButton = selectOptionButtonAll[2];
        // console.log("selectOptionButton", selectOptionButton);
        let dataValue = selectOptionButton.textContent;
        // console.log("dataValue", dataValue);
        selectOption.textContent = dataValue;
      } else if (data.length > 1) {
        // Если больше одного элемента, разрешаем выбор
        $select.attr("disabled", false);
      }
      $select.attr("disabled", false);
      this.rebuildSelect($select);
    }

    rebuildSelect(select) {
      let _this = this;
      let $select = $(select);
      $select.each(function (i, select) {
        _this.Select.selectBuild(select);
      });
    }

    getRegionId() {
      return this.$region.val();
    }

    getTypeId() {
      return this.$type.val();
    }

    loading($select, load = true) {
      let _this = this;
      $select = $($select);
      let $loading = $select.find("[data-loading]");

      if ($loading.length) {
        if (load) {
          $loading.attr("data-loading", $loading.html());
          $loading.html("Loading...");
        } else {
          $loading.html($loading.attr("data-loading"));
          $loading.attr("data-loading", "");
        }

        _this.rebuildSelect($select);
      }
    }

    showError(msg) {
      console.log(msg);
    }

    getList(type, params, $select, selected = false) {
      let _this = this;
      $select = $($select);

      _this.loading($select, true);

      return $.ajax({
        url: ApiCatalog.url,
        type: "GET",
        data: Object.assign(
          {
            region_id: _this.getRegionId(),
            type_id: _this.getTypeId(),
            action: "apicatalog:" + type,
            nonce: ApiCatalog.nonce,
          },
          params
        ),
        success: function (res) {
          if (res && res.success) {
            if (res.data) {
              if ($select && $select.length) {
                _this.setOptions(res.data, $select, selected);
              }
            }
          }
        },
        error: function (xhr) {
          let json = xhr.responseJSON || {};
          _this.showError(json.msg || "Unknown ");
        },
      }).always(function () {
        _this.loading($select, false);
      });

    }
  }
  class FilterMini extends FilterCore {
    $region = null;
    $year = null;
    $make = null;
    $model = null;
    $type = null;

    constructor(block, Select) {
      super(block, Select);

      let _this = this;

      if (this.$block.length) {
        this.$region = this.$block.find('[data-filter="region"]');
        this.$type = this.$block.find('[data-filter="type"]');
        this.$year = this.$block.find('[data-filter="year"]');
        this.$make = this.$block.find('[data-filter="make"]');
        this.$model = this.$block.find('[data-filter="model"]');

        this.$region
          .on("change", function () {
            _this.clearSelects("region");
            _this.loadYears();
          })
          .trigger("change")
          .attr("disabled", false);

        this.$type
          .on("change", function () {
            _this.clearSelects("type");
            _this.loadYears();
          })
          .trigger("change")
          .attr("disabled", false);

        this.$year.on("change", function () {
          let year = _this.$year.val();
          _this.clearSelects("year");
          _this.loadMakes(year);
        });

        this.$make.on("change", function () {
          let year = _this.$year.val();
          let make = _this.$make.val();
          _this.clearSelects("make");
          _this.loadModels(year, make);
        });

        this.$model.on("change", function () {
          let year = _this.$year.val();
          let make = _this.$make.val();
          let model = _this.$model.val();
          let region = _this.getRegionId();
          let type = _this.getTypeId();

          let params = $.param({
            yr: year,
            mk: make,
            md: model,
            rg: region,
            tp: type,
          });
          window.location.href = "/catalog/?" + params;
        });
      }
    }

    clearSelects(type) {
      let _this = this;
      switch (type) {
        case "region":
          _this.$year.html(
            '<option value="" data-loading selected>Year</option>'
          );
          _this.$year.attr("disabled", true);
          _this.rebuildSelect(_this.$year);

        case "year":
          _this.$make.html(
            '<option value="" data-loading selected>Make</option>'
          );
          _this.$make.attr("disabled", true);
          _this.rebuildSelect(_this.$make);

        case "make":
          _this.$model.html(
            '<option value="" data-loading selected>Model</option>'
          );
          _this.$model.attr("disabled", true);
          _this.rebuildSelect(_this.$model);

        case "model":
          break;
      }
    }

    loadYears() {
      let _this = this;

      this.getList("years", {}, _this.$year);
    }
    loadMakes(year) {
      let _this = this;

      this.getList(
        "makes",
        {
          year: year,
        },
        _this.$make
      );
    }
    loadModels(year, make) {
      let _this = this;

      this.getList(
        "models",
        {
          year: year,
          make: make,
        },
        _this.$model
      );
    }
  }
  class FilterTop extends FilterCore {
    $region = null;
    $year = null;
    $make = null;
    $model = null;

    constructor(block, Select) {
      super(block, Select);

      let _this = this;

      if (this.$block.length) {
        this.$region = this.$block.find('[data-filter="region"]');
        this.$type = this.$block.find('[data-filter="type"]');
        this.$year = this.$block.find('[data-filter="year"]');
        this.$make = this.$block.find('[data-filter="make"]');
        this.$model = this.$block.find('[data-filter="model"]');

        this.$region
          .on("change", function () {
            _this.clearSelects("region");
            _this.loadYears();
          })
          .trigger("change")
          .attr("disabled", false);

        this.$year.on("change", function () {
          let year = _this.$year.val();
          _this.clearSelects("year");
          _this.loadMakes(year);
        });

        this.$make.on("change", function () {
          let year = _this.$year.val();
          let make = _this.$make.val();
          _this.clearSelects("make");
          _this.loadModels(year, make);
        });

        this.$model.on("change", function () {
          let year = _this.$year.val();
          let make = _this.$make.val();
          let model = _this.$model.val();
          let region = _this.getRegionId();
          let type = _this.getTypeId();

          let params = $.param({
            yr: year,
            mk: make,
            md: model,
            rg: region,
            tp: type,
          });
          window.location.href = "/catalog/?" + params;
        });
      }
    }

    clearSelects(type) {
      let _this = this;
      switch (type) {
        case "region":
          _this.$year.html(
            '<option value="" data-loading selected>Year</option>'
          );
          _this.$year.attr("disabled", true);
          _this.rebuildSelect(_this.$year);

        case "year":
          _this.$make.html(
            '<option value="" data-loading selected>Make</option>'
          );
          _this.$make.attr("disabled", true);
          _this.rebuildSelect(_this.$make);

        case "make":
          _this.$model.html(
            '<option value="" data-loading selected>Model</option>'
          );
          _this.$model.attr("disabled", true);
          _this.rebuildSelect(_this.$model);

        case "model":
          break;
      }
    }

    loadYears() {
      let _this = this;

      this.getList("years", {}, _this.$year);
    }
    loadMakes(year) {
      let _this = this;

      this.getList(
        "makes",
        {
          year: year,
        },
        _this.$make
      );
    }
    loadModels(year, make) {
      let _this = this;

      this.getList(
        "models",
        {
          year: year,
          make: make,
        },
        _this.$model
      );
    }
  }
  class FilterAdvanced {
    submodelBlock = null;
    submodelContent = null;
    engineBlock = null;
    engineContent = null;
    bodyTypeBlock = null;
    bodyTypeContent = null;
    brakeTypeBlock = null;
    brakeTypeContent = null;
    driveTypeBlock = null;
    driveTypeContent = null;
    transmissionBlock = null;
    transmissionContent = null;

    selectedParts = {
      submodel: {},
      engine: {},
      bodyType: {},
      transmission: {},
      brake: {},
      driveType: {},
    }

    currentData = [];
    parent = null;
    submodels = [];
    engines = [];
    bodyTypes = [];
    brakes = [];
    driveTypes = [];
    transmissions = [];

    constructor(parent) {
      this.parent = parent;
      this.submodelBlock = $("#aSubmodel");
      this.engineBlock = $("#aEngine");
      this.bodyTypeBlock = $("#aBodyType");
      this.brakeTypeBlock = $("#aBrakeType");
      this.driveTypeBlock = $("#aDriveType");
      this.transmissionBlock = $("#aTransmission");

      this.submodelContent = this.submodelBlock.find("ul");
      this.engineContent = this.engineBlock.find("ul");
      this.bodyTypeContent = this.bodyTypeBlock.find("ul");
      this.brakeTypeContent = this.brakeTypeBlock.find("ul");
      this.driveTypeContent = this.driveTypeBlock.find("ul");
      this.transmissionContent = this.transmissionBlock.find("ul");
    }

    open(data, submodel, engine, bodyType, brake, driveType, transmission) {
      $('#advanced-search').show();
      this.currentData = JSON.parse(JSON.stringify(data));
      this.resetData();
      this.selectedParts.submodel = this.getSelectedValue("submodel", submodel, this.submodels);
      this.selectedParts.engine = this.getSelectedValue("engine_short", engine, this.engines);
      this.selectedParts.bodyType = this.getSelectedValue("body_type", bodyType, this.bodyTypes);
      this.selectedParts.brake = this.getSelectedValue("brake", brake, this.brakes);
      this.selectedParts.driveType = this.getSelectedValue("drive_type", driveType, this.driveTypes);
      this.selectedParts.transmission = this.getSelectedValue("transmission", transmission, this.transmissions);
      this.openAdvancedSearch();
    }

    getSelectedValue(key, value, data) {
      return data.find((item) => item[key] === value) ?? {};
    }

    resetData() {
      let requestData = this.currentData ?? {};
      this.submodels = [...(requestData.vehicles ?? [])];
      this.engines = [...(requestData.engines ?? [])];
      this.transmissions = [...(requestData.transmissions ?? [])];
      this.bodyTypes = [...(requestData.body_types ?? [])];
      this.brakes = [...(requestData.brakes ?? [])];
      this.driveTypes = [...(requestData.drive_types ?? [])];
    }

    getGoodIds() {
      let _this = this;

        this.resetData();

      const submodelId = this.selectedParts.submodel?.vehicle_id;
      
      if (submodelId) {
        return [submodelId];
      }

      const submodelsId = this.submodels.flatMap((submodel) => submodel.vehicle_id);
      const engineIds = this.engines.flatMap((engine) => engine.vehicle_ids);
      const transmissionsIds = this.transmissions.flatMap((transmission) => transmission.vehicle_ids);
      const bodyTypeIds = this.bodyTypes.flatMap((bodyType) => bodyType.vehicle_ids);
      const brakeIds = this.brakes.flatMap((brake) => brake.vehicle_ids);
      const driveTypeIds = this.driveTypes.flatMap((driveType) => driveType.vehicle_ids);

      let allIds =
          [
            ...(submodelsId || []),
            ...(engineIds || []),
            ...(transmissionsIds || []),
            ...(bodyTypeIds || []),
            ...(brakeIds || []),
            ...(driveTypeIds || []),
          ];

      function filterIds(selectedValue, dataArray, key) {
        // const intersections = _this.findIntersection(true);
        // const intersectionKeys = new Set(intersections.flatMap(Object.keys));

        // if (!intersectionKeys.has(key) && !isAdvancedSearch) {
        //   const resetFields = {
        //     submodel: () => {
        //       _this.selectedParts.submodel = {};
        //     },
        //     engine: () => {
        //       _this.selectedParts.engine = {};
        //     },
        //     transmission: () => {
        //       _this.selectedParts.transmission = {};
        //     },
        //     body_type: () => {
        //       _this.selectedParts.bodyType = {};
        //     },
        //     brake: () => {
        //       _this.selectedParts.brake = {};
        //     },
        //     drive_type: () => {
        //       _this.selectedParts.driveType = {};
        //     },
        //   };

        //   if (resetFields[key]) {
        //     resetField[key]();
        //   }
        // }

        if (selectedValue[key] !== undefined) {
          const currentIds = dataArray.find(item => item[key] === selectedValue[key])?.vehicle_ids;

          if (currentIds) {
            allIds = allIds.filter(id => currentIds.includes(id));
          }
        }
      }

      const filters = [
        { value: this.selectedParts.submodel, data: this.submodels, key: "submodel" },
        { value: this.selectedParts.engine, data: this.engines, key: "engine_short" },
        { value: this.selectedParts.transmission, data: this.transmissions, key: "transmission" },
        { value: this.selectedParts.bodyType, data: this.bodyTypes, key: "body_type" },
        { value: this.selectedParts.driveType, data: this.driveTypes, key: "drive_type" },
        { value: this.selectedParts.brake, data: this.brakes, key: "brake" },
      ];

      filters.forEach(filter => filterIds(filter.value, filter.data, filter.key));

      return [...new Set(allIds)];
    }

    setValueByKey(key, value) {
      switch (key) {
        case "submodel":
          this.selectedParts.submodel = value;
          break;
        case "engine_short":
          this.selectedParts.engine = value;
          break;
        case "transmission":
          this.selectedParts.transmission = value;
          break;
        case "body_type":
          this.selectedParts.bodyType = value;
          break;
        case "brake":
          this.selectedParts.brake = value;
          break;
        case "drive_type":
          this.selectedParts.driveType = value;
          break;
      }

      this.openAdvancedSearch();
    }

    getProductsForAdvancedSearch(data) {
      let _this = this;
      let productAll = JSON.parse(JSON.stringify(data));
      let result = [];

      const requestData = _this.currentData ?? {};
      let dataOnSubmodels = [...(requestData.vehicles ?? [])];
      let dataOnEngines = [...(requestData.engines ?? [])];
      let dataOnTransmissions = [...(requestData.transmissions ?? [])];
      let dataOnBodyTypes = [...(requestData.body_types ?? [])];
      let dataOnBrakes = [...(requestData.brakes ?? [])];
      let dataOnDriveTypes = [...(requestData.drive_types ?? [])];

      const allIds = _this.getGoodIds();
      const submodelsObj = dataOnSubmodels.filter(
        (item) => 
          allIds.includes(item.vehicle_id)
      )
      const enginesObj = dataOnEngines.filter(
        (engine) =>
          allIds.some((id) => engine.vehicle_ids.includes(id))
      )
      const transmissionsObj = dataOnTransmissions.filter(
        (transmission) =>
          allIds.some((id) => transmission.vehicle_ids.includes(id))
      )
      const bodyTypesObj = dataOnBodyTypes.filter(
        (bodyType) =>
          allIds.some((id) => bodyType.vehicle_ids.includes(id))
      )
      const brakesObj = dataOnBrakes.filter(
        (brake) =>
          allIds.some((id) => brake.vehicle_ids.includes(id))
      )
      const driveTypesObj = dataOnDriveTypes.filter(
        (driveType) =>
          allIds.some((id) => driveType.vehicle_ids.includes(id))
      )

      if (submodelsObj.length === 1) {
        _this.selectedParts.submodel = submodelsObj[0];
      }
      if (enginesObj.length === 1) {
        _this.selectedParts.engine = enginesObj[0];
      }
      if (transmissionsObj.length === 1) {
        _this.selectedParts.transmission = transmissionsObj[0];
      }
      if (bodyTypesObj.length === 1) {
        _this.selectedParts.bodyType = bodyTypesObj[0];
      }
      if (brakesObj.length === 1) {
        _this.selectedParts.brake = brakesObj[0];
      }
      if (driveTypesObj.length === 1) {
        _this.selectedParts.driveType = driveTypesObj[0];
      }

      const submodels = submodelsObj.map((item) => item.submodel);
      const engines = enginesObj.map((item) => item.engine);
      const transmissions = transmissionsObj.map((item) => item.transmission);
      const bodyTypes = bodyTypesObj.map((item) => item.body_type);
      const brakes = brakesObj.map((item) => item.brake);
      const driveTypes = driveTypesObj.map((item) => item.drive_type);

      if (productAll) {
        productAll.forEach((itemCategory) => {
          let fitmentTypeValue = itemCategory.fitment_type;
          let dynamicKey = _this.getDynamicKey(itemCategory);

          if (dynamicKey) {
            let itemQualifierGroup = itemCategory[dynamicKey];
            let objWithFilter = {};

            if (
              typeof itemQualifierGroup === "object" &&
              itemQualifierGroup !== null
            ) {
              for (let key in itemQualifierGroup) {
                let productsIntoQualifierGroup = itemQualifierGroup[key];


                let filteredProducts = [];

                productsIntoQualifierGroup.forEach((itemProduct) => {
                  let options = itemProduct.applications;
                  let isAdded = false; // Флаг для отслеживания добавления

                  if (itemProduct.exact_match && !isAdded) {
                    filteredProducts.push(itemProduct);
                    isAdded = true;
                    return;
                  }

                  options.forEach((itemOption) => {
                    const keys = Object.keys(itemOption);

                    let isAllGood = keys.every((key) => {
                      let myVal;
                      switch (key) {
                        case "submodel":
                          myVal = submodels.length === 1 ? submodels[0] : _this.selectedParts.submodel?.submodel;
                          break;
                        case "engine":
                          myVal = engines.length === 1 ? engines[0] : _this.selectedParts.engine?.engine;
                          break;
                        case "transmission":
                          myVal = transmissions.length === 1 ? transmissions[0] : _this.selectedParts.transmission?.transmission;
                          break;
                        case "brake":
                          myVal = brakes.length === 1 ? brakes[0] : _this.selectedParts.brake?.brake;
                          break;
                        case "drive_type":
                          myVal = driveTypes.length === 1 ? driveTypes[0] : _this.selectedParts.driveType?.drive_type;
                          break;
                        case "body_type":
                          myVal = bodyTypes.length === 1 ? bodyTypes[0] : _this.selectedParts.bodyType?.body_type;
                          break;
                      }

                      if (myVal === undefined) {
                        return false;
                      }

                      if (
                        itemOption[key].value != myVal &&
                        !myVal.includes(itemOption[key].value)
                      ) {
                        return false;
                      }

                      return true;
                    });
                  
                    if (isAllGood && !isAdded) {
                      itemProduct.exact_match = true; // Добавляем exact_match
                      filteredProducts.push(itemProduct);
                      isAdded = true;
                    }
                  });

                  if (!isAdded) {
                    filteredProducts.push(itemProduct);
                    isAdded = true;
                  }

                });

                if (filteredProducts.length > 0) {
                  objWithFilter[key] = filteredProducts;
                }
              }
            }

            if (Object.keys(objWithFilter).length > 0) {
              result.push({
                fitment_type: fitmentTypeValue,
                [dynamicKey]: objWithFilter,
              });
            }
          }
        });

        return result.length > 0 ? result : null;
      }

      return null;
    }

    createListItem(item, value, goodItems, content, textProperty) { 
      let _this = this;
      if (goodItems.length === 1) return;

      let listItem = $("<li></li>").text(item[textProperty]);

      if (value[textProperty] === undefined && item[textProperty] === "I Don't Know") {
        listItem.addClass("advanced-search-active");
      }
      else
      if (item[textProperty] === "I Don't Know" && value !== undefined) {
        listItem.on("click", function () {
          _this.setValueByKey(textProperty, {});
        });
      }
      else
      if (item[textProperty] === value[textProperty]) {
        listItem.addClass("advanced-search-active");
      }
      else 
      if (goodItems.includes(item) && item[textProperty] !== "I Don't Know") {
        listItem.on("click", function () {
          _this.setValueByKey(textProperty, item);
        });
        if (value[textProperty] === undefined) {
          listItem.addClass("advanced-search-good");
        }
      } 
      else {

        listItem.on("click", function () {
          _this.selectedParts.submodel = {};
          _this.selectedParts.engine = {};
          _this.selectedParts.transmission = {};
          _this.selectedParts.bodyType = {};
          _this.selectedParts.brake = {};
          _this.selectedParts.driveType = {};

          _this.setValueByKey(textProperty, item);

        });
        listItem.addClass("advanced-search-bad");
      }

      content.append(listItem);
    }

    getDynamicKey(obj) {
      return Object.keys(obj).find((key) => key !== "fitment_type");
    }
    
    getDynamicValue(obj) {
      const dynamicKey = Object.keys(obj).find((key) => key !== "fitment_type");
      const dynamicValue = obj[dynamicKey];
      return dynamicValue;
    }

    getIntersections() {
      let _this = this;
      const parts = this.currentData.part_applications;

      const intersections = [];

      parts.forEach((group) => {
        const parts = this.getDynamicValue(group);
        parts.forEach((part) => {
          const applications = part.applications;
          if (!applications) {
            return;
          }
          applications.forEach((application) => {
            intersections.push(application);
          });
        });
      });

      return intersections;
    }

    findIntersection() {

    }

    rebuildContent() {
      let _this = this;

      _this.submodelContent.empty();
      _this.engineContent.empty();
      _this.transmissionContent.empty();
      _this.bodyTypeContent.empty();
      _this.brakeTypeContent.empty();
      _this.driveTypeContent.empty();

      const goodIds = this.getGoodIds();

      this.submodels.unshift({ vehicle_id: goodIds[0], submodel: "I Don't Know" });
      this.engines.unshift({ vehicle_ids: goodIds, engine_short: "I Don't Know" });
      this.transmissions.unshift({ vehicle_ids: goodIds, transmission: "I Don't Know" });
      this.bodyTypes.unshift({ vehicle_ids: goodIds, body_type: "I Don't Know" });
      this.brakes.unshift({vehicle_ids: goodIds, brake: "I Don't Know" });
      this.driveTypes.unshift({ vehicle_ids: goodIds, drive_type: "I Don't Know" });

      const goodSubmodels = this.submodels.filter((submodel) => goodIds.includes(submodel.vehicle_id));
      const goodEngines = this.engines.filter((engine) => goodIds.some((id) => engine.vehicle_ids.includes(id)));
      const goodTransmissions = this.transmissions.filter((transmission) => goodIds.some((id) => transmission.vehicle_ids.includes(id)));
      const goodBodyTypes = this.bodyTypes.filter((bodyType) => goodIds.some((id) => bodyType.vehicle_ids.includes(id)));
      const goodBrakes = this.brakes.filter((brake) => goodIds.some((id) => brake.vehicle_ids.includes(id)));
      const goodDriveTypes = this.driveTypes.filter((driveType) => goodIds.some((id) => driveType.vehicle_ids.includes(id)));

      _this.submodels.forEach((submodel) =>
        _this.createListItem(
          submodel,
          _this.selectedParts.submodel,
          goodSubmodels,
          _this.submodelContent,
          "submodel",
        )
      );
      _this.engines.forEach((engine) =>
        _this.createListItem(
          engine,
          _this.selectedParts.engine,
          goodEngines,
          _this.engineContent,
          "engine_short",
        )
      );
      _this.transmissions.forEach((transmission) =>
        _this.createListItem(
          transmission,
          _this.selectedParts.transmission,
          goodTransmissions,
          _this.transmissionContent,
          "transmission",
        )
      );
      _this.bodyTypes.forEach((bodyType) =>
        _this.createListItem(
          bodyType,
          _this.selectedParts.bodyType,
          goodBodyTypes,
          _this.bodyTypeContent,
          "body_type",
        )
      );
      _this.brakes.forEach((brake) =>
        _this.createListItem(
          brake,
          _this.selectedParts.brake,
          goodBrakes,
          _this.brakeTypeContent,
          "brake",
        )
      );
      _this.driveTypes.forEach((driveType) =>
        _this.createListItem(
          driveType,
          _this.selectedParts.driveType,
          goodDriveTypes,
          _this.driveTypeContent,
          "drive_type",
        )
      );
    }

    openAdvancedSearch() {
      let _this = this;

      _this.resetData();

      let newData = _this.parent.modifyFilteredData(_this.currentData.part_applications);

      newData = _this.getProductsForAdvancedSearch(newData);

      _this.rebuildContent();

      _this.parent.updateCurrentData(newData);
    }
  }
  class FilterFull extends FilterCore {
    $region = null;
    $type = null;
    $year = null;
    $make = null;
    $model = null;
    $transmission = null;
    $bodyType = null;
    $brake = null;
    $driveType = null;
    $responseData = null;
    $currentData = null; // Переменная для хранения актуальных данных
    $apiResponseData = null; // тут все данные с запроса partsSearch
    $vehicleIdSubmodule = null; // Переменная для хранения актуальных данных
    groupedData;
    order = [];
    imgCache = [];
    carIntersection = [];
    FilterAdvanced = null;
    carName = "";
    catalogParts;
    singlePart;

    constructor(block, Select) {
      super(block, Select);

      this.FilterAdvanced = new FilterAdvanced(this);

      //Получить линейки
      const url = "/wp-json/wp/v2/product-lines?per_page=20";
      let _this = this;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          const acc = {};
          const fetchImagePromises = data.map((item) => {
            const [group, line] = item.title.rendered.split(" &#8211; ");
            if (!acc[group]) {
              acc[group] = [];
            }
            const labeling = item.acf.labeling
              ? item.acf.labeling.map((label) => label.label)
              : [];
            const imgId = item.acf.img;

            acc[group].push({ line, labeling, imgId });
          });
          return acc;
        })

        .then((data) => {
          const order = [
            "Black",
            "Ultralife®",
            "Elite",
            "SPEED™",
            "Circuit Spec",
          ];

          // Sort each group's array
          Object.keys(data).forEach((group) => {
            data[group].sort(
              (a, b) => order.indexOf(a.line) - order.indexOf(b.line)
            );
            data[group].forEach((line) => {
              _this.order = _this.order.concat(line.labeling);
            });
          });
          this.groupedData = data;
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });

      if (this.$block.length) {
        _this.filterProductsAllGroups(); // общий подфильтр продуктов а именно тип применимости(Product lines), категории (Category), сторона(Side), линейки(Lines)
      }
      if (this.$block.length) {
        this.$partName = this.$block.find('[data-filter="partName"]');
        this.$button = this.$partName.next(".search-form__button");
        this.$region = this.$block.find('[data-filter="region"]');
        this.$type = this.$block.find('[data-filter="type"]');
        this.$year = this.$block.find('[data-filter="year"]');
        this.$make = this.$block.find('[data-filter="make"]');
        this.$model = this.$block.find('[data-filter="model"]');

        this.$engine = this.$block.find('[data-filter="engine"]');
        this.$submodel = this.$block.find('[data-filter="submodel"]');
        this.$transmission = this.$block.find('[data-filter="transmission"]');
        this.$bodyType = this.$block.find('[data-filter="bodytype"]');
        this.$brake = this.$block.find('[data-filter="brake"]');
        this.$driveType = this.$block.find('[data-filter="drivetype"]');

        let getUrlParameter = function getUrlParameter(sParam) {
          let sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split("&"),
            sParameterName,
            i;
          for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined
                ? true
                : decodeURIComponent(sParameterName[1].replace(/\+/g, " "));
            }
          }
          return false;
        };

        let getYear = getUrlParameter("yr");
        let getMake = getUrlParameter("mk");
        let getModel = getUrlParameter("md");
        let getRegion = getUrlParameter("rg");
        let getType = getUrlParameter("tp");

        getRegion = 1;

        $('[data-id="6"]').hide();
        $('[data-id="7"]').hide();
        $('[data-id="8"]').hide();
        $('[data-id="9"]').hide();
        $('[data-id="10"]').hide();
        $('[data-id="11"]').hide();

        if (getUrlParameter("carData")) {
          function levenshteinDistance(a, b) {
            const matrix = [];

            // Инициализация первой строки и первого столбца
            for (let i = 0; i <= b.length; i++) {
              matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
              matrix[0][j] = j;
            }

            // Заполнение матрицы
            for (let i = 1; i <= b.length; i++) {
              for (let j = 1; j <= a.length; j++) {
                if (b[i - 1] === a[j - 1]) {
                  matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                  matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Замена
                    matrix[i][j - 1] + 1, // Вставка
                    matrix[i - 1][j] + 1 // Удаление
                  );
                }
              }
            }

            return matrix[b.length][a.length];
          }

          function findClosestMatch(input, list) {
            let closestMatch = null;
            let minDistance = 3;

            list.forEach((item) => {
              const distance = levenshteinDistance(
                input.toLowerCase(),
                item.toLowerCase()
              );
              if (distance < minDistance) {
                minDistance = distance;
                closestMatch = item;
              }
            });

            return closestMatch;
          }

          const carData = getUrlParameter("carData")
            .toLowerCase()
            .replace(/\s/g, "+");
          const car = carData.split("+");
          getYear = car[car.length - 1];

          const carName = carData.replace(/\+/g, " ").replace(getYear, "");

          let xhrMakes = new XMLHttpRequest();
          xhrMakes.open(
            "GET",
            `https://catalog.loopautomotive.com/catalog/makes?filter={"year":"${getYear}"}`,
            false
          );
          xhrMakes.send();

          const makes = JSON.parse(xhrMakes.responseText);

          function findField(carName, fields) {
            let wordBuff = "";
            for (let word of carName) {
              wordBuff += word;
              const match = findClosestMatch(wordBuff, fields);
              if (match) {
                return match;
              }
            }
            return null;
          }

          function findModel(modelName, fields) {
            const match = findClosestMatch(modelName, fields);
            return match;
          }

          function removeManufacturer(carName, manufacturer) {
            const regex = new RegExp(manufacturer, "i");
            return carName.replace(regex, "").trim();
          }

          getMake = findField(carName.split(" "), makes);
          const carNameWithoutMake = removeManufacturer(
            carName,
            getMake
          ).replace();

          let xhrModels = new XMLHttpRequest();
          xhrModels.open(
            "GET",
            `https://catalog.loopautomotive.com/catalog/models?filter={"year":"${getYear}", "make":"${getMake}"}`,
            false
          );
          xhrModels.send();

          const models = JSON.parse(xhrModels.responseText);

          getModel = findModel(carNameWithoutMake, models);

          if (!getModel) {
            getModel = models[0];
          }

          getRegion = 1;

          getType = 1;

          let url = window.location.href;
          let urlParts = url.split("?");
          let baseUrl = urlParts[0];
          let queryParams = urlParts[1]
            .split("&")
            .filter((param) => !param.startsWith("carData="))
            .join("&");
          let newUrl = baseUrl + (queryParams ? "?" + queryParams : "");

          let params = new URLSearchParams();
          params.append("tp", 1);
          params.append("yr", getYear);
          params.append("mk", getMake);
          params.append("md", getModel);

          newUrl = newUrl + "?" + params.toString();
          window.history.pushState({}, "", newUrl);
        }

        this.$partName.on("keypress", (event) => {
          if (event.key === "Enter") {
            this.partSearch(this.$partName.val());
          }
        });

        this.$button.on("click", () => {
          this.partSearch(this.$partName.val());
        });

        this.$region
          .on("change", function () {
            _this.clearSelects("region");

            if (getYear && getMake && getModel && getRegion) {
              _this.loadYears(getYear);
            } else {
              // Вызывается снизу и тут
              // _this.loadYears();
            }
          })
          .trigger("change")
          .attr("disabled", false);

        this.$type
          .on("change", function () {
            _this.clearSelects("type");

            if (getYear && getMake && getModel && getRegion) {
              _this.loadYears(getYear);
            } else {
              _this.loadYears();
            }
          })
          .trigger("change")
          .attr("disabled", false);

        let lastModel = "";

        this.$year.on("change", function () {
          $("#advanced-search").hide();
          _this.hideBlocks();

          let year = _this.$year.val();
          _this.clearSelects("year");
          _this.loadMakes(year);
          lastModel = "";
        });

        this.$make.on("change", function () {
          $("#advanced-search").hide();
          _this.hideBlocks();

          let year = _this.$year.val();
          let make = _this.$make.val();
          _this.clearSelects("make");
          _this.loadModels(year, make);
          _this.$model.change();
        });

        this.$model.on("change", function () {
          $("#advanced-search").hide();
          _this.hideBlocks();

          let year = _this.$year.val();
          let make = _this.$make.val();
          let model = _this.$model.val();
          _this.$submodel.val("");
          _this.$engine.val("");
          _this.$brake.val("");
          _this.$transmission.val("");
          _this.$bodyType.val("");
          _this.$driveType.val("");
          $("#advanced-search-checkbox").prop("checked", false).change();

          $("#inner1").fadeOut();
          _this.hideBlocks();
          if (model === lastModel) return;
          lastModel = model;

          let params = $.param({
            yr: year,
            mk: make,
            md: model,
          });

          if (_this.$model.val()) {
            _this.checkModel(year, make, model);
          }
        });
        this.$submodel.on("change", function () {
          _this.checkSubModel();
        });
        this.$engine.on("change", function () {
          _this.checkEngine(); //checkEngine()
        });
        this.$transmission.on("change", function () {
          _this.checkTransmissions();
        });
        this.$bodyType.on("change", function () {
          _this.checkBodyTypes();
        });
        this.$brake.on("change", function () {
          _this.checkBrake();
        });
        this.$driveType.on("change", function () {
          _this.checkDriveType();
        });

        if (getYear && getMake && getModel && getRegion && getType) {
          _this.loadMakes(getYear, getMake);
          _this.loadModels(getYear, getMake, getModel);
          _this.checkModel(getYear, getMake, getModel);
        }

        // для работы фильтра
        document
          .querySelector(".page_catalog")
          .addEventListener("click", function (event) {
            if (
              event.target.closest(".type__link") ||
              event.target.closest(".item-category__link")
            ) {
              _this.filterProductsAllGroups();

              _this.create_parts(_this.$currentData);
            }

            if (event.target.closest(".clear")) {
              let allButtonCategory = document.querySelectorAll(
                ".item-category__link"
              );
              let allButtonCategoryProdLines =
                document.querySelectorAll(".type__link");
              allButtonCategory.forEach((item) =>
                item.classList.remove("active")
              );
              allButtonCategoryProdLines.forEach((item) =>
                item.classList.remove("active")
              );

              _this.filterProductsAllGroups();

              _this.create_parts(_this.$currentData);
            }
          });
        $("#advanced-search-checkbox").on("click", function () {
          if ($(this).is(":checked")) {
            $("#inner1").hide();
            _this.openAdvanced();
          } else {
            _this.$submodel.val(_this.FilterAdvanced.selectedParts.submodel.submodel).change();
            _this.$engine.val(_this.FilterAdvanced.selectedParts.engine.engine_short).change();
            _this.$transmission.val(_this.FilterAdvanced.selectedParts.transmission.transmission).change();
            _this.$bodyType.val(_this.FilterAdvanced.selectedParts.bodyType.body_type).change();
            _this.$driveType.val(_this.FilterAdvanced.selectedParts.driveType.drive_type).change();
            _this.$brake.val(_this.FilterAdvanced.selectedParts.brake.brake).change();
            _this.hideBlocks();
            $("#inner1").show();
            _this.showSelectedInnerParts();
            _this.checkoutValueOnSelected();
          }
        });
        $("button:contains('Search by Application')").on("click", function () {
          if (_this.catalogParts) {
            _this.$responseData = JSON.parse(JSON.stringify(_this.catalogParts));
            _this.catalogParts = null;
          }
          if (_this.carName) {
            $('#catalog_auto_title').html(_this.carName);
            _this.carName = null;
          }
          if ($('#advanced-search-checkbox').is(':checked')) {
            $("#inner1").hide();
            _this.openAdvanced();
          } else {
            _this.checkoutValueOnSelected();
          }
        })
        $("button:contains('Search by Part')").on("click", function () {
          if (!_this.carName)
            _this.carName = $('#catalog_auto_title').text();
          $('#catalog_auto_title').hide();
          if (!_this.catalogParts) {
            _this.catalogParts = JSON.parse(JSON.stringify(_this.$responseData));
            _this.$responseData = [];
            _this.$currentData = [];
          }
          $('#catalog').hide();
          if ($('#advanced-search-checkbox').is(':checked')) {
            $('#catalog').hide();
            _this.$submodel.val(_this.FilterAdvanced.selectedParts.submodel.submodel);
            _this.$engine.val(_this.FilterAdvanced.selectedParts.engine.engine_short);
            _this.$transmission.val(_this.FilterAdvanced.selectedParts.transmission.transmission);
            _this.$bodyType.val(_this.FilterAdvanced.selectedParts.bodyType.body_type);
            _this.$driveType.val(_this.FilterAdvanced.selectedParts.driveType.drive_type);
            _this.$brake.val(_this.FilterAdvanced.selectedParts.brake.brake);
          }
          console.log("Search by Part");
        })
      }

      $("#inner1").on("change", function () {
        _this.showSelectedInnerParts();
        _this.checkoutValueOnSelected();
      });
    }

    openAdvanced() {
      this.FilterAdvanced.open(
        this.$apiResponseData,
        this.$submodel.val(),
        this.$engine.val(),
        this.$bodyType.val(),
        this.$brake.val(),
        this.$driveType.val(),
        this.$transmission.val(),
      );
    }

    clearSelects(type) {
      $("#inner1").fadeOut();

      let _this = this;
      switch (type) {
        case "type":
          _this.$year.html(
            '<option value="" data-loading selected>Year</option>'
          );
          _this.$year.attr("disabled", true);
          _this.rebuildSelect(_this.$year);
          _this.hideInfotitle();
          _this.hideProductBlock();

        case "region":
          _this.$year.html(
            '<option value="" data-loading selected>Year</option>'
          );
          _this.$year.attr("disabled", true);
          _this.rebuildSelect(_this.$year);
          _this.hideInfotitle();
          _this.hideProductBlock();

        case "year":
          _this.$make.html(
            '<option value="" data-loading selected>Make</option>'
          );
          _this.$make.attr("disabled", true);
          _this.rebuildSelect(_this.$make);
          _this.hideInfotitle();
          _this.hideProductBlock();

        case "make":
          _this.$model.html(
            '<option value="" data-loading selected>Model</option>'
          );
          _this.$model.attr("disabled", true);
          _this.rebuildSelect(_this.$model);
          _this.$model.val("").change();
          _this.hideInfotitle();
          _this.hideProductBlock();

        case "model":
          break;
      }
    }
    // Удаление блоков строк зачение поиковых запросов при переключении параметров
    hideInfotitle() {
      let catalogAutoTitle = $("#catalog_auto_title")[0];
      if (catalogAutoTitle) {
        catalogAutoTitle.style.display = "none";
      }
      let catalogNodata = $(".catalog_nodata")[0];
      if (catalogNodata) {
        catalogNodata.style.display = "none";
      }
    }

    hideProductBlock() {
      let catalog = $("#catalog");
      let catalogContainer = $("#catalog")[0];
      if (catalogContainer) {
        catalog.html("");
        catalogContainer.style.display = "none";
      }
    }

    loadYears(selected = false) {
      let _this = this;

      this.getList("years", {}, _this.$year, selected);
    }
    loadMakes(year, selected = false) {
      let _this = this;

      this.getList(
        "makes",
        {
          year: year,
        },
        _this.$make,
        selected
      );
    }
    loadModels(year, make, selected = false) {
      let _this = this;

      this.getList(
        "models",
        {
          year: year,
          make: make,
        },
        _this.$model,
        selected
      );
    }

    checkModel(year, make, model) {
      let _this = this;
      let load_catalog = $("#load_catalog");
      let catalog = $("#catalog");
      let engine = _this.$engine.val();
      let submodel = _this.$submodel.val();

      _this.hideInfotitle();

      _this.loadingBlock(load_catalog, true);

      return $.ajax({
        url: ApiCatalog.url,
        type: "GET",
        data: Object.assign(
          {
            region_id: _this.getRegionId(),
            action: "apicatalog:checkModel",
            nonce: ApiCatalog.nonce,
          },
          {
            year: year,
            make: make,
            model: model,
          }
        ),
        success: function (res) {
          if (res && res.success) {
            if (res.data) {
              console.log("checkModel отрабатывает", res.data);

              $("#inner1").fadeIn().css("display", "grid");

              if (
                res.data.engines ||
                res.data.vehicles ||
                res.data.drive_types
              ) {
                load_catalog.html("");
                $("#catalog_row").html("");

                if (res.data.part_applications.length > 0) {
                  _this.partsSearch(year, make, model);
                } else {
                  load_catalog.html(
                    '<div class="catalog_nodata">No data available</div>'
                  );
                  catalog.html("");
                }
              }
              //Когда api отвечает фигню
              else {
                load_catalog.html(
                  '<div class="catalog_nodata">No data available</div>'
                );
                catalog.html("");
              }
              // конец if (res.data) {
            }
          }
        },
        error: function (xhr) {
          load_catalog.html("");
          let json = xhr.responseJSON || {};
          _this.showError(json.msg || "Unknown");
        },
      });
    }

    partSearch(partName) {
      let _this = this;
      let load_catalog = $("#load_catalog");
      let catalog_auto_title = $("#catalog_auto_title");
      let catalog = $("#catalog");
      let catalog_row = $("#catalog_row");

      catalog_row.html("");
      _this.hideProductBlock();
      _this.hideInfotitle();
      _this.loadingBlock(load_catalog, true);

      const url =
        "https://catalog.loopautomotive.com/catalog/part-search?part_number=" +
        partName;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onload = () => {
        if (xhr.status != 200) {
          let loadCatalogBlock = document.querySelector("#load_catalog");
          loadCatalogBlock.innerHTML =
            '<div class="catalog_nodata">No data available</div>';
          $(loadCatalogBlock).fadeIn().css("display", "flex");
          return;
        }
        const response = JSON.parse(xhr.responseText)[0];
        if (!response) {
          return;
        }
        const qualifierString =
          response.position + " | " + "Dont have qualifier";

        const formattedResponse = {
          fitment_type: "OE Replacement",
          [response.pg_name]: {
            [qualifierString]: [
              {
                description: response.description,
                fitment_type: 0,
                make_id: response.make_id,
                part_app_ids: 0,
                part_id: response.id,
                part_number: response.number,
                part_type_id: 0,
                position: response.position,
                position_id: 0,
                product_group: response.pg_name,
                product_group_id: response.product_group_id,
                qualifier: null,
                quantity: 2,
                specification_group: response.specification_group,
                vehicle_ids: 0,
              },
            ],
          },
        };

        _this.$responseData = [formattedResponse];

        _this.$responseData = _this.modifyFilteredData(_this.$responseData);

        _this.$currentData = _this.$responseData;

        this.create_parts(_this.$currentData, true);

        catalog_auto_title.html("Found 1 part");
        catalog_auto_title.fadeIn().css("display", "flex");

        catalog.fadeIn();

        window.dispatchEvent(new Event("resize"));

        _this.loadingBlock(load_catalog, false);
      };

      xhr.send();
    }

    partsSearch(year, make, model, engine, submodel) {
      let _this = this;
      let load_catalog = $("#load_catalog");
      let catalog_auto_title = $("#catalog_auto_title");
      let catalog = $("#catalog");
      let catalog_row = $("#catalog_row");

      catalog_row.html("");
      _this.loadingBlock(load_catalog, true);

      // Создаем объект данных для запроса
      let requestData = {
        region_id: _this.getRegionId(),
        type_id: _this.getTypeId(),
        action: "apicatalog:partsSearch",
        nonce: ApiCatalog.nonce,
        year: year,
        make: make,
        model: model,
      };

      return $.ajax({
        url: ApiCatalog.url,
        type: "GET",
        data: requestData,
        success: function (res) {
          if (res && res.success) {
            if (res.data) {
              console.log(
                "Данные поиска для группы продуктовых линий:",
                res.data
              );
              _this.$apiResponseData = res.data;

              //Находим все массивы Brake Pads и объединяем их
              let combinedBrakePads = [];
              let firstBrakePadsIndex = -1;
              let deletedIndex = -1;

              res.data.part_applications.forEach((app, index) => {
                if (app["Brake Pads"]) {
                  combinedBrakePads = combinedBrakePads.concat(
                    app["Brake Pads"]
                  );
                  if (firstBrakePadsIndex === -1) {
                    firstBrakePadsIndex = index;
                  }
                  delete app["Brake Pads"];
                  deletedIndex = index;
                }
              });

              if (deletedIndex !== -1 && deletedIndex != firstBrakePadsIndex) {
                delete res.data.part_applications[deletedIndex];
                res.data.part_applications.length--;
              }

              // Вставляем объединенный массив Brake Pads в первый найденный объект
              if (firstBrakePadsIndex !== -1) {
                res.data.part_applications[firstBrakePadsIndex]["Brake Pads"] =
                  combinedBrakePads;
              }

              let brakeShoes = null;
              let brakeShoesIndex = -1;
              let wheelHubs = null;
              let wheelHubsIndex = -1;

              res.data.part_applications.forEach((app, index) => {
                const key = _this.getDynamicKey(app);

                if (key == "Wheel Hubs") {
                  wheelHubs = JSON.parse(JSON.stringify(app));
                  wheelHubsIndex = index;
                }
                if (key == "Brake Shoes") {
                  brakeShoes = JSON.parse(JSON.stringify(app));
                  brakeShoesIndex = index;
                }

              });

              if (brakeShoes && wheelHubs) {
                res.data.part_applications[brakeShoesIndex] = wheelHubs;
                res.data.part_applications[wheelHubsIndex] = brakeShoes;
              }

              _this.$responseData = _this.modifyFilteredData(
                res.data.part_applications
              );

              _this.$currentData = _this.$responseData;

              catalog_auto_title.html(
                make +
                  " " +
                  model +
                  " " +
                  (engine || "") +
                  " " +
                  (submodel || "") +
                  " " +
                  year
              );
              // catalog_auto_title.fadeIn().css("display", "flex");

              if (Array.isArray(res.data.param_weights)) {
                // Проверка на пустой массив
                if (
                  res.data.param_weights.length === 0 &&
                  res.data.part_applications.length > 0
                ) {
                  _this.create_parts(_this.$currentData);
                  catalog.fadeIn();
                } else {
                  catalog.fadeOut();
                }
              } else if (
                typeof res.data.param_weights === "object" &&
                res.data.param_weights !== null
              ) {
                if (Object.keys(res.data.param_weights).length > 0) {
                  $("#advanced-search").show();
                  // _this.showSelectedInnerParts();
                  _this.checkoutValueOnSelected();
                }
              }

              _this.setIntersections();

              _this.showSelectedInnerParts();

              window.dispatchEvent(new Event("resize"));

              _this.loadingBlock(load_catalog, false);
            }
          }
        },
        error: function (xhr) {
          load_catalog.html("");
          let json = xhr.responseJSON || {};
          _this.showError(json.msg || "Unknown");
        },
      });
    }

    checkoutValueOnSelected() {
      let catalog = $("#catalog");
      let catalog_row = $("#catalog_row");
      let catalog_auto_title = $("#catalog_auto_title");

      catalog_row.html("");

      let _this = this;
      let dataOnResponseData = _this.$apiResponseData;

      let allKeysHaveValues; // Флаг для отслеживания состояния всех ключей
      if (dataOnResponseData) {
        if (dataOnResponseData.param_weights) {
          // let keys = Object.keys(dataOnResponseData.param_weights);
          // let valueSet = false; // Флаг для проверки, есть ли хотя бы одно установленное значение

          let getIntersections = this.setIntersections();
          // console.log("getIntersections", getIntersections);
          let intersections = this.findIntersection();
          // console.log("checkoutValueOnSelected intersections", intersections);
          const intersectionKeys = [
            ...new Set(
              intersections.flatMap((intersection) => Object.keys(intersection))
            ),
          ];

          let allKeysHaveValues = true;
          let getVenId = null;
          allKeysHaveValues = intersectionKeys.every((key) => {
            let keyValue = "";
            switch (key) {
              case "submodel":
                keyValue = _this.$submodel.val();
                if (_this.$apiResponseData.vehicles.length === 1) {
                  keyValue = "true";
                }
                break;
              case "engine":
                keyValue = _this.$engine.val();
                if (_this.$apiResponseData.engines.length === 1) {
                  keyValue = "true";
                }
                break;
              case "transmission":
                keyValue = _this.$transmission.val();
                if (_this.$apiResponseData.transmissions.length === 1) {
                  keyValue = "true";
                }
                break;
              case "body_type":
                keyValue = _this.$bodyType.val();
                if (_this.$apiResponseData.body_types.length === 1) {
                  keyValue = "true";
                }
                break;
              case "brake":
                keyValue = _this.$brake.val();
                if (_this.$apiResponseData.brake.length === 1) {
                  keyValue = "true";
                }
                break;
              case "drive_type":
                keyValue = _this.$driveType.val();
                if (_this.$apiResponseData.drive_types.length === 1) {
                  keyValue = "true";
                }
                break;
            }
            return keyValue !== "" && keyValue !== "I Don't Know";
          });

          if (intersections.length === 0) {
            allKeysHaveValues = true;
          }

          // let checkForExactMatches = _this.checkAllExactMatches();
          // if (checkForExactMatches) {
          //   console.log("если все true", _this.checkAllExactMatches());
          //   allKeysHaveValues = true;
          // }

          if ($("#advanced-search-checkbox").is(":checked")) {
            allKeysHaveValues = true;
          }

          if (allKeysHaveValues) {
            catalog.html("");
            _this.updateCurrentData();
            catalog.fadeIn();
            intersections = [];

            catalog_auto_title.fadeIn().css("display", "flex");
            $("#catalog").fadeIn().css("display", "block");
          } else {
            //Здесь было fadeIn но я думаю надо fadeOut
            catalog_auto_title.fadeOut().css("display", "none");
            catalog.html("");
            catalog.fadeOut();
            return;
          }
        }
      }
    }

    filterIds(allIds, selectedValue, dataArray, key) {
      let _this = this;

      if (selectedValue !== "") {
        const currentIds = dataArray.find(
          (item) => item[key] === selectedValue
        )?.vehicle_ids;

        console.log(selectedValue);

        if (currentIds) {
          for (let i = allIds.length - 1; i >= 0; i--) {
            if (!currentIds.includes(allIds[i])) {
              allIds.splice(i, 1);
            }
          }
        }
        else if (key === 'submodel')
        {
          const currentId = dataArray.find(
            (item) => item[key] === selectedValue
          )?.vehicle_id

          console.log(currentId);

          if (currentId) {
            for (let i = allIds.length - 1; i >= 0; i--) {
              if (currentId !== allIds[i]) {
                allIds.splice(i, 1);
              }
            }
          }
        }
      }
    }

    showSelectedInnerParts() {
      let _this = this;

      let submodelBlock = document.querySelector('[data-id="6"]');
      let engineBlock = document.querySelector('[data-id="7"]');
      let transmissionsBlock = document.querySelector('[data-id="8"]');
      let bodyTypesBlock = document.querySelector('[data-id="9"]');
      let brakesBlock = document.querySelector('[data-id="10"]');
      let driveTypeBlock = document.querySelector('[data-id="11"]');

      let submodelVal = _this.$submodel.val();

      let engineVal = _this.$engine.val();
      let transmissionVal = _this.$transmission.val();
      let bodyTypeVal = _this.$bodyType.val();
      let brakeVal = _this.$brake.val();
      let driveTypeVal = _this.$driveType.val();

      // Сброс выпадающего списка трансмиссий
      _this.$submodel.html('<option value="" selected>Submodel</option>');
      _this.rebuildSelect(_this.$submodel);

      _this.$engine.html('<option value="" selected>Engine</option>');
      _this.rebuildSelect(_this.$engine);

      _this.$transmission.html(
        '<option value="" selected>Transmission</option>'
      );
      _this.rebuildSelect(_this.$transmission);

      _this.$bodyType.html('<option value="" selected>Body Type</option>');
      _this.rebuildSelect(_this.$bodyType);

      _this.$brake.html('<option value="" selected>Brake</option>');
      _this.rebuildSelect(_this.$brake);

      _this.$driveType.html('<option value="" selected>Drive Type</option>');
      _this.rebuildSelect(_this.$driveType);

      // Получение данных трансмиссий
      let requestData = this.$apiResponseData ?? {};
      let dataOnSubmodels = [...(requestData.vehicles ?? [])];
      let dataOnEngines = [...(requestData.engines ?? [])];
      let dataOnTransmissions = [...(requestData.transmissions ?? [])];
      let dataOnBodyTypes = [...(requestData.body_types ?? [])];
      let dataOnBrakes = [...(requestData.brakes ?? [])];
      let dataOnDriveTypes = [...(requestData.drive_types ?? [])];

      const submodelsId = dataOnSubmodels.flatMap(
        (submodel) => submodel.vehicle_id
      );
      const engineIds = dataOnEngines.flatMap((engine) => engine.vehicle_ids);
      // console.log(engineIds);
      const transmissionsIds = dataOnTransmissions.flatMap(
        (transmission) => transmission.vehicle_ids
      );
      const bodyTypeIds = dataOnBodyTypes.flatMap(
        (bodyType) => bodyType.vehicle_ids
      );
      const brakeIds = dataOnBrakes.flatMap((brake) => brake.vehicle_ids);
      const driveTypeIds = dataOnDriveTypes.flatMap(
        (driveType) => driveType.vehicle_ids
      );

      let allIds = 
          [
            ...(submodelsId || []),
            ...(engineIds || []),
            ...(transmissionsIds || []),
            ...(bodyTypeIds || []),
            ...(brakeIds || []),
            ...(driveTypeIds || []),
          ];


      allIds = [... new Set(allIds)];

      const weights = _this.$apiResponseData?.param_weights ?? {};

      const functionsToExecute = [
        {
          name: "submodel",
          func: () => {
            const isSubmodelShown = this.filterItems(allIds, dataOnSubmodels, "submodel", _this.$submodel, submodelBlock, submodelVal);
            return isSubmodelShown;
          }
        },
        {
          name: "engine",
          func: () => {
            const isEngineShown = this.filterItems(allIds, dataOnEngines, "engine", _this.$engine, engineBlock, engineVal);
            return isEngineShown;
          }
        },
        {
          name: "transmission",
          func: () => {
            const isTransmissionShown = this.filterItems(allIds, dataOnTransmissions, "transmission", _this.$transmission, transmissionsBlock, transmissionVal);
            return isTransmissionShown;
          }
        },
        {
          name: "body_type",
          func: () => {
            const isBodyTypeShown = this.filterItems(allIds, dataOnBodyTypes, "body_type", _this.$bodyType, bodyTypesBlock, bodyTypeVal);
            return isBodyTypeShown;
          }
        },
        {
          name: "brake",
          func: () => {
            const isBrakeShown = this.filterItems(allIds, dataOnBrakes, "brake", _this.$brake, brakesBlock, brakeVal);
            return isBrakeShown;
          }
        },
        {
          name: "drive_type",
          func: () => {
            const isDriveTypeShown = this.filterItems(allIds, dataOnDriveTypes, "drive_type", _this.$driveType, driveTypeBlock, driveTypeVal);
            return isDriveTypeShown;
          }
        }
      ];
      
      // Сортируем массив по полю order, используя объект weights
      functionsToExecute.sort((a, b) => - (weights[a.name] || 0) + (weights[b.name] || 0));
      
      // Выполняем функции в отсортированном порядке и сохраняем результаты
      const results = functionsToExecute.map(item => {
        return {
          name: item.name,
          isShown: item.func()
        };
      });

      const isSubmodelShown = results.find(item => item.name === "submodel").isShown;
      const isEngineShown = results.find(item => item.name === "engine").isShown;
      const isTransmissionShown = results.find(item => item.name === "transmission").isShown;
      const isBodyTypeShown = results.find(item => item.name === "body_type").isShown;
      const isBrakeShown = results.find(item => item.name === "brake").isShown;
      const isDriveTypeShown = results.find(item => item.name === "drive_type").isShown;
      
      _this.showAfterSelection(
        isSubmodelShown,
        isEngineShown,
        isTransmissionShown,
        isBodyTypeShown,
        isBrakeShown,
        isDriveTypeShown
      );
    }

    filterItems(allIds, data, key, select, block, val) {
      if (key === "engine") {
        key = "engine_short";
      }
      const selectedItem = val;

      if (key === "engine_short") {
        key = "engine";
      }

      const isItemShown = this.handleOptions(
        data,
        select,
        key,
        selectedItem,
        block,
        allIds
      );

      if (key === "engine") {
        key = "engine_short";
      }

      this.filterIds(allIds, val, data, key);

      return isItemShown;
    }

    handleOptions(data, element, type, selectedValue, block, allIds) {
      let _this = this;

      if (!$('#advanced-search-checkbox').is(':checked')) {

        if (type !== "submodel") {
          data = data.filter(
            (item) =>
              item[type] === "I Don't Know" ||
              allIds.some((id) => item.vehicle_ids.includes(id))
          );
        } else {
          data = data.filter(
            (item) =>
              item[type] === "I Don't Know" ||
              allIds.some((id) => item.vehicle_id === id)
          )
        }
      }

      let intersections = this.findIntersection();
      // console.log("intersections", intersections);
      const intersectionKeys = [
        ...new Set(
          intersections.flatMap((intersection) => Object.keys(intersection))
        ),
      ];

      let isShown = true;
      if (!intersectionKeys.includes(type)) {
        isShown = false;
      }

      if (type === 'engine') {
        type = 'engine_short';
      }

      //Если в adv search была выбрана деталь, затем в обыченом выбрана несовместимая
      //То очистить значение 

      if (data && data.length > 1) {
        _this.setOptionsInner(data, element, type, selectedValue);
      } else {
        if (data && data.length == 1) {
          _this.setOptionsInner(data, element, type, data[0][type]);
          element.attr("disabled", true);
        }
        block.style.display = "none";
      }

      if (block.style.display == "block") {
        block.style.display = isShown ? "block" : "none";
      }

      if (!isShown) {
        // Я не помню зачем это добавлял, но оно лучше не надо
        // _this.selectedParts[type] = {};
      }

      return isShown;
    }

    hideBlocks() {
      let blocks = [
        document.querySelector('[data-id="6"]'),
        document.querySelector('[data-id="7"]'),
        document.querySelector('[data-id="8"]'),
        document.querySelector('[data-id="9"]'),
        document.querySelector('[data-id="10"]'),
        document.querySelector('[data-id="11"]'),
      ];

      blocks.forEach((block) => {
        block.style.display = "none";
      });
    }

    showAfterSelection(
      isSubmodelShown,
      isEngineShown,
      isTransmissionShown,
      isBodyTypeShown,
      isBrakeShown,
      isDriveTypeShown
    ) {
      let _this = this;

      const weights = _this.$apiResponseData?.param_weights;

      const submodelBlock = document.querySelector('[data-id="6"]');
      const engineBlock = document.querySelector('[data-id="7"]');
      const transmissionBlock = document.querySelector('[data-id="8"]');
      const bodyTypeBlock = document.querySelector('[data-id="9"]');
      const brakeBlock = document.querySelector('[data-id="10"]');
      const driveTypeBlock = document.querySelector('[data-id="11"]');

      let blocksC = [
        {
          block: submodelBlock,
          type: "submodel",
          value: _this.$submodel.val(),
          isShown: isSubmodelShown,
          select: _this.$submodel,
        },
        {
          block: engineBlock,
          type: "engine",
          value: _this.$engine.val(),
          isShown: isEngineShown,
          select: _this.$engine,
        },
        {
          block: transmissionBlock,
          type: "transmission",
          value: _this.$transmission.val(),
          isShown: isTransmissionShown,
          select: _this.$transmission,
        },
        {
          block: bodyTypeBlock,
          type: "body_type",
          value: _this.$bodyType.val(),
          isShown: isBodyTypeShown,
          select: _this.$bodyType,
        },
        {
          block: brakeBlock,
          type: "brake",
          value: _this.$brake.val(),
          isShown: isBrakeShown,
          select: _this.$brake,
        },
        {
          block: driveTypeBlock,
          type: "drive_type",
          value: _this.$driveType.val(),
          isShown: isDriveTypeShown,
          select: _this.$driveType,
        },
      ];

      if (weights) {
        blocksC.sort((a, b) => {
          const weightA = weights[a.type] || 0;
          const weightB = weights[b.type] || 0;
          return weightB - weightA; // Сортировка по убыванию веса
        });
      }

      const container = document.querySelector("#inner1");
      container.innerHTML = ""; // Очищаем контейнер перед добавлением новых блоков

      blocksC.forEach((block) => {
        container.appendChild(block.block); // Добавляем блок в контейнер
      })


      blocksC = blocksC.filter(
        (block) => block.isShown && this.getLength(block.block) > 3
      );

      let block = blocksC.find((block) => {
        return block.isShown && block.block.style.display == "none";
      });

      if (!block) {
        return;
      }

      block.block.style.display = "block";

      if (block.value) {
        block.select.val(block.value).change();
      }
    }

    getLength(block) {
      return block.querySelectorAll("option")?.length;
    }

    //Создаем список всех связаных деталей
    setIntersections() {
      let _this = this;
      const parts = this.$apiResponseData.part_applications;

      _this.carIntersection = [];

      parts.forEach((group) => {
        const parts = this.getDynamicValue(group);
        parts.forEach((part) => {
          const applications = part.applications;
          if (!applications) {
            return;
          }
          applications.forEach((application) => {
            _this.carIntersection.push(application);
          });
        });
      });
    }

    //Получить детали, связанные с текущей машиной
    findIntersection(isClear = false) {
      const params = {
        submodel:
          this.$submodel.val() !== "I Don't Know" ? this.$submodel.val() : "",
        engine: this.$engine.val() !== "I Don't Know" ? this.$engine.val() : "",
        body_type:
          this.$bodyType.val() !== "I Don't Know" ? this.$bodyType.val() : "",
        transmission:
          this.$transmission.val() !== "I Don't Know"
            ? this.$transmission.val()
            : "",
        brake: this.$brake.val() !== "I Don't Know" ? this.$brake.val() : "",
        drive_type:
          this.$driveType.val() !== "I Don't Know" ? this.$driveType.val() : "",
      };

      if (isClear) {
        params.submodel = "";
        params.engine = "";
        params.body_type = "";
        params.transmission = "";
        params.brake = "";
        params.drive_type = "";
      }

      return this.carIntersection.filter((item) => {
        return Object.keys(params).every((key) => {
          return (
            !item[key] || params[key] === "" || item[key].value === params[key]
          );
        });
      });
    }

    updateCurrentData(data = false) {
      let _this = this;

      let newData = [..._this.$responseData];

      if (!data) {
        newData = _this.getProductsForValues(newData);
      } else {
        newData = JSON.parse(JSON.stringify(data)); // Клонируем массив
      }

      if (!newData) {
        return;
      }

      this.$currentData = newData;

      _this.create_parts(newData);
    }

    findPropertyByVehicleId(vehiclesId, key) {
      let _this = this;

      let apiResponseData = _this.$apiResponseData
        ? _this.$apiResponseData
        : null;
      let resultArr = [];

      if (apiResponseData) {
        if (apiResponseData.transmissions) {
          let allProperties = apiResponseData[key];

          const parsedVehiclesId = Number(vehiclesId);

          allProperties.forEach((item) => {
            if (item.vehicle_ids || item.exact_match) {
              if (item.vehicle_ids.includes(parsedVehiclesId)) {
                resultArr.push(item);
              }
            }
          });
        }
      }

      return resultArr.length > 0 ? resultArr : null;
    }

    getProductsForValues(data) {
      let _this = this;
      let productAll = data;
      let result = [];

      if (productAll) {
        productAll.forEach((itemCategory) => {
          let fitmentTypeValue = itemCategory.fitment_type; // fitment_type
          let dynamicKey = _this.getDynamicKey(itemCategory);

          if (dynamicKey) {
            let itemQualifierGroup = itemCategory[dynamicKey];
            let objWithFilter = {};

            if (
              typeof itemQualifierGroup === "object" &&
              itemQualifierGroup !== null
            ) {
              for (let key in itemQualifierGroup) {
                let productsIntoQualifierGroup = itemQualifierGroup[key];
                let filteredProducts = [];

                productsIntoQualifierGroup.forEach((itemProduct) => {
                  let options = itemProduct.applications;
                  let isAdded = false; // Флаг для отслеживания добавления

                  if (itemProduct.exact_match && !isAdded) {
                    filteredProducts.push(itemProduct);
                    isAdded = true;
                    return;
                  }

                  options.forEach((itemOption) => {
                    const keys = Object.keys(itemOption);
                    let isAllGood = true;
                    for (let key of keys) {
                      let myVal;
                      switch (key) {
                        case "submodel":
                          myVal = _this.$submodel.val();
                          break;
                        case "engine":
                          myVal = _this.$engine.val();
                          break;
                        case "transmission":
                          myVal = _this.$transmission.val();
                          break;
                        case "brake":
                          myVal = _this.$brake.val();
                          break;
                        case "drive_type":
                          myVal = _this.$driveType.val();
                          break;
                        case "body_type":
                          myVal = _this.$bodyType.val();
                          break;
                      }

                      if (
                        itemOption[key].value != myVal &&
                        myVal !== "" &&
                        myVal !== "I Don't Know" &&
                        !myVal.includes(itemOption[key].value)
                      ) {
                        isAllGood = false;
                        break;
                      }
                    }
                    if (isAllGood && !isAdded) {
                      filteredProducts.push(itemProduct);
                      isAdded = true;
                    }
                  });
                });

                if (filteredProducts.length > 0) {
                  objWithFilter[key] = filteredProducts;
                }
              }
            }

            if (Object.keys(objWithFilter).length > 0) {
              result.push({
                fitment_type: fitmentTypeValue,
                [dynamicKey]: objWithFilter,
              });
            }
          }
        });

        return result.length > 0 ? result : null;
      }

      return null;
    }

    hasSortedProducts(filteredData) {
      if (filteredData) {
        for (let item of filteredData) {
          let dynamicKey = this.getDynamicKey(item);

          if (dynamicKey) {
            let dynamicValue = item[dynamicKey];

            if (typeof dynamicValue === "object" && dynamicValue !== null) {
              for (let keyObj in dynamicValue) {
                if (dynamicValue.hasOwnProperty(keyObj)) {
                  if (
                    Array.isArray(dynamicValue[keyObj]) &&
                    dynamicValue[keyObj].length > 0
                  ) {
                    return true; // Возвращаем true, если найден объект
                  }
                }
              }
            }
          }
        }
      }
      return false;
    }

    closeAdvancedSearch() {
      $("#advanced-search").hide();
      this.showSelectedInnerParts();
    }

    modifyFilteredData(filteredData) {
      if (!filteredData) {
        return null;
      }

      return filteredData.map((item) => {
        if (item) {
          let fitmentTypeValue = item.fitment_type;
          let dynamicKey = this.getDynamicKey(item); // Получаем динамический ключ
          let dynamicValue = item[dynamicKey]; // Получаем массив по динамическому ключу

          if (Array.isArray(dynamicValue) && dynamicValue.length > 0) {
            // Сортируем продукты внутри динамического значения
            let sortedObj = this.sortByQualifierProduct(dynamicValue);

            // Возвращаем объект с сохранением всех свойств
            return {
              ...item, // Сохраняем все свойства из оригинального объекта
              [dynamicKey]: sortedObj, // Обновляем только динамическое значение
            };
          }
        }
        return item; // Возвращаем оригинальный объект, если нет изменений
      });
    }

    create_parts(data) {
      let _this = this;
      data = _this.modifyFilteredData(data);
      let catalog = $("#catalog");
      let catalog__wrapper = catalog.find(".catalog__wrapper");

      // Сортируем продукты при клике по категориям, положению и линиям
      data = _this.needToSortProduct(data);

      catalog__wrapper.html("");

      let validfilteredMatches = data;

      let ifhasSortedProducts = _this.hasSortedProducts(validfilteredMatches);

      validfilteredMatches = this.modifyFilteredData(validfilteredMatches);

      if (ifhasSortedProducts) {
        this.renderParts(validfilteredMatches);
      } else {
        this.renderNoData(catalog);
        this.closeAdvancedSearch();
      }
    }

    checkAllExactMatches = () => {
      let _this = this;
      let data = _this.$currentData;
      // console.log("это до проверки на checkAllExactMatches", data);
      return data.every((group) => {
        const groupKey = this.getDynamicKey(group);
        const groupValue = group[groupKey];

        return Object.values(groupValue).every((items) => {
          return items.every((item) => item.exact_match === true);
        });
      });
    };

    removeNonExactMatches = (data) => {
      return data
        .map((group) => {
          const groupKey = this.getDynamicKey(group);
          const groupValue = group[groupKey];

          const filteredItems = {};

          for (const subKey in groupValue) {
            const items = groupValue[subKey];

            if (Array.isArray(items)) {
              // Фильтруем элементы, где exact_match не равно true
              const nonExactMatches = items.filter(
                (item) => item.exact_match === true
              );

              // Если есть элементы, которые остались, добавляем их в filteredItems
              if (nonExactMatches.length > 0) {
                filteredItems[subKey] = nonExactMatches;
              }
            }
          }

          // Возвращаем объект с обновленными данными
          return {
            [groupKey]: filteredItems,
          };
        })
        .filter((group) => {
          // Удаляем группы, где нет элементов
          const groupKey = Object.keys(group)[0];
          return Object.keys(group[groupKey]).length > 0; // Оставляем только непустые группы
        });
    };

    renderParts(filteredData) {
      let _this = this;
      let catalog = $("#catalog"); // Контейнер всех продуктов
      let catalog__wrapper = catalog.find(".catalog__wrapper");
      let catalog_auto_title = $("#catalog_auto_title");

      catalog_auto_title.fadeIn().css("display", "flex");   
      if (!catalog__wrapper[0]) {
        let catalog__container = document.createElement("div");
        catalog__container.classList.add("catalog__container");

        let catalog__clear = document.createElement("div");
        catalog__clear.classList.add("catalog__clear");

        let clearButton = document.createElement("button");
        clearButton.classList.add("clear");

        let clear__value = document.createElement("span");
        clear__value.classList.add("clear__value");

        let clear__content = document.createElement("span");
        clear__content.classList.add("clear__content");
        clear__content.innerHTML = "Clear filter";

        clear__value.append(clear__content);
        clearButton.append(clear__value);
        catalog__clear.append(clearButton);

        catalog__wrapper = document.createElement("div");
        catalog__wrapper.classList.add("catalog__wrapper");

        catalog__container.append(catalog__clear);
        catalog__container.append(catalog__wrapper);

        catalog[0].append(catalog__container);
      }

      let catalogNodata = $(".catalog_nodata")[0];
      if (catalogNodata) {
        catalogNodata.style.display = "none";
      }
      catalog[0].style.display = "block";

      const fullContainer = document.createElement("div");
      fullContainer.classList.add("full-container");
      if (filteredData) {
        filteredData.forEach((obj) => {
          if (obj) {
            this.renderPartContainer(obj, fullContainer);
          }
        });
      }

      catalog__wrapper.append(fullContainer);
    }

    renderPartContainer(productObject, fullContainer) {
      const partContainer = this.createPartContainer(productObject);
      fullContainer.append(partContainer);
      return partContainer;
    }

    createPartContainer(dataAllCategory) {
      const dynamicValue = this.getDynamicValue(dataAllCategory);
      const dynamicKey = this.getDynamicKey(dataAllCategory);

      const sorteddataForFender = dynamicValue;

      let partContainer = document.createElement("div");
      partContainer.classList.add("container-catalog");

      let partHeaderContainer = this.createPartHeaderContainer(dynamicKey);
      partContainer.append(partHeaderContainer);

      let partContainerBasic =
        this.createCategoryContainer(sorteddataForFender);
      partContainer.append(partContainerBasic);
      return partContainer;
    }

    createPartHeaderContainer(productCategory) {
      let partHeaderContainer = document.createElement("div");
      partHeaderContainer.classList.add("catalog__header");
      partHeaderContainer.classList.add("header-catalog");

      let partHeaderSpan = this.createPartHeaderSpan(productCategory);
      partHeaderContainer.append(partHeaderSpan);

      let partHeaderTitle = this.createPartHeaderTitle(productCategory);
      partHeaderContainer.append(partHeaderTitle);

      return partHeaderContainer;
    }

    createPartHeaderSpan(productCategory) {
      let partHeaderSpan = document.createElement("span");
      partHeaderSpan.classList.add("header-catalog__icon");
      // variable for getting category icon
      const objValueCategoryGroup = [
        "Brake Shoes",
        "Brake Kits",
        "Brake Pads",
        "Brake Rotors",
        "Brake Hardware",
        "Wheel Hubs",
      ];
      let numberIcon = objValueCategoryGroup.indexOf(productCategory);
      let numberOnIconCategory =
        "_icon-catalog" + (numberIcon > 0 ? numberIcon : 3);
      partHeaderSpan.classList.add(numberOnIconCategory);
      return partHeaderSpan;
    }

    createPartHeaderTitle(productCategory) {
      let partHeaderTitle = document.createElement("h2");
      partHeaderTitle.classList.add("header-catalog__heading");
      partHeaderTitle.textContent = productCategory;
      return partHeaderTitle;
    }

    createCategoryContainer(dataForFender) {
      let _this = this;
      let partContainerBasic = document.createElement("div");
      partContainerBasic.classList.add("container-catalog");

      for (const key in dataForFender) {
        let allProductsKeys = key;
        let allProductsValues = dataForFender[key];

        allProductsValues.sort((a, b) => {
          return (
            this.order.indexOf(a.part_number.match(/[A-Za-z]+/)[0]) -
            this.order.indexOf(b.part_number.match(/[A-Za-z]+/)[0])
          );
        });

        let categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");
        if ($("#advanced-search-checkbox").is(":checked")) {
          // background-color: #b2eab6af;
          dataForFender[key].every((item) => {
            item.exact_match ? categoryContainer.classList.add("category-container-exact_match") : null;
          });
        }

        let productsContainer = document.createElement("div");
        productsContainer.classList.add("products-container");

        const productCategory = allProductsValues[0].product_group;
        const productsSide = allProductsValues[0].position;

        let optionsContainer = _this.createOptionsContainer(
          allProductsKeys,
          productCategory,
          productsSide,
          allProductsValues[0].part_id
        );

        async function loadImage(image) {
          return new Promise((resolve) => {
            if (image.complete && image.src) {
              resolve();
            } else {
              image.onload = resolve;
              image.onerror = resolve; // В случае ошибки загрузки изображения
            }
          });
        }

        //Ждём прогрузки фото, достаём высоту, меняем высоту продуктов
        async function processImages() {
          const image = optionsContainer.querySelectorAll("img")[1];

          loadImage(image).then(() => {
            const height = optionsContainer.getBoundingClientRect().height;

            productsContainer.querySelectorAll(".item-catalog").forEach((partElement) => {
              partElement.style.height = `${height}px`;
              // partElement.classList.add("item-catalog-image-height");
            });
          });
        }

        categoryContainer.append(optionsContainer);

        allProductsValues.forEach((part) => {
          _this.createProduct(part, productsContainer);
          categoryContainer.append(productsContainer);
        });
        partContainerBasic.append(categoryContainer);

        processImages();
      }

      return partContainerBasic;
    }

    listImagesForProduct(allIdProduct) {
      let images = this.getImagesForProducts(allIdProduct);
      return images;
    }

    createProduct(part, productsContainer) {
      let _this = this;
      const isChecked = $("#advanced-search-checkbox").is(":checked");
      // Создаем элемент для части

      let partElement = document.createElement("div");
      partElement.classList.add("item-catalog");
      partElement.setAttribute("data-part_id", part.part_id);
      if (isChecked) {
        if (part.exact_match === true) {
          partElement.classList.add("item-catalog-exact_match");
        }
      }
      // if (!part.exact_match) {
      //   partElement.classList.add("item-catalog-non-exact_match");
      // }

      let part_icon = document.createElement("div");
      part_icon.classList.add("item-catalog__header-icons");
      part_icon.innerHTML =
        '<a href="#"><img src="/wp-content/themes/friction-master/assets/img/catalog/catalog-card1.svg" alt="" /></a>' +
        '<a href="#"><img src="/wp-content/themes/friction-master/assets/img/catalog/catalog-card2.svg" alt="" /></a>' +
        '<a href="#"><img src="/wp-content/themes/friction-master/assets/img/catalog/catalog-card3.svg" alt="" /></a>';

      let part_heading = document.createElement("div");
      part_heading.classList.add("item-catalog__header-heading");
      part_heading.textContent = part.part_number;

      let part_header = document.createElement("div");
      part_header.classList.add("item-catalog__header");
      part_header.append(part_icon);
      part_header.append(part_heading);

      let part_img = document.createElement("div");
      part_img.classList.add("item-catalog__image");

      // _this.getImagesForProducts(productIds);
      if (_this.groupedData[part.product_group]) {
        const partGroupData = _this.groupedData[part.product_group];
        const match = part.part_number.match(/[A-Za-z]+/);
        let letterPart;
        if (match) {
          letterPart = match[0];
        } else {
          letterPart = "D";
        }

        let result = Object.values(partGroupData).find((item) =>
          item.labeling.includes(letterPart)
        );

        if (result && result.imgId) {
          _this.imgCache = _this.imgCache || {};
          _this.imgPromises = _this.imgPromises || {};

          function loadImage(result) {
            if (_this.imgCache[result.imgId]) {
              part_img.innerHTML = `<img src="${
                _this.imgCache[result.imgId]
              }" alt="product image" />`;
            } else if (_this.imgPromises[result.imgId]) {
              _this.imgPromises[result.imgId].then((url) => {
                part_img.innerHTML = `<img src="${url}" alt="product image" />`;
              });
            } else {
              _this.imgPromises[result.imgId] = fetch(
                `/wp-json/wp/v2/media/${result.imgId}`
              )
                .then((imgResponse) => {
                  if (!imgResponse.ok) {
                    throw new Error(
                      "Network response was not ok " + imgResponse.statusText
                    );
                  }
                  return imgResponse.json();
                })
                .then((imgData) => {
                  const url = imgData.source_url;
                  _this.imgCache[result.imgId] = url;
                  delete _this.imgPromises[result.imgId]; // Удаляем промис после завершения
                  if (url === "") {
                    part_img.innerHTML = `<img src="/wp-content/themes/friction-master/assets/img/catalog/catalog-item1.jpg" alt="product image" />`;
                  } else {
                    part_img.innerHTML = `<img src="${url}" alt="product image" />`;
                  }
                  return url;
                })
                .catch((error) => {
                  delete _this.imgPromises[result.imgId]; // Удаляем промис в случае ошибки
                  part_img.innerHTML = `<img src="/wp-content/themes/friction-master/assets/img/catalog/catalog-item1.jpg" alt="product image" />`;
                });
            }
          }

          // Пример использования
          loadImage(result);
        } else {
          part_img.innerHTML = `<img src="/wp-content/themes/friction-master/assets/img/catalog/catalog-item1.jpg" alt="product image" />`;
        }
      }

      //Для wheel hubs почему-то не ставит картинку по умолчанию, сделал так
      if (part_img.innerHTML === "") {
        part_img.innerHTML = `<img src="/wp-content/themes/friction-master/assets/img/catalog/catalog-item1.jpg" alt="product image" />`;
      }

      let part_footer = document.createElement("div");
      part_footer.classList.add("item-catalog__footer");
      part_footer.innerHTML =
        '<a href="/product?part_id=' +
        part.part_id +
        "&car=" +
        `${_this.$make.val()}_${_this.$model.val()}_${_this.$year.val()}_${_this.$engine.val()}_${_this.$submodel.val()}` +
        "&region_id=" +
        `${_this.$region.val()}` +
        '">Show more</a><button type="submit" class="item-catalog__footer-button buy-button">BUY</button>';

      partElement.append(part_header);
      partElement.append(part_img);
      partElement.append(part_footer);

      productsContainer.append(partElement);
    }

    getDynamicValue(obj) {
      const dynamicKey = Object.keys(obj).find((key) => key !== "fitment_type");
      const dynamicValue = obj[dynamicKey];
      return dynamicValue;
    }

    getDynamicKey(obj) {
      const dynamicKey = Object.keys(obj).find((key) => key !== "fitment_type");
      return dynamicKey;
    }

    renderNoData(catalog) {
      let _this = this;
      let catalog_auto_title = $("#catalog_auto_title");
      let loadCatalogBlock = document.querySelector("#load_catalog");

      console.log("No data found");

      //Чтобы не было такого, что вылазит что детали найдены, а потом сразу пропадает
      catalog_auto_title.hide();
      // Очистка каталога
      $("#catalog_row").html("");

      // Установка сообщения
      loadCatalogBlock.innerHTML =
        '<div class="catalog_nodata">No data available</div>';

      // Показ блока с данными
      $(loadCatalogBlock).fadeIn().css("display", "flex");

      $("#load_catalog").html(
        '<div class="catalog_nodata">No data available</div>'
      );
      // Скрытие заголовка, если существует
      if (catalog_auto_title[0]) {
        catalog_auto_title.fadeOut(); // Изменено на fadeOut
      }

      // Очистка каталога
      $("#catalog").html("");
      if ((loadCatalogBlock.textContent = "")) {
        // Установка сообщения
        loadCatalogBlock.innerHTML =
          '<div class="catalog_nodata">No data available</div>';
      }
    }

    createOptionsContainer(
      nameCategory,
      productCategory,
      productCategorySide,
      productId
    ) {
      let _this = this;
      // Создаем элемент для части
      let partOptions = document.createElement("div");
      partOptions.classList.add("options-qualifier");
      partOptions.setAttribute("data-options", productCategory);
      let partOptionsHeading = null;
      if (!nameCategory.includes("Dont have qualifier")) {
        // Проверяем, содержит ли строка 'w/'
        if (nameCategory.includes("w/")) {
          // Удаляем 'w/' и возможный пробел после него
          nameCategory = nameCategory.replace(/w\/\s*/, "");
        }
        nameCategory = nameCategory.replace(
          /^(Front\s*\|\s*|Rear\s*\|\s*)/,
          ""
        );

        partOptionsHeading = document.createElement("h2");
        partOptionsHeading.classList.add("item-catalog__header-heading");
        partOptionsHeading.classList.add("item-options-heading");
        partOptionsHeading.textContent = nameCategory;

        partOptions.append(partOptionsHeading);
      }
      let partOptionsSide = document.createElement("div");
      partOptionsSide.classList.add("item-catalog__image");

      if (productCategorySide === "Rear") {
        partOptionsSide.innerHTML =
          '<img src="/wp-content/themes/friction-master/assets/img/catalog/inner-catalog-car-right.svg" alt="Side" />';
      } else if (productCategorySide === "Front") {
        partOptionsSide.innerHTML =
          '<img src="/wp-content/themes/friction-master/assets/img/catalog/inner-catalog-car-left.svg" alt="Side" />';
      } else {
        partOptionsSide.innerHTML =
          '<img src="/wp-content/themes/friction-master/assets/img/catalog/inner-catalog-car-all.svg" alt="Side" />';
      }

      partOptions.append(partOptionsSide);

      let partOptionsSxema = document.createElement("div");
      // item-catalog__header-icons
      partOptionsSxema.classList.add("item-catalog__image");

      const imgElement = document.createElement("img");

      //Получаем чертёж
      const url = `https://catalog.loopautomotive.com/catalog/part-images?part_ids=${productId}`;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.send();

      xhr.onload = function () {
        let productScheme = "";
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.length > 0 && data[0].tech_drawings.length > 0) {
            productScheme = data[0].tech_drawings[0];
          }
        }
        //Если чертежа нет, то по умолчаниюё
        let indexSxema = productScheme
          ? productScheme
          : "/wp-content/themes/friction-master/assets/img/catalog/catalog-sxem.jpg"; // Значение по умолчанию
        imgElement.src = indexSxema;
        imgElement.alt = "Sxema";
        if (partOptionsHeading !== null) {
          imgElement.style.width = "125px";
        } else {
          imgElement.style.width = "165px";
        }
      };

      // Добавляем <img> в div
      partOptionsSxema.appendChild(imgElement);

      // Добавляем div в родительский элемент
      partOptions.append(partOptionsSxema);

      //  inner-catalog-car-right.svg картинка которая соответсвует правой стороне
      //  inner-catalog-car-all.svg картинка которая соответсвует all
      //  inner-catalog-car-left.svg картинка которая соответсвует левой стороне

      let part_footer = document.createElement("p");
      part_footer.classList.add("item-catalog__footer");
      part_footer.style.textAlign = "center";
      part_footer.innerHTML =
        '<a href="/product?part_id=' +
        nameCategory +
        '">Compare product lines</a>';
      // part_footer.innerHTML = "Сравнить линейки";
      partOptions.append(part_footer);
      return partOptions;
    }

    sortByQualifierProduct(dataProducts) {
      const objQualifier = {};
      let catalog = $("#catalog"); // Контейнер всех продуктов

      // Группируем продукты по комбинации position и qualifier
      if (dataProducts) {
        dataProducts.forEach((product) => {
          const qualifier = product.qualifier || "Dont have qualifier"; // Используем "Dont have qualifier"
          const position = product.position;

          // Формируем ключ с учетом позиции и qualifier
          const categoryKey = `${position} | ${qualifier}`;

          // Проверяем, существует ли уже ключ в объекте
          if (!objQualifier.hasOwnProperty(categoryKey)) {
            objQualifier[categoryKey] = [];
          }

          // Добавляем продукт в массив
          objQualifier[categoryKey].push(product);
        });

        // Создаём новый объект для сортировки
        const sortedObjQualifier = {};

        // Сначала добавляем группы с exact_match === true
        Object.keys(objQualifier).forEach((key) => {
          const items = objQualifier[key];
          if (items.some((item) => item.exact_match === true)) {
            sortedObjQualifier[key] = items; // Добавляем всю группу
          }
        });

        // Затем добавляем остальные группы
        Object.keys(objQualifier).forEach((key) => {
          const items = objQualifier[key];
          if (!items.some((item) => item.exact_match === true)) {
            sortedObjQualifier[key] = items; // Добавляем всю группу
          }
        });

        // return sortedObjQualifier; // Возврат собранных данных
        let objWithCategory = {};
        // Обработка для группировки по part_number
        Object.keys(sortedObjQualifier).forEach((key) => {
          const itemsCategory = sortedObjQualifier[key];
          let nameCategory = key;
          const resultSorted = {};
          itemsCategory.forEach((productObj) => {
            const partNumber = productObj.part_number;
            const numberMatch = partNumber.match(/\d+/g);
            const numbers = numberMatch ? numberMatch[0] : "unknown";
            if (!resultSorted[numbers]) {
              resultSorted[numbers] = [];
            }
            resultSorted[numbers].push(productObj);
          });
          // Добавление в objWithCategory с префиксом, если необходимо
          Object.keys(resultSorted).forEach((numberKey) => {
            if (!objWithCategory.hasOwnProperty(nameCategory)) {
              objWithCategory[nameCategory] = resultSorted[numberKey];
            } else {
              let newNameCategory = nameCategory + " | " + numberKey;
              objWithCategory[newNameCategory] = resultSorted[numberKey];
            }
          });
        });

        return objWithCategory;
      }
      return null;
    }
    checkSubModel() {
      let _this = this;
      let submodel = _this.$submodel.val();

      if (submodel === "I Don't Know") {
        $("#inner1").hide();
        _this.openAdvanced();
        $("#advanced-search-checkbox").prop("checked", true).change();
      }

      if (submodel != "") {
        console.log("submodel", submodel);
      }
    }

    checkEngine() {
      let _this = this;
      let engine = _this.$engine.val();

      if (engine === "I Don't Know") {
        $("#inner1").hide();
        _this.openAdvanced();
        $("#advanced-search-checkbox").prop("checked", true).change();
      }

      if (engine != "") {
        console.log("engine", engine);
      }
    }

    checkTransmissions() {
      let _this = this;
      let transmission = _this.$transmission.val();

      if (transmission === "I Don't Know") {
        $("#inner1").hide();
        _this.openAdvanced();
        $("#advanced-search-checkbox").prop("checked", true).change();
      }

      if (transmission != "") {
        console.log("transmission", transmission);
      }
    }

    checkBodyTypes() {
      let _this = this;
      let bodyType = _this.$bodyType.val();

      if (bodyType === "I Don't Know") {
        $("#inner1").hide();
        _this.openAdvanced();
        $("#advanced-search-checkbox").prop("checked", true).change();
      }

      if (bodyType != "") {
        console.log("bodyType", bodyType);
      }
    }

    checkBrake() {
      let _this = this;
      let brake = _this.$brake.val();

      if (brake === "I Don't Know") {
        $("#inner1").hide();
        _this.openAdvanced();
        $("#advanced-search-checkbox").prop("checked", true).change();
      }

      if (brake != "") {
        console.log("brake", brake);
      }
    }

    checkDriveType() {
      let _this = this;
      let driveType = _this.$driveType.val();

      if (driveType === "I Don't Know") {
        $("#inner1").hide();
        _this.openAdvanced();
        $("#advanced-search-checkbox").prop("checked", true).change();
      }

      if (driveType != "") {
        console.log("driveType", driveType);
      }
    }

    loadingBlock($block, load = true) {
      $block = $($block);
      let loading =
        '<div class="loading_block"><div class="loading_wave"></div> <div class="loading_wave"></div> <div class="loading_wave"></div> <div class="loading_wave"></div> <div class="loading_wave"></div> <div class="loading_wave"></div> <div class="loading_wave"></div> <div class="loading_wave"></div> <div class="loading_wave"></div> <div class="loading_wave"></div> </div>';

      if (load) {
        $block.html(loading);
      } else {
        $block.html("");
      }
    }

    needToSortProduct(data) {
      let _this = this;
      // Получаем текущие данные
      //let dataAll = _this.$currentData ? _this.$currentData : null;
      let dataAll = data;
      if (!dataAll) {
        return null; // Возвращаем null, если данных нет
      }

      const objValueProductLines = {
        "DAILY DRIVER": "OE Replacement",
        UPGRADE: "up",
        "HIGH PERFORMANCE": "High Performance",
        RACE: "race",
      };

      const objValueSideGroup = {
        left: "Front",
        right: "Rear",
        all: "Both",
      };

      const objFilter = this.filterProductsAllGroups();

      const activeProductLine = objFilter.productLines;
      const activeCategory = objFilter.categoryGroup;
      const activeSide = objFilter.sideGroup;
      const activeLinesPads = objFilter.linesGroup;

      const filterValue = objValueProductLines[activeProductLine];

      // Функция для фильтрации
      const filterData = (dataArray) => {
        let filteredData = dataArray;

        // Фильтрация по product line
        if (activeProductLine) {
          filteredData = filteredData.filter(
            (item) => item.fitment_type === filterValue
          );
        } else {
          if (filteredData.length > 1) {
            const mergedData = [];
            // Объединяем объекты с одинаковыми динамическими ключами
            filteredData.forEach((item) => {
              // Находим динамический ключ, исключая fitment_type
              const dynamicKey = Object.keys(item).find(
                (key) => key !== "fitment_type"
              );

              // Ищем существующий элемент в mergedData
              const existingItem = mergedData.find(
                (accItem) => accItem[dynamicKey]
              );

              if (existingItem) {
                // Объединяем свойства объектов
                Object.assign(existingItem[dynamicKey], item[dynamicKey]);
              } else {
                // Если не существует, добавляем элемент в mergedData
                mergedData.push({ ...item });
              }
            });

            // Перезаписываем filteredData объединёнными данными
            filteredData = mergedData;
          }
        }

        // Фильтрация по activeCategory
        if (activeCategory) {
          filteredData = filteredData
            .map((item) => {
              if (item[activeCategory]) {
                return {
                  fitment_type: item.fitment_type,
                  [activeCategory]: item[activeCategory],
                };
              }
              return null; // Возвращаем null, если категория не найдена
            })
            .filter((obj) => obj !== null); // Убираем null значения
        }

        // Фильтрация по activeSide
        if (activeSide != null) {
          const positionValue = objValueSideGroup[activeSide];

          filteredData = filteredData
            .map((obj) => {
              const dynamicKey = this.getDynamicKey(obj);
              const dynamicValue = obj[dynamicKey];

              // Проверяем, что dynamicValue - это объект
              if (typeof dynamicValue === "object" && dynamicValue !== null) {
                const filteredItems = {};

                // Перебираем ключи в dynamicValue
                for (const key in dynamicValue) {
                  if (dynamicValue.hasOwnProperty(key)) {
                    const items = dynamicValue[key];

                    // Проверяем, что items - это массив и фильтруем его
                    if (Array.isArray(items)) {
                      const matchingItems = items.filter(
                        (item) => item.position === positionValue
                      );
                      if (matchingItems.length > 0) {
                        filteredItems[key] = matchingItems; // Сохраняем отфильтрованные элементы
                      }
                    }
                  }
                }

                // Если filteredItems не пустой, возвращаем новый объект с отфильтрованными элементами
                if (Object.keys(filteredItems).length > 0) {
                  return {
                    ...obj,
                    [dynamicKey]: filteredItems, // Сохраняем отфильтрованные элементы в объекте
                  };
                }
              }

              return null; // Вернуть null, если нет совпадений или если dynamicValue не объект
            })
            .filter((obj) => obj !== null); // Удаляем null значения
        }

        if (activeLinesPads) {
          filteredData = filteredData
            .map((row) => {
              const dynamicKey = this.getDynamicKey(row);
              const dynamicValue = this.getDynamicValue(row);
              if (typeof dynamicValue === "object" && dynamicValue !== null) {
                const filteredItems = {};

                // Перебираем ключи в dynamicValue
                for (const key in dynamicValue) {
                  if (dynamicValue.hasOwnProperty(key)) {
                    const items = dynamicValue[key];

                    // Проверяем, что items - это массив и фильтруем его
                    if (Array.isArray(items)) {
                      const matchingItems = items.filter((item) => {
                        if (this.groupedData[dynamicKey]) {
                          for (let group of this.groupedData[dynamicKey]) {
                            if (
                              group.line
                                .toLowerCase()
                                .includes(activeLinesPads.toLowerCase())
                            ) {
                              if (
                                group.labeling.includes(
                                  item.part_number.match(/[A-Za-z]+/)[0]
                                )
                              )
                                return true;
                            }
                          }
                        }
                        return false;
                      });
                      if (matchingItems.length > 0) {
                        filteredItems[key] = matchingItems; // Сохраняем отфильтрованные элементы
                      }
                    }
                  }
                }
                if (Object.keys(filteredItems).length > 0) {
                  return {
                    ...row,
                    [dynamicKey]: filteredItems, // Сохраняем отфильтрованные элементы в объекте
                  };
                }
              }
            })
            .filter((obj) => obj !== null && obj !== undefined); // Удаляем null значения
        }

        // Возвращаем отфильтрованные данные
        return filteredData;
      };

      const result = filterData(dataAll);
      return filterData(result);
    }

    setupGroupProductLines() {
      let groupBlock = document.querySelector(".type__body");
      let groupBlockAll = document.querySelectorAll(".type__link");
      let currentTitle = ""; // Переменная для хранения заголовка

      let activeBtn = null;
      groupBlockAll.forEach((item) => {
        if (item.classList.contains("active")) {
          activeBtn = item;
          let titleParent = activeBtn.closest(".type__item");
          currentTitle = titleParent.querySelector(".type__title").textContent;
        }
      });

      groupBlock.addEventListener("click", (event) => {
        event.preventDefault();
        let clicked = event.target;

        if (clicked.closest(".type__item")) {
          groupBlockAll.forEach((item) => item.classList.remove("active"));

          let titleParent = clicked.closest(".type__item");
          let title = titleParent.querySelector(".type__title").textContent;
          currentTitle = titleParent.querySelector(".type__title").textContent;

          clicked.classList.add("active");

          if (clicked === activeBtn) {
            groupBlockAll.forEach((item) => item.classList.remove("active"));
          }
        }
      });

      return currentTitle; // Возвращаем текущее значение заголовка
    }

    setupGroupCategory() {
      const categoryGroupBlock = document.querySelector(
        '.category__items.item-category[data-fillter-groups="category"]'
      );
      const categoryLinks = categoryGroupBlock.querySelectorAll(
        ".item-category__link"
      );

      // Функция для получения номера активной иконки
      const getActiveIconNumber = () => {
        const activeLink = categoryGroupBlock.querySelector(
          ".item-category__link.active"
        );
        if (activeLink) {
          const iconElement = activeLink.querySelector(".item-category__icon");
          const iconClass = iconElement.className;
          const match = iconClass.match(/_icon-catalog(\d+)/);
          return match ? parseInt(match[1], 10) : null; // Возвращаем номер или null
        }
        return null; // Если активного элемента нет, возвращаем null
      };

      // Установка начального значения
      const initialActiveNumber = getActiveIconNumber();

      const activeBtn = categoryGroupBlock.querySelector(
        ".item-category__link.active"
      );

      categoryGroupBlock.addEventListener("click", (event) => {
        event.preventDefault();

        const linkCategory = event.target.closest(".item-category__link");

        if (linkCategory) {
          // Add this null check
          if (activeBtn === linkCategory) {
            linkCategory.classList.remove("active");
          } else {
            categoryLinks.forEach((item) => item.classList.remove("active"));
            linkCategory.classList.add("active");
            // activeBtn = linkCategory;
          }
        }
      });

      const objValueCategoryGroup = [
        "Brake Shoes",
        "Brake Kits",
        "Brake Pads",
        "Brake Rotors",
        "Brake Hardware",
        "Wheel Hubs",
      ];

      // Возвращаем начальный номер активной иконки
      return objValueCategoryGroup[initialActiveNumber]; // Возвращаем значение, которое было установлено изначально
    }

    setupGroupSide() {
      const categoryGroupBlockSide = document.querySelector(
        '.category__items.item-category[data-fillter-groups="side"]'
      );
      const categoryLinksSide = categoryGroupBlockSide.querySelectorAll(
        ".item-category__link"
      );

      let activeLink = null;
      categoryLinksSide.forEach((item) => {
        if (item.classList.contains("active")) {
          activeLink = item;
        }
      });

      categoryGroupBlockSide.addEventListener("click", (event) => {
        event.preventDefault();
        const linkCategory = event.target.closest(".item-category__link");

        if (linkCategory) {
          if (activeLink === linkCategory) {
            linkCategory.classList.remove("active");
          } else {
            categoryLinksSide.forEach((item) =>
              item.classList.remove("active")
            );
            linkCategory.classList.add("active");
            activeLink = linkCategory;
          }
        }
      });

      if (activeLink) {
        const iconElementSide = activeLink.querySelector(
          ".item-category__icon"
        );
        const iconClassSide = iconElementSide.className;
        const matchSide = iconClassSide.match(
          /_icon-catalog-car-(left|right|all)$/
        );
        return matchSide ? matchSide[1] : null;
      } else {
        return null;
      }
    }
    setupGroupLines() {
      const categoryGroupBlockLines = document.querySelector(
        '.category__items.item-category[data-fillter-groups="lines"]'
      );
      const categoryLinksLines = categoryGroupBlockLines.querySelectorAll(
        ".item-category__link"
      );

      let activeBtn = null;
      categoryLinksLines.forEach((item) => {
        if (item.classList.contains("active")) {
          activeBtn = item;
        }
      });

      categoryGroupBlockLines.addEventListener("click", (event) => {
        event.preventDefault();

        const linkCategory = event.target.closest(".item-category__link");
        if (linkCategory) {
          if (activeBtn === linkCategory) {
            linkCategory.classList.remove("active");
          } else if (linkCategory) {
            categoryLinksLines.forEach((item) =>
              item.classList.remove("active")
            );
            linkCategory.classList.add("active");
            activeBtn = linkCategory;
          }
        }
      });

      return categoryGroupBlockLines.querySelector(
        ".item-category__link.active"
      )
        ? categoryGroupBlockLines.querySelector(".item-category__link.active")
            .textContent
        : null;
    }

    filterProductsAllGroups() {
      let _this = this;
      _this.setupGroupProductLines(); //Тут все продуктовые линейки, получение выбранной категории(активной в данное время)
      const filteredSettings = {
        productLines: _this.setupGroupProductLines(),
        categoryGroup: _this.setupGroupCategory(),
        sideGroup: _this.setupGroupSide(),
        linesGroup: _this.setupGroupLines(),
      };
      return filteredSettings;
    }

    getImagesForProducts(productIds) {
      let _this = this;

      return $.ajax({
        url: "https://catalog.loopautomotive.com/catalog/part-images",
        type: "GET",
        data: {
          part_ids: productIds.join(","), // Преобразуем массив в строку
          // region_id: _this.getRegionId(), // Раскомментируйте, если нужно
          action: "apicatalog:getImages",
          nonce: ApiCatalog.nonce,
        },
        success: function (res) {
          if (res && res.success) {
            let images = res.data;
            return images; // Возвращаем массив изображений
          }
        },
        error: function (xhr) {
          let json = xhr.responseJSON || {};
          _this.showError(json.msg || "Unknown");
        },
      });
    }
  }

  class SelectConstructor {
    constructor(props, data = null) {
      let defaultConfig = {
        init: true,
        logging: true,
      };
      this.config = Object.assign(defaultConfig, props);
      this.selectClasses = {
        classSelect: "select",
        classSelectBody: "select__body",
        classSelectTitle: "select__title",
        classSelectValue: "select__value",
        classSelectLabel: "select__label",
        classSelectInput: "select__input",
        classSelectText: "select__text",
        classSelectLink: "select__link",
        classSelectOptions: "select__options",
        classSelectOptionsScroll: "select__scroll",
        classSelectOption: "select__option",
        classSelectContent: "select__content",
        classSelectRow: "select__row",
        classSelectData: "select__asset",
        classSelectDisabled: "_select-disabled",
        classSelectTag: "_select-tag",
        classSelectOpen: "_select-open",
        classSelectActive: "_select-active",
        classSelectFocus: "_select-focus",
        classSelectMultiple: "_select-multiple",
        classSelectCheckBox: "_select-checkbox",
        classSelectOptionSelected: "_select-selected",
        classSelectPseudoLabel: "_select-pseudo-label",
      };
      this._this = this;
      if (this.config.init) {
        const selectItems = data
          ? document.querySelectorAll(data)
          : document.querySelectorAll("select");
        if (selectItems.length) {
          this.selectsInit(selectItems);
          // this.setLogging(`Проснулся, построил селектов: (${selectItems.length})`);
        }
        // else this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
      }
    }
    getSelectClass(className) {
      return `.${className}`;
    }
    getSelectElement(selectItem, className) {
      return {
        originalSelect: selectItem.querySelector("select"),
        selectElement: selectItem.querySelector(this.getSelectClass(className)),
      };
    }
    selectsInit(selectItems) {
      selectItems.forEach((originalSelect, index) => {
        this.selectInit(originalSelect, index + 1);
      });
      document.addEventListener(
        "click",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
      document.addEventListener(
        "keydown",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
      document.addEventListener(
        "focusin",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
      document.addEventListener(
        "focusout",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
    }
    selectInit(originalSelect, index) {
      const _this = this;
      let selectItem = document.createElement("div");
      selectItem.classList.add(this.selectClasses.classSelect);
      originalSelect.parentNode.insertBefore(selectItem, originalSelect);
      selectItem.appendChild(originalSelect);
      originalSelect.hidden = true;
      index ? (originalSelect.dataset.id = index) : null;
      if (this.getSelectPlaceholder(originalSelect)) {
        originalSelect.dataset.placeholder =
          this.getSelectPlaceholder(originalSelect).value;
        if (this.getSelectPlaceholder(originalSelect).label.show) {
          const selectItemTitle = this.getSelectElement(
            selectItem,
            this.selectClasses.classSelectTitle
          ).selectElement;
          selectItemTitle.insertAdjacentHTML(
            "afterbegin",
            `<span class="${this.selectClasses.classSelectLabel}">${
              this.getSelectPlaceholder(originalSelect).label.text
                ? this.getSelectPlaceholder(originalSelect).label.text
                : this.getSelectPlaceholder(originalSelect).value
            }</span>`
          );
        }
      }
      selectItem.insertAdjacentHTML(
        "beforeend",
        `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
      );
      this.selectBuild(originalSelect);
      originalSelect.dataset.speed = originalSelect.dataset.speed
        ? originalSelect.dataset.speed
        : "150";
      originalSelect.addEventListener("change", function (e) {
        _this.selectChange(e);
      });
    }
    selectBuild(originalSelect) {
      const selectItem = originalSelect.parentElement;
      selectItem.dataset.id = originalSelect.dataset.id;
      originalSelect.dataset.classModif
        ? selectItem.classList.add(
            `select_${originalSelect.dataset.classModif}`
          )
        : null;
      originalSelect.multiple
        ? selectItem.classList.add(this.selectClasses.classSelectMultiple)
        : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
      originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple
        ? selectItem.classList.add(this.selectClasses.classSelectCheckBox)
        : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setOptions(selectItem, originalSelect);
      originalSelect.hasAttribute("data-search")
        ? this.searchActions(selectItem)
        : null;
      originalSelect.hasAttribute("data-open")
        ? this.selectAction(selectItem)
        : null;
      this.selectDisabled(selectItem, originalSelect);
    }
    selectsActions(e) {
      const targetElement = e.target;
      const targetType = e.type;
      if (
        targetElement.closest(
          this.getSelectClass(this.selectClasses.classSelect)
        ) ||
        targetElement.closest(
          this.getSelectClass(this.selectClasses.classSelectTag)
        )
      ) {
        const selectItem = targetElement.closest(".select")
          ? targetElement.closest(".select")
          : document.querySelector(
              `.${this.selectClasses.classSelect}[data-id="${
                targetElement.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag)
                ).dataset.selectId
              }"]`
            );
        const originalSelect = this.getSelectElement(selectItem).originalSelect;
        if (targetType === "click") {
          if (!originalSelect.disabled)
            if (
              targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTag)
              )
            ) {
              const targetTag = targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTag)
              );
              const optionItem = document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`
              );
              this.optionAction(selectItem, originalSelect, optionItem);
            } else if (
              targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle)
              )
            )
              this.selectAction(selectItem);
            else if (
              targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              )
            ) {
              const optionItem = targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              );
              this.optionAction(selectItem, originalSelect, optionItem);
            }
        } else if (targetType === "focusin" || targetType === "focusout") {
          if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelect)
            )
          )
            targetType === "focusin"
              ? selectItem.classList.add(this.selectClasses.classSelectFocus)
              : selectItem.classList.remove(
                  this.selectClasses.classSelectFocus
                );
        } else if (targetType === "keydown" && e.code === "Escape")
          this.selectsСlose();
      } else this.selectsСlose();
    }
    selectsСlose(selectOneGroup) {
      const selectsGroup = selectOneGroup ? selectOneGroup : document;
      const selectActiveItems = selectsGroup.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
      );
      if (selectActiveItems.length)
        selectActiveItems.forEach((selectActiveItem) => {
          this.selectСlose(selectActiveItem);
        });
    }
    selectСlose(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      const selectOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions
      ).selectElement;
      if (!selectOptions.classList.contains("_slide")) {
        selectItem.classList.remove(this.selectClasses.classSelectOpen);
        _slideUp(selectOptions, originalSelect.dataset.speed);
      }
    }
    selectAction(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      const selectOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions
      ).selectElement;
      if (originalSelect.closest("[data-one-select]")) {
        const selectOneGroup = originalSelect.closest("[data-one-select]");
        this.selectsСlose(selectOneGroup);
      }
      if (!selectOptions.classList.contains("_slide")) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);
      }
    }
    setSelectTitleValue(selectItem, originalSelect) {
      const selectItemBody = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectBody
      ).selectElement;
      const selectItemTitle = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectTitle
      ).selectElement;
      if (selectItemTitle) selectItemTitle.remove();
      selectItemBody.insertAdjacentHTML(
        "afterbegin",
        this.getSelectTitleValue(selectItem, originalSelect)
      );
    }
    getSelectTitleValue(selectItem, originalSelect) {
      let selectTitleValue = this.getSelectedOptionsData(
        originalSelect,
        2
      ).html;
      if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
        selectTitleValue = this.getSelectedOptionsData(originalSelect)
          .elements.map(
            (option) =>
              `<span role="button" data-select-id="${
                selectItem.dataset.id
              }" data-value="${
                option.value
              }" class="_select-tag">${this.getSelectElementContent(
                option
              )}</span>`
          )
          .join("");
        if (
          originalSelect.dataset.tags &&
          document.querySelector(originalSelect.dataset.tags)
        ) {
          document.querySelector(originalSelect.dataset.tags).innerHTML =
            selectTitleValue;
          if (originalSelect.hasAttribute("data-search"))
            selectTitleValue = false;
        }
      }
      selectTitleValue = selectTitleValue.length
        ? selectTitleValue
        : originalSelect.dataset.placeholder
        ? originalSelect.dataset.placeholder
        : "";
      let pseudoAttribute = "";
      let pseudoAttributeClass = "";
      if (originalSelect.hasAttribute("data-pseudo-label")) {
        pseudoAttribute = originalSelect.dataset.pseudoLabel
          ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"`
          : ` data-pseudo-label="Заполните атрибут"`;
        pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
      }
      this.getSelectedOptionsData(originalSelect).values.length
        ? selectItem.classList.add(this.selectClasses.classSelectActive)
        : selectItem.classList.remove(this.selectClasses.classSelectActive);
      if (originalSelect.hasAttribute("data-search"))
        return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      else {
        const customClass =
          this.getSelectedOptionsData(originalSelect).elements.length &&
          this.getSelectedOptionsData(originalSelect).elements[0].dataset.class
            ? ` ${
                this.getSelectedOptionsData(originalSelect).elements[0].dataset
                  .class
              }`
            : "";
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
      }
    }
    getSelectElementContent(selectOption) {
      const selectOptionData = selectOption.dataset.asset
        ? `${selectOption.dataset.asset}`
        : "";
      const selectOptionDataHTML =
        selectOptionData.indexOf("img") >= 0
          ? `<img src="${selectOptionData}" alt="">`
          : selectOptionData;
      let selectOptionContentHTML = ``;
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectRow}">`
        : "";
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectData}">`
        : "";
      selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectText}">`
        : "";
      selectOptionContentHTML += selectOption.textContent;
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      return selectOptionContentHTML;
    }
    getSelectPlaceholder(originalSelect) {
      const selectPlaceholder = Array.from(originalSelect.options).find(
        (option) => !option.value
      );
      if (selectPlaceholder)
        return {
          value: selectPlaceholder.textContent,
          show: selectPlaceholder.hasAttribute("data-show"),
          label: {
            show: selectPlaceholder.hasAttribute("data-label"),
            text: selectPlaceholder.dataset.label,
          },
        };
    }
    getSelectedOptionsData(originalSelect, type) {
      let selectedOptions = [];
      if (originalSelect.multiple)
        selectedOptions = Array.from(originalSelect.options)
          .filter((option) => option.value)
          .filter((option) => option.selected);
      else
        selectedOptions.push(
          originalSelect.options[originalSelect.selectedIndex]
        );
      return {
        elements: selectedOptions.map((option) => option),
        values: selectedOptions
          .filter((option) => option.value)
          .map((option) => option.value),
        html: selectedOptions.map((option) =>
          this.getSelectElementContent(option)
        ),
      };
    }
    getOptions(originalSelect) {
      let selectOptionsScroll = originalSelect.hasAttribute("data-scroll")
        ? `data-simplebar`
        : "";
      let selectOptionsScrollHeight = originalSelect.dataset.scroll
        ? `style="max-height:${originalSelect.dataset.scroll}px"`
        : "";
      let selectOptions = Array.from(originalSelect.options);
      if (selectOptions.length > 0) {
        let selectOptionsHTML = ``;
        if (
          (this.getSelectPlaceholder(originalSelect) &&
            !this.getSelectPlaceholder(originalSelect).show) ||
          originalSelect.multiple
        )
          selectOptions = selectOptions.filter((option) => option.value);
        selectOptionsHTML += selectOptionsScroll
          ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">`
          : "";
        selectOptions.forEach((selectOption) => {
          selectOptionsHTML += this.getOption(selectOption, originalSelect);
        });
        selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
        return selectOptionsHTML;
      }
    }
    getOption(selectOption, originalSelect) {
      const selectOptionSelected =
        selectOption.selected && originalSelect.multiple
          ? ` ${this.selectClasses.classSelectOptionSelected}`
          : "";
      const selectOptionHide =
        selectOption.selected &&
        !originalSelect.hasAttribute("data-show-selected") &&
        !originalSelect.multiple
          ? `hidden`
          : ``;
      const selectOptionClass = selectOption.dataset.class
        ? ` ${selectOption.dataset.class}`
        : "";
      const selectOptionLink = selectOption.dataset.href
        ? selectOption.dataset.href
        : false;
      const selectOptionLinkTarget = selectOption.hasAttribute(
        "data-href-blank"
      )
        ? `target="_blank"`
        : "";
      let selectOptionHTML = ``;
      selectOptionHTML += selectOptionLink
        ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">`
        : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
      selectOptionHTML += this.getSelectElementContent(selectOption);
      selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
      return selectOptionHTML;
    }
    setOptions(selectItem, originalSelect) {
      const selectItemOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions
      ).selectElement;
      selectItemOptions.innerHTML = this.getOptions(originalSelect);
    }
    optionAction(selectItem, originalSelect, optionItem) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(
          this.selectClasses.classSelectOptionSelected
        );
        const originalSelectSelectedItems =
          this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach((originalSelectSelectedItem) => {
          originalSelectSelectedItem.removeAttribute("selected");
        });
        const selectSelectedItems = selectItem.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected)
        );
        selectSelectedItems.forEach((selectSelectedItems) => {
          originalSelect
            .querySelector(
              `option[value="${selectSelectedItems.dataset.value}"]`
            )
            .setAttribute("selected", "selected");
        });
      } else {
        if (!originalSelect.hasAttribute("data-show-selected")) {
          if (
            selectItem.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            )
          )
            selectItem.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            ).hidden = false;
          optionItem.hidden = true;
        }
        originalSelect.value = optionItem.hasAttribute("data-value")
          ? optionItem.dataset.value
          : optionItem.textContent;
        this.selectAction(selectItem);
      }
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
    selectChange(e) {
      const originalSelect = e.target;
      this.selectBuild(originalSelect);
      this.setSelectChange(originalSelect);
    }
    setSelectChange(originalSelect) {
      if (originalSelect.hasAttribute("data-validate"))
        formValidate.validateInput(originalSelect);
      if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
        let tempButton = document.createElement("button");
        tempButton.type = "submit";
        originalSelect.closest("form").append(tempButton);
        tempButton.click();
        tempButton.remove();
      }
      const selectItem = originalSelect.parentElement;
      this.selectCallback(selectItem, originalSelect);
    }
    selectDisabled(selectItem, originalSelect) {
      if (originalSelect.disabled) {
        selectItem.classList.add(this.selectClasses.classSelectDisabled);
        this.getSelectElement(
          selectItem,
          this.selectClasses.classSelectTitle
        ).selectElement.disabled = true;
      } else {
        selectItem.classList.remove(this.selectClasses.classSelectDisabled);
        this.getSelectElement(
          selectItem,
          this.selectClasses.classSelectTitle
        ).selectElement.disabled = false;
      }
    }
    searchActions(selectItem) {
      this.getSelectElement(selectItem).originalSelect;
      const selectInput = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectInput
      ).selectElement;
      const selectOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions
      ).selectElement;
      const selectOptionsItems = selectOptions.querySelectorAll(
        `.${this.selectClasses.classSelectOption}`
      );
      const _this = this;
      selectInput.addEventListener("input", function () {
        selectOptionsItems.forEach((selectOptionsItem) => {
          if (
            selectOptionsItem.textContent
              .toUpperCase()
              .indexOf(selectInput.value.toUpperCase()) >= 0
          )
            selectOptionsItem.hidden = false;
          else selectOptionsItem.hidden = true;
        });
        selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
      });
    }
    selectCallback(selectItem, originalSelect) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", {
          detail: {
            select: originalSelect,
          },
        })
      );
    }
    setLogging(message) {
      this.config.logging ? functions_FLS(`[select]: ${message}`) : null;
    }
  }
  modules_flsModules.select = new SelectConstructor({});
  modules_flsModules.filter_mini = new FilterMini(
    '[data-filter="mini"]',
    modules_flsModules.select
  );
  modules_flsModules.filter_top = new FilterTop(
    '[data-filter="top"]',
    modules_flsModules.select
  );
  modules_flsModules.filter_full = new FilterFull(
    '[data-filter="full"]',
    modules_flsModules.select
  );
  function getWindow_getWindow(node) {
    if (node == null) return window;
    if (node.toString() !== "[object Window]") {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
  }
  function isElement(node) {
    var OwnElement = getWindow_getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  function isHTMLElement(node) {
    var OwnElement = getWindow_getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }
  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") return false;
    var OwnElement = getWindow_getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }
  var math_max = Math.max;
  var math_min = Math.min;
  var round = Math.round;
  function getUAString() {
    var uaData = navigator.userAgentData;
    if (uaData != null && uaData.brands && Array.isArray(uaData.brands))
      return uaData.brands
        .map(function (item) {
          return item.brand + "/" + item.version;
        })
        .join(" ");
    return navigator.userAgent;
  }
  function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString());
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy) {
    if (includeScale === void 0) includeScale = false;
    if (isFixedStrategy === void 0) isFixedStrategy = false;
    var clientRect = element.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (includeScale && isHTMLElement(element)) {
      scaleX =
        element.offsetWidth > 0
          ? round(clientRect.width) / element.offsetWidth || 1
          : 1;
      scaleY =
        element.offsetHeight > 0
          ? round(clientRect.height) / element.offsetHeight || 1
          : 1;
    }
    var _ref = isElement(element) ? getWindow_getWindow(element) : window,
      visualViewport = _ref.visualViewport;
    var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
    var x =
      (clientRect.left +
        (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) /
      scaleX;
    var y =
      (clientRect.top +
        (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) /
      scaleY;
    var width = clientRect.width / scaleX;
    var height = clientRect.height / scaleY;
    return {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x,
      x,
      y,
    };
  }
  function getWindowScroll(node) {
    var win = getWindow_getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop,
    };
  }
  function getHTMLElementScroll(element) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }
  function getNodeScroll(node) {
    if (node === getWindow_getWindow(node) || !isHTMLElement(node))
      return getWindowScroll(node);
    else return getHTMLElementScroll(node);
  }
  function getNodeName(element) {
    return element ? (element.nodeName || "").toLowerCase() : null;
  }
  function getDocumentElement(element) {
    return (
      (isElement(element) ? element.ownerDocument : element.document) ||
      window.document
    ).documentElement;
  }
  function getWindowScrollBarX(element) {
    return (
      getBoundingClientRect(getDocumentElement(element)).left +
      getWindowScroll(element).scrollLeft
    );
  }
  function getComputedStyle_getComputedStyle(element) {
    return getWindow_getWindow(element).getComputedStyle(element);
  }
  function isScrollParent(element) {
    var _getComputedStyle = getComputedStyle_getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }
  function isElementScaled(element) {
    var rect = element.getBoundingClientRect();
    var scaleX = round(rect.width) / element.offsetWidth || 1;
    var scaleY = round(rect.height) / element.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) isFixed = false;
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled =
      isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(
      elementOrVirtualElement,
      offsetParentIsScaled,
      isFixed
    );
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0,
    };
    var offsets = {
      x: 0,
      y: 0,
    };
    if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
      if (
        getNodeName(offsetParent) !== "body" ||
        isScrollParent(documentElement)
      )
        scroll = getNodeScroll(offsetParent);
      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement)
        offsets.x = getWindowScrollBarX(documentElement);
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height,
    };
  }
  function getLayoutRect(element) {
    var clientRect = getBoundingClientRect(element);
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
    if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
    return {
      x: element.offsetLeft,
      y: element.offsetTop,
      width,
      height,
    };
  }
  function getParentNode(element) {
    if (getNodeName(element) === "html") return element;
    return (
      element.assignedSlot ||
      element.parentNode ||
      (isShadowRoot(element) ? element.host : null) ||
      getDocumentElement(element)
    );
  }
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0)
      return node.ownerDocument.body;
    if (isHTMLElement(node) && isScrollParent(node)) return node;
    return getScrollParent(getParentNode(node));
  }
  function listScrollParents(element, list) {
    var _element$ownerDocumen;
    if (list === void 0) list = [];
    var scrollParent = getScrollParent(element);
    var isBody =
      scrollParent ===
      ((_element$ownerDocumen = element.ownerDocument) == null
        ? void 0
        : _element$ownerDocumen.body);
    var win = getWindow_getWindow(scrollParent);
    var target = isBody
      ? [win].concat(
          win.visualViewport || [],
          isScrollParent(scrollParent) ? scrollParent : []
        )
      : scrollParent;
    var updatedList = list.concat(target);
    return isBody
      ? updatedList
      : updatedList.concat(listScrollParents(getParentNode(target)));
  }
  function isTableElement(element) {
    return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
  }
  function getTrueOffsetParent(element) {
    if (
      !isHTMLElement(element) ||
      getComputedStyle_getComputedStyle(element).position === "fixed"
    )
      return null;
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    var isFirefox = /firefox/i.test(getUAString());
    var isIE = /Trident/i.test(getUAString());
    if (isIE && isHTMLElement(element)) {
      var elementCss = getComputedStyle_getComputedStyle(element);
      if (elementCss.position === "fixed") return null;
    }
    var currentNode = getParentNode(element);
    if (isShadowRoot(currentNode)) currentNode = currentNode.host;
    while (
      isHTMLElement(currentNode) &&
      ["html", "body"].indexOf(getNodeName(currentNode)) < 0
    ) {
      var css = getComputedStyle_getComputedStyle(currentNode);
      if (
        css.transform !== "none" ||
        css.perspective !== "none" ||
        css.contain === "paint" ||
        ["transform", "perspective"].indexOf(css.willChange) !== -1 ||
        (isFirefox && css.willChange === "filter") ||
        (isFirefox && css.filter && css.filter !== "none")
      )
        return currentNode;
      else currentNode = currentNode.parentNode;
    }
    return null;
  }
  function getOffsetParent(element) {
    var window = getWindow_getWindow(element);
    var offsetParent = getTrueOffsetParent(element);
    while (
      offsetParent &&
      isTableElement(offsetParent) &&
      getComputedStyle_getComputedStyle(offsetParent).position === "static"
    )
      offsetParent = getTrueOffsetParent(offsetParent);
    if (
      offsetParent &&
      (getNodeName(offsetParent) === "html" ||
        (getNodeName(offsetParent) === "body" &&
          getComputedStyle_getComputedStyle(offsetParent).position ===
            "static"))
    )
      return window;
    return offsetParent || getContainingBlock(element) || window;
  }
  var enums_top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [enums_top, bottom, right, left];
  var start = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = basePlacements.reduce(function (acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var enums_placements = []
    .concat(basePlacements, [auto])
    .reduce(function (acc, placement) {
      return acc.concat([
        placement,
        placement + "-" + start,
        placement + "-" + end,
      ]);
    }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [
    beforeRead,
    read,
    afterRead,
    beforeMain,
    main,
    afterMain,
    beforeWrite,
    write,
    afterWrite,
  ];
  function order(modifiers) {
    var map = new Map();
    var visited = new Set();
    var result = [];
    modifiers.forEach(function (modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(
        modifier.requires || [],
        modifier.requiresIfExists || []
      );
      requires.forEach(function (dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) sort(depModifier);
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function (modifier) {
      if (!visited.has(modifier.name)) sort(modifier);
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function (acc, phase) {
      return acc.concat(
        orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        })
      );
    }, []);
  }
  function debounce(fn) {
    var pending;
    return function () {
      if (!pending)
        pending = new Promise(function (resolve) {
          Promise.resolve().then(function () {
            pending = void 0;
            resolve(fn());
          });
        });
      return pending;
    };
  }
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function (merged, current) {
      var existing = merged[current.name];
      merged[current.name] = existing
        ? Object.assign({}, existing, current, {
            options: Object.assign({}, existing.options, current.options),
            data: Object.assign({}, existing.data, current.data),
          })
        : current;
      return merged;
    }, {});
    return Object.keys(merged).map(function (key) {
      return merged[key];
    });
  }
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute",
  };
  function areValidElements() {
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    )
      args[_key] = arguments[_key];
    return !args.some(function (element) {
      return !(element && typeof element.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) generatorOptions = {};
    var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers =
        _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions =
        _generatorOptions$def2 === void 0
          ? DEFAULT_OPTIONS
          : _generatorOptions$def2;
    return function createPopper(reference, popper, options) {
      if (options === void 0) options = defaultOptions;
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference,
          popper,
        },
        attributes: {},
        styles: {},
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state,
        setOptions: function setOptions(setOptionsAction) {
          var options =
            typeof setOptionsAction === "function"
              ? setOptionsAction(state.options)
              : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign(
            {},
            defaultOptions,
            state.options,
            options
          );
          state.scrollParents = {
            reference: isElement(reference)
              ? listScrollParents(reference)
              : reference.contextElement
              ? listScrollParents(reference.contextElement)
              : [],
            popper: listScrollParents(popper),
          };
          var orderedModifiers = orderModifiers(
            mergeByName([].concat(defaultModifiers, state.options.modifiers))
          );
          state.orderedModifiers = orderedModifiers.filter(function (m) {
            return m.enabled;
          });
          if (false);
          runModifierEffects();
          return instance.update();
        },
        forceUpdate: function forceUpdate() {
          if (isDestroyed) return;
          var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper;
          if (!areValidElements(reference, popper)) {
            if (false);
            return;
          }
          state.rects = {
            reference: getCompositeRect(
              reference,
              getOffsetParent(popper),
              state.options.strategy === "fixed"
            ),
            popper: getLayoutRect(popper),
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function (modifier) {
            return (state.modifiersData[modifier.name] = Object.assign(
              {},
              modifier.data
            ));
          });
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (false);
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options =
                _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;
            if (typeof fn === "function")
              state =
                fn({
                  state,
                  options: _options,
                  name,
                  instance,
                }) || state;
          }
        },
        update: debounce(function () {
          return new Promise(function (resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        },
      };
      if (!areValidElements(reference, popper)) {
        if (false);
        return instance;
      }
      instance.setOptions(options).then(function (state) {
        if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function (_ref3) {
          var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;
          if (typeof effect === "function") {
            var cleanupFn = effect({
              state,
              name,
              instance,
              options,
            });
            var noopFn = function noopFn() {};
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function (fn) {
          return fn();
        });
        effectCleanupFns = [];
      }
      return instance;
    };
  }
  null && popperGenerator();
  var passive = {
    passive: true,
  };
  function effect(_ref) {
    var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
    var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
    var window = getWindow_getWindow(state.elements.popper);
    var scrollParents = [].concat(
      state.scrollParents.reference,
      state.scrollParents.popper
    );
    if (scroll)
      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive);
      });
    if (resize) window.addEventListener("resize", instance.update, passive);
    return function () {
      if (scroll)
        scrollParents.forEach(function (scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive);
        });
      if (resize)
        window.removeEventListener("resize", instance.update, passive);
    };
  }
  const eventListeners = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {},
    effect,
    data: {},
  };
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  function getVariation(placement) {
    return placement.split("-")[1];
  }
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }
  function computeOffsets(_ref) {
    var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference.x + reference.width / 2 - element.width / 2;
    var commonY = reference.y + reference.height / 2 - element.height / 2;
    var offsets;
    switch (basePlacement) {
      case enums_top:
        offsets = {
          x: commonX,
          y: reference.y - element.height,
        };
        break;

      case bottom:
        offsets = {
          x: commonX,
          y: reference.y + reference.height,
        };
        break;

      case right:
        offsets = {
          x: reference.x + reference.width,
          y: commonY,
        };
        break;

      case left:
        offsets = {
          x: reference.x - element.width,
          y: commonY,
        };
        break;

      default:
        offsets = {
          x: reference.x,
          y: reference.y,
        };
    }
    var mainAxis = basePlacement
      ? getMainAxisFromPlacement(basePlacement)
      : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] =
            offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
          break;

        case end:
          offsets[mainAxis] =
            offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
          break;

        default:
      }
    }
    return offsets;
  }
  function popperOffsets(_ref) {
    var state = _ref.state,
      name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: "absolute",
      placement: state.placement,
    });
  }
  const modifiers_popperOffsets = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {},
  };
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
  };
  function roundOffsetsByDPR(_ref, win) {
    var x = _ref.x,
      y = _ref.y;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0,
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 =
      typeof roundOffsets === "function"
        ? roundOffsets({
            x,
            y,
          })
        : {
            x,
            y,
          };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = enums_top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow_getWindow(popper)) {
        offsetParent = getDocumentElement(popper);
        if (
          getComputedStyle_getComputedStyle(offsetParent).position !==
            "static" &&
          position === "absolute"
        ) {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent;
      if (
        placement === enums_top ||
        ((placement === left || placement === right) && variation === end)
      ) {
        sideY = bottom;
        var offsetY =
          isFixed && offsetParent === win && win.visualViewport
            ? win.visualViewport.height
            : offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (
        placement === left ||
        ((placement === enums_top || placement === bottom) && variation === end)
      ) {
        sideX = right;
        var offsetX =
          isFixed && offsetParent === win && win.visualViewport
            ? win.visualViewport.width
            : offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign(
      {
        position,
      },
      adaptive && unsetSides
    );
    var _ref4 =
      roundOffsets === true
        ? roundOffsetsByDPR(
            {
              x,
              y,
            },
            getWindow_getWindow(popper)
          )
        : {
            x,
            y,
          };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign(
        {},
        commonStyles,
        ((_Object$assign = {}),
        (_Object$assign[sideY] = hasY ? "0" : ""),
        (_Object$assign[sideX] = hasX ? "0" : ""),
        (_Object$assign.transform =
          (win.devicePixelRatio || 1) <= 1
            ? "translate(" + x + "px, " + y + "px)"
            : "translate3d(" + x + "px, " + y + "px, 0)"),
        _Object$assign)
      );
    }
    return Object.assign(
      {},
      commonStyles,
      ((_Object$assign2 = {}),
      (_Object$assign2[sideY] = hasY ? y + "px" : ""),
      (_Object$assign2[sideX] = hasX ? x + "px" : ""),
      (_Object$assign2.transform = ""),
      _Object$assign2)
    );
  }
  function computeStyles(_ref5) {
    var state = _ref5.state,
      options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration =
        _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets =
        _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    if (false);
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration,
      isFixed: state.options.strategy === "fixed",
    };
    if (state.modifiersData.popperOffsets != null)
      state.styles.popper = Object.assign(
        {},
        state.styles.popper,
        mapToStyles(
          Object.assign({}, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets,
          })
        )
      );
    if (state.modifiersData.arrow != null)
      state.styles.arrow = Object.assign(
        {},
        state.styles.arrow,
        mapToStyles(
          Object.assign({}, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets,
          })
        )
      );
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement,
    });
  }
  const modifiers_computeStyles = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {},
  };
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function (name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element = state.elements[name];
      if (!isHTMLElement(element) || !getNodeName(element)) return;
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];
        if (value === false) element.removeAttribute(name);
        else element.setAttribute(name, value === true ? "" : value);
      });
    });
  }
  function applyStyles_effect(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: {
        position: "absolute",
      },
      reference: {},
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow)
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    return function () {
      Object.keys(state.elements).forEach(function (name) {
        var element = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(
          state.styles.hasOwnProperty(name)
            ? state.styles[name]
            : initialStyles[name]
        );
        var style = styleProperties.reduce(function (style, property) {
          style[property] = "";
          return style;
        }, {});
        if (!isHTMLElement(element) || !getNodeName(element)) return;
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (attribute) {
          element.removeAttribute(attribute);
        });
      });
    };
  }
  const modifiers_applyStyles = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect: applyStyles_effect,
    requires: ["computeStyles"],
  };
  function distanceAndSkiddingToXY(placement, rects, offset) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, enums_top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref =
        typeof offset === "function"
          ? offset(
              Object.assign({}, rects, {
                placement,
              })
            )
          : offset,
      skidding = _ref[0],
      distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0
      ? {
          x: distance,
          y: skidding,
        }
      : {
          x: skidding,
          y: distance,
        };
  }
  function offset(_ref2) {
    var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
    var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = enums_placements.reduce(function (acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
  }
  const modifiers_offset = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset,
  };
  var hash = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom",
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }
  var getOppositeVariationPlacement_hash = {
    start: "end",
    end: "start",
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function (matched) {
      return getOppositeVariationPlacement_hash[matched];
    });
  }
  function getViewportRect(element, strategy) {
    var win = getWindow_getWindow(element);
    var html = getDocumentElement(element);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      var layoutViewport = isLayoutViewport();
      if (layoutViewport || (!layoutViewport && strategy === "fixed")) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x + getWindowScrollBarX(element),
      y,
    };
  }
  function getDocumentRect(element) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element);
    var winScroll = getWindowScroll(element);
    var body =
      (_element$ownerDocumen = element.ownerDocument) == null
        ? void 0
        : _element$ownerDocumen.body;
    var width = math_max(
      html.scrollWidth,
      html.clientWidth,
      body ? body.scrollWidth : 0,
      body ? body.clientWidth : 0
    );
    var height = math_max(
      html.scrollHeight,
      html.clientHeight,
      body ? body.scrollHeight : 0,
      body ? body.clientHeight : 0
    );
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    var y = -winScroll.scrollTop;
    if (getComputedStyle_getComputedStyle(body || html).direction === "rtl")
      x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
    return {
      width,
      height,
      x,
      y,
    };
  }
  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) return true;
    else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) return true;
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }
  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height,
    });
  }
  function getInnerBoundingClientRect(element, strategy) {
    var rect = getBoundingClientRect(element, false, strategy === "fixed");
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }
  function getClientRectFromMixedType(element, clippingParent, strategy) {
    return clippingParent === viewport
      ? rectToClientRect(getViewportRect(element, strategy))
      : isElement(clippingParent)
      ? getInnerBoundingClientRect(clippingParent, strategy)
      : rectToClientRect(getDocumentRect(getDocumentElement(element)));
  }
  function getClippingParents(element) {
    var clippingParents = listScrollParents(getParentNode(element));
    var canEscapeClipping =
      ["absolute", "fixed"].indexOf(
        getComputedStyle_getComputedStyle(element).position
      ) >= 0;
    var clipperElement =
      canEscapeClipping && isHTMLElement(element)
        ? getOffsetParent(element)
        : element;
    if (!isElement(clipperElement)) return [];
    return clippingParents.filter(function (clippingParent) {
      return (
        isElement(clippingParent) &&
        contains(clippingParent, clipperElement) &&
        getNodeName(clippingParent) !== "body"
      );
    });
  }
  function getClippingRect(element, boundary, rootBoundary, strategy) {
    var mainClippingParents =
      boundary === "clippingParents"
        ? getClippingParents(element)
        : [].concat(boundary);
    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents[0];
    var clippingRect = clippingParents.reduce(function (
      accRect,
      clippingParent
    ) {
      var rect = getClientRectFromMixedType(element, clippingParent, strategy);
      accRect.top = math_max(rect.top, accRect.top);
      accRect.right = math_min(rect.right, accRect.right);
      accRect.bottom = math_min(rect.bottom, accRect.bottom);
      accRect.left = math_max(rect.left, accRect.left);
      return accRect;
    },
    getClientRectFromMixedType(element, firstClippingParent, strategy));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }
  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
  }
  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }
  function expandToHashMap(value, keys) {
    return keys.reduce(function (hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }
  function detectOverflow(state, options) {
    if (options === void 0) options = {};
    var _options = options,
      _options$placement = _options.placement,
      placement =
        _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy =
        _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary =
        _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary =
        _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext =
        _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary =
        _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(
      typeof padding !== "number"
        ? padding
        : expandToHashMap(padding, basePlacements)
    );
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(
      isElement(element)
        ? element
        : element.contextElement || getDocumentElement(state.elements.popper),
      boundary,
      rootBoundary,
      strategy
    );
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: "absolute",
      placement,
    });
    var popperClientRect = rectToClientRect(
      Object.assign({}, popperRect, popperOffsets)
    );
    var elementClientRect =
      elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom:
        elementClientRect.bottom -
        clippingClientRect.bottom +
        paddingObject.bottom,
      left:
        clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right:
        elementClientRect.right -
        clippingClientRect.right +
        paddingObject.right,
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function (key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [enums_top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset[axis] * multiply;
      });
    }
    return overflowOffsets;
  }
  function computeAutoPlacement(state, options) {
    if (options === void 0) options = {};
    var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements =
        _options$allowedAutoP === void 0
          ? enums_placements
          : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements = variation
      ? flipVariations
        ? variationPlacements
        : variationPlacements.filter(function (placement) {
            return getVariation(placement) === variation;
          })
      : basePlacements;
    var allowedPlacements = placements.filter(function (placement) {
      return allowedAutoPlacements.indexOf(placement) >= 0;
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements;
      if (false);
    }
    var overflows = allowedPlacements.reduce(function (acc, placement) {
      acc[placement] = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        padding,
      })[getBasePlacement(placement)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function (a, b) {
      return overflows[a] - overflows[b];
    });
  }
  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) return [];
    var oppositePlacement = getOppositePlacement(placement);
    return [
      getOppositeVariationPlacement(placement),
      oppositePlacement,
      getOppositeVariationPlacement(oppositePlacement),
    ];
  }
  function flip(_ref) {
    var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
    if (state.modifiersData[name]._skip) return;
    var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations =
        _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements =
      specifiedFallbackPlacements ||
      (isBasePlacement || !flipVariations
        ? [getOppositePlacement(preferredPlacement)]
        : getExpandedFallbackPlacements(preferredPlacement));
    var placements = [preferredPlacement]
      .concat(fallbackPlacements)
      .reduce(function (acc, placement) {
        return acc.concat(
          getBasePlacement(placement) === auto
            ? computeAutoPlacement(state, {
                placement,
                boundary,
                rootBoundary,
                padding,
                flipVariations,
                allowedAutoPlacements,
              })
            : placement
        );
      }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements[0];
    for (var i = 0; i < placements.length; i++) {
      var placement = placements[i];
      var _basePlacement = getBasePlacement(placement);
      var isStartVariation = getVariation(placement) === start;
      var isVertical = [enums_top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        altBoundary,
        padding,
      });
      var mainVariationSide = isVertical
        ? isStartVariation
          ? right
          : left
        : isStartVariation
        ? bottom
        : enums_top;
      if (referenceRect[len] > popperRect[len])
        mainVariationSide = getOppositePlacement(mainVariationSide);
      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];
      if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
      if (checkAltAxis)
        checks.push(
          overflow[mainVariationSide] <= 0,
          overflow[altVariationSide] <= 0
        );
      if (
        checks.every(function (check) {
          return check;
        })
      ) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }
      checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop(_i) {
        var fittingPlacement = placements.find(function (placement) {
          var checks = checksMap.get(placement);
          if (checks)
            return checks.slice(0, _i).every(function (check) {
              return check;
            });
        });
        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };
      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);
        if (_ret === "break") break;
      }
    }
    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  }
  const modifiers_flip = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
      _skip: false,
    },
  };
  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function within(min, value, max) {
    return math_max(min, math_min(value, max));
  }
  function withinMaxClamp(min, value, max) {
    var v = within(min, value, max);
    return v > max ? max : v;
  }
  function preventOverflow(_ref) {
    var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
    var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset =
        _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary,
      rootBoundary,
      padding,
      altBoundary,
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue =
      typeof tetherOffset === "function"
        ? tetherOffset(
            Object.assign({}, state.rects, {
              placement: state.placement,
            })
          )
        : tetherOffset;
    var normalizedTetherOffsetValue =
      typeof tetherOffsetValue === "number"
        ? {
            mainAxis: tetherOffsetValue,
            altAxis: tetherOffsetValue,
          }
        : Object.assign(
            {
              mainAxis: 0,
              altAxis: 0,
            },
            tetherOffsetValue
          );
    var offsetModifierState = state.modifiersData.offset
      ? state.modifiersData.offset[state.placement]
      : null;
    var data = {
      x: 0,
      y: 0,
    };
    if (!popperOffsets) return;
    if (checkMainAxis) {
      var _offsetModifierState$;
      var mainSide = mainAxis === "y" ? enums_top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset = popperOffsets[mainAxis];
      var min = offset + overflow[mainSide];
      var max = offset - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect =
        tether && arrowElement
          ? getLayoutRect(arrowElement)
          : {
              width: 0,
              height: 0,
            };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"]
        ? state.modifiersData["arrow#persistent"].padding
        : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement
        ? referenceRect[len] / 2 -
          additive -
          arrowLen -
          arrowPaddingMin -
          normalizedTetherOffsetValue.mainAxis
        : minLen -
          arrowLen -
          arrowPaddingMin -
          normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement
        ? -referenceRect[len] / 2 +
          additive +
          arrowLen +
          arrowPaddingMax +
          normalizedTetherOffsetValue.mainAxis
        : maxLen +
          arrowLen +
          arrowPaddingMax +
          normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent =
        state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent
        ? mainAxis === "y"
          ? arrowOffsetParent.clientTop || 0
          : arrowOffsetParent.clientLeft || 0
        : 0;
      var offsetModifierValue =
        (_offsetModifierState$ =
          offsetModifierState == null
            ? void 0
            : offsetModifierState[mainAxis]) != null
          ? _offsetModifierState$
          : 0;
      var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset + maxOffset - offsetModifierValue;
      var preventedOffset = within(
        tether ? math_min(min, tetherMin) : min,
        offset,
        tether ? math_max(max, tetherMax) : max
      );
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }
    if (checkAltAxis) {
      var _offsetModifierState$2;
      var _mainSide = mainAxis === "x" ? enums_top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets[altAxis];
      var _len = altAxis === "y" ? "height" : "width";
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var isOriginSide = [enums_top, left].indexOf(basePlacement) !== -1;
      var _offsetModifierValue =
        (_offsetModifierState$2 =
          offsetModifierState == null
            ? void 0
            : offsetModifierState[altAxis]) != null
          ? _offsetModifierState$2
          : 0;
      var _tetherMin = isOriginSide
        ? _min
        : _offset -
          referenceRect[_len] -
          popperRect[_len] -
          _offsetModifierValue +
          normalizedTetherOffsetValue.altAxis;
      var _tetherMax = isOriginSide
        ? _offset +
          referenceRect[_len] +
          popperRect[_len] -
          _offsetModifierValue -
          normalizedTetherOffsetValue.altAxis
        : _max;
      var _preventedOffset =
        tether && isOriginSide
          ? withinMaxClamp(_tetherMin, _offset, _tetherMax)
          : within(
              tether ? _tetherMin : _min,
              _offset,
              tether ? _tetherMax : _max
            );
      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data;
  }
  const modifiers_preventOverflow = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"],
  };
  var toPaddingObject = function toPaddingObject(padding, state) {
    padding =
      typeof padding === "function"
        ? padding(
            Object.assign({}, state.rects, {
              placement: state.placement,
            })
          )
        : padding;
    return mergePaddingObject(
      typeof padding !== "number"
        ? padding
        : expandToHashMap(padding, basePlacements)
    );
  };
  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets) return;
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? enums_top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff =
      state.rects.reference[len] +
      state.rects.reference[axis] -
      popperOffsets[axis] -
      state.rects.popper[len];
    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent
      ? axis === "y"
        ? arrowOffsetParent.clientHeight || 0
        : arrowOffsetParent.clientWidth || 0
      : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min = paddingObject[minProp];
    var max = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset = within(min, center, max);
    var axisProp = axis;
    state.modifiersData[name] =
      ((_state$modifiersData$ = {}),
      (_state$modifiersData$[axisProp] = offset),
      (_state$modifiersData$.centerOffset = offset - center),
      _state$modifiersData$);
  }
  function arrow_effect(_ref2) {
    var state = _ref2.state,
      options = _ref2.options;
    var _options$element = options.element,
      arrowElement =
        _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) return;
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) return;
    }
    if (false);
    if (!contains(state.elements.popper, arrowElement)) {
      if (false);
      return;
    }
    state.elements.arrow = arrowElement;
  }
  const modifiers_arrow = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: arrow_effect,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0)
      preventedOffsets = {
        x: 0,
        y: 0,
      };
    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x,
    };
  }
  function isAnySideFullyClipped(overflow) {
    return [enums_top, right, bottom, left].some(function (side) {
      return overflow[side] >= 0;
    });
  }
  function hide(_ref) {
    var state = _ref.state,
      name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference",
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true,
    });
    var referenceClippingOffsets = getSideOffsets(
      referenceOverflow,
      referenceRect
    );
    var popperEscapeOffsets = getSideOffsets(
      popperAltOverflow,
      popperRect,
      preventedOffsets
    );
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets,
      popperEscapeOffsets,
      isReferenceHidden,
      hasPopperEscaped,
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped,
    });
  }
  const modifiers_hide = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide,
  };
  var defaultModifiers = [
    eventListeners,
    modifiers_popperOffsets,
    modifiers_computeStyles,
    modifiers_applyStyles,
    modifiers_offset,
    modifiers_flip,
    modifiers_preventOverflow,
    modifiers_arrow,
    modifiers_hide,
  ];
  var popper_createPopper = popperGenerator({
    defaultModifiers,
  });
  var BOX_CLASS = "tippy-box";
  var CONTENT_CLASS = "tippy-content";
  var BACKDROP_CLASS = "tippy-backdrop";
  var ARROW_CLASS = "tippy-arrow";
  var SVG_ARROW_CLASS = "tippy-svg-arrow";
  var TOUCH_OPTIONS = {
    passive: true,
    capture: true,
  };
  var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
    return document.body;
  };
  function getValueAtIndexOrReturn(value, index, defaultValue) {
    if (Array.isArray(value)) {
      var v = value[index];
      return v == null
        ? Array.isArray(defaultValue)
          ? defaultValue[index]
          : defaultValue
        : v;
    }
    return value;
  }
  function isType(value, type) {
    var str = {}.toString.call(value);
    return str.indexOf("[object") === 0 && str.indexOf(type + "]") > -1;
  }
  function invokeWithArgsOrReturn(value, args) {
    return typeof value === "function" ? value.apply(void 0, args) : value;
  }
  function tippy_esm_debounce(fn, ms) {
    if (ms === 0) return fn;
    var timeout;
    return function (arg) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        fn(arg);
      }, ms);
    };
  }
  function splitBySpaces(value) {
    return value.split(/\s+/).filter(Boolean);
  }
  function normalizeToArray(value) {
    return [].concat(value);
  }
  function pushIfUnique(arr, value) {
    if (arr.indexOf(value) === -1) arr.push(value);
  }
  function unique(arr) {
    return arr.filter(function (item, index) {
      return arr.indexOf(item) === index;
    });
  }
  function tippy_esm_getBasePlacement(placement) {
    return placement.split("-")[0];
  }
  function arrayFrom(value) {
    return [].slice.call(value);
  }
  function removeUndefinedProps(obj) {
    return Object.keys(obj).reduce(function (acc, key) {
      if (obj[key] !== void 0) acc[key] = obj[key];
      return acc;
    }, {});
  }
  function div() {
    return document.createElement("div");
  }
  function tippy_esm_isElement(value) {
    return ["Element", "Fragment"].some(function (type) {
      return isType(value, type);
    });
  }
  function isNodeList(value) {
    return isType(value, "NodeList");
  }
  function isMouseEvent(value) {
    return isType(value, "MouseEvent");
  }
  function isReferenceElement(value) {
    return !!(value && value._tippy && value._tippy.reference === value);
  }
  function getArrayOfElements(value) {
    if (tippy_esm_isElement(value)) return [value];
    if (isNodeList(value)) return arrayFrom(value);
    if (Array.isArray(value)) return value;
    return arrayFrom(document.querySelectorAll(value));
  }
  function setTransitionDuration(els, value) {
    els.forEach(function (el) {
      if (el) el.style.transitionDuration = value + "ms";
    });
  }
  function setVisibilityState(els, state) {
    els.forEach(function (el) {
      if (el) el.setAttribute("data-state", state);
    });
  }
  function getOwnerDocument(elementOrElements) {
    var _element$ownerDocumen;
    var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0];
    return element != null &&
      (_element$ownerDocumen = element.ownerDocument) != null &&
      _element$ownerDocumen.body
      ? element.ownerDocument
      : document;
  }
  function isCursorOutsideInteractiveBorder(popperTreeData, event) {
    var clientX = event.clientX,
      clientY = event.clientY;
    return popperTreeData.every(function (_ref) {
      var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
      var interactiveBorder = props.interactiveBorder;
      var basePlacement = tippy_esm_getBasePlacement(popperState.placement);
      var offsetData = popperState.modifiersData.offset;
      if (!offsetData) return true;
      var topDistance = basePlacement === "bottom" ? offsetData.top.y : 0;
      var bottomDistance = basePlacement === "top" ? offsetData.bottom.y : 0;
      var leftDistance = basePlacement === "right" ? offsetData.left.x : 0;
      var rightDistance = basePlacement === "left" ? offsetData.right.x : 0;
      var exceedsTop =
        popperRect.top - clientY + topDistance > interactiveBorder;
      var exceedsBottom =
        clientY - popperRect.bottom - bottomDistance > interactiveBorder;
      var exceedsLeft =
        popperRect.left - clientX + leftDistance > interactiveBorder;
      var exceedsRight =
        clientX - popperRect.right - rightDistance > interactiveBorder;
      return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
    });
  }
  function updateTransitionEndListener(box, action, listener) {
    var method = action + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (event) {
      box[method](event, listener);
    });
  }
  function actualContains(parent, child) {
    var target = child;
    while (target) {
      var _target$getRootNode;
      if (parent.contains(target)) return true;
      target =
        target.getRootNode == null
          ? void 0
          : (_target$getRootNode = target.getRootNode()) == null
          ? void 0
          : _target$getRootNode.host;
    }
    return false;
  }
  var currentInput = {
    isTouch: false,
  };
  var lastMouseMoveTime = 0;
  function onDocumentTouchStart() {
    if (currentInput.isTouch) return;
    currentInput.isTouch = true;
    if (window.performance)
      document.addEventListener("mousemove", onDocumentMouseMove);
  }
  function onDocumentMouseMove() {
    var now = performance.now();
    if (now - lastMouseMoveTime < 20) {
      currentInput.isTouch = false;
      document.removeEventListener("mousemove", onDocumentMouseMove);
    }
    lastMouseMoveTime = now;
  }
  function onWindowBlur() {
    var activeElement = document.activeElement;
    if (isReferenceElement(activeElement)) {
      var instance = activeElement._tippy;
      if (activeElement.blur && !instance.state.isVisible) activeElement.blur();
    }
  }
  function bindGlobalEventListeners() {
    document.addEventListener(
      "touchstart",
      onDocumentTouchStart,
      TOUCH_OPTIONS
    );
    window.addEventListener("blur", onWindowBlur);
  }
  var isBrowser =
    typeof window !== "undefined" && typeof document !== "undefined";
  var isIE11 = isBrowser ? !!window.msCrypto : false;
  if (false);
  var pluginProps = {
    animateFill: false,
    followCursor: false,
    inlinePositioning: false,
    sticky: false,
  };
  var renderProps = {
    allowHTML: false,
    animation: "fade",
    arrow: true,
    content: "",
    inertia: false,
    maxWidth: 350,
    role: "tooltip",
    theme: "",
    zIndex: 9999,
  };
  var defaultProps = Object.assign(
    {
      appendTo: TIPPY_DEFAULT_APPEND_TO,
      aria: {
        content: "auto",
        expanded: "auto",
      },
      delay: 0,
      duration: [300, 250],
      getReferenceClientRect: null,
      hideOnClick: true,
      ignoreAttributes: false,
      interactive: false,
      interactiveBorder: 2,
      interactiveDebounce: 0,
      moveTransition: "",
      offset: [0, 10],
      onAfterUpdate: function onAfterUpdate() {},
      onBeforeUpdate: function onBeforeUpdate() {},
      onCreate: function onCreate() {},
      onDestroy: function onDestroy() {},
      onHidden: function onHidden() {},
      onHide: function onHide() {},
      onMount: function onMount() {},
      onShow: function onShow() {},
      onShown: function onShown() {},
      onTrigger: function onTrigger() {},
      onUntrigger: function onUntrigger() {},
      onClickOutside: function onClickOutside() {},
      placement: "top",
      plugins: [],
      popperOptions: {},
      render: null,
      showOnCreate: false,
      touch: true,
      trigger: "mouseenter focus",
      triggerTarget: null,
    },
    pluginProps,
    renderProps
  );
  var defaultKeys = Object.keys(defaultProps);
  var setDefaultProps = function setDefaultProps(partialProps) {
    if (false);
    var keys = Object.keys(partialProps);
    keys.forEach(function (key) {
      defaultProps[key] = partialProps[key];
    });
  };
  function getExtendedPassedProps(passedProps) {
    var plugins = passedProps.plugins || [];
    var pluginProps = plugins.reduce(function (acc, plugin) {
      var name = plugin.name,
        defaultValue = plugin.defaultValue;
      if (name) {
        var _name;
        acc[name] =
          passedProps[name] !== void 0
            ? passedProps[name]
            : (_name = defaultProps[name]) != null
            ? _name
            : defaultValue;
      }
      return acc;
    }, {});
    return Object.assign({}, passedProps, pluginProps);
  }
  function getDataAttributeProps(reference, plugins) {
    var propKeys = plugins
      ? Object.keys(
          getExtendedPassedProps(
            Object.assign({}, defaultProps, {
              plugins,
            })
          )
        )
      : defaultKeys;
    var props = propKeys.reduce(function (acc, key) {
      var valueAsString = (
        reference.getAttribute("data-tippy-" + key) || ""
      ).trim();
      if (!valueAsString) return acc;
      if (key === "content") acc[key] = valueAsString;
      else
        try {
          acc[key] = JSON.parse(valueAsString);
        } catch (e) {
          acc[key] = valueAsString;
        }
      return acc;
    }, {});
    return props;
  }
  function evaluateProps(reference, props) {
    var out = Object.assign(
      {},
      props,
      {
        content: invokeWithArgsOrReturn(props.content, [reference]),
      },
      props.ignoreAttributes
        ? {}
        : getDataAttributeProps(reference, props.plugins)
    );
    out.aria = Object.assign({}, defaultProps.aria, out.aria);
    out.aria = {
      expanded:
        out.aria.expanded === "auto" ? props.interactive : out.aria.expanded,
      content:
        out.aria.content === "auto"
          ? props.interactive
            ? null
            : "describedby"
          : out.aria.content,
    };
    return out;
  }
  var innerHTML = function innerHTML() {
    return "innerHTML";
  };
  function dangerouslySetInnerHTML(element, html) {
    element[innerHTML()] = html;
  }
  function createArrowElement(value) {
    var arrow = div();
    if (value === true) arrow.className = ARROW_CLASS;
    else {
      arrow.className = SVG_ARROW_CLASS;
      if (tippy_esm_isElement(value)) arrow.appendChild(value);
      else dangerouslySetInnerHTML(arrow, value);
    }
    return arrow;
  }
  function setContent(content, props) {
    if (tippy_esm_isElement(props.content)) {
      dangerouslySetInnerHTML(content, "");
      content.appendChild(props.content);
    } else if (typeof props.content !== "function")
      if (props.allowHTML) dangerouslySetInnerHTML(content, props.content);
      else content.textContent = props.content;
  }
  function getChildren(popper) {
    var box = popper.firstElementChild;
    var boxChildren = arrayFrom(box.children);
    return {
      box,
      content: boxChildren.find(function (node) {
        return node.classList.contains(CONTENT_CLASS);
      }),
      arrow: boxChildren.find(function (node) {
        return (
          node.classList.contains(ARROW_CLASS) ||
          node.classList.contains(SVG_ARROW_CLASS)
        );
      }),
      backdrop: boxChildren.find(function (node) {
        return node.classList.contains(BACKDROP_CLASS);
      }),
    };
  }
  function render(instance) {
    var popper = div();
    var box = div();
    box.className = BOX_CLASS;
    box.setAttribute("data-state", "hidden");
    box.setAttribute("tabindex", "-1");
    var content = div();
    content.className = CONTENT_CLASS;
    content.setAttribute("data-state", "hidden");
    setContent(content, instance.props);
    popper.appendChild(box);
    box.appendChild(content);
    onUpdate(instance.props, instance.props);
    function onUpdate(prevProps, nextProps) {
      var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;
      if (nextProps.theme) box.setAttribute("data-theme", nextProps.theme);
      else box.removeAttribute("data-theme");
      if (typeof nextProps.animation === "string")
        box.setAttribute("data-animation", nextProps.animation);
      else box.removeAttribute("data-animation");
      if (nextProps.inertia) box.setAttribute("data-inertia", "");
      else box.removeAttribute("data-inertia");
      box.style.maxWidth =
        typeof nextProps.maxWidth === "number"
          ? nextProps.maxWidth + "px"
          : nextProps.maxWidth;
      if (nextProps.role) box.setAttribute("role", nextProps.role);
      else box.removeAttribute("role");
      if (
        prevProps.content !== nextProps.content ||
        prevProps.allowHTML !== nextProps.allowHTML
      )
        setContent(content, instance.props);
      if (nextProps.arrow) {
        if (!arrow) box.appendChild(createArrowElement(nextProps.arrow));
        else if (prevProps.arrow !== nextProps.arrow) {
          box.removeChild(arrow);
          box.appendChild(createArrowElement(nextProps.arrow));
        }
      } else if (arrow) box.removeChild(arrow);
    }
    return {
      popper,
      onUpdate,
    };
  }
  render.$$tippy = true;
  var idCounter = 1;
  var mouseMoveListeners = [];
  var mountedInstances = [];
  function createTippy(reference, passedProps) {
    var props = evaluateProps(
      reference,
      Object.assign(
        {},
        defaultProps,
        getExtendedPassedProps(removeUndefinedProps(passedProps))
      )
    );
    var showTimeout;
    var hideTimeout;
    var scheduleHideAnimationFrame;
    var isVisibleFromClick = false;
    var didHideDueToDocumentMouseDown = false;
    var didTouchMove = false;
    var ignoreOnFirstUpdate = false;
    var lastTriggerEvent;
    var currentTransitionEndListener;
    var onFirstUpdate;
    var listeners = [];
    var debouncedOnMouseMove = tippy_esm_debounce(
      onMouseMove,
      props.interactiveDebounce
    );
    var currentTarget;
    var id = idCounter++;
    var popperInstance = null;
    var plugins = unique(props.plugins);
    var state = {
      isEnabled: true,
      isVisible: false,
      isDestroyed: false,
      isMounted: false,
      isShown: false,
    };
    var instance = {
      id,
      reference,
      popper: div(),
      popperInstance,
      props,
      state,
      plugins,
      clearDelayTimeouts,
      setProps,
      setContent,
      show,
      hide,
      hideWithInteractivity,
      enable,
      disable,
      unmount,
      destroy,
    };
    if (!props.render) {
      if (false);
      return instance;
    }
    var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;
    popper.setAttribute("data-tippy-root", "");
    popper.id = "tippy-" + instance.id;
    instance.popper = popper;
    reference._tippy = instance;
    popper._tippy = instance;
    var pluginsHooks = plugins.map(function (plugin) {
      return plugin.fn(instance);
    });
    var hasAriaExpanded = reference.hasAttribute("aria-expanded");
    addListeners();
    handleAriaExpandedAttribute();
    handleStyles();
    invokeHook("onCreate", [instance]);
    if (props.showOnCreate) scheduleShow();
    popper.addEventListener("mouseenter", function () {
      if (instance.props.interactive && instance.state.isVisible)
        instance.clearDelayTimeouts();
    });
    popper.addEventListener("mouseleave", function () {
      if (
        instance.props.interactive &&
        instance.props.trigger.indexOf("mouseenter") >= 0
      )
        getDocument().addEventListener("mousemove", debouncedOnMouseMove);
    });
    return instance;
    function getNormalizedTouchSettings() {
      var touch = instance.props.touch;
      return Array.isArray(touch) ? touch : [touch, 0];
    }
    function getIsCustomTouchBehavior() {
      return getNormalizedTouchSettings()[0] === "hold";
    }
    function getIsDefaultRenderFn() {
      var _instance$props$rende;
      return !!(
        (_instance$props$rende = instance.props.render) != null &&
        _instance$props$rende.$$tippy
      );
    }
    function getCurrentTarget() {
      return currentTarget || reference;
    }
    function getDocument() {
      var parent = getCurrentTarget().parentNode;
      return parent ? getOwnerDocument(parent) : document;
    }
    function getDefaultTemplateChildren() {
      return getChildren(popper);
    }
    function getDelay(isShow) {
      if (
        (instance.state.isMounted && !instance.state.isVisible) ||
        currentInput.isTouch ||
        (lastTriggerEvent && lastTriggerEvent.type === "focus")
      )
        return 0;
      return getValueAtIndexOrReturn(
        instance.props.delay,
        isShow ? 0 : 1,
        defaultProps.delay
      );
    }
    function handleStyles(fromHide) {
      if (fromHide === void 0) fromHide = false;
      popper.style.pointerEvents =
        instance.props.interactive && !fromHide ? "" : "none";
      popper.style.zIndex = "" + instance.props.zIndex;
    }
    function invokeHook(hook, args, shouldInvokePropsHook) {
      if (shouldInvokePropsHook === void 0) shouldInvokePropsHook = true;
      pluginsHooks.forEach(function (pluginHooks) {
        if (pluginHooks[hook]) pluginHooks[hook].apply(pluginHooks, args);
      });
      if (shouldInvokePropsHook) {
        var _instance$props;
        (_instance$props = instance.props)[hook].apply(_instance$props, args);
      }
    }
    function handleAriaContentAttribute() {
      var aria = instance.props.aria;
      if (!aria.content) return;
      var attr = "aria-" + aria.content;
      var id = popper.id;
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        var currentValue = node.getAttribute(attr);
        if (instance.state.isVisible)
          node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
        else {
          var nextValue = currentValue && currentValue.replace(id, "").trim();
          if (nextValue) node.setAttribute(attr, nextValue);
          else node.removeAttribute(attr);
        }
      });
    }
    function handleAriaExpandedAttribute() {
      if (hasAriaExpanded || !instance.props.aria.expanded) return;
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        if (instance.props.interactive)
          node.setAttribute(
            "aria-expanded",
            instance.state.isVisible && node === getCurrentTarget()
              ? "true"
              : "false"
          );
        else node.removeAttribute("aria-expanded");
      });
    }
    function cleanupInteractiveMouseListeners() {
      getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
      mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
        return listener !== debouncedOnMouseMove;
      });
    }
    function onDocumentPress(event) {
      if (currentInput.isTouch)
        if (didTouchMove || event.type === "mousedown") return;
      var actualTarget =
        (event.composedPath && event.composedPath()[0]) || event.target;
      if (instance.props.interactive && actualContains(popper, actualTarget))
        return;
      if (
        normalizeToArray(instance.props.triggerTarget || reference).some(
          function (el) {
            return actualContains(el, actualTarget);
          }
        )
      ) {
        if (currentInput.isTouch) return;
        if (
          instance.state.isVisible &&
          instance.props.trigger.indexOf("click") >= 0
        )
          return;
      } else invokeHook("onClickOutside", [instance, event]);
      if (instance.props.hideOnClick === true) {
        instance.clearDelayTimeouts();
        instance.hide();
        didHideDueToDocumentMouseDown = true;
        setTimeout(function () {
          didHideDueToDocumentMouseDown = false;
        });
        if (!instance.state.isMounted) removeDocumentPress();
      }
    }
    function onTouchMove() {
      didTouchMove = true;
    }
    function onTouchStart() {
      didTouchMove = false;
    }
    function addDocumentPress() {
      var doc = getDocument();
      doc.addEventListener("mousedown", onDocumentPress, true);
      doc.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
      doc.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
      doc.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
    }
    function removeDocumentPress() {
      var doc = getDocument();
      doc.removeEventListener("mousedown", onDocumentPress, true);
      doc.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
      doc.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
      doc.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
    }
    function onTransitionedOut(duration, callback) {
      onTransitionEnd(duration, function () {
        if (
          !instance.state.isVisible &&
          popper.parentNode &&
          popper.parentNode.contains(popper)
        )
          callback();
      });
    }
    function onTransitionedIn(duration, callback) {
      onTransitionEnd(duration, callback);
    }
    function onTransitionEnd(duration, callback) {
      var box = getDefaultTemplateChildren().box;
      function listener(event) {
        if (event.target === box) {
          updateTransitionEndListener(box, "remove", listener);
          callback();
        }
      }
      if (duration === 0) return callback();
      updateTransitionEndListener(box, "remove", currentTransitionEndListener);
      updateTransitionEndListener(box, "add", listener);
      currentTransitionEndListener = listener;
    }
    function on(eventType, handler, options) {
      if (options === void 0) options = false;
      var nodes = normalizeToArray(instance.props.triggerTarget || reference);
      nodes.forEach(function (node) {
        node.addEventListener(eventType, handler, options);
        listeners.push({
          node,
          eventType,
          handler,
          options,
        });
      });
    }
    function addListeners() {
      if (getIsCustomTouchBehavior()) {
        on("touchstart", onTrigger, {
          passive: true,
        });
        on("touchend", onMouseLeave, {
          passive: true,
        });
      }
      splitBySpaces(instance.props.trigger).forEach(function (eventType) {
        if (eventType === "manual") return;
        on(eventType, onTrigger);
        switch (eventType) {
          case "mouseenter":
            on("mouseleave", onMouseLeave);
            break;

          case "focus":
            on(isIE11 ? "focusout" : "blur", onBlurOrFocusOut);
            break;

          case "focusin":
            on("focusout", onBlurOrFocusOut);
            break;
        }
      });
    }
    function removeListeners() {
      listeners.forEach(function (_ref) {
        var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
        node.removeEventListener(eventType, handler, options);
      });
      listeners = [];
    }
    function onTrigger(event) {
      var _lastTriggerEvent;
      var shouldScheduleClickHide = false;
      if (
        !instance.state.isEnabled ||
        isEventListenerStopped(event) ||
        didHideDueToDocumentMouseDown
      )
        return;
      var wasFocused =
        ((_lastTriggerEvent = lastTriggerEvent) == null
          ? void 0
          : _lastTriggerEvent.type) === "focus";
      lastTriggerEvent = event;
      currentTarget = event.currentTarget;
      handleAriaExpandedAttribute();
      if (!instance.state.isVisible && isMouseEvent(event))
        mouseMoveListeners.forEach(function (listener) {
          return listener(event);
        });
      if (
        event.type === "click" &&
        (instance.props.trigger.indexOf("mouseenter") < 0 ||
          isVisibleFromClick) &&
        instance.props.hideOnClick !== false &&
        instance.state.isVisible
      )
        shouldScheduleClickHide = true;
      else scheduleShow(event);
      if (event.type === "click") isVisibleFromClick = !shouldScheduleClickHide;
      if (shouldScheduleClickHide && !wasFocused) scheduleHide(event);
    }
    function onMouseMove(event) {
      var target = event.target;
      var isCursorOverReferenceOrPopper =
        getCurrentTarget().contains(target) || popper.contains(target);
      if (event.type === "mousemove" && isCursorOverReferenceOrPopper) return;
      var popperTreeData = getNestedPopperTree()
        .concat(popper)
        .map(function (popper) {
          var _instance$popperInsta;
          var instance = popper._tippy;
          var state =
            (_instance$popperInsta = instance.popperInstance) == null
              ? void 0
              : _instance$popperInsta.state;
          if (state)
            return {
              popperRect: popper.getBoundingClientRect(),
              popperState: state,
              props,
            };
          return null;
        })
        .filter(Boolean);
      if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
        cleanupInteractiveMouseListeners();
        scheduleHide(event);
      }
    }
    function onMouseLeave(event) {
      var shouldBail =
        isEventListenerStopped(event) ||
        (instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick);
      if (shouldBail) return;
      if (instance.props.interactive) {
        instance.hideWithInteractivity(event);
        return;
      }
      scheduleHide(event);
    }
    function onBlurOrFocusOut(event) {
      if (
        instance.props.trigger.indexOf("focusin") < 0 &&
        event.target !== getCurrentTarget()
      )
        return;
      if (
        instance.props.interactive &&
        event.relatedTarget &&
        popper.contains(event.relatedTarget)
      )
        return;
      scheduleHide(event);
    }
    function isEventListenerStopped(event) {
      return currentInput.isTouch
        ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0
        : false;
    }
    function createPopperInstance() {
      destroyPopperInstance();
      var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
      var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
      var computedReference = getReferenceClientRect
        ? {
            getBoundingClientRect: getReferenceClientRect,
            contextElement:
              getReferenceClientRect.contextElement || getCurrentTarget(),
          }
        : reference;
      var tippyModifier = {
        name: "$$tippy",
        enabled: true,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: function fn(_ref2) {
          var state = _ref2.state;
          if (getIsDefaultRenderFn()) {
            var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;
            ["placement", "reference-hidden", "escaped"].forEach(function (
              attr
            ) {
              if (attr === "placement")
                box.setAttribute("data-placement", state.placement);
              else if (state.attributes.popper["data-popper-" + attr])
                box.setAttribute("data-" + attr, "");
              else box.removeAttribute("data-" + attr);
            });
            state.attributes.popper = {};
          }
        },
      };
      var modifiers = [
        {
          name: "offset",
          options: {
            offset,
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: {
              top: 2,
              bottom: 2,
              left: 5,
              right: 5,
            },
          },
        },
        {
          name: "flip",
          options: {
            padding: 5,
          },
        },
        {
          name: "computeStyles",
          options: {
            adaptive: !moveTransition,
          },
        },
        tippyModifier,
      ];
      if (getIsDefaultRenderFn() && arrow)
        modifiers.push({
          name: "arrow",
          options: {
            element: arrow,
            padding: 3,
          },
        });
      modifiers.push.apply(
        modifiers,
        (popperOptions == null ? void 0 : popperOptions.modifiers) || []
      );
      instance.popperInstance = popper_createPopper(
        computedReference,
        popper,
        Object.assign({}, popperOptions, {
          placement,
          onFirstUpdate,
          modifiers,
        })
      );
    }
    function destroyPopperInstance() {
      if (instance.popperInstance) {
        instance.popperInstance.destroy();
        instance.popperInstance = null;
      }
    }
    function mount() {
      var appendTo = instance.props.appendTo;
      var parentNode;
      var node = getCurrentTarget();
      if (
        (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO) ||
        appendTo === "parent"
      )
        parentNode = node.parentNode;
      else parentNode = invokeWithArgsOrReturn(appendTo, [node]);
      if (!parentNode.contains(popper)) parentNode.appendChild(popper);
      instance.state.isMounted = true;
      createPopperInstance();
      if (false);
    }
    function getNestedPopperTree() {
      return arrayFrom(popper.querySelectorAll("[data-tippy-root]"));
    }
    function scheduleShow(event) {
      instance.clearDelayTimeouts();
      if (event) invokeHook("onTrigger", [instance, event]);
      addDocumentPress();
      var delay = getDelay(true);
      var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];
      if (currentInput.isTouch && touchValue === "hold" && touchDelay)
        delay = touchDelay;
      if (delay)
        showTimeout = setTimeout(function () {
          instance.show();
        }, delay);
      else instance.show();
    }
    function scheduleHide(event) {
      instance.clearDelayTimeouts();
      invokeHook("onUntrigger", [instance, event]);
      if (!instance.state.isVisible) {
        removeDocumentPress();
        return;
      }
      if (
        instance.props.trigger.indexOf("mouseenter") >= 0 &&
        instance.props.trigger.indexOf("click") >= 0 &&
        ["mouseleave", "mousemove"].indexOf(event.type) >= 0 &&
        isVisibleFromClick
      )
        return;
      var delay = getDelay(false);
      if (delay)
        hideTimeout = setTimeout(function () {
          if (instance.state.isVisible) instance.hide();
        }, delay);
      else
        scheduleHideAnimationFrame = requestAnimationFrame(function () {
          instance.hide();
        });
    }
    function enable() {
      instance.state.isEnabled = true;
    }
    function disable() {
      instance.hide();
      instance.state.isEnabled = false;
    }
    function clearDelayTimeouts() {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      cancelAnimationFrame(scheduleHideAnimationFrame);
    }
    function setProps(partialProps) {
      if (false);
      if (instance.state.isDestroyed) return;
      invokeHook("onBeforeUpdate", [instance, partialProps]);
      removeListeners();
      var prevProps = instance.props;
      var nextProps = evaluateProps(
        reference,
        Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
          ignoreAttributes: true,
        })
      );
      instance.props = nextProps;
      addListeners();
      if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
        cleanupInteractiveMouseListeners();
        debouncedOnMouseMove = tippy_esm_debounce(
          onMouseMove,
          nextProps.interactiveDebounce
        );
      }
      if (prevProps.triggerTarget && !nextProps.triggerTarget)
        normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
          node.removeAttribute("aria-expanded");
        });
      else if (nextProps.triggerTarget)
        reference.removeAttribute("aria-expanded");
      handleAriaExpandedAttribute();
      handleStyles();
      if (onUpdate) onUpdate(prevProps, nextProps);
      if (instance.popperInstance) {
        createPopperInstance();
        getNestedPopperTree().forEach(function (nestedPopper) {
          requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
        });
      }
      invokeHook("onAfterUpdate", [instance, partialProps]);
    }
    function setContent(content) {
      instance.setProps({
        content,
      });
    }
    function show() {
      if (false);
      var isAlreadyVisible = instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var isTouchAndTouchDisabled =
        currentInput.isTouch && !instance.props.touch;
      var duration = getValueAtIndexOrReturn(
        instance.props.duration,
        0,
        defaultProps.duration
      );
      if (
        isAlreadyVisible ||
        isDestroyed ||
        isDisabled ||
        isTouchAndTouchDisabled
      )
        return;
      if (getCurrentTarget().hasAttribute("disabled")) return;
      invokeHook("onShow", [instance], false);
      if (instance.props.onShow(instance) === false) return;
      instance.state.isVisible = true;
      if (getIsDefaultRenderFn()) popper.style.visibility = "visible";
      handleStyles();
      addDocumentPress();
      if (!instance.state.isMounted) popper.style.transition = "none";
      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;
        setTransitionDuration([box, content], 0);
      }
      onFirstUpdate = function onFirstUpdate() {
        var _instance$popperInsta2;
        if (!instance.state.isVisible || ignoreOnFirstUpdate) return;
        ignoreOnFirstUpdate = true;
        void popper.offsetHeight;
        popper.style.transition = instance.props.moveTransition;
        if (getIsDefaultRenderFn() && instance.props.animation) {
          var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;
          setTransitionDuration([_box, _content], duration);
          setVisibilityState([_box, _content], "visible");
        }
        handleAriaContentAttribute();
        handleAriaExpandedAttribute();
        pushIfUnique(mountedInstances, instance);
        (_instance$popperInsta2 = instance.popperInstance) == null
          ? void 0
          : _instance$popperInsta2.forceUpdate();
        invokeHook("onMount", [instance]);
        if (instance.props.animation && getIsDefaultRenderFn())
          onTransitionedIn(duration, function () {
            instance.state.isShown = true;
            invokeHook("onShown", [instance]);
          });
      };
      mount();
    }
    function hide() {
      if (false);
      var isAlreadyHidden = !instance.state.isVisible;
      var isDestroyed = instance.state.isDestroyed;
      var isDisabled = !instance.state.isEnabled;
      var duration = getValueAtIndexOrReturn(
        instance.props.duration,
        1,
        defaultProps.duration
      );
      if (isAlreadyHidden || isDestroyed || isDisabled) return;
      invokeHook("onHide", [instance], false);
      if (instance.props.onHide(instance) === false) return;
      instance.state.isVisible = false;
      instance.state.isShown = false;
      ignoreOnFirstUpdate = false;
      isVisibleFromClick = false;
      if (getIsDefaultRenderFn()) popper.style.visibility = "hidden";
      cleanupInteractiveMouseListeners();
      removeDocumentPress();
      handleStyles(true);
      if (getIsDefaultRenderFn()) {
        var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;
        if (instance.props.animation) {
          setTransitionDuration([box, content], duration);
          setVisibilityState([box, content], "hidden");
        }
      }
      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      if (instance.props.animation) {
        if (getIsDefaultRenderFn())
          onTransitionedOut(duration, instance.unmount);
      } else instance.unmount();
    }
    function hideWithInteractivity(event) {
      if (false);
      getDocument().addEventListener("mousemove", debouncedOnMouseMove);
      pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
      debouncedOnMouseMove(event);
    }
    function unmount() {
      if (false);
      if (instance.state.isVisible) instance.hide();
      if (!instance.state.isMounted) return;
      destroyPopperInstance();
      getNestedPopperTree().forEach(function (nestedPopper) {
        nestedPopper._tippy.unmount();
      });
      if (popper.parentNode) popper.parentNode.removeChild(popper);
      mountedInstances = mountedInstances.filter(function (i) {
        return i !== instance;
      });
      instance.state.isMounted = false;
      invokeHook("onHidden", [instance]);
    }
    function destroy() {
      if (false);
      if (instance.state.isDestroyed) return;
      instance.clearDelayTimeouts();
      instance.unmount();
      removeListeners();
      delete reference._tippy;
      instance.state.isDestroyed = true;
      invokeHook("onDestroy", [instance]);
    }
  }
  function tippy(targets, optionalProps) {
    if (optionalProps === void 0) optionalProps = {};
    var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
    if (false);
    bindGlobalEventListeners();
    var passedProps = Object.assign({}, optionalProps, {
      plugins,
    });
    var elements = getArrayOfElements(targets);
    if (false);
    var instances = elements.reduce(function (acc, reference) {
      var instance = reference && createTippy(reference, passedProps);
      if (instance) acc.push(instance);
      return acc;
    }, []);
    return tippy_esm_isElement(targets) ? instances[0] : instances;
  }
  tippy.defaultProps = defaultProps;
  tippy.setDefaultProps = setDefaultProps;
  tippy.currentInput = currentInput;
  Object.assign({}, modifiers_applyStyles, {
    effect: function effect(_ref) {
      var state = _ref.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: "0",
          top: "0",
          margin: "0",
        },
        arrow: {
          position: "absolute",
        },
        reference: {},
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;
      if (state.elements.arrow)
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
    },
  });
  tippy.setDefaultProps({
    render,
  });
  const tippy_esm = tippy;
  modules_flsModules.tippy = tippy_esm("[data-tippy-content]", {});
  function isObject(obj) {
    return (
      obj !== null &&
      typeof obj === "object" &&
      "constructor" in obj &&
      obj.constructor === Object
    );
  }
  function extend(target = {}, src = {}) {
    Object.keys(src).forEach((key) => {
      if (typeof target[key] === "undefined") target[key] = src[key];
      else if (
        isObject(src[key]) &&
        isObject(target[key]) &&
        Object.keys(src[key]).length > 0
      )
        extend(target[key], src[key]);
    });
  }
  const ssrDocument = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
      blur() {},
      nodeName: "",
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {},
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName() {
          return [];
        },
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function ssr_window_esm_getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }
  const ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: "",
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: {
      replaceState() {},
      pushState() {},
      go() {},
      back() {},
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        },
      };
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") return;
      clearTimeout(id);
    },
  };
  function ssr_window_esm_getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  }
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e) {}
      try {
        delete object[key];
      } catch (e) {}
    });
  }
  function utils_nextTick(callback, delay = 0) {
    return setTimeout(callback, delay);
  }
  function utils_now() {
    return Date.now();
  }
  function utils_getComputedStyle(el) {
    const window = ssr_window_esm_getWindow();
    let style;
    if (window.getComputedStyle) style = window.getComputedStyle(el, null);
    if (!style && el.currentStyle) style = el.currentStyle;
    if (!style) style = el.style;
    return style;
  }
  function utils_getTranslate(el, axis = "x") {
    const window = ssr_window_esm_getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = utils_getComputedStyle(el, null);
    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6)
        curTransform = curTransform
          .split(", ")
          .map((a) => a.replace(",", "."))
          .join(", ");
      transformMatrix = new window.WebKitCSSMatrix(
        curTransform === "none" ? "" : curTransform
      );
    } else {
      transformMatrix =
        curStyle.MozTransform ||
        curStyle.OTransform ||
        curStyle.MsTransform ||
        curStyle.msTransform ||
        curStyle.transform ||
        curStyle
          .getPropertyValue("transform")
          .replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x")
      if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
      else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
      else curTransform = parseFloat(matrix[4]);
    if (axis === "y")
      if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
      else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
      else curTransform = parseFloat(matrix[5]);
    return curTransform || 0;
  }
  function utils_isObject(o) {
    return (
      typeof o === "object" &&
      o !== null &&
      o.constructor &&
      Object.prototype.toString.call(o).slice(8, -1) === "Object"
    );
  }
  function isNode(node) {
    if (
      typeof window !== "undefined" &&
      typeof window.HTMLElement !== "undefined"
    )
      return node instanceof HTMLElement;
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function utils_extend(...args) {
    const to = Object(args[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < args.length; i += 1) {
      const nextSource = args[i];
      if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter(
          (key) => noExtend.indexOf(key) < 0
        );
        for (
          let nextIndex = 0, len = keysArray.length;
          nextIndex < len;
          nextIndex += 1
        ) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable)
            if (
              utils_isObject(to[nextKey]) &&
              utils_isObject(nextSource[nextKey])
            )
              if (nextSource[nextKey].__swiper__)
                to[nextKey] = nextSource[nextKey];
              else utils_extend(to[nextKey], nextSource[nextKey]);
            else if (
              !utils_isObject(to[nextKey]) &&
              utils_isObject(nextSource[nextKey])
            ) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__)
                to[nextKey] = nextSource[nextKey];
              else utils_extend(to[nextKey], nextSource[nextKey]);
            } else to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  }
  function utils_setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll({ swiper, targetPosition, side }) {
    const window = ssr_window_esm_getWindow();
    const startPosition = -swiper.translate;
    let startTime = null;
    let time;
    const duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = "none";
    window.cancelAnimationFrame(swiper.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) =>
      (dir === "next" && current >= target) ||
      (dir === "prev" && current <= target);
    const animate = () => {
      time = new Date().getTime();
      if (startTime === null) startTime = time;
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition =
        startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition))
        currentPosition = targetPosition;
      swiper.wrapperEl.scrollTo({
        [side]: currentPosition,
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper.wrapperEl.style.overflow = "";
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition,
          });
        });
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }
      swiper.cssModeFrameID = window.requestAnimationFrame(animate);
    };
    animate();
  }
  function utils_elementChildren(element, selector = "") {
    return [...element.children].filter((el) => el.matches(selector));
  }
  function utils_createElement(tag, classes = []) {
    const el = document.createElement(tag);
    el.classList.add(...(Array.isArray(classes) ? classes : [classes]));
    return el;
  }
  function elementPrevAll(el, selector) {
    const prevEls = [];
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector) {
        if (prev.matches(selector)) prevEls.push(prev);
      } else prevEls.push(prev);
      el = prev;
    }
    return prevEls;
  }
  function elementNextAll(el, selector) {
    const nextEls = [];
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector) {
        if (next.matches(selector)) nextEls.push(next);
      } else nextEls.push(next);
      el = next;
    }
    return nextEls;
  }
  function elementStyle(el, prop) {
    const window = ssr_window_esm_getWindow();
    return window.getComputedStyle(el, null).getPropertyValue(prop);
  }
  function utils_elementIndex(el) {
    let child = el;
    let i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null)
        if (child.nodeType === 1) i += 1;
      return i;
    }
    return;
  }
  function utils_elementParents(el, selector) {
    const parents = [];
    let parent = el.parentElement;
    while (parent) {
      if (selector) {
        if (parent.matches(selector)) parents.push(parent);
      } else parents.push(parent);
      parent = parent.parentElement;
    }
    return parents;
  }
  function elementOuterSize(el, size, includeMargins) {
    const window = ssr_window_esm_getWindow();
    if (includeMargins)
      return (
        el[size === "width" ? "offsetWidth" : "offsetHeight"] +
        parseFloat(
          window
            .getComputedStyle(el, null)
            .getPropertyValue(size === "width" ? "margin-right" : "margin-top")
        ) +
        parseFloat(
          window
            .getComputedStyle(el, null)
            .getPropertyValue(
              size === "width" ? "margin-left" : "margin-bottom"
            )
        )
      );
    return el.offsetWidth;
  }
  let support;
  function calcSupport() {
    const window = ssr_window_esm_getWindow();
    const document = ssr_window_esm_getDocument();
    return {
      smoothScroll:
        document.documentElement &&
        "scrollBehavior" in document.documentElement.style,
      touch: !!(
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)
      ),
    };
  }
  function getSupport() {
    if (!support) support = calcSupport();
    return support;
  }
  let deviceCached;
  function calcDevice({ userAgent } = {}) {
    const support = getSupport();
    const window = ssr_window_esm_getWindow();
    const platform = window.navigator.platform;
    const ua = userAgent || window.navigator.userAgent;
    const device = {
      ios: false,
      android: false,
    };
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = [
      "1024x1366",
      "1366x1024",
      "834x1194",
      "1194x834",
      "834x1112",
      "1112x834",
      "768x1024",
      "1024x768",
      "820x1180",
      "1180x820",
      "810x1080",
      "1080x810",
    ];
    if (
      !ipad &&
      macos &&
      support.touch &&
      iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0
    ) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad) ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides = {}) {
    if (!deviceCached) deviceCached = calcDevice(overrides);
    return deviceCached;
  }
  let browser;
  function calcBrowser() {
    const window = ssr_window_esm_getWindow();
    let needPerspectiveFix = false;
    function isSafari() {
      const ua = window.navigator.userAgent.toLowerCase();
      return (
        ua.indexOf("safari") >= 0 &&
        ua.indexOf("chrome") < 0 &&
        ua.indexOf("android") < 0
      );
    }
    if (isSafari()) {
      const ua = String(window.navigator.userAgent);
      if (ua.includes("Version/")) {
        const [major, minor] = ua
          .split("Version/")[1]
          .split(" ")[0]
          .split(".")
          .map((num) => Number(num));
        needPerspectiveFix = major < 16 || (major === 16 && minor < 2);
      }
    }
    return {
      isSafari: needPerspectiveFix || isSafari(),
      needPerspectiveFix,
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        window.navigator.userAgent
      ),
    };
  }
  function getBrowser() {
    if (!browser) browser = calcBrowser();
    return browser;
  }
  function Resize({ swiper, on, emit }) {
    const window = ssr_window_esm_getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window.requestAnimationFrame(() => {
          const { width, height } = swiper;
          let newWidth = width;
          let newHeight = height;
          entries.forEach(({ contentBoxSize, contentRect, target }) => {
            if (target && target !== swiper.el) return;
            newWidth = contentRect
              ? contentRect.width
              : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect
              ? contentRect.height
              : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) resizeHandler();
        });
      });
      observer.observe(swiper.el);
    };
    const removeObserver = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      emit("orientationchange");
    };
    on("init", () => {
      if (
        swiper.params.resizeObserver &&
        typeof window.ResizeObserver !== "undefined"
      ) {
        createObserver();
        return;
      }
      window.addEventListener("resize", resizeHandler);
      window.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }
  function Observer({ swiper, extendParams, on, emit }) {
    const observers = [];
    const window = ssr_window_esm_getWindow();
    const attach = (target, options = {}) => {
      const ObserverFunc =
        window.MutationObserver || window.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (swiper.__preventObserver__) return;
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate() {
          emit("observerUpdate", mutations[0]);
        };
        if (window.requestAnimationFrame)
          window.requestAnimationFrame(observerUpdate);
        else window.setTimeout(observerUpdate, 0);
      });
      observer.observe(target, {
        attributes:
          typeof options.attributes === "undefined" ? true : options.attributes,
        childList:
          typeof options.childList === "undefined" ? true : options.childList,
        characterData:
          typeof options.characterData === "undefined"
            ? true
            : options.characterData,
      });
      observers.push(observer);
    };
    const init = () => {
      if (!swiper.params.observer) return;
      if (swiper.params.observeParents) {
        const containerParents = utils_elementParents(swiper.el);
        for (let i = 0; i < containerParents.length; i += 1)
          attach(containerParents[i]);
      }
      attach(swiper.el, {
        childList: swiper.params.observeSlideChildren,
      });
      attach(swiper.wrapperEl, {
        attributes: false,
      });
    };
    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false,
    });
    on("init", init);
    on("destroy", destroy);
  }
  const events_emitter = {
    on(events, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== "function") return self;
      const method = priority ? "unshift" : "push";
      events.split(" ").forEach((event) => {
        if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
        self.eventsListeners[event][method](handler);
      });
      return self;
    },
    once(events, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== "function") return self;
      function onceHandler(...args) {
        self.off(events, onceHandler);
        if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
        handler.apply(self, args);
      }
      onceHandler.__emitterProxy = handler;
      return self.on(events, onceHandler, priority);
    },
    onAny(handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== "function") return self;
      const method = priority ? "unshift" : "push";
      if (self.eventsAnyListeners.indexOf(handler) < 0)
        self.eventsAnyListeners[method](handler);
      return self;
    },
    offAny(handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsAnyListeners) return self;
      const index = self.eventsAnyListeners.indexOf(handler);
      if (index >= 0) self.eventsAnyListeners.splice(index, 1);
      return self;
    },
    off(events, handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsListeners) return self;
      events.split(" ").forEach((event) => {
        if (typeof handler === "undefined") self.eventsListeners[event] = [];
        else if (self.eventsListeners[event])
          self.eventsListeners[event].forEach((eventHandler, index) => {
            if (
              eventHandler === handler ||
              (eventHandler.__emitterProxy &&
                eventHandler.__emitterProxy === handler)
            )
              self.eventsListeners[event].splice(index, 1);
          });
      });
      return self;
    },
    emit(...args) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsListeners) return self;
      let events;
      let data;
      let context;
      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }
      data.unshift(context);
      const eventsArray = Array.isArray(events) ? events : events.split(" ");
      eventsArray.forEach((event) => {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length)
          self.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context, [event, ...data]);
          });
        if (self.eventsListeners && self.eventsListeners[event])
          self.eventsListeners[event].forEach((eventHandler) => {
            eventHandler.apply(context, data);
          });
      });
      return self;
    },
  };
  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const el = swiper.el;
    if (
      typeof swiper.params.width !== "undefined" &&
      swiper.params.width !== null
    )
      width = swiper.params.width;
    else width = el.clientWidth;
    if (
      typeof swiper.params.height !== "undefined" &&
      swiper.params.height !== null
    )
      height = swiper.params.height;
    else height = el.clientHeight;
    if (
      (width === 0 && swiper.isHorizontal()) ||
      (height === 0 && swiper.isVertical())
    )
      return;
    width =
      width -
      parseInt(elementStyle(el, "padding-left") || 0, 10) -
      parseInt(elementStyle(el, "padding-right") || 0, 10);
    height =
      height -
      parseInt(elementStyle(el, "padding-top") || 0, 10) -
      parseInt(elementStyle(el, "padding-bottom") || 0, 10);
    if (Number.isNaN(width)) width = 0;
    if (Number.isNaN(height)) height = 0;
    Object.assign(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height,
    });
  }
  function updateSlides() {
    const swiper = this;
    function getDirectionLabel(property) {
      if (swiper.isHorizontal()) return property;
      return {
        width: "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        marginRight: "marginBottom",
      }[property];
    }
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
    }
    const params = swiper.params;
    const {
      wrapperEl,
      slidesEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL,
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual
      ? swiper.virtual.slides.length
      : swiper.slides.length;
    const slides = utils_elementChildren(
      slidesEl,
      `.${swiper.params.slideClass}, swiper-slide`
    );
    const slidesLength = isVirtual
      ? swiper.virtual.slides.length
      : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === "function")
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    let offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === "function")
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.slidesGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;
    if (typeof swiperSize === "undefined") return;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0)
      spaceBetween =
        (parseFloat(spaceBetween.replace("%", "")) / 100) * swiperSize;
    swiper.virtualSize = -spaceBetween;
    slides.forEach((slideEl) => {
      if (rtl) slideEl.style.marginLeft = "";
      else slideEl.style.marginRight = "";
      slideEl.style.marginBottom = "";
      slideEl.style.marginTop = "";
    });
    if (params.centeredSlides && params.cssMode) {
      utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
      utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
    }
    const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
    if (gridEnabled) swiper.grid.initSlides(slidesLength);
    let slideSize;
    const shouldResetSlideSize =
      params.slidesPerView === "auto" &&
      params.breakpoints &&
      Object.keys(params.breakpoints).filter(
        (key) => typeof params.breakpoints[key].slidesPerView !== "undefined"
      ).length > 0;
    for (let i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      let slide;
      if (slides[i]) slide = slides[i];
      if (gridEnabled)
        swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
      if (slides[i] && elementStyle(slide, "display") === "none") continue;
      if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize)
          slides[i].style[getDirectionLabel("width")] = ``;
        const slideStyles = getComputedStyle(slide);
        const currentTransform = slide.style.transform;
        const currentWebKitTransform = slide.style.webkitTransform;
        if (currentTransform) slide.style.transform = "none";
        if (currentWebKitTransform) slide.style.webkitTransform = "none";
        if (params.roundLengths)
          slideSize = swiper.isHorizontal()
            ? elementOuterSize(slide, "width", true)
            : elementOuterSize(slide, "height", true);
        else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(
            slideStyles,
            "padding-left"
          );
          const paddingRight = getDirectionPropertyValue(
            slideStyles,
            "padding-right"
          );
          const marginLeft = getDirectionPropertyValue(
            slideStyles,
            "margin-left"
          );
          const marginRight = getDirectionPropertyValue(
            slideStyles,
            "margin-right"
          );
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box")
            slideSize = width + marginLeft + marginRight;
          else {
            const { clientWidth, offsetWidth } = slide;
            slideSize =
              width +
              paddingLeft +
              paddingRight +
              marginLeft +
              marginRight +
              (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) slide.style.transform = currentTransform;
        if (currentWebKitTransform)
          slide.style.webkitTransform = currentWebKitTransform;
        if (params.roundLengths) slideSize = Math.floor(slideSize);
      } else {
        slideSize =
          (swiperSize - (params.slidesPerView - 1) * spaceBetween) /
          params.slidesPerView;
        if (params.roundLengths) slideSize = Math.floor(slideSize);
        if (slides[i])
          slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
      }
      if (slides[i]) slides[i].swiperSlideSize = slideSize;
      slidesSizesGrid.push(slideSize);
      if (params.centeredSlides) {
        slidePosition =
          slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (
          (index - Math.min(swiper.params.slidesPerGroupSkip, index)) %
            swiper.params.slidesPerGroup ===
          0
        )
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    if (
      rtl &&
      wrongRTL &&
      (params.effect === "slide" || params.effect === "coverflow")
    )
      wrapperEl.style.width = `${swiper.virtualSize + params.spaceBetween}px`;
    if (params.setWrapperSize)
      wrapperEl.style[getDirectionLabel("width")] = `${
        swiper.virtualSize + params.spaceBetween
      }px`;
    if (gridEnabled)
      swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
    if (!params.centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] <= swiper.virtualSize - swiperSize)
          newSlidesGrid.push(slidesGridItem);
      }
      snapGrid = newSlidesGrid;
      if (
        Math.floor(swiper.virtualSize - swiperSize) -
          Math.floor(snapGrid[snapGrid.length - 1]) >
        1
      )
        snapGrid.push(swiper.virtualSize - swiperSize);
    }
    if (isVirtual && params.loop) {
      const size = slidesSizesGrid[0] + spaceBetween;
      if (params.slidesPerGroup > 1) {
        const groups = Math.ceil(
          (swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) /
            params.slidesPerGroup
        );
        const groupSize = size * params.slidesPerGroup;
        for (let i = 0; i < groups; i += 1)
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
      for (
        let i = 0;
        i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter;
        i += 1
      ) {
        if (params.slidesPerGroup === 1)
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper.virtualSize += size;
      }
    }
    if (snapGrid.length === 0) snapGrid = [0];
    if (params.spaceBetween !== 0) {
      const key =
        swiper.isHorizontal() && rtl
          ? "marginLeft"
          : getDirectionLabel("marginRight");
      slides
        .filter((_, slideIndex) => {
          if (!params.cssMode || params.loop) return true;
          if (slideIndex === slides.length - 1) return false;
          return true;
        })
        .forEach((slideEl) => {
          slideEl.style[key] = `${spaceBetween}px`;
        });
    }
    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize +=
          slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      const maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map((snap) => {
        if (snap < 0) return -offsetBefore;
        if (snap > maxSnap) return maxSnap + offsetAfter;
        return snap;
      });
    }
    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize +=
          slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      if (allSlidesSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid,
    });
    if (
      params.centeredSlides &&
      params.cssMode &&
      !params.centeredSlidesBounds
    ) {
      utils_setCSSProperty(
        wrapperEl,
        "--swiper-centered-offset-before",
        `${-snapGrid[0]}px`
      );
      utils_setCSSProperty(
        wrapperEl,
        "--swiper-centered-offset-after",
        `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`
      );
      const addToSnapGrid = -swiper.snapGrid[0];
      const addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
      swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength)
      swiper.emit("slidesLengthChange");
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength)
      swiper.emit("slidesGridLengthChange");
    if (params.watchSlidesProgress) swiper.updateSlidesOffset();
    if (
      !isVirtual &&
      !params.cssMode &&
      (params.effect === "slide" || params.effect === "fade")
    ) {
      const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded =
        swiper.el.classList.contains(backFaceHiddenClass);
      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded)
        swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let newHeight = 0;
    let i;
    if (typeof speed === "number") swiper.setTransition(speed);
    else if (speed === true) swiper.setTransition(swiper.params.speed);
    const getSlideByIndex = (index) => {
      if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
      return swiper.slides[index];
    };
    if (
      swiper.params.slidesPerView !== "auto" &&
      swiper.params.slidesPerView > 1
    )
      if (swiper.params.centeredSlides)
        (swiper.visibleSlides || []).forEach((slide) => {
          activeSlides.push(slide);
        });
      else
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          const index = swiper.activeIndex + i;
          if (index > swiper.slides.length && !isVirtual) break;
          activeSlides.push(getSlideByIndex(index));
        }
    else activeSlides.push(getSlideByIndex(swiper.activeIndex));
    for (i = 0; i < activeSlides.length; i += 1)
      if (typeof activeSlides[i] !== "undefined") {
        const height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    if (newHeight || newHeight === 0)
      swiper.wrapperEl.style.height = `${newHeight}px`;
  }
  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;
    const minusOffset = swiper.isElement
      ? swiper.isHorizontal()
        ? swiper.wrapperEl.offsetLeft
        : swiper.wrapperEl.offsetTop
      : 0;
    for (let i = 0; i < slides.length; i += 1)
      slides[i].swiperSlideOffset =
        (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) -
        minusOffset -
        swiper.cssOverflowAdjustment();
  }
  function updateSlidesProgress(translate = (this && this.translate) || 0) {
    const swiper = this;
    const params = swiper.params;
    const { slides, rtlTranslate: rtl, snapGrid } = swiper;
    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper.updateSlidesOffset();
    let offsetCenter = -translate;
    if (rtl) offsetCenter = translate;
    slides.forEach((slideEl) => {
      slideEl.classList.remove(params.slideVisibleClass);
    });
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    for (let i = 0; i < slides.length; i += 1) {
      const slide = slides[i];
      let slideOffset = slide.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides)
        slideOffset -= slides[0].swiperSlideOffset;
      const slideProgress =
        (offsetCenter +
          (params.centeredSlides ? swiper.minTranslate() : 0) -
          slideOffset) /
        (slide.swiperSlideSize + params.spaceBetween);
      const originalSlideProgress =
        (offsetCenter -
          snapGrid[0] +
          (params.centeredSlides ? swiper.minTranslate() : 0) -
          slideOffset) /
        (slide.swiperSlideSize + params.spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      const isVisible =
        (slideBefore >= 0 && slideBefore < swiper.size - 1) ||
        (slideAfter > 1 && slideAfter <= swiper.size) ||
        (slideBefore <= 0 && slideAfter >= swiper.size);
      if (isVisible) {
        swiper.visibleSlides.push(slide);
        swiper.visibleSlidesIndexes.push(i);
        slides[i].classList.add(params.slideVisibleClass);
      }
      slide.progress = rtl ? -slideProgress : slideProgress;
      slide.originalProgress = rtl
        ? -originalSlideProgress
        : originalSlideProgress;
    }
  }
  function updateProgress(translate) {
    const swiper = this;
    if (typeof translate === "undefined") {
      const multiplier = swiper.rtlTranslate ? -1 : 1;
      translate =
        (swiper && swiper.translate && swiper.translate * multiplier) || 0;
    }
    const params = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let { progress, isBeginning, isEnd, progressLoop } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      const isBeginningRounded =
        Math.abs(translate - swiper.minTranslate()) < 1;
      const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded) progress = 0;
      if (isEndRounded) progress = 1;
    }
    if (params.loop) {
      const firstSlideIndex = swiper.getSlideIndexByData(0);
      const lastSlideIndex = swiper.getSlideIndexByData(
        swiper.slides.length - 1
      );
      const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
      const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
      const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
      const translateAbs = Math.abs(translate);
      if (translateAbs >= firstSlideTranslate)
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      else
        progressLoop =
          (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      if (progressLoop > 1) progressLoop -= 1;
    }
    Object.assign(swiper, {
      progress,
      progressLoop,
      isBeginning,
      isEnd,
    });
    if (
      params.watchSlidesProgress ||
      (params.centeredSlides && params.autoHeight)
    )
      swiper.updateSlidesProgress(translate);
    if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
    if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
    if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd))
      swiper.emit("fromEdge");
    swiper.emit("progress", progress);
  }
  function updateSlidesClasses() {
    const swiper = this;
    const { slides, params, slidesEl, activeIndex } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const getFilteredSlide = (selector) =>
      utils_elementChildren(
        slidesEl,
        `.${params.slideClass}${selector}, swiper-slide${selector}`
      )[0];
    slides.forEach((slideEl) => {
      slideEl.classList.remove(
        params.slideActiveClass,
        params.slideNextClass,
        params.slidePrevClass
      );
    });
    let activeSlide;
    if (isVirtual)
      if (params.loop) {
        let slideIndex = activeIndex - swiper.virtual.slidesBefore;
        if (slideIndex < 0)
          slideIndex = swiper.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper.virtual.slides.length)
          slideIndex -= swiper.virtual.slides.length;
        activeSlide = getFilteredSlide(
          `[data-swiper-slide-index="${slideIndex}"]`
        );
      } else
        activeSlide = getFilteredSlide(
          `[data-swiper-slide-index="${activeIndex}"]`
        );
    else activeSlide = slides[activeIndex];
    if (activeSlide) {
      activeSlide.classList.add(params.slideActiveClass);
      let nextSlide = elementNextAll(
        activeSlide,
        `.${params.slideClass}, swiper-slide`
      )[0];
      if (params.loop && !nextSlide) nextSlide = slides[0];
      if (nextSlide) nextSlide.classList.add(params.slideNextClass);
      let prevSlide = elementPrevAll(
        activeSlide,
        `.${params.slideClass}, swiper-slide`
      )[0];
      if (params.loop && !prevSlide === 0)
        prevSlide = slides[slides.length - 1];
      if (prevSlide) prevSlide.classList.add(params.slidePrevClass);
    }
    swiper.emitSlidesClasses();
  }
  const processLazyPreloader = (swiper, imageEl) => {
    if (!swiper || swiper.destroyed || !swiper.params) return;
    const slideSelector = () =>
      swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
    const slideEl = imageEl.closest(slideSelector());
    if (slideEl) {
      const lazyEl = slideEl.querySelector(
        `.${swiper.params.lazyPreloaderClass}`
      );
      if (lazyEl) lazyEl.remove();
    }
  };
  const unlazy = (swiper, index) => {
    if (!swiper.slides[index]) return;
    const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
    if (imageEl) imageEl.removeAttribute("loading");
  };
  const preload = (swiper) => {
    if (!swiper || swiper.destroyed || !swiper.params) return;
    let amount = swiper.params.lazyPreloadPrevNext;
    const len = swiper.slides.length;
    if (!len || !amount || amount < 0) return;
    amount = Math.min(amount, len);
    const slidesPerView =
      swiper.params.slidesPerView === "auto"
        ? swiper.slidesPerViewDynamic()
        : Math.ceil(swiper.params.slidesPerView);
    const activeIndex = swiper.activeIndex;
    const slideIndexLastInView = activeIndex + slidesPerView - 1;
    if (swiper.params.rewind)
      for (
        let i = activeIndex - amount;
        i <= slideIndexLastInView + amount;
        i += 1
      ) {
        const realIndex = ((i % len) + len) % len;
        if (realIndex !== activeIndex && realIndex > slideIndexLastInView)
          unlazy(swiper, realIndex);
      }
    else
      for (
        let i = Math.max(slideIndexLastInView - amount, 0);
        i <= Math.min(slideIndexLastInView + amount, len - 1);
        i += 1
      )
        if (i !== activeIndex && i > slideIndexLastInView) unlazy(swiper, i);
  };
  function getActiveIndexByTranslate(swiper) {
    const { slidesGrid, params } = swiper;
    const translate = swiper.rtlTranslate
      ? swiper.translate
      : -swiper.translate;
    let activeIndex;
    for (let i = 0; i < slidesGrid.length; i += 1)
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (
          translate >= slidesGrid[i] &&
          translate <
            slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2
        )
          activeIndex = i;
        else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1])
          activeIndex = i + 1;
      } else if (translate >= slidesGrid[i]) activeIndex = i;
    if (params.normalizeSlideIndex)
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    return activeIndex;
  }
  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate = swiper.rtlTranslate
      ? swiper.translate
      : -swiper.translate;
    const {
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex,
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;
    const getVirtualRealIndex = (aIndex) => {
      let realIndex = aIndex - swiper.virtual.slidesBefore;
      if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
      if (realIndex >= swiper.virtual.slides.length)
        realIndex -= swiper.virtual.slides.length;
      return realIndex;
    };
    if (typeof activeIndex === "undefined")
      activeIndex = getActiveIndexByTranslate(swiper);
    if (snapGrid.indexOf(translate) >= 0)
      snapIndex = snapGrid.indexOf(translate);
    else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex =
        skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled)
        swiper.realIndex = getVirtualRealIndex(activeIndex);
      return;
    }
    let realIndex;
    if (swiper.virtual && params.virtual.enabled && params.loop)
      realIndex = getVirtualRealIndex(activeIndex);
    else if (swiper.slides[activeIndex])
      realIndex = parseInt(
        swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") ||
          activeIndex,
        10
      );
    else realIndex = activeIndex;
    Object.assign(swiper, {
      previousSnapIndex,
      snapIndex,
      previousRealIndex,
      realIndex,
      previousIndex,
      activeIndex,
    });
    if (swiper.initialized) preload(swiper);
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");
    if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
    if (swiper.initialized || swiper.params.runCallbacksOnInit)
      swiper.emit("slideChange");
  }
  function updateClickedSlide(e) {
    const swiper = this;
    const params = swiper.params;
    const slide = e.closest(`.${params.slideClass}, swiper-slide`);
    let slideFound = false;
    let slideIndex;
    if (slide)
      for (let i = 0; i < swiper.slides.length; i += 1)
        if (swiper.slides[i] === slide) {
          slideFound = true;
          slideIndex = i;
          break;
        }
    if (slide && slideFound) {
      swiper.clickedSlide = slide;
      if (swiper.virtual && swiper.params.virtual.enabled)
        swiper.clickedIndex = parseInt(
          slide.getAttribute("data-swiper-slide-index"),
          10
        );
      else swiper.clickedIndex = slideIndex;
    } else {
      swiper.clickedSlide = void 0;
      swiper.clickedIndex = void 0;
      return;
    }
    if (
      params.slideToClickedSlide &&
      swiper.clickedIndex !== void 0 &&
      swiper.clickedIndex !== swiper.activeIndex
    )
      swiper.slideToClickedSlide();
  }
  const update = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide,
  };
  function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
    const swiper = this;
    const { params, rtlTranslate: rtl, translate, wrapperEl } = swiper;
    if (params.virtualTranslate) return rtl ? -translate : translate;
    if (params.cssMode) return translate;
    let currentTranslate = utils_getTranslate(wrapperEl, axis);
    currentTranslate += swiper.cssOverflowAdjustment();
    if (rtl) currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }
  function setTranslate(translate, byController) {
    const swiper = this;
    const { rtlTranslate: rtl, params, wrapperEl, progress } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;
    if (swiper.isHorizontal()) x = rtl ? -translate : translate;
    else y = translate;
    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;
    if (params.cssMode)
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] =
        swiper.isHorizontal() ? -x : -y;
    else if (!params.virtualTranslate) {
      if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment();
      else y -= swiper.cssOverflowAdjustment();
      wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) newProgress = 0;
    else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    if (newProgress !== progress) swiper.updateProgress(translate);
    swiper.emit("setTranslate", swiper.translate, byController);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(
    translate = 0,
    speed = this.params.speed,
    runCallbacks = true,
    translateBounds = true,
    internal
  ) {
    const swiper = this;
    const { params, wrapperEl } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition) return false;
    const minTranslate = swiper.minTranslate();
    const maxTranslate = swiper.maxTranslate();
    let newTranslate;
    if (translateBounds && translate > minTranslate)
      newTranslate = minTranslate;
    else if (translateBounds && translate < maxTranslate)
      newTranslate = maxTranslate;
    else newTranslate = translate;
    swiper.updateProgress(newTranslate);
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      if (speed === 0)
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top",
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth",
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onTranslateToWrapperTransitionEnd)
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.wrapperEl.removeEventListener(
              "transitionend",
              swiper.onTranslateToWrapperTransitionEnd
            );
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;
            if (runCallbacks) swiper.emit("transitionEnd");
          };
        swiper.wrapperEl.addEventListener(
          "transitionend",
          swiper.onTranslateToWrapperTransitionEnd
        );
      }
    }
    return true;
  }
  const translate = {
    getTranslate: getSwiperTranslate,
    setTranslate,
    minTranslate,
    maxTranslate,
    translateTo,
  };
  function setTransition(duration, byController) {
    const swiper = this;
    if (!swiper.params.cssMode)
      swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.emit("setTransition", duration, byController);
  }
  function transitionEmit({ swiper, runCallbacks, direction, step }) {
    const { activeIndex, previousIndex } = swiper;
    let dir = direction;
    if (!dir)
      if (activeIndex > previousIndex) dir = "next";
      else if (activeIndex < previousIndex) dir = "prev";
      else dir = "reset";
    swiper.emit(`transition${step}`);
    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper.emit(`slideResetTransition${step}`);
        return;
      }
      swiper.emit(`slideChangeTransition${step}`);
      if (dir === "next") swiper.emit(`slideNextTransition${step}`);
      else swiper.emit(`slidePrevTransition${step}`);
    }
  }
  function transitionStart(runCallbacks = true, direction) {
    const swiper = this;
    const { params } = swiper;
    if (params.cssMode) return;
    if (params.autoHeight) swiper.updateAutoHeight();
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "Start",
    });
  }
  function transitionEnd(runCallbacks = true, direction) {
    const swiper = this;
    const { params } = swiper;
    swiper.animating = false;
    if (params.cssMode) return;
    swiper.setTransition(0);
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "End",
    });
  }
  const transition = {
    setTransition,
    transitionStart,
    transitionEnd,
  };
  function slideTo(
    index = 0,
    speed = this.params.speed,
    runCallbacks = true,
    internal,
    initial
  ) {
    if (typeof index === "string") index = parseInt(index, 10);
    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0) slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled,
    } = swiper;
    if (
      (swiper.animating && params.preventInteractionOnTransition) ||
      (!enabled && !internal && !initial)
    )
      return false;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    let snapIndex =
      skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
    const translate = -snapGrid[snapIndex];
    if (params.normalizeSlideIndex)
      for (let i = 0; i < slidesGrid.length; i += 1) {
        const normalizedTranslate = -Math.floor(translate * 100);
        const normalizedGrid = Math.floor(slidesGrid[i] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (
            normalizedTranslate >= normalizedGrid &&
            normalizedTranslate <
              normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2
          )
            slideIndex = i;
          else if (
            normalizedTranslate >= normalizedGrid &&
            normalizedTranslate < normalizedGridNext
          )
            slideIndex = i + 1;
        } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
      }
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (
        !swiper.allowSlideNext &&
        translate < swiper.translate &&
        translate < swiper.minTranslate()
      )
        return false;
      if (
        !swiper.allowSlidePrev &&
        translate > swiper.translate &&
        translate > swiper.maxTranslate()
      )
        if ((activeIndex || 0) !== slideIndex) return false;
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks)
      swiper.emit("beforeSlideChangeStart");
    swiper.updateProgress(translate);
    let direction;
    if (slideIndex > activeIndex) direction = "next";
    else if (slideIndex < activeIndex) direction = "prev";
    else direction = "reset";
    if (
      (rtl && -translate === swiper.translate) ||
      (!rtl && translate === swiper.translate)
    ) {
      swiper.updateActiveIndex(slideIndex);
      if (params.autoHeight) swiper.updateAutoHeight();
      swiper.updateSlidesClasses();
      if (params.effect !== "slide") swiper.setTranslate(translate);
      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      const t = rtl ? translate : -translate;
      if (speed === 0) {
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = "none";
          swiper._immediateVirtual = true;
        }
        if (
          isVirtual &&
          !swiper._cssModeVirtualInitialSet &&
          swiper.params.initialSlide > 0
        ) {
          swiper._cssModeVirtualInitialSet = true;
          requestAnimationFrame(() => {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
          });
        } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        if (isVirtual)
          requestAnimationFrame(() => {
            swiper.wrapperEl.style.scrollSnapType = "";
            swiper._immediateVirtual = false;
          });
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: t,
            side: isH ? "left" : "top",
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t,
          behavior: "smooth",
        });
      }
      return true;
    }
    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (speed === 0) swiper.transitionEnd(runCallbacks, direction);
    else if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onSlideToWrapperTransitionEnd)
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener(
            "transitionend",
            swiper.onSlideToWrapperTransitionEnd
          );
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      swiper.wrapperEl.addEventListener(
        "transitionend",
        swiper.onSlideToWrapperTransitionEnd
      );
    }
    return true;
  }
  function slideToLoop(
    index = 0,
    speed = this.params.speed,
    runCallbacks = true,
    internal
  ) {
    if (typeof index === "string") {
      const indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }
    const swiper = this;
    let newIndex = index;
    if (swiper.params.loop)
      if (swiper.virtual && swiper.params.virtual.enabled)
        newIndex += swiper.virtual.slidesBefore;
      else newIndex = swiper.getSlideIndexByData(newIndex);
    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }
  function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    const { enabled, params, animating } = swiper;
    if (!enabled) return swiper;
    let perGroup = params.slidesPerGroup;
    if (
      params.slidesPerView === "auto" &&
      params.slidesPerGroup === 1 &&
      params.slidesPerGroupAuto
    )
      perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
    const increment =
      swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding) return false;
      swiper.loopFix({
        direction: "next",
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }
    if (params.rewind && swiper.isEnd)
      return swiper.slideTo(0, speed, runCallbacks, internal);
    return swiper.slideTo(
      swiper.activeIndex + increment,
      speed,
      runCallbacks,
      internal
    );
  }
  function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    const { params, snapGrid, slidesGrid, rtlTranslate, enabled, animating } =
      swiper;
    if (!enabled) return swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding) return false;
      swiper.loopFix({
        direction: "prev",
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }
    const translate = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0) return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize(translate);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    let prevSnap =
      snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && params.cssMode) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
      });
      if (typeof prevSnapIndex !== "undefined")
        prevSnap =
          snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
      if (
        params.slidesPerView === "auto" &&
        params.slidesPerGroup === 1 &&
        params.slidesPerGroupAuto
      ) {
        prevIndex =
          prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params.rewind && swiper.isBeginning) {
      const lastIndex =
        swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual
          ? swiper.virtual.slides.length - 1
          : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  function slideReset(
    speed = this.params.speed,
    runCallbacks = true,
    internal
  ) {
    const swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  function slideToClosest(
    speed = this.params.speed,
    runCallbacks = true,
    internal,
    threshold = 0.5
  ) {
    const swiper = this;
    let index = swiper.activeIndex;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    const snapIndex =
      skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    const translate = swiper.rtlTranslate
      ? swiper.translate
      : -swiper.translate;
    if (translate >= swiper.snapGrid[snapIndex]) {
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];
      if (translate - currentSnap > (nextSnap - currentSnap) * threshold)
        index += swiper.params.slidesPerGroup;
    } else {
      const prevSnap = swiper.snapGrid[snapIndex - 1];
      const currentSnap = swiper.snapGrid[snapIndex];
      if (translate - prevSnap <= (currentSnap - prevSnap) * threshold)
        index -= swiper.params.slidesPerGroup;
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }
  function slideToClickedSlide() {
    const swiper = this;
    const { params, slidesEl } = swiper;
    const slidesPerView =
      params.slidesPerView === "auto"
        ? swiper.slidesPerViewDynamic()
        : params.slidesPerView;
    let slideToIndex = swiper.clickedIndex;
    let realIndex;
    const slideSelector = swiper.isElement
      ? `swiper-slide`
      : `.${params.slideClass}`;
    if (params.loop) {
      if (swiper.animating) return;
      realIndex = parseInt(
        swiper.clickedSlide.getAttribute("data-swiper-slide-index"),
        10
      );
      if (params.centeredSlides)
        if (
          slideToIndex < swiper.loopedSlides - slidesPerView / 2 ||
          slideToIndex >
            swiper.slides.length - swiper.loopedSlides + slidesPerView / 2
        ) {
          swiper.loopFix();
          slideToIndex = swiper.getSlideIndex(
            utils_elementChildren(
              slidesEl,
              `${slideSelector}[data-swiper-slide-index="${realIndex}"]`
            )[0]
          );
          utils_nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else swiper.slideTo(slideToIndex);
      else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(
          utils_elementChildren(
            slidesEl,
            `${slideSelector}[data-swiper-slide-index="${realIndex}"]`
          )[0]
        );
        utils_nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else swiper.slideTo(slideToIndex);
    } else swiper.slideTo(slideToIndex);
  }
  const slide = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide,
  };
  function loopCreate(slideRealIndex) {
    const swiper = this;
    const { params, slidesEl } = swiper;
    if (!params.loop || (swiper.virtual && swiper.params.virtual.enabled))
      return;
    const slides = utils_elementChildren(
      slidesEl,
      `.${params.slideClass}, swiper-slide`
    );
    slides.forEach((el, index) => {
      el.setAttribute("data-swiper-slide-index", index);
    });
    swiper.loopFix({
      slideRealIndex,
      direction: params.centeredSlides ? void 0 : "next",
    });
  }
  function loopFix({
    slideRealIndex,
    slideTo = true,
    direction,
    setTranslate,
    activeSlideIndex,
    byController,
    byMousewheel,
  } = {}) {
    const swiper = this;
    if (!swiper.params.loop) return;
    swiper.emit("beforeLoopFix");
    const { slides, allowSlidePrev, allowSlideNext, slidesEl, params } = swiper;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    if (swiper.virtual && params.virtual.enabled) {
      if (slideTo)
        if (!params.centeredSlides && swiper.snapIndex === 0)
          swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
        else if (
          params.centeredSlides &&
          swiper.snapIndex < params.slidesPerView
        )
          swiper.slideTo(
            swiper.virtual.slides.length + swiper.snapIndex,
            0,
            false,
            true
          );
        else if (swiper.snapIndex === swiper.snapGrid.length - 1)
          swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit("loopFix");
      return;
    }
    const slidesPerView =
      params.slidesPerView === "auto"
        ? swiper.slidesPerViewDynamic()
        : Math.ceil(parseFloat(params.slidesPerView, 10));
    let loopedSlides = params.loopedSlides || slidesPerView;
    if (loopedSlides % params.slidesPerGroup !== 0)
      loopedSlides +=
        params.slidesPerGroup - (loopedSlides % params.slidesPerGroup);
    swiper.loopedSlides = loopedSlides;
    const prependSlidesIndexes = [];
    const appendSlidesIndexes = [];
    let activeIndex = swiper.activeIndex;
    if (typeof activeSlideIndex === "undefined")
      activeSlideIndex = swiper.getSlideIndex(
        swiper.slides.filter((el) =>
          el.classList.contains(params.slideActiveClass)
        )[0]
      );
    else activeIndex = activeSlideIndex;
    const isNext = direction === "next" || !direction;
    const isPrev = direction === "prev" || !direction;
    let slidesPrepended = 0;
    let slidesAppended = 0;
    if (activeSlideIndex < loopedSlides) {
      slidesPrepended = Math.max(
        loopedSlides - activeSlideIndex,
        params.slidesPerGroup
      );
      for (let i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
        const index = i - Math.floor(i / slides.length) * slides.length;
        prependSlidesIndexes.push(slides.length - index - 1);
      }
    } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
      slidesAppended = Math.max(
        activeSlideIndex - (swiper.slides.length - loopedSlides * 2),
        params.slidesPerGroup
      );
      for (let i = 0; i < slidesAppended; i += 1) {
        const index = i - Math.floor(i / slides.length) * slides.length;
        appendSlidesIndexes.push(index);
      }
    }
    if (isPrev)
      prependSlidesIndexes.forEach((index) => {
        slidesEl.prepend(swiper.slides[index]);
      });
    if (isNext)
      appendSlidesIndexes.forEach((index) => {
        slidesEl.append(swiper.slides[index]);
      });
    swiper.recalcSlides();
    if (params.slidesPerView === "auto") swiper.updateSlides();
    if (params.watchSlidesProgress) swiper.updateSlidesOffset();
    if (slideTo)
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate =
            swiper.slidesGrid[activeIndex + slidesPrepended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) swiper.setTranslate(swiper.translate - diff);
          else {
            swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
            if (setTranslate)
              swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] +=
                diff;
          }
        } else if (setTranslate)
          swiper.slideToLoop(slideRealIndex, 0, false, true);
      } else if (appendSlidesIndexes.length > 0 && isNext)
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate =
            swiper.slidesGrid[activeIndex - slidesAppended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) swiper.setTranslate(swiper.translate - diff);
          else {
            swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
            if (setTranslate)
              swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] +=
                diff;
          }
        } else swiper.slideToLoop(slideRealIndex, 0, false, true);
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.controller && swiper.controller.control && !byController) {
      const loopParams = {
        slideRealIndex,
        slideTo: false,
        direction,
        setTranslate,
        activeSlideIndex,
        byController: true,
      };
      if (Array.isArray(swiper.controller.control))
        swiper.controller.control.forEach((c) => {
          if (!c.destroyed && c.params.loop) c.loopFix(loopParams);
        });
      else if (
        swiper.controller.control instanceof swiper.constructor &&
        swiper.controller.control.params.loop
      )
        swiper.controller.control.loopFix(loopParams);
    }
    swiper.emit("loopFix");
  }
  function loopDestroy() {
    const swiper = this;
    const { params, slidesEl } = swiper;
    if (!params.loop || (swiper.virtual && swiper.params.virtual.enabled))
      return;
    swiper.recalcSlides();
    const newSlidesOrder = [];
    swiper.slides.forEach((slideEl) => {
      const index =
        typeof slideEl.swiperSlideIndex === "undefined"
          ? slideEl.getAttribute("data-swiper-slide-index") * 1
          : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper.slides.forEach((slideEl) => {
      slideEl.removeAttribute("data-swiper-slide-index");
    });
    newSlidesOrder.forEach((slideEl) => {
      slidesEl.append(slideEl);
    });
    swiper.recalcSlides();
    swiper.slideTo(swiper.realIndex, 0);
  }
  const loop = {
    loopCreate,
    loopFix,
    loopDestroy,
  };
  function setGrabCursor(moving) {
    const swiper = this;
    if (
      !swiper.params.simulateTouch ||
      (swiper.params.watchOverflow && swiper.isLocked) ||
      swiper.params.cssMode
    )
      return;
    const el =
      swiper.params.touchEventsTarget === "container"
        ? swiper.el
        : swiper.wrapperEl;
    if (swiper.isElement) swiper.__preventObserver__ = true;
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
    if (swiper.isElement)
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
  }
  function unsetGrabCursor() {
    const swiper = this;
    if (
      (swiper.params.watchOverflow && swiper.isLocked) ||
      swiper.params.cssMode
    )
      return;
    if (swiper.isElement) swiper.__preventObserver__ = true;
    swiper[
      swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = "";
    if (swiper.isElement)
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
  }
  const grab_cursor = {
    setGrabCursor,
    unsetGrabCursor,
  };
  function closestElement(selector, base = this) {
    function __closestFrom(el) {
      if (
        !el ||
        el === ssr_window_esm_getDocument() ||
        el === ssr_window_esm_getWindow()
      )
        return null;
      if (el.assignedSlot) el = el.assignedSlot;
      const found = el.closest(selector);
      if (!found && !el.getRootNode) return null;
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function onTouchStart(event) {
    const swiper = this;
    const document = ssr_window_esm_getDocument();
    const window = ssr_window_esm_getWindow();
    const data = swiper.touchEventsData;
    data.evCache.push(event);
    const { params, touches, enabled } = swiper;
    if (!enabled) return;
    if (!params.simulateTouch && event.pointerType === "mouse") return;
    if (swiper.animating && params.preventInteractionOnTransition) return;
    if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
    let e = event;
    if (e.originalEvent) e = e.originalEvent;
    let targetEl = e.target;
    if (params.touchEventsTarget === "wrapper")
      if (!swiper.wrapperEl.contains(targetEl)) return;
    if ("which" in e && e.which === 3) return;
    if ("button" in e && e.button > 0) return;
    if (data.isTouched && data.isMoved) return;
    const swipingClassHasValue =
      !!params.noSwipingClass && params.noSwipingClass !== "";
    const eventPath = event.composedPath ? event.composedPath() : event.path;
    if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath)
      targetEl = eventPath[0];
    const noSwipingSelector = params.noSwipingSelector
      ? params.noSwipingSelector
      : `.${params.noSwipingClass}`;
    const isTargetShadow = !!(e.target && e.target.shadowRoot);
    if (
      params.noSwiping &&
      (isTargetShadow
        ? closestElement(noSwipingSelector, targetEl)
        : targetEl.closest(noSwipingSelector))
    ) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
    touches.currentX = e.pageX;
    touches.currentY = e.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    const edgeSwipeDetection =
      params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    const edgeSwipeThreshold =
      params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
    if (
      edgeSwipeDetection &&
      (startX <= edgeSwipeThreshold ||
        startX >= window.innerWidth - edgeSwipeThreshold)
    )
      if (edgeSwipeDetection === "prevent") event.preventDefault();
      else return;
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0,
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = utils_now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = void 0;
    if (params.threshold > 0) data.allowThresholdMove = false;
    let preventDefault = true;
    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;
      if (targetEl.nodeName === "SELECT") data.isTouched = false;
    }
    if (
      document.activeElement &&
      document.activeElement.matches(data.focusableElements) &&
      document.activeElement !== targetEl
    )
      document.activeElement.blur();
    const shouldPreventDefault =
      preventDefault &&
      swiper.allowTouchMove &&
      params.touchStartPreventDefault;
    if (
      (params.touchStartForcePreventDefault || shouldPreventDefault) &&
      !targetEl.isContentEditable
    )
      e.preventDefault();
    if (
      swiper.params.freeMode &&
      swiper.params.freeMode.enabled &&
      swiper.freeMode &&
      swiper.animating &&
      !params.cssMode
    )
      swiper.freeMode.onTouchStart();
    swiper.emit("touchStart", e);
  }
  function onTouchMove(event) {
    const document = ssr_window_esm_getDocument();
    const swiper = this;
    const data = swiper.touchEventsData;
    const { params, touches, rtlTranslate: rtl, enabled } = swiper;
    if (!enabled) return;
    if (!params.simulateTouch && event.pointerType === "mouse") return;
    let e = event;
    if (e.originalEvent) e = e.originalEvent;
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling)
        swiper.emit("touchMoveOpposite", e);
      return;
    }
    const pointerIndex = data.evCache.findIndex(
      (cachedEv) => cachedEv.pointerId === e.pointerId
    );
    if (pointerIndex >= 0) data.evCache[pointerIndex] = e;
    const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          prevX: swiper.touches.currentX,
          prevY: swiper.touches.currentY,
          currentX: pageX,
          currentY: pageY,
        });
        data.touchStartTime = utils_now();
      }
      return;
    }
    if (params.touchReleaseOnEdges && !params.loop)
      if (swiper.isVertical()) {
        if (
          (pageY < touches.startY &&
            swiper.translate <= swiper.maxTranslate()) ||
          (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
        ) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (
        (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
        (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
      )
        return;
    if (document.activeElement)
      if (
        e.target === document.activeElement &&
        e.target.matches(data.focusableElements)
      ) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
    if (e.targetTouches && e.targetTouches.length > 1) return;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (
      swiper.params.threshold &&
      Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold
    )
      return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (
        (swiper.isHorizontal() && touches.currentY === touches.startY) ||
        (swiper.isVertical() && touches.currentX === touches.startX)
      )
        data.isScrolling = false;
      else if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle =
          (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
        data.isScrolling = swiper.isHorizontal()
          ? touchAngle > params.touchAngle
          : 90 - touchAngle > params.touchAngle;
      }
    }
    if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
    if (typeof data.startMoving === "undefined")
      if (
        touches.currentX !== touches.startX ||
        touches.currentY !== touches.startY
      )
        data.startMoving = true;
    if (
      data.isScrolling ||
      (swiper.zoom &&
        swiper.params.zoom &&
        swiper.params.zoom.enabled &&
        data.evCache.length > 1)
    ) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) return;
    swiper.allowClick = false;
    if (!params.cssMode && e.cancelable) e.preventDefault();
    if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
    let diff = swiper.isHorizontal() ? diffX : diffY;
    let touchesDiff = swiper.isHorizontal()
      ? touches.currentX - touches.previousX
      : touches.currentY - touches.previousY;
    if (params.oneWayMovement) {
      diff = Math.abs(diff) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) {
      diff = -diff;
      touchesDiff = -touchesDiff;
    }
    const prevTouchesDirection = swiper.touchesDirection;
    swiper.swipeDirection = diff > 0 ? "prev" : "next";
    swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
    const isLoop = swiper.params.loop && !params.cssMode;
    if (!data.isMoved) {
      if (isLoop)
        swiper.loopFix({
          direction: swiper.swipeDirection,
        });
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true,
        });
        swiper.wrapperEl.dispatchEvent(evt);
      }
      data.allowMomentumBounce = false;
      if (
        params.grabCursor &&
        (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)
      )
        swiper.setGrabCursor(true);
      swiper.emit("sliderFirstMove", e);
    }
    let loopFixed;
    if (
      data.isMoved &&
      prevTouchesDirection !== swiper.touchesDirection &&
      isLoop &&
      Math.abs(diff) >= 1
    ) {
      swiper.loopFix({
        direction: swiper.swipeDirection,
        setTranslate: true,
      });
      loopFixed = true;
    }
    swiper.emit("sliderMove", e);
    data.isMoved = true;
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) resistanceRatio = 0;
    if (diff > 0) {
      if (
        isLoop &&
        !loopFixed &&
        data.currentTranslate >
          (params.centeredSlides
            ? swiper.minTranslate() - swiper.size / 2
            : swiper.minTranslate())
      )
        swiper.loopFix({
          direction: "prev",
          setTranslate: true,
          activeSlideIndex: 0,
        });
      if (data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance)
          data.currentTranslate =
            swiper.minTranslate() -
            1 +
            (-swiper.minTranslate() + data.startTranslate + diff) **
              resistanceRatio;
      }
    } else if (diff < 0) {
      if (
        isLoop &&
        !loopFixed &&
        data.currentTranslate <
          (params.centeredSlides
            ? swiper.maxTranslate() + swiper.size / 2
            : swiper.maxTranslate())
      )
        swiper.loopFix({
          direction: "next",
          setTranslate: true,
          activeSlideIndex:
            swiper.slides.length -
            (params.slidesPerView === "auto"
              ? swiper.slidesPerViewDynamic()
              : Math.ceil(parseFloat(params.slidesPerView, 10))),
        });
      if (data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance)
          data.currentTranslate =
            swiper.maxTranslate() +
            1 -
            (swiper.maxTranslate() - data.startTranslate - diff) **
              resistanceRatio;
      }
    }
    if (disableParentSwiper) e.preventedByNestedSwiper = true;
    if (
      !swiper.allowSlideNext &&
      swiper.swipeDirection === "next" &&
      data.currentTranslate < data.startTranslate
    )
      data.currentTranslate = data.startTranslate;
    if (
      !swiper.allowSlidePrev &&
      swiper.swipeDirection === "prev" &&
      data.currentTranslate > data.startTranslate
    )
      data.currentTranslate = data.startTranslate;
    if (!swiper.allowSlidePrev && !swiper.allowSlideNext)
      data.currentTranslate = data.startTranslate;
    if (params.threshold > 0)
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal()
            ? touches.currentX - touches.startX
            : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    if (!params.followFinger || params.cssMode) return;
    if (
      (params.freeMode && params.freeMode.enabled && swiper.freeMode) ||
      params.watchSlidesProgress
    ) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode)
      swiper.freeMode.onTouchMove();
    swiper.updateProgress(data.currentTranslate);
    swiper.setTranslate(data.currentTranslate);
  }
  function onTouchEnd(event) {
    const swiper = this;
    const data = swiper.touchEventsData;
    const pointerIndex = data.evCache.findIndex(
      (cachedEv) => cachedEv.pointerId === event.pointerId
    );
    if (pointerIndex >= 0) data.evCache.splice(pointerIndex, 1);
    if (["pointercancel", "pointerout", "pointerleave"].includes(event.type)) {
      const proceed =
        event.type === "pointercancel" &&
        (swiper.browser.isSafari || swiper.browser.isWebView);
      if (!proceed) return;
    }
    const { params, touches, rtlTranslate: rtl, slidesGrid, enabled } = swiper;
    if (!enabled) return;
    if (!params.simulateTouch && event.pointerType === "mouse") return;
    let e = event;
    if (e.originalEvent) e = e.originalEvent;
    if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (
      params.grabCursor &&
      data.isMoved &&
      data.isTouched &&
      (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)
    )
      swiper.setGrabCursor(false);
    const touchEndTime = utils_now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper.allowClick) {
      const pathTree = e.path || (e.composedPath && e.composedPath());
      swiper.updateClickedSlide((pathTree && pathTree[0]) || e.target);
      swiper.emit("tap click", e);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300)
        swiper.emit("doubleTap doubleClick", e);
    }
    data.lastClickTime = utils_now();
    utils_nextTick(() => {
      if (!swiper.destroyed) swiper.allowClick = true;
    });
    if (
      !data.isTouched ||
      !data.isMoved ||
      !swiper.swipeDirection ||
      touches.diff === 0 ||
      data.currentTranslate === data.startTranslate
    ) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params.followFinger)
      currentPos = rtl ? swiper.translate : -swiper.translate;
    else currentPos = -data.currentTranslate;
    if (params.cssMode) return;
    if (swiper.params.freeMode && params.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos,
      });
      return;
    }
    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];
    for (
      let i = 0;
      i < slidesGrid.length;
      i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup
    ) {
      const increment =
        i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (typeof slidesGrid[i + increment] !== "undefined") {
        if (
          currentPos >= slidesGrid[i] &&
          currentPos < slidesGrid[i + increment]
        ) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize =
          slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params.rewind)
      if (swiper.isBeginning)
        rewindLastIndex =
          swiper.params.virtual &&
          swiper.params.virtual.enabled &&
          swiper.virtual
            ? swiper.virtual.slides.length - 1
            : swiper.slides.length - 1;
      else if (swiper.isEnd) rewindFirstIndex = 0;
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment =
      stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (timeDiff > params.longSwipesMs) {
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === "next")
        if (ratio >= params.longSwipesRatio)
          swiper.slideTo(
            params.rewind && swiper.isEnd
              ? rewindFirstIndex
              : stopIndex + increment
          );
        else swiper.slideTo(stopIndex);
      if (swiper.swipeDirection === "prev")
        if (ratio > 1 - params.longSwipesRatio)
          swiper.slideTo(stopIndex + increment);
        else if (
          rewindLastIndex !== null &&
          ratio < 0 &&
          Math.abs(ratio) > params.longSwipesRatio
        )
          swiper.slideTo(rewindLastIndex);
        else swiper.slideTo(stopIndex);
    } else {
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      const isNavButtonTarget =
        swiper.navigation &&
        (e.target === swiper.navigation.nextEl ||
          e.target === swiper.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next")
          swiper.slideTo(
            rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment
          );
        if (swiper.swipeDirection === "prev")
          swiper.slideTo(
            rewindLastIndex !== null ? rewindLastIndex : stopIndex
          );
      } else if (e.target === swiper.navigation.nextEl)
        swiper.slideTo(stopIndex + increment);
      else swiper.slideTo(stopIndex);
    }
  }
  function onResize() {
    const swiper = this;
    const { params, el } = swiper;
    if (el && el.offsetWidth === 0) return;
    if (params.breakpoints) swiper.setBreakpoint();
    const { allowSlideNext, allowSlidePrev, snapGrid } = swiper;
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    const isVirtualLoop = isVirtual && params.loop;
    if (
      (params.slidesPerView === "auto" || params.slidesPerView > 1) &&
      swiper.isEnd &&
      !swiper.isBeginning &&
      !swiper.params.centeredSlides &&
      !isVirtualLoop
    )
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    else if (swiper.params.loop && !isVirtual)
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    else swiper.slideTo(swiper.activeIndex, 0, false, true);
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      clearTimeout(swiper.autoplay.resizeTimeout);
      swiper.autoplay.resizeTimeout = setTimeout(() => {
        if (
          swiper.autoplay &&
          swiper.autoplay.running &&
          swiper.autoplay.paused
        )
          swiper.autoplay.resume();
      }, 500);
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid)
      swiper.checkOverflow();
  }
  function onClick(e) {
    const swiper = this;
    if (!swiper.enabled) return;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) e.preventDefault();
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }
  function onScroll() {
    const swiper = this;
    const { wrapperEl, rtlTranslate, enabled } = swiper;
    if (!enabled) return;
    swiper.previousTranslate = swiper.translate;
    if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft;
    else swiper.translate = -wrapperEl.scrollTop;
    if (swiper.translate === 0) swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) newProgress = 0;
    else
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    if (newProgress !== swiper.progress)
      swiper.updateProgress(
        rtlTranslate ? -swiper.translate : swiper.translate
      );
    swiper.emit("setTranslate", swiper.translate, false);
  }
  function onLoad(e) {
    const swiper = this;
    processLazyPreloader(swiper, e.target);
    swiper.update();
  }
  let dummyEventAttached = false;
  function dummyEventListener() {}
  const events = (swiper, method) => {
    const document = ssr_window_esm_getDocument();
    const { params, el, wrapperEl, device } = swiper;
    const capture = !!params.nested;
    const domMethod =
      method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method;
    el[domMethod]("pointerdown", swiper.onTouchStart, {
      passive: false,
    });
    document[domMethod]("pointermove", swiper.onTouchMove, {
      passive: false,
      capture,
    });
    document[domMethod]("pointerup", swiper.onTouchEnd, {
      passive: true,
    });
    document[domMethod]("pointercancel", swiper.onTouchEnd, {
      passive: true,
    });
    document[domMethod]("pointerout", swiper.onTouchEnd, {
      passive: true,
    });
    document[domMethod]("pointerleave", swiper.onTouchEnd, {
      passive: true,
    });
    if (params.preventClicks || params.preventClicksPropagation)
      el[domMethod]("click", swiper.onClick, true);
    if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
    if (params.updateOnWindowResize)
      swiper[swiperMethod](
        device.ios || device.android
          ? "resize orientationchange observerUpdate"
          : "resize observerUpdate",
        onResize,
        true
      );
    else swiper[swiperMethod]("observerUpdate", onResize, true);
    el[domMethod]("load", swiper.onLoad, {
      capture: true,
    });
  };
  function attachEvents() {
    const swiper = this;
    const document = ssr_window_esm_getDocument();
    const { params } = swiper;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
    swiper.onClick = onClick.bind(swiper);
    swiper.onLoad = onLoad.bind(swiper);
    if (!dummyEventAttached) {
      document.addEventListener("touchstart", dummyEventListener);
      dummyEventAttached = true;
    }
    events(swiper, "on");
  }
  function detachEvents() {
    const swiper = this;
    events(swiper, "off");
  }
  const core_events = {
    attachEvents,
    detachEvents,
  };
  const isGridEnabled = (swiper, params) =>
    swiper.grid && params.grid && params.grid.rows > 1;
  function setBreakpoint() {
    const swiper = this;
    const { realIndex, initialized, params, el } = swiper;
    const breakpoints = params.breakpoints;
    if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0))
      return;
    const breakpoint = swiper.getBreakpoint(
      breakpoints,
      swiper.params.breakpointsBase,
      swiper.el
    );
    if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
    const breakpointOnlyParams =
      breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper.originalParams;
    const wasMultiRow = isGridEnabled(swiper, params);
    const isMultiRow = isGridEnabled(swiper, breakpointParams);
    const wasEnabled = params.enabled;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(
        `${params.containerModifierClass}grid`,
        `${params.containerModifierClass}grid-column`
      );
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (
        (breakpointParams.grid.fill &&
          breakpointParams.grid.fill === "column") ||
        (!breakpointParams.grid.fill && params.grid.fill === "column")
      )
        el.classList.add(`${params.containerModifierClass}grid-column`);
      swiper.emitContainerClasses();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      const wasModuleEnabled = params[prop] && params[prop].enabled;
      const isModuleEnabled =
        breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
      if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
    });
    const directionChanged =
      breakpointParams.direction &&
      breakpointParams.direction !== params.direction;
    const needsReLoop =
      params.loop &&
      (breakpointParams.slidesPerView !== params.slidesPerView ||
        directionChanged);
    if (directionChanged && initialized) swiper.changeDirection();
    utils_extend(swiper.params, breakpointParams);
    const isEnabled = swiper.params.enabled;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
    });
    if (wasEnabled && !isEnabled) swiper.disable();
    else if (!wasEnabled && isEnabled) swiper.enable();
    swiper.currentBreakpoint = breakpoint;
    swiper.emit("_beforeBreakpoint", breakpointParams);
    if (needsReLoop && initialized) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    }
    swiper.emit("breakpoint", breakpointParams);
  }
  function getBreakpoint(breakpoints, base = "window", containerEl) {
    if (!breakpoints || (base === "container" && !containerEl)) return;
    let breakpoint = false;
    const window = ssr_window_esm_getWindow();
    const currentHeight =
      base === "window" ? window.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point,
        };
      }
      return {
        value: point,
        point,
      };
    });
    points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
    for (let i = 0; i < points.length; i += 1) {
      const { point, value } = points[i];
      if (base === "window") {
        if (window.matchMedia(`(min-width: ${value}px)`).matches)
          breakpoint = point;
      } else if (value <= containerEl.clientWidth) breakpoint = point;
    }
    return breakpoint || "max";
  }
  const breakpoints = {
    setBreakpoint,
    getBreakpoint,
  };
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object")
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) resultClasses.push(prefix + classNames);
        });
      else if (typeof item === "string") resultClasses.push(prefix + item);
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper = this;
    const { classNames, params, rtl, el, device } = swiper;
    const suffixes = prepareClasses(
      [
        "initialized",
        params.direction,
        {
          "free-mode": swiper.params.freeMode && params.freeMode.enabled,
        },
        {
          autoheight: params.autoHeight,
        },
        {
          rtl,
        },
        {
          grid: params.grid && params.grid.rows > 1,
        },
        {
          "grid-column":
            params.grid &&
            params.grid.rows > 1 &&
            params.grid.fill === "column",
        },
        {
          android: device.android,
        },
        {
          ios: device.ios,
        },
        {
          "css-mode": params.cssMode,
        },
        {
          centered: params.cssMode && params.centeredSlides,
        },
        {
          "watch-progress": params.watchSlidesProgress,
        },
      ],
      params.containerModifierClass
    );
    classNames.push(...suffixes);
    el.classList.add(...classNames);
    swiper.emitContainerClasses();
  }
  function removeClasses_removeClasses() {
    const swiper = this;
    const { el, classNames } = swiper;
    el.classList.remove(...classNames);
    swiper.emitContainerClasses();
  }
  const classes = {
    addClasses,
    removeClasses: removeClasses_removeClasses,
  };
  function checkOverflow() {
    const swiper = this;
    const { isLocked: wasLocked, params } = swiper;
    const { slidesOffsetBefore } = params;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper.slides.length - 1;
      const lastSlideRightEdge =
        swiper.slidesGrid[lastSlideIndex] +
        swiper.slidesSizesGrid[lastSlideIndex] +
        slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else swiper.isLocked = swiper.snapGrid.length === 1;
    if (params.allowSlideNext === true)
      swiper.allowSlideNext = !swiper.isLocked;
    if (params.allowSlidePrev === true)
      swiper.allowSlidePrev = !swiper.isLocked;
    if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
    if (wasLocked !== swiper.isLocked)
      swiper.emit(swiper.isLocked ? "lock" : "unlock");
  }
  const check_overflow = {
    checkOverflow,
  };
  const defaults = {
    init: true,
    direction: "horizontal",
    oneWayMovement: false,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: false,
    userAgent: null,
    url: null,
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    autoHeight: false,
    setWrapperSize: false,
    virtualTranslate: false,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    watchOverflow: true,
    roundLengths: false,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 5,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    uniqueNavElements: true,
    resistance: true,
    resistanceRatio: 0.85,
    watchSlidesProgress: false,
    grabCursor: false,
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    loop: false,
    loopedSlides: null,
    loopPreventsSliding: true,
    rewind: false,
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: true,
    _emitClasses: false,
  };
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj = {}) {
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        utils_extend(allModulesParams, obj);
        return;
      }
      if (
        ["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >=
          0 &&
        params[moduleParamName] === true
      )
        params[moduleParamName] = {
          auto: true,
        };
      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        utils_extend(allModulesParams, obj);
        return;
      }
      if (params[moduleParamName] === true)
        params[moduleParamName] = {
          enabled: true,
        };
      if (
        typeof params[moduleParamName] === "object" &&
        !("enabled" in params[moduleParamName])
      )
        params[moduleParamName].enabled = true;
      if (!params[moduleParamName])
        params[moduleParamName] = {
          enabled: false,
        };
      utils_extend(allModulesParams, obj);
    };
  }
  const prototypes = {
    eventsEmitter: events_emitter,
    update,
    translate,
    transition,
    slide,
    loop,
    grabCursor: grab_cursor,
    events: core_events,
    breakpoints,
    checkOverflow: check_overflow,
    classes,
  };
  const extendedDefaults = {};
  class Swiper {
    constructor(...args) {
      let el;
      let params;
      if (
        args.length === 1 &&
        args[0].constructor &&
        Object.prototype.toString.call(args[0]).slice(8, -1) === "Object"
      )
        params = args[0];
      else [el, params] = args;
      if (!params) params = {};
      params = utils_extend({}, params);
      if (el && !params.el) params.el = el;
      const document = ssr_window_esm_getDocument();
      if (
        params.el &&
        typeof params.el === "string" &&
        document.querySelectorAll(params.el).length > 1
      ) {
        const swipers = [];
        document.querySelectorAll(params.el).forEach((containerEl) => {
          const newParams = utils_extend({}, params, {
            el: containerEl,
          });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }
      const swiper = this;
      swiper.__swiper__ = true;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent,
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      swiper.modules = [...swiper.__modules__];
      if (params.modules && Array.isArray(params.modules))
        swiper.modules.push(...params.modules);
      const allModulesParams = {};
      swiper.modules.forEach((mod) => {
        mod({
          params,
          swiper,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper.on.bind(swiper),
          once: swiper.once.bind(swiper),
          off: swiper.off.bind(swiper),
          emit: swiper.emit.bind(swiper),
        });
      });
      const swiperParams = utils_extend({}, defaults, allModulesParams);
      swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = utils_extend({}, swiper.params);
      swiper.passedParams = utils_extend({}, params);
      if (swiper.params && swiper.params.on)
        Object.keys(swiper.params.on).forEach((eventName) => {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      if (swiper.params && swiper.params.onAny)
        swiper.onAny(swiper.params.onAny);
      Object.assign(swiper, {
        enabled: swiper.params.enabled,
        el,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return swiper.params.direction === "horizontal";
        },
        isVertical() {
          return swiper.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: true,
        isEnd: false,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: swiper.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: [],
        },
        allowClick: true,
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },
        imagesToLoad: [],
        imagesLoaded: 0,
      });
      swiper.emit("_swiper");
      if (swiper.params.init) swiper.init();
      return swiper;
    }
    getSlideIndex(slideEl) {
      const { slidesEl, params } = this;
      const slides = utils_elementChildren(
        slidesEl,
        `.${params.slideClass}, swiper-slide`
      );
      const firstSlideIndex = utils_elementIndex(slides[0]);
      return utils_elementIndex(slideEl) - firstSlideIndex;
    }
    getSlideIndexByData(index) {
      return this.getSlideIndex(
        this.slides.filter(
          (slideEl) =>
            slideEl.getAttribute("data-swiper-slide-index") * 1 === index
        )[0]
      );
    }
    recalcSlides() {
      const swiper = this;
      const { slidesEl, params } = swiper;
      swiper.slides = utils_elementChildren(
        slidesEl,
        `.${params.slideClass}, swiper-slide`
      );
    }
    enable() {
      const swiper = this;
      if (swiper.enabled) return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) swiper.setGrabCursor();
      swiper.emit("enable");
    }
    disable() {
      const swiper = this;
      if (!swiper.enabled) return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) swiper.unsetGrabCursor();
      swiper.emit("disable");
    }
    setProgress(progress, speed) {
      const swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper.minTranslate();
      const max = swiper.maxTranslate();
      const current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    emitContainerClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      const cls = swiper.el.className
        .split(" ")
        .filter(
          (className) =>
            className.indexOf("swiper") === 0 ||
            className.indexOf(swiper.params.containerModifierClass) === 0
        );
      swiper.emit("_containerClasses", cls.join(" "));
    }
    getSlideClasses(slideEl) {
      const swiper = this;
      if (swiper.destroyed) return "";
      return slideEl.className
        .split(" ")
        .filter(
          (className) =>
            className.indexOf("swiper-slide") === 0 ||
            className.indexOf(swiper.params.slideClass) === 0
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      const updates = [];
      swiper.slides.forEach((slideEl) => {
        const classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames,
        });
        swiper.emit("_slideClass", slideEl, classNames);
      });
      swiper.emit("_slideClasses", updates);
    }
    slidesPerViewDynamic(view = "current", exact = false) {
      const swiper = this;
      const {
        params,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex,
      } = swiper;
      let spv = 1;
      if (params.centeredSlides) {
        let slideSize = slides[activeIndex].swiperSlideSize;
        let breakLoop;
        for (let i = activeIndex + 1; i < slides.length; i += 1)
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        for (let i = activeIndex - 1; i >= 0; i -= 1)
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
      } else if (view === "current")
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact
            ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] <
              swiperSize
            : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) spv += 1;
        }
      else
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView =
            slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) spv += 1;
        }
      return spv;
    }
    update() {
      const swiper = this;
      if (!swiper || swiper.destroyed) return;
      const { snapGrid, params } = swiper;
      if (params.breakpoints) swiper.setBreakpoint();
      [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) processLazyPreloader(swiper, imageEl);
      });
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      function setTranslate() {
        const translateValue = swiper.rtlTranslate
          ? swiper.translate * -1
          : swiper.translate;
        const newTranslate = Math.min(
          Math.max(translateValue, swiper.maxTranslate()),
          swiper.minTranslate()
        );
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      let translated;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
        setTranslate();
        if (swiper.params.autoHeight) swiper.updateAutoHeight();
      } else {
        if (
          (swiper.params.slidesPerView === "auto" ||
            swiper.params.slidesPerView > 1) &&
          swiper.isEnd &&
          !swiper.params.centeredSlides
        ) {
          const slides =
            swiper.virtual && swiper.params.virtual.enabled
              ? swiper.virtual.slides
              : swiper.slides;
          translated = swiper.slideTo(slides.length - 1, 0, false, true);
        } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (!translated) setTranslate();
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid)
        swiper.checkOverflow();
      swiper.emit("update");
    }
    changeDirection(newDirection, needUpdate = true) {
      const swiper = this;
      const currentDirection = swiper.params.direction;
      if (!newDirection)
        newDirection =
          currentDirection === "horizontal" ? "vertical" : "horizontal";
      if (
        newDirection === currentDirection ||
        (newDirection !== "horizontal" && newDirection !== "vertical")
      )
        return swiper;
      swiper.el.classList.remove(
        `${swiper.params.containerModifierClass}${currentDirection}`
      );
      swiper.el.classList.add(
        `${swiper.params.containerModifierClass}${newDirection}`
      );
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach((slideEl) => {
        if (newDirection === "vertical") slideEl.style.width = "";
        else slideEl.style.height = "";
      });
      swiper.emit("changeDirection");
      if (needUpdate) swiper.update();
      return swiper;
    }
    changeLanguageDirection(direction) {
      const swiper = this;
      if (
        (swiper.rtl && direction === "rtl") ||
        (!swiper.rtl && direction === "ltr")
      )
        return;
      swiper.rtl = direction === "rtl";
      swiper.rtlTranslate =
        swiper.params.direction === "horizontal" && swiper.rtl;
      if (swiper.rtl) {
        swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "rtl";
      } else {
        swiper.el.classList.remove(
          `${swiper.params.containerModifierClass}rtl`
        );
        swiper.el.dir = "ltr";
      }
      swiper.update();
    }
    mount(element) {
      const swiper = this;
      if (swiper.mounted) return true;
      let el = element || swiper.params.el;
      if (typeof el === "string") el = document.querySelector(el);
      if (!el) return false;
      el.swiper = swiper;
      if (el.shadowEl) swiper.isElement = true;
      const getWrapperSelector = () =>
        `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = el.shadowRoot.querySelector(getWrapperSelector());
          return res;
        }
        return utils_elementChildren(el, getWrapperSelector())[0];
      };
      let wrapperEl = getWrapper();
      if (!wrapperEl && swiper.params.createElements) {
        wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
        el.append(wrapperEl);
        utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach(
          (slideEl) => {
            wrapperEl.append(slideEl);
          }
        );
      }
      Object.assign(swiper, {
        el,
        wrapperEl,
        slidesEl: swiper.isElement ? el : wrapperEl,
        mounted: true,
        rtl:
          el.dir.toLowerCase() === "rtl" ||
          elementStyle(el, "direction") === "rtl",
        rtlTranslate:
          swiper.params.direction === "horizontal" &&
          (el.dir.toLowerCase() === "rtl" ||
            elementStyle(el, "direction") === "rtl"),
        wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box",
      });
      return true;
    }
    init(el) {
      const swiper = this;
      if (swiper.initialized) return swiper;
      const mounted = swiper.mount(el);
      if (mounted === false) return swiper;
      swiper.emit("beforeInit");
      if (swiper.params.breakpoints) swiper.setBreakpoint();
      swiper.addClasses();
      swiper.updateSize();
      swiper.updateSlides();
      if (swiper.params.watchOverflow) swiper.checkOverflow();
      if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled)
        swiper.slideTo(
          swiper.params.initialSlide + swiper.virtual.slidesBefore,
          0,
          swiper.params.runCallbacksOnInit,
          false,
          true
        );
      else
        swiper.slideTo(
          swiper.params.initialSlide,
          0,
          swiper.params.runCallbacksOnInit,
          false,
          true
        );
      if (swiper.params.loop) swiper.loopCreate();
      swiper.attachEvents();
      [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) processLazyPreloader(swiper, imageEl);
        else
          imageEl.addEventListener("load", (e) => {
            processLazyPreloader(swiper, e.target);
          });
      });
      preload(swiper);
      swiper.initialized = true;
      preload(swiper);
      swiper.emit("init");
      swiper.emit("afterInit");
      return swiper;
    }
    destroy(deleteInstance = true, cleanStyles = true) {
      const swiper = this;
      const { params, el, wrapperEl, slides } = swiper;
      if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
      swiper.emit("beforeDestroy");
      swiper.initialized = false;
      swiper.detachEvents();
      if (params.loop) swiper.loopDestroy();
      if (cleanStyles) {
        swiper.removeClasses();
        el.removeAttribute("style");
        wrapperEl.removeAttribute("style");
        if (slides && slides.length)
          slides.forEach((slideEl) => {
            slideEl.classList.remove(
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass
            );
            slideEl.removeAttribute("style");
            slideEl.removeAttribute("data-swiper-slide-index");
          });
      }
      swiper.emit("destroy");
      Object.keys(swiper.eventsListeners).forEach((eventName) => {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        swiper.el.swiper = null;
        deleteProps(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
    static extendDefaults(newDefaults) {
      utils_extend(extendedDefaults, newDefaults);
    }
    static get extendedDefaults() {
      return extendedDefaults;
    }
    static get defaults() {
      return defaults;
    }
    static installModule(mod) {
      if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
      const modules = Swiper.prototype.__modules__;
      if (typeof mod === "function" && modules.indexOf(mod) < 0)
        modules.push(mod);
    }
    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m) => Swiper.installModule(m));
        return Swiper;
      }
      Swiper.installModule(module);
      return Swiper;
    }
  }
  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer]);
  const core = Swiper;
  function create_element_if_not_defined_createElementIfNotDefined(
    swiper,
    originalParams,
    params,
    checkProps
  ) {
    if (swiper.params.createElements)
      Object.keys(checkProps).forEach((key) => {
        if (!params[key] && params.auto === true) {
          let element = utils_elementChildren(
            swiper.el,
            `.${checkProps[key]}`
          )[0];
          if (!element) {
            element = utils_createElement("div", checkProps[key]);
            element.className = checkProps[key];
            swiper.el.append(element);
          }
          params[key] = element;
          originalParams[key] = element;
        }
      });
    return params;
  }
  function Navigation({ swiper, extendParams, on, emit }) {
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    });
    swiper.navigation = {
      nextEl: null,
      prevEl: null,
    };
    const makeElementsArray = (el) => {
      if (!Array.isArray(el)) el = [el].filter((e) => !!e);
      return el;
    };
    function getEl(el) {
      let res;
      if (el && typeof el === "string" && swiper.isElement) {
        res = swiper.el.shadowRoot.querySelector(el);
        if (res) return res;
      }
      if (el) {
        if (typeof el === "string") res = [...document.querySelectorAll(el)];
        if (
          swiper.params.uniqueNavElements &&
          typeof el === "string" &&
          res.length > 1 &&
          swiper.el.querySelectorAll(el).length === 1
        )
          res = swiper.el.querySelector(el);
      }
      if (el && !res) return el;
      return res;
    }
    function toggleEl(el, disabled) {
      const params = swiper.params.navigation;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (subEl) {
          subEl.classList[disabled ? "add" : "remove"](
            ...params.disabledClass.split(" ")
          );
          if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
          if (swiper.params.watchOverflow && swiper.enabled)
            subEl.classList[swiper.isLocked ? "add" : "remove"](
              params.lockClass
            );
        }
      });
    }
    function update() {
      const { nextEl, prevEl } = swiper.navigation;
      if (swiper.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
    }
    function onPrevClick(e) {
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slidePrev();
      emit("navigationPrev");
    }
    function onNextClick(e) {
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
      swiper.slideNext();
      emit("navigationNext");
    }
    function init() {
      const params = swiper.params.navigation;
      swiper.params.navigation =
        create_element_if_not_defined_createElementIfNotDefined(
          swiper,
          swiper.originalParams.navigation,
          swiper.params.navigation,
          {
            nextEl: "swiper-button-next",
            prevEl: "swiper-button-prev",
          }
        );
      if (!(params.nextEl || params.prevEl)) return;
      let nextEl = getEl(params.nextEl);
      let prevEl = getEl(params.prevEl);
      Object.assign(swiper.navigation, {
        nextEl,
        prevEl,
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el)
          el.addEventListener(
            "click",
            dir === "next" ? onNextClick : onPrevClick
          );
        if (!swiper.enabled && el)
          el.classList.add(...params.lockClass.split(" "));
      };
      nextEl.forEach((el) => initButton(el, "next"));
      prevEl.forEach((el) => initButton(el, "prev"));
    }
    function destroy() {
      let { nextEl, prevEl } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener(
          "click",
          dir === "next" ? onNextClick : onPrevClick
        );
        el.classList.remove(
          ...swiper.params.navigation.disabledClass.split(" ")
        );
      };
      nextEl.forEach((el) => destroyButton(el, "next"));
      prevEl.forEach((el) => destroyButton(el, "prev"));
    }
    on("init", () => {
      if (swiper.params.navigation.enabled === false) disable();
      else {
        init();
        update();
      }
    });
    on("toEdge fromEdge lock unlock", () => {
      update();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let { nextEl, prevEl } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      [...nextEl, ...prevEl]
        .filter((el) => !!el)
        .forEach((el) =>
          el.classList[swiper.enabled ? "remove" : "add"](
            swiper.params.navigation.lockClass
          )
        );
    });
    on("click", (_s, e) => {
      let { nextEl, prevEl } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e.target;
      if (
        swiper.params.navigation.hideOnClick &&
        !prevEl.includes(targetEl) &&
        !nextEl.includes(targetEl)
      ) {
        if (
          swiper.pagination &&
          swiper.params.pagination &&
          swiper.params.pagination.clickable &&
          (swiper.pagination.el === targetEl ||
            swiper.pagination.el.contains(targetEl))
        )
          return;
        let isHidden;
        if (nextEl.length)
          isHidden = nextEl[0].classList.contains(
            swiper.params.navigation.hiddenClass
          );
        else if (prevEl.length)
          isHidden = prevEl[0].classList.contains(
            swiper.params.navigation.hiddenClass
          );
        if (isHidden === true) emit("navigationShow");
        else emit("navigationHide");
        [...nextEl, ...prevEl]
          .filter((el) => !!el)
          .forEach((el) =>
            el.classList.toggle(swiper.params.navigation.hiddenClass)
          );
      }
    });
    const enable = () => {
      swiper.el.classList.remove(
        ...swiper.params.navigation.navigationDisabledClass.split(" ")
      );
      init();
      update();
    };
    const disable = () => {
      swiper.el.classList.add(
        ...swiper.params.navigation.navigationDisabledClass.split(" ")
      );
      destroy();
    };
    Object.assign(swiper.navigation, {
      enable,
      disable,
      update,
      init,
      destroy,
    });
  }
  function classes_to_selector_classesToSelector(classes = "") {
    return `.${classes
      .trim()
      .replace(/([\.:!+\/])/g, "\\$1")
      .replace(/ /g, ".")}`;
  }
  function Pagination({ swiper, extendParams, on, emit }) {
    const pfx = "swiper-pagination";
    extendParams({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: "bullets",
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: (number) => number,
        formatFractionTotal: (number) => number,
        bulletClass: `${pfx}-bullet`,
        bulletActiveClass: `${pfx}-bullet-active`,
        modifierClass: `${pfx}-`,
        currentClass: `${pfx}-current`,
        totalClass: `${pfx}-total`,
        hiddenClass: `${pfx}-hidden`,
        progressbarFillClass: `${pfx}-progressbar-fill`,
        progressbarOppositeClass: `${pfx}-progressbar-opposite`,
        clickableClass: `${pfx}-clickable`,
        lockClass: `${pfx}-lock`,
        horizontalClass: `${pfx}-horizontal`,
        verticalClass: `${pfx}-vertical`,
        paginationDisabledClass: `${pfx}-disabled`,
      },
    });
    swiper.pagination = {
      el: null,
      bullets: [],
    };
    let bulletSize;
    let dynamicBulletIndex = 0;
    const makeElementsArray = (el) => {
      if (!Array.isArray(el)) el = [el].filter((e) => !!e);
      return el;
    };
    function isPaginationDisabled() {
      return (
        !swiper.params.pagination.el ||
        !swiper.pagination.el ||
        (Array.isArray(swiper.pagination.el) &&
          swiper.pagination.el.length === 0)
      );
    }
    function setSideBullets(bulletEl, position) {
      const { bulletActiveClass } = swiper.params.pagination;
      if (!bulletEl) return;
      bulletEl =
        bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}`);
        bulletEl =
          bulletEl[
            `${position === "prev" ? "previous" : "next"}ElementSibling`
          ];
        if (bulletEl)
          bulletEl.classList.add(
            `${bulletActiveClass}-${position}-${position}`
          );
      }
    }
    function onBulletClick(e) {
      const bulletEl = e.target.closest(
        classes_to_selector_classesToSelector(
          swiper.params.pagination.bulletClass
        )
      );
      if (!bulletEl) return;
      e.preventDefault();
      const index = utils_elementIndex(bulletEl) * swiper.params.slidesPerGroup;
      if (swiper.params.loop) {
        if (swiper.realIndex === index) return;
        const newSlideIndex = swiper.getSlideIndexByData(index);
        const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
        if (newSlideIndex > swiper.slides.length - swiper.loopedSlides)
          swiper.loopFix({
            direction: newSlideIndex > currentSlideIndex ? "next" : "prev",
            activeSlideIndex: newSlideIndex,
            slideTo: false,
          });
        swiper.slideToLoop(index);
      } else swiper.slideTo(index);
    }
    function update() {
      const rtl = swiper.rtl;
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      let el = swiper.pagination.el;
      el = makeElementsArray(el);
      let current;
      let previousIndex;
      const slidesLength =
        swiper.virtual && swiper.params.virtual.enabled
          ? swiper.virtual.slides.length
          : swiper.slides.length;
      const total = swiper.params.loop
        ? Math.ceil(slidesLength / swiper.params.slidesPerGroup)
        : swiper.snapGrid.length;
      if (swiper.params.loop) {
        previousIndex = swiper.previousRealIndex || 0;
        current =
          swiper.params.slidesPerGroup > 1
            ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup)
            : swiper.realIndex;
      } else if (typeof swiper.snapIndex !== "undefined") {
        current = swiper.snapIndex;
        previousIndex = swiper.previousSnapIndex;
      } else {
        previousIndex = swiper.previousIndex || 0;
        current = swiper.activeIndex || 0;
      }
      if (
        params.type === "bullets" &&
        swiper.pagination.bullets &&
        swiper.pagination.bullets.length > 0
      ) {
        const bullets = swiper.pagination.bullets;
        let firstIndex;
        let lastIndex;
        let midIndex;
        if (params.dynamicBullets) {
          bulletSize = elementOuterSize(
            bullets[0],
            swiper.isHorizontal() ? "width" : "height",
            true
          );
          el.forEach((subEl) => {
            subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${
              bulletSize * (params.dynamicMainBullets + 4)
            }px`;
          });
          if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
            dynamicBulletIndex += current - (previousIndex || 0);
            if (dynamicBulletIndex > params.dynamicMainBullets - 1)
              dynamicBulletIndex = params.dynamicMainBullets - 1;
            else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
          }
          firstIndex = Math.max(current - dynamicBulletIndex, 0);
          lastIndex =
            firstIndex +
            (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.forEach((bulletEl) => {
          const classesToRemove = [
            ...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(
              (suffix) => `${params.bulletActiveClass}${suffix}`
            ),
          ]
            .map((s) =>
              typeof s === "string" && s.includes(" ") ? s.split(" ") : s
            )
            .flat();
          bulletEl.classList.remove(...classesToRemove);
        });
        if (el.length > 1)
          bullets.forEach((bullet) => {
            const bulletIndex = utils_elementIndex(bullet);
            if (bulletIndex === current)
              bullet.classList.add(...params.bulletActiveClass.split(" "));
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex)
                bullet.classList.add(
                  ...`${params.bulletActiveClass}-main`.split(" ")
                );
              if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
              if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
            }
          });
        else {
          const bullet = bullets[current];
          if (bullet)
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          if (params.dynamicBullets) {
            const firstDisplayedBullet = bullets[firstIndex];
            const lastDisplayedBullet = bullets[lastIndex];
            for (let i = firstIndex; i <= lastIndex; i += 1)
              if (bullets[i])
                bullets[i].classList.add(
                  ...`${params.bulletActiveClass}-main`.split(" ")
                );
            setSideBullets(firstDisplayedBullet, "prev");
            setSideBullets(lastDisplayedBullet, "next");
          }
        }
        if (params.dynamicBullets) {
          const dynamicBulletsLength = Math.min(
            bullets.length,
            params.dynamicMainBullets + 4
          );
          const bulletsOffset =
            (bulletSize * dynamicBulletsLength - bulletSize) / 2 -
            midIndex * bulletSize;
          const offsetProp = rtl ? "right" : "left";
          bullets.forEach((bullet) => {
            bullet.style[
              swiper.isHorizontal() ? offsetProp : "top"
            ] = `${bulletsOffset}px`;
          });
        }
      }
      el.forEach((subEl, subElIndex) => {
        if (params.type === "fraction") {
          subEl
            .querySelectorAll(
              classes_to_selector_classesToSelector(params.currentClass)
            )
            .forEach((fractionEl) => {
              fractionEl.textContent = params.formatFractionCurrent(
                current + 1
              );
            });
          subEl
            .querySelectorAll(
              classes_to_selector_classesToSelector(params.totalClass)
            )
            .forEach((totalEl) => {
              totalEl.textContent = params.formatFractionTotal(total);
            });
        }
        if (params.type === "progressbar") {
          let progressbarDirection;
          if (params.progressbarOpposite)
            progressbarDirection = swiper.isHorizontal()
              ? "vertical"
              : "horizontal";
          else
            progressbarDirection = swiper.isHorizontal()
              ? "horizontal"
              : "vertical";
          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;
          if (progressbarDirection === "horizontal") scaleX = scale;
          else scaleY = scale;
          subEl
            .querySelectorAll(
              classes_to_selector_classesToSelector(params.progressbarFillClass)
            )
            .forEach((progressEl) => {
              progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
              progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
            });
        }
        if (params.type === "custom" && params.renderCustom) {
          subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
          if (subElIndex === 0) emit("paginationRender", subEl);
        } else {
          if (subElIndex === 0) emit("paginationRender", subEl);
          emit("paginationUpdate", subEl);
        }
        if (swiper.params.watchOverflow && swiper.enabled)
          subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
      });
    }
    function render() {
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      const slidesLength =
        swiper.virtual && swiper.params.virtual.enabled
          ? swiper.virtual.slides.length
          : swiper.slides.length;
      let el = swiper.pagination.el;
      el = makeElementsArray(el);
      let paginationHTML = "";
      if (params.type === "bullets") {
        let numberOfBullets = swiper.params.loop
          ? Math.ceil(slidesLength / swiper.params.slidesPerGroup)
          : swiper.snapGrid.length;
        if (
          swiper.params.freeMode &&
          swiper.params.freeMode.enabled &&
          numberOfBullets > slidesLength
        )
          numberOfBullets = slidesLength;
        for (let i = 0; i < numberOfBullets; i += 1)
          if (params.renderBullet)
            paginationHTML += params.renderBullet.call(
              swiper,
              i,
              params.bulletClass
            );
          else
            paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
      }
      if (params.type === "fraction")
        if (params.renderFraction)
          paginationHTML = params.renderFraction.call(
            swiper,
            params.currentClass,
            params.totalClass
          );
        else
          paginationHTML =
            `<span class="${params.currentClass}"></span>` +
            " / " +
            `<span class="${params.totalClass}"></span>`;
      if (params.type === "progressbar")
        if (params.renderProgressbar)
          paginationHTML = params.renderProgressbar.call(
            swiper,
            params.progressbarFillClass
          );
        else
          paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      swiper.pagination.bullets = [];
      el.forEach((subEl) => {
        if (params.type !== "custom") subEl.innerHTML = paginationHTML || "";
        if (params.type === "bullets")
          swiper.pagination.bullets.push(
            ...subEl.querySelectorAll(
              classes_to_selector_classesToSelector(params.bulletClass)
            )
          );
      });
      if (params.type !== "custom") emit("paginationRender", el[0]);
    }
    function init() {
      swiper.params.pagination =
        create_element_if_not_defined_createElementIfNotDefined(
          swiper,
          swiper.originalParams.pagination,
          swiper.params.pagination,
          {
            el: "swiper-pagination",
          }
        );
      const params = swiper.params.pagination;
      if (!params.el) return;
      let el;
      if (typeof params.el === "string" && swiper.isElement)
        el = swiper.el.shadowRoot.querySelector(params.el);
      if (!el && typeof params.el === "string")
        el = [...document.querySelectorAll(params.el)];
      if (!el) el = params.el;
      if (!el || el.length === 0) return;
      if (
        swiper.params.uniqueNavElements &&
        typeof params.el === "string" &&
        Array.isArray(el) &&
        el.length > 1
      ) {
        el = [...swiper.el.querySelectorAll(params.el)];
        if (el.length > 1)
          el = el.filter((subEl) => {
            if (utils_elementParents(subEl, ".swiper")[0] !== swiper.el)
              return false;
            return true;
          })[0];
      }
      if (Array.isArray(el) && el.length === 1) el = el[0];
      Object.assign(swiper.pagination, {
        el,
      });
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (params.type === "bullets" && params.clickable)
          subEl.classList.add(params.clickableClass);
        subEl.classList.add(params.modifierClass + params.type);
        subEl.classList.add(
          swiper.isHorizontal() ? params.horizontalClass : params.verticalClass
        );
        if (params.type === "bullets" && params.dynamicBullets) {
          subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
          dynamicBulletIndex = 0;
          if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
        }
        if (params.type === "progressbar" && params.progressbarOpposite)
          subEl.classList.add(params.progressbarOppositeClass);
        if (params.clickable) subEl.addEventListener("click", onBulletClick);
        if (!swiper.enabled) subEl.classList.add(params.lockClass);
      });
    }
    function destroy() {
      const params = swiper.params.pagination;
      if (isPaginationDisabled()) return;
      let el = swiper.pagination.el;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          subEl.classList.remove(params.hiddenClass);
          subEl.classList.remove(params.modifierClass + params.type);
          subEl.classList.remove(
            swiper.isHorizontal()
              ? params.horizontalClass
              : params.verticalClass
          );
          if (params.clickable)
            subEl.removeEventListener("click", onBulletClick);
        });
      }
      if (swiper.pagination.bullets)
        swiper.pagination.bullets.forEach((subEl) =>
          subEl.classList.remove(...params.bulletActiveClass.split(" "))
        );
    }
    on("changeDirection", () => {
      if (!swiper.pagination || !swiper.pagination.el) return;
      const params = swiper.params.pagination;
      let { el } = swiper.pagination;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.classList.remove(params.horizontalClass, params.verticalClass);
        subEl.classList.add(
          swiper.isHorizontal() ? params.horizontalClass : params.verticalClass
        );
      });
    });
    on("init", () => {
      if (swiper.params.pagination.enabled === false) disable();
      else {
        init();
        render();
        update();
      }
    });
    on("activeIndexChange", () => {
      if (typeof swiper.snapIndex === "undefined") update();
    });
    on("snapIndexChange", () => {
      update();
    });
    on("snapGridLengthChange", () => {
      render();
      update();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let { el } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) =>
          subEl.classList[swiper.enabled ? "remove" : "add"](
            swiper.params.pagination.lockClass
          )
        );
      }
    });
    on("lock unlock", () => {
      update();
    });
    on("click", (_s, e) => {
      const targetEl = e.target;
      let { el } = swiper.pagination;
      if (!Array.isArray(el)) el = [el].filter((element) => !!element);
      if (
        swiper.params.pagination.el &&
        swiper.params.pagination.hideOnClick &&
        el &&
        el.length > 0 &&
        !targetEl.classList.contains(swiper.params.pagination.bulletClass)
      ) {
        if (
          swiper.navigation &&
          ((swiper.navigation.nextEl &&
            targetEl === swiper.navigation.nextEl) ||
            (swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
        )
          return;
        const isHidden = el[0].classList.contains(
          swiper.params.pagination.hiddenClass
        );
        if (isHidden === true) emit("paginationShow");
        else emit("paginationHide");
        el.forEach((subEl) =>
          subEl.classList.toggle(swiper.params.pagination.hiddenClass)
        );
      }
    });
    const enable = () => {
      swiper.el.classList.remove(
        swiper.params.pagination.paginationDisabledClass
      );
      let { el } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) =>
          subEl.classList.remove(
            swiper.params.pagination.paginationDisabledClass
          )
        );
      }
      init();
      render();
      update();
    };
    const disable = () => {
      swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
      let { el } = swiper.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) =>
          subEl.classList.add(swiper.params.pagination.paginationDisabledClass)
        );
      }
      destroy();
    };
    Object.assign(swiper.pagination, {
      enable,
      disable,
      render,
      update,
      init,
      destroy,
    });
  }
  function Thumb({ swiper, extendParams, on }) {
    extendParams({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: true,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs",
      },
    });
    let initialized = false;
    let swiperCreated = false;
    swiper.thumbs = {
      swiper: null,
    };
    function onThumbClick() {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      const clickedIndex = thumbsSwiper.clickedIndex;
      const clickedSlide = thumbsSwiper.clickedSlide;
      if (
        clickedSlide &&
        clickedSlide.classList.contains(
          swiper.params.thumbs.slideThumbActiveClass
        )
      )
        return;
      if (typeof clickedIndex === "undefined" || clickedIndex === null) return;
      let slideToIndex;
      if (thumbsSwiper.params.loop)
        slideToIndex = parseInt(
          thumbsSwiper.clickedSlide.getAttribute("data-swiper-slide-index"),
          10
        );
      else slideToIndex = clickedIndex;
      if (swiper.params.loop) swiper.slideToLoop(slideToIndex);
      else swiper.slideTo(slideToIndex);
    }
    function init() {
      const { thumbs: thumbsParams } = swiper.params;
      if (initialized) return false;
      initialized = true;
      const SwiperClass = swiper.constructor;
      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Object.assign(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        Object.assign(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        swiper.thumbs.swiper.update();
      } else if (utils_isObject(thumbsParams.swiper)) {
        const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
        Object.assign(thumbsSwiperParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
        swiperCreated = true;
      }
      swiper.thumbs.swiper.el.classList.add(
        swiper.params.thumbs.thumbsContainerClass
      );
      swiper.thumbs.swiper.on("tap", onThumbClick);
      return true;
    }
    function update(initial) {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      const slidesPerView =
        thumbsSwiper.params.slidesPerView === "auto"
          ? thumbsSwiper.slidesPerViewDynamic()
          : thumbsSwiper.params.slidesPerView;
      let thumbsToActivate = 1;
      const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides)
        thumbsToActivate = swiper.params.slidesPerView;
      if (!swiper.params.thumbs.multipleActiveThumbs) thumbsToActivate = 1;
      thumbsToActivate = Math.floor(thumbsToActivate);
      thumbsSwiper.slides.forEach((slideEl) =>
        slideEl.classList.remove(thumbActiveClass)
      );
      if (
        thumbsSwiper.params.loop ||
        (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)
      )
        for (let i = 0; i < thumbsToActivate; i += 1)
          utils_elementChildren(
            thumbsSwiper.slidesEl,
            `[data-swiper-slide-index="${swiper.realIndex + i}"]`
          ).forEach((slideEl) => {
            slideEl.classList.add(thumbActiveClass);
          });
      else
        for (let i = 0; i < thumbsToActivate; i += 1)
          if (thumbsSwiper.slides[swiper.realIndex + i])
            thumbsSwiper.slides[swiper.realIndex + i].classList.add(
              thumbActiveClass
            );
      const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
      const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
      if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
        const currentThumbsIndex = thumbsSwiper.activeIndex;
        let newThumbsIndex;
        let direction;
        if (thumbsSwiper.params.loop) {
          const newThumbsSlide = thumbsSwiper.slides.filter(
            (slideEl) =>
              slideEl.getAttribute("data-swiper-slide-index") ===
              `${swiper.realIndex}`
          )[0];
          newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
          direction =
            swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
        } else {
          newThumbsIndex = swiper.realIndex;
          direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
        }
        if (useOffset)
          newThumbsIndex +=
            direction === "next" ? autoScrollOffset : -1 * autoScrollOffset;
        if (
          thumbsSwiper.visibleSlidesIndexes &&
          thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0
        ) {
          if (thumbsSwiper.params.centeredSlides)
            if (newThumbsIndex > currentThumbsIndex)
              newThumbsIndex =
                newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            else
              newThumbsIndex =
                newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          else if (
            newThumbsIndex > currentThumbsIndex &&
            thumbsSwiper.params.slidesPerGroup === 1
          );
          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
        }
      }
    }
    on("beforeInit", () => {
      const { thumbs } = swiper.params;
      if (!thumbs || !thumbs.swiper) return;
      if (
        typeof thumbs.swiper === "string" ||
        thumbs.swiper instanceof HTMLElement
      ) {
        const document = ssr_window_esm_getDocument();
        const getThumbsElementAndInit = () => {
          const thumbsElement =
            typeof thumbs.swiper === "string"
              ? document.querySelector(thumbs.swiper)
              : thumbs.swiper;
          if (thumbsElement && thumbsElement.swiper) {
            thumbs.swiper = thumbsElement.swiper;
            init();
            update(true);
          } else if (thumbsElement) {
            const onThumbsSwiper = (e) => {
              thumbs.swiper = e.detail[0];
              thumbsElement.removeEventListener("init", onThumbsSwiper);
              init();
              update(true);
              thumbs.swiper.update();
              swiper.update();
            };
            thumbsElement.addEventListener("init", onThumbsSwiper);
          }
          return thumbsElement;
        };
        const watchForThumbsToAppear = () => {
          if (swiper.destroyed) return;
          const thumbsElement = getThumbsElementAndInit();
          if (!thumbsElement) requestAnimationFrame(watchForThumbsToAppear);
        };
        requestAnimationFrame(watchForThumbsToAppear);
      } else {
        init();
        update(true);
      }
    });
    on("slideChange update resize observerUpdate", () => {
      update();
    });
    on("setTransition", (_s, duration) => {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      thumbsSwiper.setTransition(duration);
    });
    on("beforeDestroy", () => {
      const thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper || thumbsSwiper.destroyed) return;
      if (swiperCreated) thumbsSwiper.destroy();
    });
    Object.assign(swiper.thumbs, {
      init,
      update,
    });
  }
  function initSliders() {
    if (document.querySelector(".partners-slider")) {
      new core(".partners-slider", {
        modules: [Pagination],
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 15,
        // loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: true,
        },
        // navigation: {
        // 	nextEl: ".partners-right",
        // 	prevEl: ".partners-left"
        // },
        pagination: {
          el: ".swiper-pagination-partners",
          clickable: true,
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          992: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1120: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        },
      });
    }
    if (document.querySelector(".asos-slider")) {
      new core(".asos-slider", {
        modules: [Pagination],
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 15,
        // loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination-asos",
          clickable: true,
        },
        // navigation: {
        // 	nextEl: ".asos-right",
        // 	prevEl: ".asos-left"
        // },
        breakpoints: {
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          480: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          992: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          1120: {
            slidesPerView: 7,
            slidesPerGroup: 7,
          },
        },
      });
    }
    if (document.querySelector(".card-slider")) {
      const cardThumbs = new core(".card-thumbs", {
        spaceBetween: 10,
        slidesPerView: 3,
        loop: true,
        loopedSlides: 3,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
      new core(".card-slider", {
        modules: [Thumb],
        spaceBetween: 10,
        loop: true,
        loopedSlides: 4,
        thumbs: {
          swiper: cardThumbs,
        },
      });
    }
  }
  window.addEventListener("load", function (e) {
    initSliders();
  });
  // gsap.registerPlugin(ScrollSmoother, ScrollTrigger, InertiaPlugin);
  // ScrollTrigger.normalizeScroll({
  // 	allowNestedScroll: true,
  // 	lockAxis: true,
  // 	normalizeScroll: true
  // });
  // ScrollSmoother.create({
  // 	smooth: .5,
  // 	normalizeScroll: true
  // });

  /*!
   * lightgallery | 2.7.1 | January 11th 2023
   * http://www.lightgalleryjs.com/
   * Copyright (c) 2020 Sachin Neravath;
   * @license GPLv3
   */
  /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
  var __assign = function () {
    __assign =
      Object.assign ||
      function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    var r = Array(s),
      k = 0;
    for (i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  }
  var lGEvents = {
    afterAppendSlide: "lgAfterAppendSlide",
    init: "lgInit",
    hasVideo: "lgHasVideo",
    containerResize: "lgContainerResize",
    updateSlides: "lgUpdateSlides",
    afterAppendSubHtml: "lgAfterAppendSubHtml",
    beforeOpen: "lgBeforeOpen",
    afterOpen: "lgAfterOpen",
    slideItemLoad: "lgSlideItemLoad",
    beforeSlide: "lgBeforeSlide",
    afterSlide: "lgAfterSlide",
    posterClick: "lgPosterClick",
    dragStart: "lgDragStart",
    dragMove: "lgDragMove",
    dragEnd: "lgDragEnd",
    beforeNextSlide: "lgBeforeNextSlide",
    beforePrevSlide: "lgBeforePrevSlide",
    beforeClose: "lgBeforeClose",
    afterClose: "lgAfterClose",
    rotateLeft: "lgRotateLeft",
    rotateRight: "lgRotateRight",
    flipHorizontal: "lgFlipHorizontal",
    flipVertical: "lgFlipVertical",
    autoplay: "lgAutoplay",
    autoplayStart: "lgAutoplayStart",
    autoplayStop: "lgAutoplayStop",
  };
  var lightGalleryCoreSettings = {
    mode: "lg-slide",
    easing: "ease",
    speed: 400,
    licenseKey: "0000-0000-000-0000",
    height: "100%",
    width: "100%",
    addClass: "",
    startClass: "lg-start-zoom",
    backdropDuration: 300,
    container: "",
    startAnimationDuration: 400,
    zoomFromOrigin: true,
    hideBarsDelay: 0,
    showBarsAfter: 1e4,
    slideDelay: 0,
    supportLegacyBrowser: true,
    allowMediaOverlap: false,
    videoMaxSize: "1280-720",
    loadYouTubePoster: true,
    defaultCaptionHeight: 0,
    ariaLabelledby: "",
    ariaDescribedby: "",
    resetScrollPosition: true,
    hideScrollbar: false,
    closable: true,
    swipeToClose: true,
    closeOnTap: true,
    showCloseIcon: true,
    showMaximizeIcon: false,
    loop: true,
    escKey: true,
    keyPress: true,
    trapFocus: true,
    controls: true,
    slideEndAnimation: true,
    hideControlOnEnd: false,
    mousewheel: false,
    getCaptionFromTitleOrAlt: true,
    appendSubHtmlTo: ".lg-sub-html",
    subHtmlSelectorRelative: false,
    preload: 2,
    numberOfSlideItemsInDom: 10,
    selector: "",
    selectWithin: "",
    nextHtml: "",
    prevHtml: "",
    index: 0,
    iframeWidth: "100%",
    iframeHeight: "100%",
    iframeMaxWidth: "100%",
    iframeMaxHeight: "100%",
    download: true,
    counter: true,
    appendCounterTo: ".lg-toolbar",
    swipeThreshold: 50,
    enableSwipe: true,
    enableDrag: true,
    dynamic: false,
    dynamicEl: [],
    extraProps: [],
    exThumbImage: "",
    isMobile: void 0,
    mobileSettings: {
      controls: false,
      showCloseIcon: false,
      download: false,
    },
    plugins: [],
    strings: {
      closeGallery: "Close gallery",
      toggleMaximize: "Toggle maximize",
      previousSlide: "Previous slide",
      nextSlide: "Next slide",
      download: "Download",
      playVideo: "Play video",
    },
  };
  function initLgPolyfills() {
    (function () {
      if (typeof window.CustomEvent === "function") return false;
      function CustomEvent(event, params) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: null,
        };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(
          event,
          params.bubbles,
          params.cancelable,
          params.detail
        );
        return evt;
      }
      window.CustomEvent = CustomEvent;
    })();
    (function () {
      if (!Element.prototype.matches)
        Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector;
    })();
  }
  var lgQuery = (function () {
    function lgQuery(selector) {
      this.cssVenderPrefixes = [
        "TransitionDuration",
        "TransitionTimingFunction",
        "Transform",
        "Transition",
      ];
      this.selector = this._getSelector(selector);
      this.firstElement = this._getFirstEl();
      return this;
    }
    lgQuery.generateUUID = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 3) | 8;
          return v.toString(16);
        }
      );
    };
    lgQuery.prototype._getSelector = function (selector, context) {
      if (context === void 0) context = document;
      if (typeof selector !== "string") return selector;
      context = context || document;
      var fl = selector.substring(0, 1);
      if (fl === "#") return context.querySelector(selector);
      else return context.querySelectorAll(selector);
    };
    lgQuery.prototype._each = function (func) {
      if (!this.selector) return this;
      if (this.selector.length !== void 0) [].forEach.call(this.selector, func);
      else func(this.selector, 0);
      return this;
    };
    lgQuery.prototype._setCssVendorPrefix = function (el, cssProperty, value) {
      var property = cssProperty.replace(/-([a-z])/gi, function (s, group1) {
        return group1.toUpperCase();
      });
      if (this.cssVenderPrefixes.indexOf(property) !== -1) {
        el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
        el.style["webkit" + property] = value;
        el.style["moz" + property] = value;
        el.style["ms" + property] = value;
        el.style["o" + property] = value;
      } else el.style[property] = value;
    };
    lgQuery.prototype._getFirstEl = function () {
      if (this.selector && this.selector.length !== void 0)
        return this.selector[0];
      else return this.selector;
    };
    lgQuery.prototype.isEventMatched = function (event, eventName) {
      var eventNamespace = eventName.split(".");
      return event
        .split(".")
        .filter(function (e) {
          return e;
        })
        .every(function (e) {
          return eventNamespace.indexOf(e) !== -1;
        });
    };
    lgQuery.prototype.attr = function (attr, value) {
      if (value === void 0) {
        if (!this.firstElement) return "";
        return this.firstElement.getAttribute(attr);
      }
      this._each(function (el) {
        el.setAttribute(attr, value);
      });
      return this;
    };
    lgQuery.prototype.find = function (selector) {
      return $LG(this._getSelector(selector, this.selector));
    };
    lgQuery.prototype.first = function () {
      if (this.selector && this.selector.length !== void 0)
        return $LG(this.selector[0]);
      else return $LG(this.selector);
    };
    lgQuery.prototype.eq = function (index) {
      return $LG(this.selector[index]);
    };
    lgQuery.prototype.parent = function () {
      return $LG(this.selector.parentElement);
    };
    lgQuery.prototype.get = function () {
      return this._getFirstEl();
    };
    lgQuery.prototype.removeAttr = function (attributes) {
      var attrs = attributes.split(" ");
      this._each(function (el) {
        attrs.forEach(function (attr) {
          return el.removeAttribute(attr);
        });
      });
      return this;
    };
    lgQuery.prototype.wrap = function (className) {
      if (!this.firstElement) return this;
      var wrapper = document.createElement("div");
      wrapper.className = className;
      this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
      this.firstElement.parentNode.removeChild(this.firstElement);
      wrapper.appendChild(this.firstElement);
      return this;
    };
    lgQuery.prototype.addClass = function (classNames) {
      if (classNames === void 0) classNames = "";
      this._each(function (el) {
        classNames.split(" ").forEach(function (className) {
          if (className) el.classList.add(className);
        });
      });
      return this;
    };
    lgQuery.prototype.removeClass = function (classNames) {
      this._each(function (el) {
        classNames.split(" ").forEach(function (className) {
          if (className) el.classList.remove(className);
        });
      });
      return this;
    };
    lgQuery.prototype.hasClass = function (className) {
      if (!this.firstElement) return false;
      return this.firstElement.classList.contains(className);
    };
    lgQuery.prototype.hasAttribute = function (attribute) {
      if (!this.firstElement) return false;
      return this.firstElement.hasAttribute(attribute);
    };
    lgQuery.prototype.toggleClass = function (className) {
      if (!this.firstElement) return this;
      if (this.hasClass(className)) this.removeClass(className);
      else this.addClass(className);
      return this;
    };
    lgQuery.prototype.css = function (property, value) {
      var _this = this;
      this._each(function (el) {
        _this._setCssVendorPrefix(el, property, value);
      });
      return this;
    };
    lgQuery.prototype.on = function (events, listener) {
      var _this = this;
      if (!this.selector) return this;
      events.split(" ").forEach(function (event) {
        if (!Array.isArray(lgQuery.eventListeners[event]))
          lgQuery.eventListeners[event] = [];
        lgQuery.eventListeners[event].push(listener);
        _this.selector.addEventListener(event.split(".")[0], listener);
      });
      return this;
    };
    lgQuery.prototype.once = function (event, listener) {
      var _this = this;
      this.on(event, function () {
        _this.off(event);
        listener(event);
      });
      return this;
    };
    lgQuery.prototype.off = function (event) {
      var _this = this;
      if (!this.selector) return this;
      Object.keys(lgQuery.eventListeners).forEach(function (eventName) {
        if (_this.isEventMatched(event, eventName)) {
          lgQuery.eventListeners[eventName].forEach(function (listener) {
            _this.selector.removeEventListener(
              eventName.split(".")[0],
              listener
            );
          });
          lgQuery.eventListeners[eventName] = [];
        }
      });
      return this;
    };
    lgQuery.prototype.trigger = function (event, detail) {
      if (!this.firstElement) return this;
      var customEvent = new CustomEvent(event.split(".")[0], {
        detail: detail || null,
      });
      this.firstElement.dispatchEvent(customEvent);
      return this;
    };
    lgQuery.prototype.load = function (url) {
      var _this = this;
      fetch(url)
        .then(function (res) {
          return res.text();
        })
        .then(function (html) {
          _this.selector.innerHTML = html;
        });
      return this;
    };
    lgQuery.prototype.html = function (html) {
      if (html === void 0) {
        if (!this.firstElement) return "";
        return this.firstElement.innerHTML;
      }
      this._each(function (el) {
        el.innerHTML = html;
      });
      return this;
    };
    lgQuery.prototype.append = function (html) {
      this._each(function (el) {
        if (typeof html === "string") el.insertAdjacentHTML("beforeend", html);
        else el.appendChild(html);
      });
      return this;
    };
    lgQuery.prototype.prepend = function (html) {
      this._each(function (el) {
        el.insertAdjacentHTML("afterbegin", html);
      });
      return this;
    };
    lgQuery.prototype.remove = function () {
      this._each(function (el) {
        el.parentNode.removeChild(el);
      });
      return this;
    };
    lgQuery.prototype.empty = function () {
      this._each(function (el) {
        el.innerHTML = "";
      });
      return this;
    };
    lgQuery.prototype.scrollTop = function (scrollTop) {
      if (scrollTop !== void 0) {
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        return this;
      } else
        return (
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0
        );
    };
    lgQuery.prototype.scrollLeft = function (scrollLeft) {
      if (scrollLeft !== void 0) {
        document.body.scrollLeft = scrollLeft;
        document.documentElement.scrollLeft = scrollLeft;
        return this;
      } else
        return (
          window.pageXOffset ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          0
        );
    };
    lgQuery.prototype.offset = function () {
      if (!this.firstElement)
        return {
          left: 0,
          top: 0,
        };
      var rect = this.firstElement.getBoundingClientRect();
      var bodyMarginLeft = $LG("body").style().marginLeft;
      return {
        left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
        top: rect.top + this.scrollTop(),
      };
    };
    lgQuery.prototype.style = function () {
      if (!this.firstElement) return {};
      return (
        this.firstElement.currentStyle ||
        window.getComputedStyle(this.firstElement)
      );
    };
    lgQuery.prototype.width = function () {
      var style = this.style();
      return (
        this.firstElement.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight)
      );
    };
    lgQuery.prototype.height = function () {
      var style = this.style();
      return (
        this.firstElement.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom)
      );
    };
    lgQuery.eventListeners = {};
    return lgQuery;
  })();
  function $LG(selector) {
    initLgPolyfills();
    return new lgQuery(selector);
  }
  var defaultDynamicOptions = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function convertToData(attr) {
    if (attr === "href") return "src";
    attr = attr.replace("data-", "");
    attr = attr.charAt(0).toLowerCase() + attr.slice(1);
    attr = attr.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    return attr;
  }
  var utils = {
    getSize: function (el, container, spacing, defaultLgSize) {
      if (spacing === void 0) spacing = 0;
      var LGel = $LG(el);
      var lgSize = LGel.attr("data-lg-size") || defaultLgSize;
      if (!lgSize) return;
      var isResponsiveSizes = lgSize.split(",");
      if (isResponsiveSizes[1]) {
        var wWidth = window.innerWidth;
        for (var i = 0; i < isResponsiveSizes.length; i++) {
          var size_1 = isResponsiveSizes[i];
          var responsiveWidth = parseInt(size_1.split("-")[2], 10);
          if (responsiveWidth > wWidth) {
            lgSize = size_1;
            break;
          }
          if (i === isResponsiveSizes.length - 1) lgSize = size_1;
        }
      }
      var size = lgSize.split("-");
      var width = parseInt(size[0], 10);
      var height = parseInt(size[1], 10);
      var cWidth = container.width();
      var cHeight = container.height() - spacing;
      var maxWidth = Math.min(cWidth, width);
      var maxHeight = Math.min(cHeight, height);
      var ratio = Math.min(maxWidth / width, maxHeight / height);
      return {
        width: width * ratio,
        height: height * ratio,
      };
    },
    getTransform: function (el, container, top, bottom, imageSize) {
      if (!imageSize) return;
      var LGel = $LG(el).find("img").first();
      if (!LGel.get()) return;
      var containerRect = container.get().getBoundingClientRect();
      var wWidth = containerRect.width;
      var wHeight = container.height() - (top + bottom);
      var elWidth = LGel.width();
      var elHeight = LGel.height();
      var elStyle = LGel.style();
      var x =
        (wWidth - elWidth) / 2 -
        LGel.offset().left +
        (parseFloat(elStyle.paddingLeft) || 0) +
        (parseFloat(elStyle.borderLeft) || 0) +
        $LG(window).scrollLeft() +
        containerRect.left;
      var y =
        (wHeight - elHeight) / 2 -
        LGel.offset().top +
        (parseFloat(elStyle.paddingTop) || 0) +
        (parseFloat(elStyle.borderTop) || 0) +
        $LG(window).scrollTop() +
        top;
      var scX = elWidth / imageSize.width;
      var scY = elHeight / imageSize.height;
      var transform =
        "translate3d(" +
        (x *= -1) +
        "px, " +
        (y *= -1) +
        "px, 0) scale3d(" +
        scX +
        ", " +
        scY +
        ", 1)";
      return transform;
    },
    getIframeMarkup: function (
      iframeWidth,
      iframeHeight,
      iframeMaxWidth,
      iframeMaxHeight,
      src,
      iframeTitle
    ) {
      var title = iframeTitle ? 'title="' + iframeTitle + '"' : "";
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        iframeWidth +
        "; max-width:" +
        iframeMaxWidth +
        "; height: " +
        iframeHeight +
        "; max-height:" +
        iframeMaxHeight +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        title +
        ' src="' +
        src +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    getImgMarkup: function (index, src, altAttr, srcset, sizes, sources) {
      var srcsetAttr = srcset ? 'srcset="' + srcset + '"' : "";
      var sizesAttr = sizes ? 'sizes="' + sizes + '"' : "";
      var imgMarkup =
        "<img " +
        altAttr +
        " " +
        srcsetAttr +
        "  " +
        sizesAttr +
        ' class="lg-object lg-image" data-index="' +
        index +
        '" src="' +
        src +
        '" />';
      var sourceTag = "";
      if (sources) {
        var sourceObj =
          typeof sources === "string" ? JSON.parse(sources) : sources;
        sourceTag = sourceObj.map(function (source) {
          var attrs = "";
          Object.keys(source).forEach(function (key) {
            attrs += " " + key + '="' + source[key] + '"';
          });
          return "<source " + attrs + "></source>";
        });
      }
      return "" + sourceTag + imgMarkup;
    },
    getResponsiveSrc: function (srcItms) {
      var rsWidth = [];
      var rsSrc = [];
      var src = "";
      for (var i = 0; i < srcItms.length; i++) {
        var _src = srcItms[i].split(" ");
        if (_src[0] === "") _src.splice(0, 1);
        rsSrc.push(_src[0]);
        rsWidth.push(_src[1]);
      }
      var wWidth = window.innerWidth;
      for (var j = 0; j < rsWidth.length; j++)
        if (parseInt(rsWidth[j], 10) > wWidth) {
          src = rsSrc[j];
          break;
        }
      return src;
    },
    isImageLoaded: function (img) {
      if (!img) return false;
      if (!img.complete) return false;
      if (img.naturalWidth === 0) return false;
      return true;
    },
    getVideoPosterMarkup: function (
      _poster,
      dummyImg,
      videoContStyle,
      playVideoString,
      _isVideo
    ) {
      var videoClass = "";
      if (_isVideo && _isVideo.youtube) videoClass = "lg-has-youtube";
      else if (_isVideo && _isVideo.vimeo) videoClass = "lg-has-vimeo";
      else videoClass = "lg-has-html5";
      return (
        '<div class="lg-video-cont ' +
        videoClass +
        '" style="' +
        videoContStyle +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
        playVideoString +
        '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
        playVideoString +
        '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (dummyImg || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        _poster +
        '" />\n        </div>'
      );
    },
    getFocusableElements: function (container) {
      var elements = container.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      );
      var visibleElements = [].filter.call(elements, function (element) {
        var style = window.getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden";
      });
      return visibleElements;
    },
    getDynamicOptions: function (
      items,
      extraProps,
      getCaptionFromTitleOrAlt,
      exThumbImage
    ) {
      var dynamicElements = [];
      var availableDynamicOptions = __spreadArrays(
        defaultDynamicOptions,
        extraProps
      );
      [].forEach.call(items, function (item) {
        var dynamicEl = {};
        for (var i = 0; i < item.attributes.length; i++) {
          var attr = item.attributes[i];
          if (attr.specified) {
            var dynamicAttr = convertToData(attr.name);
            var label = "";
            if (availableDynamicOptions.indexOf(dynamicAttr) > -1)
              label = dynamicAttr;
            if (label) dynamicEl[label] = attr.value;
          }
        }
        var currentItem = $LG(item);
        var alt = currentItem.find("img").first().attr("alt");
        var title = currentItem.attr("title");
        var thumb = exThumbImage
          ? currentItem.attr(exThumbImage)
          : currentItem.find("img").first().attr("src");
        dynamicEl.thumb = thumb;
        if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml)
          dynamicEl.subHtml = title || alt || "";
        dynamicEl.alt = alt || title || "";
        dynamicElements.push(dynamicEl);
      });
      return dynamicElements;
    },
    isMobile: function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    isVideo: function (src, isHTML5VIdeo, index) {
      if (!src)
        if (isHTML5VIdeo)
          return {
            html5: true,
          };
        else {
          console.error(
            "lightGallery :- data-src is not provided on slide item " +
              (index + 1) +
              ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
          );
          return;
        }
      var youtube = src.match(
        /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
      );
      var vimeo = src.match(
        /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
      );
      var wistia = src.match(
        /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
      );
      if (youtube)
        return {
          youtube,
        };
      else if (vimeo)
        return {
          vimeo,
        };
      else if (wistia)
        return {
          wistia,
        };
    },
  };
  var lgId = 0;
  var LightGallery = (function () {
    function LightGallery(element, options) {
      this.lgOpened = false;
      this.index = 0;
      this.plugins = [];
      this.lGalleryOn = false;
      this.lgBusy = false;
      this.currentItemsInDom = [];
      this.prevScrollTop = 0;
      this.bodyPaddingRight = 0;
      this.isDummyImageRemoved = false;
      this.dragOrSwipeEnabled = false;
      this.mediaContainerPosition = {
        top: 0,
        bottom: 0,
      };
      if (!element) return this;
      lgId++;
      this.lgId = lgId;
      this.el = element;
      this.LGel = $LG(element);
      this.generateSettings(options);
      this.buildModules();
      if (
        this.settings.dynamic &&
        this.settings.dynamicEl !== void 0 &&
        !Array.isArray(this.settings.dynamicEl)
      )
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      this.galleryItems = this.getItems();
      this.normalizeSettings();
      this.init();
      this.validateLicense();
      return this;
    }
    LightGallery.prototype.generateSettings = function (options) {
      this.settings = __assign(__assign({}, lightGalleryCoreSettings), options);
      if (
        this.settings.isMobile && typeof this.settings.isMobile === "function"
          ? this.settings.isMobile()
          : utils.isMobile()
      ) {
        var mobileSettings = __assign(
          __assign({}, this.settings.mobileSettings),
          this.settings.mobileSettings
        );
        this.settings = __assign(__assign({}, this.settings), mobileSettings);
      }
    };
    LightGallery.prototype.normalizeSettings = function () {
      if (this.settings.slideEndAnimation)
        this.settings.hideControlOnEnd = false;
      if (!this.settings.closable) this.settings.swipeToClose = false;
      this.zoomFromOrigin = this.settings.zoomFromOrigin;
      if (this.settings.dynamic) this.zoomFromOrigin = false;
      if (!this.settings.container) this.settings.container = document.body;
      this.settings.preload = Math.min(
        this.settings.preload,
        this.galleryItems.length
      );
    };
    LightGallery.prototype.init = function () {
      var _this = this;
      this.addSlideVideoInfo(this.galleryItems);
      this.buildStructure();
      this.LGel.trigger(lGEvents.init, {
        instance: this,
      });
      if (this.settings.keyPress) this.keyPress();
      setTimeout(function () {
        _this.enableDrag();
        _this.enableSwipe();
        _this.triggerPosterClick();
      }, 50);
      this.arrow();
      if (this.settings.mousewheel) this.mousewheel();
      if (!this.settings.dynamic) this.openGalleryOnItemClick();
    };
    LightGallery.prototype.openGalleryOnItemClick = function () {
      var _this = this;
      var _loop_1 = function (index) {
        var element = this_1.items[index];
        var $element = $LG(element);
        var uuid = lgQuery.generateUUID();
        $element
          .attr("data-lg-id", uuid)
          .on("click.lgcustom-item-" + uuid, function (e) {
            e.preventDefault();
            var currentItemIndex = _this.settings.index || index;
            _this.openGallery(currentItemIndex, element);
          });
      };
      var this_1 = this;
      for (var index = 0; index < this.items.length; index++) _loop_1(index);
    };
    LightGallery.prototype.buildModules = function () {
      var _this = this;
      this.settings.plugins.forEach(function (plugin) {
        _this.plugins.push(new plugin(_this, $LG));
      });
    };
    LightGallery.prototype.validateLicense = function () {
      if (!this.settings.licenseKey)
        console.error("Please provide a valid license key");
      else if (this.settings.licenseKey === "0000-0000-000-0000")
        console.warn(
          "lightGallery: " +
            this.settings.licenseKey +
            " license key is not valid for production use"
        );
    };
    LightGallery.prototype.getSlideItem = function (index) {
      return $LG(this.getSlideItemId(index));
    };
    LightGallery.prototype.getSlideItemId = function (index) {
      return "#lg-item-" + this.lgId + "-" + index;
    };
    LightGallery.prototype.getIdName = function (id) {
      return id + "-" + this.lgId;
    };
    LightGallery.prototype.getElementById = function (id) {
      return $LG("#" + this.getIdName(id));
    };
    LightGallery.prototype.manageSingleSlideClassName = function () {
      if (this.galleryItems.length < 2) this.outer.addClass("lg-single-item");
      else this.outer.removeClass("lg-single-item");
    };
    LightGallery.prototype.buildStructure = function () {
      var _this = this;
      var container = this.$container && this.$container.get();
      if (container) return;
      var controls = "";
      var subHtmlCont = "";
      if (this.settings.controls)
        controls =
          '<button type="button" id="' +
          this.getIdName("lg-prev") +
          '" aria-label="' +
          this.settings.strings["previousSlide"] +
          '" class="lg-prev lg-icon"> ' +
          this.settings.prevHtml +
          ' </button>\n                <button type="button" id="' +
          this.getIdName("lg-next") +
          '" aria-label="' +
          this.settings.strings["nextSlide"] +
          '" class="lg-next lg-icon"> ' +
          this.settings.nextHtml +
          " </button>";
      if (this.settings.appendSubHtmlTo !== ".lg-item")
        subHtmlCont =
          '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
      var addClasses = "";
      if (this.settings.allowMediaOverlap) addClasses += "lg-media-overlap ";
      var ariaLabelledby = this.settings.ariaLabelledby
        ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
        : "";
      var ariaDescribedby = this.settings.ariaDescribedby
        ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
        : "";
      var containerClassName =
        "lg-container " +
        this.settings.addClass +
        " " +
        (document.body !== this.settings.container ? "lg-inline" : "");
      var closeIcon =
        this.settings.closable && this.settings.showCloseIcon
          ? '<button type="button" aria-label="' +
            this.settings.strings["closeGallery"] +
            '" id="' +
            this.getIdName("lg-close") +
            '" class="lg-close lg-icon"></button>'
          : "";
      var maximizeIcon = this.settings.showMaximizeIcon
        ? '<button type="button" aria-label="' +
          this.settings.strings["toggleMaximize"] +
          '" id="' +
          this.getIdName("lg-maximize") +
          '" class="lg-maximize lg-icon"></button>'
        : "";
      var template =
        '\n        <div class="' +
        containerClassName +
        '" id="' +
        this.getIdName("lg-container") +
        '" tabindex="-1" aria-modal="true" ' +
        ariaLabelledby +
        " " +
        ariaDescribedby +
        ' role="dialog"\n        >\n            <div id="' +
        this.getIdName("lg-backdrop") +
        '" class="lg-backdrop"></div>\n\n            <div id="' +
        this.getIdName("lg-outer") +
        '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
        addClasses +
        ' ">\n\n              <div id="' +
        this.getIdName("lg-content") +
        '" class="lg-content">\n                <div id="' +
        this.getIdName("lg-inner") +
        '" class="lg-inner">\n                </div>\n                ' +
        controls +
        '\n              </div>\n                <div id="' +
        this.getIdName("lg-toolbar") +
        '" class="lg-toolbar lg-group">\n                    ' +
        maximizeIcon +
        "\n                    " +
        closeIcon +
        "\n                    </div>\n                    " +
        (this.settings.appendSubHtmlTo === ".lg-outer" ? subHtmlCont : "") +
        '\n                <div id="' +
        this.getIdName("lg-components") +
        '" class="lg-components">\n                    ' +
        (this.settings.appendSubHtmlTo === ".lg-sub-html" ? subHtmlCont : "") +
        "\n                </div>\n            </div>\n        </div>\n        ";
      $LG(this.settings.container).append(template);
      if (document.body !== this.settings.container)
        $LG(this.settings.container).css("position", "relative");
      this.outer = this.getElementById("lg-outer");
      this.$lgComponents = this.getElementById("lg-components");
      this.$backdrop = this.getElementById("lg-backdrop");
      this.$container = this.getElementById("lg-container");
      this.$inner = this.getElementById("lg-inner");
      this.$content = this.getElementById("lg-content");
      this.$toolbar = this.getElementById("lg-toolbar");
      this.$backdrop.css(
        "transition-duration",
        this.settings.backdropDuration + "ms"
      );
      var outerClassNames = this.settings.mode + " ";
      this.manageSingleSlideClassName();
      if (this.settings.enableDrag) outerClassNames += "lg-grab ";
      this.outer.addClass(outerClassNames);
      this.$inner.css("transition-timing-function", this.settings.easing);
      this.$inner.css("transition-duration", this.settings.speed + "ms");
      if (this.settings.download)
        this.$toolbar.append(
          '<a id="' +
            this.getIdName("lg-download") +
            '" target="_blank" rel="noopener" aria-label="' +
            this.settings.strings["download"] +
            '" download class="lg-download lg-icon"></a>'
        );
      this.counter();
      $LG(window).on(
        "resize.lg.global" +
          this.lgId +
          " orientationchange.lg.global" +
          this.lgId,
        function () {
          _this.refreshOnResize();
        }
      );
      this.hideBars();
      this.manageCloseGallery();
      this.toggleMaximize();
      this.initModules();
    };
    LightGallery.prototype.refreshOnResize = function () {
      if (this.lgOpened) {
        var currentGalleryItem = this.galleryItems[this.index];
        var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
        this.mediaContainerPosition = this.getMediaContainerPosition();
        var _a = this.mediaContainerPosition,
          top_1 = _a.top,
          bottom = _a.bottom;
        this.currentImageSize = utils.getSize(
          this.items[this.index],
          this.outer,
          top_1 + bottom,
          __slideVideoInfo && this.settings.videoMaxSize
        );
        if (__slideVideoInfo)
          this.resizeVideoSlide(this.index, this.currentImageSize);
        if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
          var imgStyle = this.getDummyImgStyles(this.currentImageSize);
          this.outer
            .find(".lg-current .lg-dummy-img")
            .first()
            .attr("style", imgStyle);
        }
        this.LGel.trigger(lGEvents.containerResize);
      }
    };
    LightGallery.prototype.resizeVideoSlide = function (index, imageSize) {
      var lgVideoStyle = this.getVideoContStyle(imageSize);
      var currentSlide = this.getSlideItem(index);
      currentSlide.find(".lg-video-cont").attr("style", lgVideoStyle);
    };
    LightGallery.prototype.updateSlides = function (items, index) {
      if (this.index > items.length - 1) this.index = items.length - 1;
      if (items.length === 1) this.index = 0;
      if (!items.length) {
        this.closeGallery();
        return;
      }
      var currentSrc = this.galleryItems[index].src;
      this.galleryItems = items;
      this.updateControls();
      this.$inner.empty();
      this.currentItemsInDom = [];
      var _index = 0;
      this.galleryItems.some(function (galleryItem, itemIndex) {
        if (galleryItem.src === currentSrc) {
          _index = itemIndex;
          return true;
        }
        return false;
      });
      this.currentItemsInDom = this.organizeSlideItems(_index, -1);
      this.loadContent(_index, true);
      this.getSlideItem(_index).addClass("lg-current");
      this.index = _index;
      this.updateCurrentCounter(_index);
      this.LGel.trigger(lGEvents.updateSlides);
    };
    LightGallery.prototype.getItems = function () {
      this.items = [];
      if (!this.settings.dynamic) {
        if (this.settings.selector === "this") this.items.push(this.el);
        else if (this.settings.selector)
          if (typeof this.settings.selector === "string")
            if (this.settings.selectWithin) {
              var selectWithin = $LG(this.settings.selectWithin);
              this.items = selectWithin.find(this.settings.selector).get();
            } else
              this.items = this.el.querySelectorAll(this.settings.selector);
          else this.items = this.settings.selector;
        else this.items = this.el.children;
        return utils.getDynamicOptions(
          this.items,
          this.settings.extraProps,
          this.settings.getCaptionFromTitleOrAlt,
          this.settings.exThumbImage
        );
      } else return this.settings.dynamicEl || [];
    };
    LightGallery.prototype.shouldHideScrollbar = function () {
      return (
        this.settings.hideScrollbar && document.body === this.settings.container
      );
    };
    LightGallery.prototype.hideScrollbar = function () {
      if (!this.shouldHideScrollbar()) return;
      this.bodyPaddingRight = parseFloat($LG("body").style().paddingRight);
      var bodyRect = document.documentElement.getBoundingClientRect();
      var scrollbarWidth = window.innerWidth - bodyRect.width;
      $LG(document.body).css(
        "padding-right",
        scrollbarWidth + this.bodyPaddingRight + "px"
      );
      $LG(document.body).addClass("lg-overlay-open");
    };
    LightGallery.prototype.resetScrollBar = function () {
      if (!this.shouldHideScrollbar()) return;
      $LG(document.body).css("padding-right", this.bodyPaddingRight + "px");
      $LG(document.body).removeClass("lg-overlay-open");
    };
    LightGallery.prototype.openGallery = function (index, element) {
      var _this = this;
      if (index === void 0) index = this.settings.index;
      if (this.lgOpened) return;
      this.lgOpened = true;
      this.outer.removeClass("lg-hide-items");
      this.hideScrollbar();
      this.$container.addClass("lg-show");
      var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
      this.currentItemsInDom = itemsToBeInsertedToDom;
      var items = "";
      itemsToBeInsertedToDom.forEach(function (item) {
        items = items + '<div id="' + item + '" class="lg-item"></div>';
      });
      this.$inner.append(items);
      this.addHtml(index);
      var transform = "";
      this.mediaContainerPosition = this.getMediaContainerPosition();
      var _a = this.mediaContainerPosition,
        top = _a.top,
        bottom = _a.bottom;
      if (!this.settings.allowMediaOverlap)
        this.setMediaContainerPosition(top, bottom);
      var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
      if (this.zoomFromOrigin && element) {
        this.currentImageSize = utils.getSize(
          element,
          this.outer,
          top + bottom,
          __slideVideoInfo && this.settings.videoMaxSize
        );
        transform = utils.getTransform(
          element,
          this.outer,
          top,
          bottom,
          this.currentImageSize
        );
      }
      if (!this.zoomFromOrigin || !transform) {
        this.outer.addClass(this.settings.startClass);
        this.getSlideItem(index).removeClass("lg-complete");
      }
      var timeout = this.settings.zoomFromOrigin
        ? 100
        : this.settings.backdropDuration;
      setTimeout(function () {
        _this.outer.addClass("lg-components-open");
      }, timeout);
      this.index = index;
      this.LGel.trigger(lGEvents.beforeOpen);
      this.getSlideItem(index).addClass("lg-current");
      this.lGalleryOn = false;
      this.prevScrollTop = $LG(window).scrollTop();
      setTimeout(function () {
        if (_this.zoomFromOrigin && transform) {
          var currentSlide_1 = _this.getSlideItem(index);
          currentSlide_1.css("transform", transform);
          setTimeout(function () {
            currentSlide_1
              .addClass("lg-start-progress lg-start-end-progress")
              .css(
                "transition-duration",
                _this.settings.startAnimationDuration + "ms"
              );
            _this.outer.addClass("lg-zoom-from-image");
          });
          setTimeout(function () {
            currentSlide_1.css("transform", "translate3d(0, 0, 0)");
          }, 100);
        }
        setTimeout(function () {
          _this.$backdrop.addClass("in");
          _this.$container.addClass("lg-show-in");
        }, 10);
        setTimeout(function () {
          if (
            _this.settings.trapFocus &&
            document.body === _this.settings.container
          )
            _this.trapFocus();
        }, _this.settings.backdropDuration + 50);
        if (!_this.zoomFromOrigin || !transform)
          setTimeout(function () {
            _this.outer.addClass("lg-visible");
          }, _this.settings.backdropDuration);
        _this.slide(index, false, false, false);
        _this.LGel.trigger(lGEvents.afterOpen);
      });
      if (document.body === this.settings.container)
        $LG("html").addClass("lg-on");
    };
    LightGallery.prototype.getMediaContainerPosition = function () {
      if (this.settings.allowMediaOverlap)
        return {
          top: 0,
          bottom: 0,
        };
      var top = this.$toolbar.get().clientHeight || 0;
      var subHtml = this.outer.find(".lg-components .lg-sub-html").get();
      var captionHeight =
        this.settings.defaultCaptionHeight ||
        (subHtml && subHtml.clientHeight) ||
        0;
      var thumbContainer = this.outer.find(".lg-thumb-outer").get();
      var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
      var bottom = thumbHeight + captionHeight;
      return {
        top,
        bottom,
      };
    };
    LightGallery.prototype.setMediaContainerPosition = function (top, bottom) {
      if (top === void 0) top = 0;
      if (bottom === void 0) bottom = 0;
      this.$content.css("top", top + "px").css("bottom", bottom + "px");
    };
    LightGallery.prototype.hideBars = function () {
      var _this = this;
      setTimeout(function () {
        _this.outer.removeClass("lg-hide-items");
        if (_this.settings.hideBarsDelay > 0) {
          _this.outer.on("mousemove.lg click.lg touchstart.lg", function () {
            _this.outer.removeClass("lg-hide-items");
            clearTimeout(_this.hideBarTimeout);
            _this.hideBarTimeout = setTimeout(function () {
              _this.outer.addClass("lg-hide-items");
            }, _this.settings.hideBarsDelay);
          });
          _this.outer.trigger("mousemove.lg");
        }
      }, this.settings.showBarsAfter);
    };
    LightGallery.prototype.initPictureFill = function ($img) {
      if (this.settings.supportLegacyBrowser)
        try {
          picturefill({
            elements: [$img.get()],
          });
        } catch (e) {
          console.warn(
            "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
          );
        }
    };
    LightGallery.prototype.counter = function () {
      if (this.settings.counter) {
        var counterHtml =
          '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
          this.getIdName("lg-counter-current") +
          '" class="lg-counter-current">' +
          (this.index + 1) +
          ' </span> /\n                <span id="' +
          this.getIdName("lg-counter-all") +
          '" class="lg-counter-all">' +
          this.galleryItems.length +
          " </span></div>";
        this.outer.find(this.settings.appendCounterTo).append(counterHtml);
      }
    };
    LightGallery.prototype.addHtml = function (index) {
      var subHtml;
      var subHtmlUrl;
      if (this.galleryItems[index].subHtmlUrl)
        subHtmlUrl = this.galleryItems[index].subHtmlUrl;
      else subHtml = this.galleryItems[index].subHtml;
      if (!subHtmlUrl)
        if (subHtml) {
          var fL = subHtml.substring(0, 1);
          if (fL === "." || fL === "#")
            if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic)
              subHtml = $LG(this.items).eq(index).find(subHtml).first().html();
            else subHtml = $LG(subHtml).first().html();
        } else subHtml = "";
      if (this.settings.appendSubHtmlTo !== ".lg-item")
        if (subHtmlUrl) this.outer.find(".lg-sub-html").load(subHtmlUrl);
        else this.outer.find(".lg-sub-html").html(subHtml);
      else {
        var currentSlide = $LG(this.getSlideItemId(index));
        if (subHtmlUrl) currentSlide.load(subHtmlUrl);
        else
          currentSlide.append('<div class="lg-sub-html">' + subHtml + "</div>");
      }
      if (typeof subHtml !== "undefined" && subHtml !== null)
        if (subHtml === "")
          this.outer
            .find(this.settings.appendSubHtmlTo)
            .addClass("lg-empty-html");
        else
          this.outer
            .find(this.settings.appendSubHtmlTo)
            .removeClass("lg-empty-html");
      this.LGel.trigger(lGEvents.afterAppendSubHtml, {
        index,
      });
    };
    LightGallery.prototype.preload = function (index) {
      for (var i = 1; i <= this.settings.preload; i++) {
        if (i >= this.galleryItems.length - index) break;
        this.loadContent(index + i, false);
      }
      for (var j = 1; j <= this.settings.preload; j++) {
        if (index - j < 0) break;
        this.loadContent(index - j, false);
      }
    };
    LightGallery.prototype.getDummyImgStyles = function (imageSize) {
      if (!imageSize) return "";
      return (
        "width:" +
        imageSize.width +
        "px;\n                margin-left: -" +
        imageSize.width / 2 +
        "px;\n                margin-top: -" +
        imageSize.height / 2 +
        "px;\n                height:" +
        imageSize.height +
        "px"
      );
    };
    LightGallery.prototype.getVideoContStyle = function (imageSize) {
      if (!imageSize) return "";
      return (
        "width:" +
        imageSize.width +
        "px;\n                height:" +
        imageSize.height +
        "px"
      );
    };
    LightGallery.prototype.getDummyImageContent = function (
      $currentSlide,
      index,
      alt
    ) {
      var $currentItem;
      if (!this.settings.dynamic) $currentItem = $LG(this.items).eq(index);
      if ($currentItem) {
        var _dummyImgSrc = void 0;
        if (!this.settings.exThumbImage)
          _dummyImgSrc = $currentItem.find("img").first().attr("src");
        else _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
        if (!_dummyImgSrc) return "";
        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
        var dummyImgContent =
          "<img " +
          alt +
          ' style="' +
          imgStyle +
          '" class="lg-dummy-img" src="' +
          _dummyImgSrc +
          '" />';
        $currentSlide.addClass("lg-first-slide");
        this.outer.addClass("lg-first-slide-loading");
        return dummyImgContent;
      }
      return "";
    };
    LightGallery.prototype.setImgMarkup = function (src, $currentSlide, index) {
      var currentGalleryItem = this.galleryItems[index];
      var alt = currentGalleryItem.alt,
        srcset = currentGalleryItem.srcset,
        sizes = currentGalleryItem.sizes,
        sources = currentGalleryItem.sources;
      var imgContent = "";
      var altAttr = alt ? 'alt="' + alt + '"' : "";
      if (this.isFirstSlideWithZoomAnimation())
        imgContent = this.getDummyImageContent($currentSlide, index, altAttr);
      else
        imgContent = utils.getImgMarkup(
          index,
          src,
          altAttr,
          srcset,
          sizes,
          sources
        );
      var imgMarkup =
        '<picture class="lg-img-wrap"> ' + imgContent + "</picture>";
      $currentSlide.prepend(imgMarkup);
    };
    LightGallery.prototype.onSlideObjectLoad = function (
      $slide,
      isHTML5VideoWithoutPoster,
      onLoad,
      onError
    ) {
      var mediaObject = $slide.find(".lg-object").first();
      if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster)
        onLoad();
      else {
        mediaObject.on("load.lg error.lg", function () {
          onLoad && onLoad();
        });
        mediaObject.on("error.lg", function () {
          onError && onError();
        });
      }
    };
    LightGallery.prototype.onLgObjectLoad = function (
      currentSlide,
      index,
      delay,
      speed,
      isFirstSlide,
      isHTML5VideoWithoutPoster
    ) {
      var _this = this;
      this.onSlideObjectLoad(
        currentSlide,
        isHTML5VideoWithoutPoster,
        function () {
          _this.triggerSlideItemLoad(
            currentSlide,
            index,
            delay,
            speed,
            isFirstSlide
          );
        },
        function () {
          currentSlide.addClass("lg-complete lg-complete_");
          currentSlide.html(
            '<span class="lg-error-msg">Oops... Failed to load content...</span>'
          );
        }
      );
    };
    LightGallery.prototype.triggerSlideItemLoad = function (
      $currentSlide,
      index,
      delay,
      speed,
      isFirstSlide
    ) {
      var _this = this;
      var currentGalleryItem = this.galleryItems[index];
      var _speed =
        isFirstSlide &&
        this.getSlideType(currentGalleryItem) === "video" &&
        !currentGalleryItem.poster
          ? speed
          : 0;
      setTimeout(function () {
        $currentSlide.addClass("lg-complete lg-complete_");
        _this.LGel.trigger(lGEvents.slideItemLoad, {
          index,
          delay: delay || 0,
          isFirstSlide,
        });
      }, _speed);
    };
    LightGallery.prototype.isFirstSlideWithZoomAnimation = function () {
      return !!(
        !this.lGalleryOn &&
        this.zoomFromOrigin &&
        this.currentImageSize
      );
    };
    LightGallery.prototype.addSlideVideoInfo = function (items) {
      var _this = this;
      items.forEach(function (element, index) {
        element.__slideVideoInfo = utils.isVideo(
          element.src,
          !!element.video,
          index
        );
        if (
          element.__slideVideoInfo &&
          _this.settings.loadYouTubePoster &&
          !element.poster &&
          element.__slideVideoInfo.youtube
        )
          element.poster =
            "//img.youtube.com/vi/" +
            element.__slideVideoInfo.youtube[1] +
            "/maxresdefault.jpg";
      });
    };
    LightGallery.prototype.loadContent = function (index, rec) {
      var _this = this;
      var currentGalleryItem = this.galleryItems[index];
      var $currentSlide = $LG(this.getSlideItemId(index));
      var poster = currentGalleryItem.poster,
        srcset = currentGalleryItem.srcset,
        sizes = currentGalleryItem.sizes,
        sources = currentGalleryItem.sources;
      var src = currentGalleryItem.src;
      var video = currentGalleryItem.video;
      var _html5Video =
        video && typeof video === "string" ? JSON.parse(video) : video;
      if (currentGalleryItem.responsive) {
        var srcDyItms = currentGalleryItem.responsive.split(",");
        src = utils.getResponsiveSrc(srcDyItms) || src;
      }
      var videoInfo = currentGalleryItem.__slideVideoInfo;
      var lgVideoStyle = "";
      var iframe = !!currentGalleryItem.iframe;
      var isFirstSlide = !this.lGalleryOn;
      var delay = 0;
      if (isFirstSlide)
        if (this.zoomFromOrigin && this.currentImageSize)
          delay = this.settings.startAnimationDuration + 10;
        else delay = this.settings.backdropDuration + 10;
      if (!$currentSlide.hasClass("lg-loaded")) {
        if (videoInfo) {
          var _a = this.mediaContainerPosition,
            top_2 = _a.top,
            bottom = _a.bottom;
          var videoSize = utils.getSize(
            this.items[index],
            this.outer,
            top_2 + bottom,
            videoInfo && this.settings.videoMaxSize
          );
          lgVideoStyle = this.getVideoContStyle(videoSize);
        }
        if (iframe) {
          var markup = utils.getIframeMarkup(
            this.settings.iframeWidth,
            this.settings.iframeHeight,
            this.settings.iframeMaxWidth,
            this.settings.iframeMaxHeight,
            src,
            currentGalleryItem.iframeTitle
          );
          $currentSlide.prepend(markup);
        } else if (poster) {
          var dummyImg = "";
          var hasStartAnimation =
            isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
          if (hasStartAnimation)
            dummyImg = this.getDummyImageContent($currentSlide, index, "");
          markup = utils.getVideoPosterMarkup(
            poster,
            dummyImg || "",
            lgVideoStyle,
            this.settings.strings["playVideo"],
            videoInfo
          );
          $currentSlide.prepend(markup);
        } else if (videoInfo) {
          markup =
            '<div class="lg-video-cont " style="' + lgVideoStyle + '"></div>';
          $currentSlide.prepend(markup);
        } else {
          this.setImgMarkup(src, $currentSlide, index);
          if (srcset || sources) {
            var $img = $currentSlide.find(".lg-object");
            this.initPictureFill($img);
          }
        }
        if (poster || videoInfo)
          this.LGel.trigger(lGEvents.hasVideo, {
            index,
            src,
            html5Video: _html5Video,
            hasPoster: !!poster,
          });
        this.LGel.trigger(lGEvents.afterAppendSlide, {
          index,
        });
        if (this.lGalleryOn && this.settings.appendSubHtmlTo === ".lg-item")
          this.addHtml(index);
      }
      var _speed = 0;
      if (delay && !$LG(document.body).hasClass("lg-from-hash")) _speed = delay;
      if (this.isFirstSlideWithZoomAnimation()) {
        setTimeout(function () {
          $currentSlide
            .removeClass("lg-start-end-progress lg-start-progress")
            .removeAttr("style");
        }, this.settings.startAnimationDuration + 100);
        if (!$currentSlide.hasClass("lg-loaded"))
          setTimeout(function () {
            if (_this.getSlideType(currentGalleryItem) === "image") {
              var alt = currentGalleryItem.alt;
              var altAttr = alt ? 'alt="' + alt + '"' : "";
              $currentSlide
                .find(".lg-img-wrap")
                .append(
                  utils.getImgMarkup(
                    index,
                    src,
                    altAttr,
                    srcset,
                    sizes,
                    currentGalleryItem.sources
                  )
                );
              if (srcset || sources) {
                var $img = $currentSlide.find(".lg-object");
                _this.initPictureFill($img);
              }
            }
            if (
              _this.getSlideType(currentGalleryItem) === "image" ||
              (_this.getSlideType(currentGalleryItem) === "video" && poster)
            ) {
              _this.onLgObjectLoad(
                $currentSlide,
                index,
                delay,
                _speed,
                true,
                false
              );
              _this.onSlideObjectLoad(
                $currentSlide,
                !!(videoInfo && videoInfo.html5 && !poster),
                function () {
                  _this.loadContentOnFirstSlideLoad(
                    index,
                    $currentSlide,
                    _speed
                  );
                },
                function () {
                  _this.loadContentOnFirstSlideLoad(
                    index,
                    $currentSlide,
                    _speed
                  );
                }
              );
            }
          }, this.settings.startAnimationDuration + 100);
      }
      $currentSlide.addClass("lg-loaded");
      if (
        !this.isFirstSlideWithZoomAnimation() ||
        (this.getSlideType(currentGalleryItem) === "video" && !poster)
      )
        this.onLgObjectLoad(
          $currentSlide,
          index,
          delay,
          _speed,
          isFirstSlide,
          !!(videoInfo && videoInfo.html5 && !poster)
        );
      if (
        (!this.zoomFromOrigin || !this.currentImageSize) &&
        $currentSlide.hasClass("lg-complete_") &&
        !this.lGalleryOn
      )
        setTimeout(function () {
          $currentSlide.addClass("lg-complete");
        }, this.settings.backdropDuration);
      this.lGalleryOn = true;
      if (rec === true)
        if (!$currentSlide.hasClass("lg-complete_"))
          $currentSlide
            .find(".lg-object")
            .first()
            .on("load.lg error.lg", function () {
              _this.preload(index);
            });
        else this.preload(index);
    };
    LightGallery.prototype.loadContentOnFirstSlideLoad = function (
      index,
      $currentSlide,
      speed
    ) {
      var _this = this;
      setTimeout(function () {
        $currentSlide.find(".lg-dummy-img").remove();
        $currentSlide.removeClass("lg-first-slide");
        _this.outer.removeClass("lg-first-slide-loading");
        _this.isDummyImageRemoved = true;
        _this.preload(index);
      }, speed + 300);
    };
    LightGallery.prototype.getItemsToBeInsertedToDom = function (
      index,
      prevIndex,
      numberOfItems
    ) {
      var _this = this;
      if (numberOfItems === void 0) numberOfItems = 0;
      var itemsToBeInsertedToDom = [];
      var possibleNumberOfItems = Math.max(numberOfItems, 3);
      possibleNumberOfItems = Math.min(
        possibleNumberOfItems,
        this.galleryItems.length
      );
      var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
      if (this.galleryItems.length <= 3) {
        this.galleryItems.forEach(function (_element, index) {
          itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
        });
        return itemsToBeInsertedToDom;
      }
      if (index < (this.galleryItems.length - 1) / 2) {
        for (
          var idx = index;
          idx > index - possibleNumberOfItems / 2 && idx >= 0;
          idx--
        )
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
        var numberOfExistingItems = itemsToBeInsertedToDom.length;
        for (
          idx = 0;
          idx < possibleNumberOfItems - numberOfExistingItems;
          idx++
        )
          itemsToBeInsertedToDom.push(
            "lg-item-" + this.lgId + "-" + (index + idx + 1)
          );
      } else {
        for (
          idx = index;
          idx <= this.galleryItems.length - 1 &&
          idx < index + possibleNumberOfItems / 2;
          idx++
        )
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
        numberOfExistingItems = itemsToBeInsertedToDom.length;
        for (
          idx = 0;
          idx < possibleNumberOfItems - numberOfExistingItems;
          idx++
        )
          itemsToBeInsertedToDom.push(
            "lg-item-" + this.lgId + "-" + (index - idx - 1)
          );
      }
      if (this.settings.loop)
        if (index === this.galleryItems.length - 1)
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0);
        else if (index === 0)
          itemsToBeInsertedToDom.push(
            "lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1)
          );
      if (itemsToBeInsertedToDom.indexOf(prevIndexItem) === -1)
        itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
      return itemsToBeInsertedToDom;
    };
    LightGallery.prototype.organizeSlideItems = function (index, prevIndex) {
      var _this = this;
      var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(
        index,
        prevIndex,
        this.settings.numberOfSlideItemsInDom
      );
      itemsToBeInsertedToDom.forEach(function (item) {
        if (_this.currentItemsInDom.indexOf(item) === -1)
          _this.$inner.append('<div id="' + item + '" class="lg-item"></div>');
      });
      this.currentItemsInDom.forEach(function (item) {
        if (itemsToBeInsertedToDom.indexOf(item) === -1)
          $LG("#" + item).remove();
      });
      return itemsToBeInsertedToDom;
    };
    LightGallery.prototype.getPreviousSlideIndex = function () {
      var prevIndex = 0;
      try {
        var currentItemId = this.outer.find(".lg-current").first().attr("id");
        prevIndex = parseInt(currentItemId.split("-")[3]) || 0;
      } catch (error) {
        prevIndex = 0;
      }
      return prevIndex;
    };
    LightGallery.prototype.setDownloadValue = function (index) {
      if (this.settings.download) {
        var currentGalleryItem = this.galleryItems[index];
        var hideDownloadBtn =
          currentGalleryItem.downloadUrl === false ||
          currentGalleryItem.downloadUrl === "false";
        if (hideDownloadBtn) this.outer.addClass("lg-hide-download");
        else {
          var $download = this.getElementById("lg-download");
          this.outer.removeClass("lg-hide-download");
          $download.attr(
            "href",
            currentGalleryItem.downloadUrl || currentGalleryItem.src
          );
          if (currentGalleryItem.download)
            $download.attr("download", currentGalleryItem.download);
        }
      }
    };
    LightGallery.prototype.makeSlideAnimation = function (
      direction,
      currentSlideItem,
      previousSlideItem
    ) {
      var _this = this;
      if (this.lGalleryOn) previousSlideItem.addClass("lg-slide-progress");
      setTimeout(
        function () {
          _this.outer.addClass("lg-no-trans");
          _this.outer
            .find(".lg-item")
            .removeClass("lg-prev-slide lg-next-slide");
          if (direction === "prev") {
            currentSlideItem.addClass("lg-prev-slide");
            previousSlideItem.addClass("lg-next-slide");
          } else {
            currentSlideItem.addClass("lg-next-slide");
            previousSlideItem.addClass("lg-prev-slide");
          }
          setTimeout(function () {
            _this.outer.find(".lg-item").removeClass("lg-current");
            currentSlideItem.addClass("lg-current");
            _this.outer.removeClass("lg-no-trans");
          }, 50);
        },
        this.lGalleryOn ? this.settings.slideDelay : 0
      );
    };
    LightGallery.prototype.slide = function (
      index,
      fromTouch,
      fromThumb,
      direction
    ) {
      var _this = this;
      var prevIndex = this.getPreviousSlideIndex();
      this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
      if (this.lGalleryOn && prevIndex === index) return;
      var numberOfGalleryItems = this.galleryItems.length;
      if (!this.lgBusy) {
        if (this.settings.counter) this.updateCurrentCounter(index);
        var currentSlideItem = this.getSlideItem(index);
        var previousSlideItem_1 = this.getSlideItem(prevIndex);
        var currentGalleryItem = this.galleryItems[index];
        var videoInfo = currentGalleryItem.__slideVideoInfo;
        this.outer.attr(
          "data-lg-slide-type",
          this.getSlideType(currentGalleryItem)
        );
        this.setDownloadValue(index);
        if (videoInfo) {
          var _a = this.mediaContainerPosition,
            top_3 = _a.top,
            bottom = _a.bottom;
          var videoSize = utils.getSize(
            this.items[index],
            this.outer,
            top_3 + bottom,
            videoInfo && this.settings.videoMaxSize
          );
          this.resizeVideoSlide(index, videoSize);
        }
        this.LGel.trigger(lGEvents.beforeSlide, {
          prevIndex,
          index,
          fromTouch: !!fromTouch,
          fromThumb: !!fromThumb,
        });
        this.lgBusy = true;
        clearTimeout(this.hideBarTimeout);
        this.arrowDisable(index);
        if (!direction)
          if (index < prevIndex) direction = "prev";
          else if (index > prevIndex) direction = "next";
        if (!fromTouch)
          this.makeSlideAnimation(
            direction,
            currentSlideItem,
            previousSlideItem_1
          );
        else {
          this.outer
            .find(".lg-item")
            .removeClass("lg-prev-slide lg-current lg-next-slide");
          var touchPrev = void 0;
          var touchNext = void 0;
          if (numberOfGalleryItems > 2) {
            touchPrev = index - 1;
            touchNext = index + 1;
            if (index === 0 && prevIndex === numberOfGalleryItems - 1) {
              touchNext = 0;
              touchPrev = numberOfGalleryItems - 1;
            } else if (index === numberOfGalleryItems - 1 && prevIndex === 0) {
              touchNext = 0;
              touchPrev = numberOfGalleryItems - 1;
            }
          } else {
            touchPrev = 0;
            touchNext = 1;
          }
          if (direction === "prev")
            this.getSlideItem(touchNext).addClass("lg-next-slide");
          else this.getSlideItem(touchPrev).addClass("lg-prev-slide");
          currentSlideItem.addClass("lg-current");
        }
        if (!this.lGalleryOn) this.loadContent(index, true);
        else
          setTimeout(function () {
            _this.loadContent(index, true);
            if (_this.settings.appendSubHtmlTo !== ".lg-item")
              _this.addHtml(index);
          }, this.settings.speed +
            50 +
            (fromTouch ? 0 : this.settings.slideDelay));
        setTimeout(function () {
          _this.lgBusy = false;
          previousSlideItem_1.removeClass("lg-slide-progress");
          _this.LGel.trigger(lGEvents.afterSlide, {
            prevIndex,
            index,
            fromTouch,
            fromThumb,
          });
        }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
          (fromTouch ? 0 : this.settings.slideDelay));
      }
      this.index = index;
    };
    LightGallery.prototype.updateCurrentCounter = function (index) {
      this.getElementById("lg-counter-current").html(index + 1 + "");
    };
    LightGallery.prototype.updateCounterTotal = function () {
      this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
    };
    LightGallery.prototype.getSlideType = function (item) {
      if (item.__slideVideoInfo) return "video";
      else if (item.iframe) return "iframe";
      else return "image";
    };
    LightGallery.prototype.touchMove = function (startCoords, endCoords, e) {
      var distanceX = endCoords.pageX - startCoords.pageX;
      var distanceY = endCoords.pageY - startCoords.pageY;
      var allowSwipe = false;
      if (this.swipeDirection) allowSwipe = true;
      else if (Math.abs(distanceX) > 15) {
        this.swipeDirection = "horizontal";
        allowSwipe = true;
      } else if (Math.abs(distanceY) > 15) {
        this.swipeDirection = "vertical";
        allowSwipe = true;
      }
      if (!allowSwipe) return;
      var $currentSlide = this.getSlideItem(this.index);
      if (this.swipeDirection === "horizontal") {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        this.outer.addClass("lg-dragging");
        this.setTranslate($currentSlide, distanceX, 0);
        var width = $currentSlide.get().offsetWidth;
        var slideWidthAmount = (width * 15) / 100;
        var gutter = slideWidthAmount - Math.abs((distanceX * 10) / 100);
        this.setTranslate(
          this.outer.find(".lg-prev-slide").first(),
          -width + distanceX - gutter,
          0
        );
        this.setTranslate(
          this.outer.find(".lg-next-slide").first(),
          width + distanceX + gutter,
          0
        );
      } else if (this.swipeDirection === "vertical")
        if (this.settings.swipeToClose) {
          e === null || e === void 0 ? void 0 : e.preventDefault();
          this.$container.addClass("lg-dragging-vertical");
          var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
          this.$backdrop.css("opacity", opacity);
          var scale = 1 - Math.abs(distanceY) / (window.innerWidth * 2);
          this.setTranslate($currentSlide, 0, distanceY, scale, scale);
          if (Math.abs(distanceY) > 100)
            this.outer
              .addClass("lg-hide-items")
              .removeClass("lg-components-open");
        }
    };
    LightGallery.prototype.touchEnd = function (endCoords, startCoords, event) {
      var _this = this;
      var distance;
      if (this.settings.mode !== "lg-slide") this.outer.addClass("lg-slide");
      setTimeout(function () {
        _this.$container.removeClass("lg-dragging-vertical");
        _this.outer
          .removeClass("lg-dragging lg-hide-items")
          .addClass("lg-components-open");
        var triggerClick = true;
        if (_this.swipeDirection === "horizontal") {
          distance = endCoords.pageX - startCoords.pageX;
          var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
          if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
            _this.goToNextSlide(true);
            triggerClick = false;
          } else if (
            distance > 0 &&
            distanceAbs > _this.settings.swipeThreshold
          ) {
            _this.goToPrevSlide(true);
            triggerClick = false;
          }
        } else if (_this.swipeDirection === "vertical") {
          distance = Math.abs(endCoords.pageY - startCoords.pageY);
          if (
            _this.settings.closable &&
            _this.settings.swipeToClose &&
            distance > 100
          ) {
            _this.closeGallery();
            return;
          } else _this.$backdrop.css("opacity", 1);
        }
        _this.outer.find(".lg-item").removeAttr("style");
        if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
          var target = $LG(event.target);
          if (_this.isPosterElement(target))
            _this.LGel.trigger(lGEvents.posterClick);
        }
        _this.swipeDirection = void 0;
      });
      setTimeout(function () {
        if (
          !_this.outer.hasClass("lg-dragging") &&
          _this.settings.mode !== "lg-slide"
        )
          _this.outer.removeClass("lg-slide");
      }, this.settings.speed + 100);
    };
    LightGallery.prototype.enableSwipe = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isMoved = false;
      var isSwiping = false;
      if (this.settings.enableSwipe) {
        this.$inner.on("touchstart.lg", function (e) {
          _this.dragOrSwipeEnabled = true;
          var $item = _this.getSlideItem(_this.index);
          if (
            ($LG(e.target).hasClass("lg-item") ||
              $item.get().contains(e.target)) &&
            !_this.outer.hasClass("lg-zoomed") &&
            !_this.lgBusy &&
            e.touches.length === 1
          ) {
            isSwiping = true;
            _this.touchAction = "swipe";
            _this.manageSwipeClass();
            startCoords = {
              pageX: e.touches[0].pageX,
              pageY: e.touches[0].pageY,
            };
          }
        });
        this.$inner.on("touchmove.lg", function (e) {
          if (
            isSwiping &&
            _this.touchAction === "swipe" &&
            e.touches.length === 1
          ) {
            endCoords = {
              pageX: e.touches[0].pageX,
              pageY: e.touches[0].pageY,
            };
            _this.touchMove(startCoords, endCoords, e);
            isMoved = true;
          }
        });
        this.$inner.on("touchend.lg", function (event) {
          if (_this.touchAction === "swipe") {
            if (isMoved) {
              isMoved = false;
              _this.touchEnd(endCoords, startCoords, event);
            } else if (isSwiping) {
              var target = $LG(event.target);
              if (_this.isPosterElement(target))
                _this.LGel.trigger(lGEvents.posterClick);
            }
            _this.touchAction = void 0;
            isSwiping = false;
          }
        });
      }
    };
    LightGallery.prototype.enableDrag = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isDraging = false;
      var isMoved = false;
      if (this.settings.enableDrag) {
        this.outer.on("mousedown.lg", function (e) {
          _this.dragOrSwipeEnabled = true;
          var $item = _this.getSlideItem(_this.index);
          if (
            $LG(e.target).hasClass("lg-item") ||
            $item.get().contains(e.target)
          )
            if (!_this.outer.hasClass("lg-zoomed") && !_this.lgBusy) {
              e.preventDefault();
              if (!_this.lgBusy) {
                _this.manageSwipeClass();
                startCoords = {
                  pageX: e.pageX,
                  pageY: e.pageY,
                };
                isDraging = true;
                _this.outer.get().scrollLeft += 1;
                _this.outer.get().scrollLeft -= 1;
                _this.outer.removeClass("lg-grab").addClass("lg-grabbing");
                _this.LGel.trigger(lGEvents.dragStart);
              }
            }
        });
        $LG(window).on("mousemove.lg.global" + this.lgId, function (e) {
          if (isDraging && _this.lgOpened) {
            isMoved = true;
            endCoords = {
              pageX: e.pageX,
              pageY: e.pageY,
            };
            _this.touchMove(startCoords, endCoords);
            _this.LGel.trigger(lGEvents.dragMove);
          }
        });
        $LG(window).on("mouseup.lg.global" + this.lgId, function (event) {
          if (!_this.lgOpened) return;
          var target = $LG(event.target);
          if (isMoved) {
            isMoved = false;
            _this.touchEnd(endCoords, startCoords, event);
            _this.LGel.trigger(lGEvents.dragEnd);
          } else if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
          if (isDraging) {
            isDraging = false;
            _this.outer.removeClass("lg-grabbing").addClass("lg-grab");
          }
        });
      }
    };
    LightGallery.prototype.triggerPosterClick = function () {
      var _this = this;
      this.$inner.on("click.lg", function (event) {
        if (
          !_this.dragOrSwipeEnabled &&
          _this.isPosterElement($LG(event.target))
        )
          _this.LGel.trigger(lGEvents.posterClick);
      });
    };
    LightGallery.prototype.manageSwipeClass = function () {
      var _touchNext = this.index + 1;
      var _touchPrev = this.index - 1;
      if (this.settings.loop && this.galleryItems.length > 2)
        if (this.index === 0) _touchPrev = this.galleryItems.length - 1;
        else if (this.index === this.galleryItems.length - 1) _touchNext = 0;
      this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide");
      if (_touchPrev > -1)
        this.getSlideItem(_touchPrev).addClass("lg-prev-slide");
      this.getSlideItem(_touchNext).addClass("lg-next-slide");
    };
    LightGallery.prototype.goToNextSlide = function (fromTouch) {
      var _this = this;
      var _loop = this.settings.loop;
      if (fromTouch && this.galleryItems.length < 3) _loop = false;
      if (!this.lgBusy)
        if (this.index + 1 < this.galleryItems.length) {
          this.index++;
          this.LGel.trigger(lGEvents.beforeNextSlide, {
            index: this.index,
          });
          this.slide(this.index, !!fromTouch, false, "next");
        } else if (_loop) {
          this.index = 0;
          this.LGel.trigger(lGEvents.beforeNextSlide, {
            index: this.index,
          });
          this.slide(this.index, !!fromTouch, false, "next");
        } else if (this.settings.slideEndAnimation && !fromTouch) {
          this.outer.addClass("lg-right-end");
          setTimeout(function () {
            _this.outer.removeClass("lg-right-end");
          }, 400);
        }
    };
    LightGallery.prototype.goToPrevSlide = function (fromTouch) {
      var _this = this;
      var _loop = this.settings.loop;
      if (fromTouch && this.galleryItems.length < 3) _loop = false;
      if (!this.lgBusy)
        if (this.index > 0) {
          this.index--;
          this.LGel.trigger(lGEvents.beforePrevSlide, {
            index: this.index,
            fromTouch,
          });
          this.slide(this.index, !!fromTouch, false, "prev");
        } else if (_loop) {
          this.index = this.galleryItems.length - 1;
          this.LGel.trigger(lGEvents.beforePrevSlide, {
            index: this.index,
            fromTouch,
          });
          this.slide(this.index, !!fromTouch, false, "prev");
        } else if (this.settings.slideEndAnimation && !fromTouch) {
          this.outer.addClass("lg-left-end");
          setTimeout(function () {
            _this.outer.removeClass("lg-left-end");
          }, 400);
        }
    };
    LightGallery.prototype.keyPress = function () {
      var _this = this;
      $LG(window).on("keydown.lg.global" + this.lgId, function (e) {
        if (
          _this.lgOpened &&
          _this.settings.escKey === true &&
          e.keyCode === 27
        ) {
          e.preventDefault();
          if (
            _this.settings.allowMediaOverlap &&
            _this.outer.hasClass("lg-can-toggle") &&
            _this.outer.hasClass("lg-components-open")
          )
            _this.outer.removeClass("lg-components-open");
          else _this.closeGallery();
        }
        if (_this.lgOpened && _this.galleryItems.length > 1) {
          if (e.keyCode === 37) {
            e.preventDefault();
            _this.goToPrevSlide();
          }
          if (e.keyCode === 39) {
            e.preventDefault();
            _this.goToNextSlide();
          }
        }
      });
    };
    LightGallery.prototype.arrow = function () {
      var _this = this;
      this.getElementById("lg-prev").on("click.lg", function () {
        _this.goToPrevSlide();
      });
      this.getElementById("lg-next").on("click.lg", function () {
        _this.goToNextSlide();
      });
    };
    LightGallery.prototype.arrowDisable = function (index) {
      if (!this.settings.loop && this.settings.hideControlOnEnd) {
        var $prev = this.getElementById("lg-prev");
        var $next = this.getElementById("lg-next");
        if (index + 1 === this.galleryItems.length)
          $next.attr("disabled", "disabled").addClass("disabled");
        else $next.removeAttr("disabled").removeClass("disabled");
        if (index === 0)
          $prev.attr("disabled", "disabled").addClass("disabled");
        else $prev.removeAttr("disabled").removeClass("disabled");
      }
    };
    LightGallery.prototype.setTranslate = function (
      $el,
      xValue,
      yValue,
      scaleX,
      scaleY
    ) {
      if (scaleX === void 0) scaleX = 1;
      if (scaleY === void 0) scaleY = 1;
      $el.css(
        "transform",
        "translate3d(" +
          xValue +
          "px, " +
          yValue +
          "px, 0px) scale3d(" +
          scaleX +
          ", " +
          scaleY +
          ", 1)"
      );
    };
    LightGallery.prototype.mousewheel = function () {
      var _this = this;
      var lastCall = 0;
      this.outer.on("wheel.lg", function (e) {
        if (!e.deltaY || _this.galleryItems.length < 2) return;
        e.preventDefault();
        var now = new Date().getTime();
        if (now - lastCall < 1e3) return;
        lastCall = now;
        if (e.deltaY > 0) _this.goToNextSlide();
        else if (e.deltaY < 0) _this.goToPrevSlide();
      });
    };
    LightGallery.prototype.isSlideElement = function (target) {
      return (
        target.hasClass("lg-outer") ||
        target.hasClass("lg-item") ||
        target.hasClass("lg-img-wrap")
      );
    };
    LightGallery.prototype.isPosterElement = function (target) {
      var playButton = this.getSlideItem(this.index)
        .find(".lg-video-play-button")
        .get();
      return (
        target.hasClass("lg-video-poster") ||
        target.hasClass("lg-video-play-button") ||
        (playButton && playButton.contains(target.get()))
      );
    };
    LightGallery.prototype.toggleMaximize = function () {
      var _this = this;
      this.getElementById("lg-maximize").on("click.lg", function () {
        _this.$container.toggleClass("lg-inline");
        _this.refreshOnResize();
      });
    };
    LightGallery.prototype.invalidateItems = function () {
      for (var index = 0; index < this.items.length; index++) {
        var element = this.items[index];
        var $element = $LG(element);
        $element.off("click.lgcustom-item-" + $element.attr("data-lg-id"));
      }
    };
    LightGallery.prototype.trapFocus = function () {
      var _this = this;
      this.$container.get().focus({
        preventScroll: true,
      });
      $LG(window).on("keydown.lg.global" + this.lgId, function (e) {
        if (!_this.lgOpened) return;
        var isTabPressed = e.key === "Tab" || e.keyCode === 9;
        if (!isTabPressed) return;
        var focusableEls = utils.getFocusableElements(_this.$container.get());
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      });
    };
    LightGallery.prototype.manageCloseGallery = function () {
      var _this = this;
      if (!this.settings.closable) return;
      var mousedown = false;
      this.getElementById("lg-close").on("click.lg", function () {
        _this.closeGallery();
      });
      if (this.settings.closeOnTap) {
        this.outer.on("mousedown.lg", function (e) {
          var target = $LG(e.target);
          if (_this.isSlideElement(target)) mousedown = true;
          else mousedown = false;
        });
        this.outer.on("mousemove.lg", function () {
          mousedown = false;
        });
        this.outer.on("mouseup.lg", function (e) {
          var target = $LG(e.target);
          if (_this.isSlideElement(target) && mousedown)
            if (!_this.outer.hasClass("lg-dragging")) _this.closeGallery();
        });
      }
    };
    LightGallery.prototype.closeGallery = function (force) {
      var _this = this;
      if (!this.lgOpened || (!this.settings.closable && !force)) return 0;
      this.LGel.trigger(lGEvents.beforeClose);
      if (this.settings.resetScrollPosition && !this.settings.hideScrollbar)
        $LG(window).scrollTop(this.prevScrollTop);
      var currentItem = this.items[this.index];
      var transform;
      if (this.zoomFromOrigin && currentItem) {
        var _a = this.mediaContainerPosition,
          top_4 = _a.top,
          bottom = _a.bottom;
        var _b = this.galleryItems[this.index],
          __slideVideoInfo = _b.__slideVideoInfo,
          poster = _b.poster;
        var imageSize = utils.getSize(
          currentItem,
          this.outer,
          top_4 + bottom,
          __slideVideoInfo && poster && this.settings.videoMaxSize
        );
        transform = utils.getTransform(
          currentItem,
          this.outer,
          top_4,
          bottom,
          imageSize
        );
      }
      if (this.zoomFromOrigin && transform) {
        this.outer.addClass("lg-closing lg-zoom-from-image");
        this.getSlideItem(this.index)
          .addClass("lg-start-end-progress")
          .css(
            "transition-duration",
            this.settings.startAnimationDuration + "ms"
          )
          .css("transform", transform);
      } else {
        this.outer.addClass("lg-hide-items");
        this.outer.removeClass("lg-zoom-from-image");
      }
      this.destroyModules();
      this.lGalleryOn = false;
      this.isDummyImageRemoved = false;
      this.zoomFromOrigin = this.settings.zoomFromOrigin;
      clearTimeout(this.hideBarTimeout);
      this.hideBarTimeout = false;
      $LG("html").removeClass("lg-on");
      this.outer.removeClass("lg-visible lg-components-open");
      this.$backdrop.removeClass("in").css("opacity", 0);
      var removeTimeout =
        this.zoomFromOrigin && transform
          ? Math.max(
              this.settings.startAnimationDuration,
              this.settings.backdropDuration
            )
          : this.settings.backdropDuration;
      this.$container.removeClass("lg-show-in");
      setTimeout(function () {
        if (_this.zoomFromOrigin && transform)
          _this.outer.removeClass("lg-zoom-from-image");
        _this.$container.removeClass("lg-show");
        _this.resetScrollBar();
        _this.$backdrop
          .removeAttr("style")
          .css("transition-duration", _this.settings.backdropDuration + "ms");
        _this.outer.removeClass("lg-closing " + _this.settings.startClass);
        _this.getSlideItem(_this.index).removeClass("lg-start-end-progress");
        _this.$inner.empty();
        if (_this.lgOpened)
          _this.LGel.trigger(lGEvents.afterClose, {
            instance: _this,
          });
        if (_this.$container.get()) _this.$container.get().blur();
        _this.lgOpened = false;
      }, removeTimeout + 100);
      return removeTimeout + 100;
    };
    LightGallery.prototype.initModules = function () {
      this.plugins.forEach(function (module) {
        try {
          module.init();
        } catch (err) {
          console.warn(
            "lightGallery:- make sure lightGallery module is properly initiated"
          );
        }
      });
    };
    LightGallery.prototype.destroyModules = function (destroy) {
      this.plugins.forEach(function (module) {
        try {
          if (destroy) module.destroy();
          else module.closeGallery && module.closeGallery();
        } catch (err) {
          console.warn(
            "lightGallery:- make sure lightGallery module is properly destroyed"
          );
        }
      });
    };
    LightGallery.prototype.refresh = function (galleryItems) {
      if (!this.settings.dynamic) this.invalidateItems();
      if (galleryItems) this.galleryItems = galleryItems;
      else this.galleryItems = this.getItems();
      this.updateControls();
      this.openGalleryOnItemClick();
      this.LGel.trigger(lGEvents.updateSlides);
    };
    LightGallery.prototype.updateControls = function () {
      this.addSlideVideoInfo(this.galleryItems);
      this.updateCounterTotal();
      this.manageSingleSlideClassName();
    };
    LightGallery.prototype.destroyGallery = function () {
      this.destroyModules(true);
      if (!this.settings.dynamic) this.invalidateItems();
      $LG(window).off(".lg.global" + this.lgId);
      this.LGel.off(".lg");
      this.$container.remove();
    };
    LightGallery.prototype.destroy = function () {
      var closeTimeout = this.closeGallery(true);
      if (closeTimeout)
        setTimeout(this.destroyGallery.bind(this), closeTimeout);
      else this.destroyGallery();
      return closeTimeout;
    };
    return LightGallery;
  })();
  function lightGallery(el, options) {
    return new LightGallery(el, options);
  }
  const lightgallery_es5 = lightGallery;
  const galleries = document.querySelectorAll("[data-gallery]");
  if (galleries.length) {
    let galleyItems = [];
    galleries.forEach((gallery) => {
      galleyItems.push({
        gallery,
        galleryClass: lightgallery_es5(gallery, {
          licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
          speed: 500,
        }),
      });
    });
    modules_flsModules.gallery = galleyItems;
  }
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, InertiaPlugin);
  ScrollTrigger.normalizeScroll({
    allowNestedScroll: true,
  });

  if (document.querySelector(".hideMe")) {
    const slides = document.querySelectorAll("#sectionWrap");
    const container = document.querySelector("#panelWrap");
    let dur = 0.5;
    let offsets = [];
    let oldSlide = 0;
    let activeSlide = 0;
    let dots = document.querySelector(".dots");
    let navDots = [];
    let iw = window.innerWidth;
    for (let i = 0; i < slides.length; i++) {
      let newDot = document.createElement("div");
      newDot.className = "dot";
      newDot.index = i;
      navDots.push(newDot);
      newDot.addEventListener("click", slideAnim);
      dots.appendChild(newDot);
    }
    const dotAnim = gsap.timeline({
      paused: true,
    });
    dotAnim.to(
      ".dot",
      {
        stagger: {
          each: 1,
          yoyo: true,
          repeat: 1,
        },
        scale: 2.1,
        rotation: 0.1,
        ease: "none",
      },
      0.5
    );
    dotAnim.time(1);
    let dragMe = Draggable.create(container, {
      type: "x",
      cursor: "move",
      edgeResistance: 0.2,
      snap: offsets,
      inertia: true,
      bounds: "#masterWrap",
      onDrag: tweenDot,
      onThrowUpdate: tweenDot,
      onDragEnd: slideAnim,
      allowNativeTouchScrolling: false,
      zIndexBoost: false,
    });
    dragMe[0].id = "dragger";
    sizeIt();
    function slideAnim(e) {
      oldSlide = activeSlide;
      if (this.id === "dragger") activeSlide = offsets.indexOf(this.endX);
      else {
        if (gsap.isTweening(container)) return;
        if (this.id === "leftArrow" || this.id === "rightArrow")
          activeSlide =
            this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
        else if (this.className === "dot") activeSlide = this.index;
        else
          activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
      }
      activeSlide = activeSlide < 0 ? 0 : activeSlide;
      activeSlide =
        activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
      if (oldSlide === activeSlide) return;
      if (this.id != "dragger")
        gsap.to(container, dur, {
          x: offsets[activeSlide],
          onUpdate: tweenDot,
        });
    }
    function sizeIt() {
      offsets = [];
      iw = window.innerWidth;
      gsap.set("#panelWrap", {
        width: slides.length * iw,
      });
      gsap.set(slides, {
        width: iw,
      });
      for (let i = 0; i < slides.length; i++)
        offsets.push(-slides[i].offsetLeft);
      gsap.set(container, {
        x: offsets[activeSlide],
      });
      dragMe[0].vars.snap = offsets;
    }
    gsap.set(".hideMe", {
      opacity: 1,
    });
    window.addEventListener("resize", sizeIt);
    function tweenDot() {
      gsap.set(dotAnim, {
        time: Math.abs(gsap.getProperty(container, "x") / iw) + 1,
      });
    }
    if (ScrollTrigger.isTouch !== 1)
      if (document.querySelector(".page_home")) {
        gsap.fromTo(
          ".prefs-lines__image",
          {
            y: 0,
            x: 300,
          },
          {
            x: -100,
            y: -10,
            ease: "none",
            scrollTrigger: {
              trigger: ".prefs-section",
              start: `top center`,
              end: "center center",
              scrub: 0.5,
            },
          }
        );
        const origProdlines = "27% 58%";
        gsap.fromTo(
          ".prodlines-lines__image",
          {
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: origProdlines,
          },
          {
            x: 0,
            y: 0,
            scale: 0.5,
            id: "PROD-LINES",
            transformOrigin: origProdlines,
            ease: "none",
            scrollTrigger: {
              trigger: ".prodlines-section",
              start: "top-=300px center",
              end: "center center",
              scrub: 0.5,
            },
          }
        );
        gsap.fromTo(
          "#circleMask",
          {
            x: 300,
            y: 10,
            scale: 5,
            opacity: 1,
            transformOrigin: "center center",
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            id: "CIRCLE",
            opacity: 1,
            duration: 10,
            scrollTrigger: {
              trigger: ".control-lines",
              start: "top center",
              end: "+=300 top",
              scrub: 0.5,
            },
          }
        );
        const origJoin = "29% 49%";
        gsap.fromTo(
          ".join-lines__image",
          {
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: origJoin,
          },
          {
            x: 225,
            y: -41,
            scale: 0.2,
            transformOrigin: origJoin,
            scrollTrigger: {
              trigger: ".blog-section",
              start: "center center",
              end: "+=500px center",
              scrub: 0.5,
            },
          }
        );
        document.querySelector(".cta-section");
        let ctaRedLinesTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top top",
            scrub: 0.5,
          },
        });
        ctaRedLinesTl.fromTo(
          ".cta-red-lines",
          {
            x: "-50%",
            y: 0,
          },
          {
            x: "0%",
            y: 0,
          }
        );
      }
  }
  if (document.querySelector(".page_aboute")) {
    const timeline = document.querySelector(".timeline");
    const timelineContainer = timeline.querySelector(".timeline__cont");
    const getUseableWidth = () =>
      timelineContainer.scrollWidth - window.innerWidth;
    const track = document.querySelector(".timeline__track");
    const navLinks = gsap.utils.toArray(".timeline__nav-link");
    let mapLinks = [];
    mapLinks = navLinks.map((item) => item.getBoundingClientRect().x * -1);
    const lastItemWidth = () => navLinks[navLinks.length - 1].offsetWidth;
    const getDraggableWidth = () => track.offsetWidth * 0.5 - lastItemWidth();
    function updateRangeX() {
      const width = getDraggableWidth();
      const mapper = gsap.utils.mapRange(0, width, 0, 1);
      timelineX.progress(mapper(this.x) * -1);
    }
    const timelineX = gsap.timeline({
      paused: true,
    });
    timelineX.to(timelineContainer, {
      ease: "none",
      x: () => getUseableWidth() * -1,
    });
    Draggable.create(track, {
      type: "x",
      snap: mapLinks,
      cursor: "move",
      edgeResistance: 1,
      resistance: 1e4,
      overshootTolerance: 0,
      inertia: true,
      bounds: {
        minX: 0,
        maxX: getDraggableWidth() * -1,
      },
      edgeResistance: 0,
      onDrag: updateRangeX,
      onThrowUpdate: updateRangeX,
    });
    window.addEventListener("resize", updateRangeX);
  }
  window["FLS"] = true;
  isWebp();
  addTouchClass();
  menuInit();
  fullVHfix();
  spollers();
  tabs();
  formFieldsInit({
    viewPass: false,
    autoHeight: false,
  });
})(jQuery);