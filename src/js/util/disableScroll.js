/**
 * スクロールを固定したい時に使用するライブラリ
 */
class DisableScroll {
    constructor(target) {
        this.$target = document.querySelector(target) || document.body
        this.isActive = false
    }

    /**
     * スクロールの禁止
     */
    on() {
        this.isActive = true
        this.scrollPosition = window.pageYOffset
        this.$target.style.width = '100%'
        this.$target.style.top = -this.scrollPosition + 'px'
        this.$target.style.position = 'fixed'
        this.$target.style.overflow = 'hidden'
    }
    /**
     * スクロールの許可
     */
    off() {
        this.isActive = false
        this.$target.style.width = ''
        this.$target.style.top = ''
        this.$target.style.position = ''
        this.$target.style.overflow = ''
        window.scroll(0, this.scrollPosition)
    }

    toggle() {
        if (this.isActive) {
            this.off()
            return
        }
        this.on()
    }
}

const disableScroll = new DisableScroll()

export default disableScroll
