import * as THREE from 'three'

import vertShader from './template.vert'
import fragShader from './template.frag'

class Template extends THREE.Mesh {
    constructor() {
        super(
            new THREE.PlaneBufferGeometry(
                window.innerWidth,
                window.innerHeight
            ),
            new THREE.ShaderMaterial({
                vertexShader: vertShader,
                fragmentShader: fragShader,
            })
        )
    }
    init() {
        this.uniforms = {}
        this.material.uniforms = this.uniforms
    }
    resize() {
        this.geometry.width = window.innerWidth
        this.geometry.width = window.innerHeight
    }
}

export default Template
