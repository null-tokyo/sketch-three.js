import $ from 'jquery'
import GMap from './GMap/index'

const OPTION = {
    fullscreenControl: false,
    center: {
        lat: 35.675722,
        lng: 139.76954,
    },
    zoom: 16,
}

const STYLE = [
    {
        elementType: 'labels.icon',
        stylers: [
            {
                hue: '#38718f',
            },
        ],
    },
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#B6E1FC',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#38718f',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#f5f5f5',
            },
        ],
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#38718f',
            },
        ],
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#B6E1FC',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#38718f',
            },
        ],
    },
    {
        featureType: 'poi.attraction',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#38718f',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#98C4E0',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            {
                color: '#cfeeff',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#38718f',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            {
                color: '#89B6D2',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#38718f',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text',
        stylers: [
            {
                color: '#38718f',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#9e9e9e',
            },
        ],
    },
    {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
            {
                color: '#89B6D2',
            },
        ],
    },
    {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
            {
                color: '#97C3E0',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#346d8b',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#38718f',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
]

class Map {
    constructor(target, option) {
        this.$target = $(target)
        this.option = Object.assign({}, OPTION, option)
    }
    init() {
        if (this.$target.length <= 0) return
        if (typeof google === 'undefined') {
            this.fetchMapAPI().then(() => {
                this.renderMap()
            })
        } else {
            this.renderMap()
        }
    }
    fetchMapAPI() {
        let promise = new Promise((resolve, reject) => {
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
                'https://maps.google.com/maps/api/js?key=AIzaSyDuhlZ5lUcVxGidUaDU3FUrhGi6fJCH5wo'
            document.getElementsByTagName('head')[0].appendChild(script)
            script.onload = () => {
                resolve()
            }
        })
        return promise
    }
    renderMap() {
        this.gmap = new GMap('js-map', this.option)
        this.gmap.setStyle('icom', STYLE)
        this.gmap.changeStyle('icom')
        this.gmap.setStyle('icom', STYLE)
        this.gmap.addMarker('a')
        this.gmap.renderMarker()
    }
}

export default Map
