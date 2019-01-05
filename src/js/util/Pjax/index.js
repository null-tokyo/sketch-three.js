import $ from 'jquery'
import Barba from 'barba.js'

class Pjax {
    constructor() {
        this.onWindowLoad
        this.onLinkClicked
        this.onInitStateChange
        this.onNewPageReady
        this.onTransitionCompleted
    }
    init() {
        this._initSetting()
        this._initPreventCheck()
        this._initPageTransiton()
        this._initEvents()
        Barba.Pjax.start()
    }
    _initSetting() {
        Barba.Pjax.Dom.wrapperId = 'wrapper'
        Barba.Pjax.Dom.containerClass = 'container'
        Barba.Prefetch.ignoreClassLink = 'js-no-prefetch'
        Barba.Pjax.ignoreClassLink = 'js-no-pjax'
        this._sendGA()
    }
    _initPreventCheck() {
        Barba.Pjax.originalPreventCheck = this._preventCheck
    }
    _preventCheck(element, evt) {
        if (!window.history.pushState) return false

        var href = Barba.Pjax.getHref(element)

        //User
        if (!element || !href) return false

        //Middle click, cmd click, and ctrl click
        if (
            evt.which > 1 ||
            evt.metaKey ||
            evt.ctrlKey ||
            evt.shiftKey ||
            evt.altKey
        )
            return false

        //Ignore target with _blank target
        if (element.target && element.target === '_blank') return false

        //Check if it's the same domain
        if (
            window.location.protocol !== element.protocol ||
            window.location.hostname !== element.hostname
        )
            return false

        //Check if the port is the same
        if (Barba.Utils.getPort() !== Barba.Utils.getPort(element.port))
            return false

        //Ignore case when a hash is being tacked on the current URL
        if (href.indexOf('#') > -1) return false

        //Ignore case where there is download attribute
        if (
            element.getAttribute &&
            typeof element.getAttribute('download') === 'string'
        )
            return false

        //In case you're trying to load the same page
        if (Barba.Utils.cleanLink(href) == Barba.Utils.cleanLink(location.href))
            return false

        if (element.classList.contains(Barba.Pjax.ignoreClassLink)) return false

        //_blank
        var site_url = location.host
        let reg = new RegExp(site_url)
        if (!reg.test(href)) {
            element.setAttribute('target', '_blank')
            return false
        }

        return true
    }
    _initPageTransiton() {
        this.pageTransition = () => this._pageTansition()
        this.transitionStart = e =>
            this._transitionStart.bind(Barba.BaseTransition)()
        this.transitionFadeOut = e =>
            this._transitionFadeOut.bind(Barba.BaseTransition)()
        this.transitionFadeIn = e =>
            this._transitionFadeIn.bind(Barba.BaseTransition)()

        Barba.Pjax.getTransition = this._pageTansition()
    }
    _pageTansition() {
        return Barba.BaseTransition.extend({
            start: this.transitionStart,
            fadeOut: this.transitionFadeOut,
            fadeIn: this.transitionFadeIn,
        })
    }
    _transitionStart() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(
            this.fadeIn.bind(this)
        )
    }
    _transitionFadeOut() {
        return $(this.oldContainer)
            .animate({ opacity: 0 })
            .promise()
    }
    _transitionFadeIn() {
        let $el = $(this.newContainer)
        $(this.oldContainer).hide()
        $el.css({
            visibility: 'visible',
            opacity: 0,
        })
        $el.animate({ opacity: 1 }, 400, () => {
            this.done()
        })
    }
    _sendGA() {
        Barba.Dispatcher.on('initStateChange', function() {
            if (
                typeof window.ga === 'function' &&
                Barba.HistoryManager.history.length >= 1
            ) {
                window.ga('send', 'pageview', location.pathname)
            }
            if (
                typeof window.gtag === 'function' &&
                Barba.HistoryManager.history.length >= 1
            ) {
                window.gtag('config', 'トラッキングID', {
                    page_path: location.pathname,
                })
            }
        })
    }
    _initEvents() {
        if (this.onWindowLoad) {
        }
        if (this.onLinkClicked) {
        }
        if (this.onInitStateChange) {
        }
        if (this.onNewPageReady) {
        }
        if (this.onTransitionCompleted) {
        }
    }
}

export default Pjax
