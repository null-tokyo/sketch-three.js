import * as THREE from 'three'

import vertShader from './template.vert'
import fragShader from './template.frag'

class Glitch1 extends THREE.Mesh {
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
            beforeMouse: {
                type: 'v2',
                value: new THREE.Vector2(
                    (window.innerWidth * window.devicePixelRatio) / 2,
                    (window.innerHeight * window.devicePixelRatio) / 2
                ),
            },
            mouse: {
                type: 'v2',
                value: new THREE.Vector2(
                    (window.innerWidth * window.devicePixelRatio) / 2,
                    (window.innerHeight * window.devicePixelRatio) / 2
                ),
            },
            vector: {
                type: 'v2',
                value: new THREE.Vector2(
                    (window.innerWidth * window.devicePixelRatio) / 2,
                    (window.innerHeight * window.devicePixelRatio) / 2
                ),
            },
            force: {
                type: 'v2',
                value: new THREE.Vector2(0, 0),
            },
        }
        this.material.uniforms = this.uniforms
    }
    update(t) {
        this.uniforms.time.value = t
        this.updateVector()
        this.updateForce()
        this.uniforms.beforeMouse.value = this.uniforms.mouse.value
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
    updateVector() {
        let x = this.uniforms.vector.value.x
        let y = this.uniforms.vector.value.y
        this.uniforms.vector.value = new THREE.Vector2(
            x + (this.uniforms.mouse.value.x - x) * 0.02,
            y + (this.uniforms.mouse.value.y - y) * 0.02
        )
    }
    updateForce() {
        let power = {
            x: this.uniforms.mouse.value.x - this.uniforms.beforeMouse.value.x,
            y: this.uniforms.mouse.value.y - this.uniforms.beforeMouse.value.y,
        }
        let f = {
            x: this.uniforms.force.value.x + power.x,
            y: this.uniforms.force.value.x + power.y,
        }
        this.uniforms.force.value = new THREE.Vector2(
            f.x + (0 - f.x) * 0.05,
            f.y + (0 - f.y) * 0.05
        )
    }
}

export default Glitch1
