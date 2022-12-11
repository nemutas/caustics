import * as THREE from 'three'
import { gl } from './core/WebGL'
import { shaders } from './shader/shaderChunk'

class Ground {
  private renderTarget = new THREE.WebGLRenderTarget(1024, 1024)
  private scene = new THREE.Scene()
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
  private material!: THREE.ShaderMaterial

  private isRender = true

  constructor() {
    this.camera.position.z = 1
    this.createObject()
  }

  private createObject() {
    const geometry = new THREE.PlaneGeometry(2, 2, 512, 512)
    this.material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: shaders.ground.vertex,
      fragmentShader: shaders.ground.fragment,
    })
    const mesh = new THREE.Mesh(geometry, this.material)
    this.scene.add(mesh)
  }

  get texture() {
    return this.renderTarget.texture
  }

  render(once: boolean) {
    if (this.isRender) {
      gl.renderer.setRenderTarget(this.renderTarget)
      gl.renderer.render(this.scene, this.camera)
      gl.renderer.setRenderTarget(null)

      once && (this.isRender = false)
    }
  }
}

export const ground = new Ground()
