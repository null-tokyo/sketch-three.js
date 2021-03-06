import * as THREE from 'three'

import vertShader from './template.vert'
import fragShader from './template.frag'

class DotFunction extends THREE.Mesh {
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
        this.init()
    }
    init() {
        this.uniforms = {
            time: {
                type: 't',
                value: 0,
            },
            resolution: {
                type: 'v2',
                value: new THREE.Vector2(
                    window.innerWidth * window.devicePixelRatio,
                    window.innerHeight * window.devicePixelRatio
                ),
            },
            mouse: {
                type: 'v2',
                value: new THREE.Vector2(
                    (window.innerWidth * window.devicePixelRatio) / 2,
                    (window.innerHeight * window.devicePixelRatio) / 2
                ),
            },
            force: {
                type: 'v2',
                value: new THREE.Vector2(
                    (window.innerWidth * window.devicePixelRatio) / 2,
                    (window.innerHeight * window.devicePixelRatio) / 2
                ),
            },
        }
        this.material.uniforms = this.uniforms
    }
    update(t) {
        this.uniforms.time.value = t
        this.updateForce()
    }
    resize() {
        this.geometry.width = window.innerWidth
        this.geometry.height = window.innerHeight
        this.uniforms.resolution.value = new THREE.Vector2(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio
        )
    }
    mousemove(e) {
        this.uniforms.mouse.value = new THREE.Vector2(
            e.pageX * window.devicePixelRatio,
            e.pageY * window.devicePixelRatio
        )
    }
    updateForce() {
        let x = this.uniforms.force.value.x
        let y = this.uniforms.force.value.y
        this.uniforms.force.value = new THREE.Vector2(
            x + (this.uniforms.mouse.value.x - x) * 0.06,
            y + (this.uniforms.mouse.value.y - y) * 0.06
        )
    }
}

export default DotFunction
