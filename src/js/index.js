import * as THREE from 'three'
import Core from './webgl/Core'
import Template from './modules/template/index'

class WebGLBase extends Core {
    constructor() {
        super()
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.clock = new THREE.Clock()
    }
    init() {
        super.init()
        this.camera = super.createCamera()
        //this.controls = new THREE.OrbitControls(this.camera)
        super.updatePerspectiveCamera(this.camera, this.width, this.height)
    }
    _initMesh() {
        this.mesh = new Template()
        this.mainScene.add(this.mesh)
    }
    update() {
        super.update()
    }
    resize() {}
}

let webglBase = new WebGLBase()
webglBase.init()

const tick = () => {
    requestAnimationFrame(tick)
    webglBase.update()
}
tick()
