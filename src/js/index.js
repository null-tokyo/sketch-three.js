import * as THREE from 'three'
import Core from './webgl/Core'
import Glitch3 from './modules/Glitch3/index'

class WebGLBase extends Core {
    constructor() {
        super()
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.clock = new THREE.Clock()
    }
    init() {
        this.resize = () => this._resize()
        this.mousemove = e => this._mousemove(e)

        super.init()
        this.camera = super.createCamera()
        //this.controls = new THREE.OrbitControls(this.camera)
        super.updatePerspectiveCamera(this.camera, this.width, this.height)
        this._initMesh()

        window.addEventListener('resize', this.resize, { passive: true })
        window.addEventListener('mousemove', this.mousemove, { passive: true })
    }
    _initMesh() {
        this.mesh = new Glitch3()
        this.mainScene.add(this.mesh)
    }
    update() {
        super.update()
        this.mesh.update(this.clock.getElapsedTime())
    }
    _resize() {
        super.resize(window.innerWidth, window.innerHeight)
        this.mesh.resize()
    }
    _mousemove(e) {
        this.mesh.mousemove(e)
    }
}

let webglBase = new WebGLBase()
webglBase.init()

const tick = () => {
    requestAnimationFrame(tick)
    webglBase.update()
}
tick()
