import $ from 'jquery'

class YouTubePlayer {
    constructor() {
        this.init()
        this.target = 'js-youtube'
        this.$youtube = $('#' + this.target)
        if (this.$youtube.length <= 0) return
        this.videoID = this.$youtube.data('videoId')
    }
    init() {
        this._loadYoutubeAPI()
    }
    _loadYoutubeAPI() {
        let tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        let firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }
    renderPlayer() {
        this.ytPlayer = new YT.Player(this.target, {
            width: 640,
            height: 390,
            videoId: this.videoID,
            playerVars: {
                rel: 0, // 再生終了後に関連動画を表示するかどうか設定
            },
        })
    }
    playVideo() {
        this.ytPlayer.playVideo()
    }
    pauseVideo() {
        this.ytPlayer.pauseVideo()
    }
}

export default YouTubePlayer
