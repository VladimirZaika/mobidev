(function () {
  'use strict';

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  document.addEventListener('DOMContentLoaded', function () {
    var stickyHeader = /*#__PURE__*/function () {
      function stickyHeader(headerSelector) {
        _classCallCheck(this, stickyHeader);
        this.navbar = document.querySelector(headerSelector);
        this.lastScrollTop = 0;
        this.headerHeight = this.navbar.scrollHeight;
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('load', this.onScroll.bind(this));
      }
      return _createClass(stickyHeader, [{
        key: "onScroll",
        value: function onScroll() {
          var scroll = window.scrollY || document.documentElement.scrollTop;
          if (scroll < 0) scroll = 0;
          if (Math.abs(scroll - this.lastScrollTop) < 2) return;
          if (scroll > this.lastScrollTop) {
            this.navbar.classList.add("scrolled-down");
            this.navbar.classList.remove("scrolled-up");
          } else if (scroll === 0) {
            this.navbar.classList.remove("scrolled-down");
            this.navbar.classList.remove("scrolled-up");
          } else if (scroll < this.lastScrollTop && scroll > 100) {
            this.navbar.classList.remove("scrolled-down");
            this.navbar.classList.add("scrolled-up");
          }
          this.lastScrollTop = scroll;
        }
      }]);
    }();
    if (document.querySelector('header')) {
      new stickyHeader('.header');
      var header = document.querySelector('header');
      var hasChildrenItem = header.querySelectorAll('.menu-item-has-children');
      if (hasChildrenItem.length > 0) {
        hasChildrenItem.forEach(function (item) {
          var link = item.querySelector('a');
          var itemHref = link.getAttribute('href');
          if (itemHref === '#' || itemHref === '') {
            link.addEventListener('click', function (e) {
              e.preventDefault();
            });
          }
          item.addEventListener('pointerdown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            hasChildrenItem.forEach(function (i) {
              if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
          });
        });
        document.addEventListener('click', function (e) {
          hasChildrenItem.forEach(function (item) {
            if (!item.contains(e.target)) {
              item.classList.remove('active');
            }
          });
        });
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') {
            hasChildrenItem.forEach(function (item) {
              return item.classList.remove('active');
            });
          }
        });
      }
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.header .menu-item a');
    var bodyLockStatus = true;
    var bodyLockToggle = function bodyLockToggle() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay);
      } else {
        bodyLock(delay);
      }
    };
    var bodyUnlock = function bodyUnlock() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      var body = document.querySelector("body");
      var stickyHeader = document.querySelector("header._header-scroll");
      if (bodyLockStatus) {
        var lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout(function () {
          for (var index = 0; index < lock_padding.length; index++) {
            var el = lock_padding[index];
            el.style.paddingRight = '0px';
          }
          body.style.paddingRight = '0px';
          if (stickyHeader) {
            stickyHeader.style.right = '0px';
          }
          document.documentElement.classList.remove("lock");
        }, delay);
        bodyLockStatus = false;
        setTimeout(function () {
          bodyLockStatus = true;
        }, delay);
      }
    };
    var bodyLock = function bodyLock() {
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
      var body = document.querySelector("body");
      var stickyHeader = document.querySelector("header._header-scroll");
      if (bodyLockStatus) {
        var lock_padding = document.querySelectorAll("[data-lp]");
        for (var index = 0; index < lock_padding.length; index++) {
          var el = lock_padding[index];
          el.style.paddingRight = window.innerWidth - document.documentElement.scrollWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.documentElement.scrollWidth + 'px';
        if (stickyHeader) {
          stickyHeader.style.right = (window.innerWidth - document.documentElement.scrollWidth) / 2 + 'px';
        }
        document.documentElement.classList.add("lock");
        bodyLockStatus = false;
        setTimeout(function () {
          bodyLockStatus = true;
        }, delay);
      }
    };
    (function menuInit() {
      if (document.querySelector(".icon-menu")) {
        document.addEventListener("click", function (e) {
          if (bodyLockStatus && e.target.closest('.icon-menu')) {
            bodyLockToggle();
            document.documentElement.classList.toggle("menu-open");
          }
        });
        if (navLinks.length > 0) {
          navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
              if (document.documentElement.classList.contains('menu-open')) {
                bodyLockToggle();
                document.documentElement.classList.remove("menu-open");
              }
            });
          });
        }
      }
    })();
  });

  document.addEventListener('DOMContentLoaded', function () {
    var page = 2;
    var idenpatentCall = false;
    var loadMoreBtn = document.querySelector('.load-more-btn-wrapper .button');
    var postWrapper = document.querySelector('.post-cards-wrapper');
    var btnWrapper = document.querySelector('.load-more-btn-wrapper');
    var preloaderWrap = btnWrapper === null || btnWrapper === void 0 ? void 0 : btnWrapper.querySelector('.button-preloader-wrap');
    if (wpData.maxPosts <= wpData.postsPerPage) {
      btnWrapper === null || btnWrapper === void 0 || btnWrapper.classList.add('d-none');
      return;
    }
    if (loadMoreBtn && postWrapper && btnWrapper) {
      loadMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (idenpatentCall) return;
        idenpatentCall = true;
        document.body.classList.add('processing');
        preloaderWrap === null || preloaderWrap === void 0 || preloaderWrap.classList.add('processing');
        var data = new FormData();
        data.append('action', 'load_more_posts');
        data.append('paged', page);
        data.append('id', wpData.id);
        data.append('taxonomy', wpData.taxonomy);
        data.append('post_type', wpData.postType);
        fetch(wpData.ajaxUrl, {
          method: 'POST',
          body: data
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data.success && data.data.html) {
            postWrapper.innerHTML += data.data.html;
            if (!data.data.has_more) {
              btnWrapper.classList.add('d-none');
            } else {
              page++;
            }
          } else {
            btnWrapper.classList.add('d-none');
          }
        })["catch"](function (err) {
          console.error('AJAX error:', err);
        })["finally"](function () {
          document.body.classList.remove('processing');
          preloaderWrap === null || preloaderWrap === void 0 || preloaderWrap.classList.remove('processing');
          idenpatentCall = false;
        });
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var popupOverlay = document.querySelector('.popup-overlay');
    if (popupOverlay) {
      var _wpData$popupTimer, _wpData;
      var popup = popupOverlay.querySelector('.popup');
      var closeBtn = popupOverlay.querySelector('.popup-close');
      var isFirstAction = true;
      var timerDuration = ((_wpData$popupTimer = (_wpData = wpData) === null || _wpData === void 0 ? void 0 : _wpData.popupTimer) !== null && _wpData$popupTimer !== void 0 ? _wpData$popupTimer : 10) * 1000;
      var closePopup = function closePopup() {
        popupOverlay.classList.remove('show');
        popupOverlay.addEventListener('transitionend', function () {
          popupOverlay.classList.add('hidden');
          document.documentElement.classList.remove('lock', 'popup-open');
        }, {
          once: true
        });
      };
      var showPopup = function showPopup() {
        popupOverlay.classList.remove('hidden');
        setTimeout(function () {
          popupOverlay.classList.add('show');
          document.documentElement.classList.add('lock', 'popup-open');
        }, 10);
      };
      var userAction = function userAction() {
        if (isFirstAction) {
          isFirstAction = false;
          setTimeout(function () {
            showPopup();
            removeEventListeners();
          }, timerDuration);
        }
      };
      var removeEventListeners = function removeEventListeners() {
        document.removeEventListener('scroll', userAction);
        document.removeEventListener('click', userAction);
        document.removeEventListener('touchstart', userAction);
        document.removeEventListener('mousemove', userAction);
      };
      document.addEventListener('scroll', userAction, {
        once: false
      });
      document.addEventListener('click', userAction, {
        once: false
      });
      document.addEventListener('touchstart', userAction, {
        once: false
      });
      document.addEventListener('mousemove', userAction, {
        once: false
      });
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closePopup();
        });
      }
      popupOverlay.addEventListener('click', function (e) {
        if (!popup.contains(e.target)) {
          closePopup();
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closePopup();
        }
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var copyLinkBtn = document.querySelectorAll('.copy-link-btn');
    var floatMsg = document.querySelector('.float-msg-wrapper');
    if (copyLinkBtn.length > 0) {
      copyLinkBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var url = btn.getAttribute('data-url');
          navigator.clipboard.writeText(url).then(function () {
            if (floatMsg) {
              floatMsg.classList.add('active');
              setTimeout(function () {
                floatMsg.classList.remove('active');
              }, 2000);
            }
          })["catch"](function () {
            btn.textContent = '❌ Failed';
          });
        });
      });
    }
  });

})();
