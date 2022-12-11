import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { gl } from '../core/WebGL'
import { fxaa } from './FXAA'
import { unrealBloom } from './UnrealBloom'

export class Effects {
  private composer!: EffectComposer

  constructor() {
    this.init()
  }

  private init() {
    gl.renderer.toneMapping = THREE.ReinhardToneMapping
    gl.renderer.toneMappingExposure = Math.pow(0.9, 4.0)

    this.composer = new EffectComposer(gl.renderer)
    this.composer.addPass(new RenderPass(gl.scene, gl.camera))

    this.composer.addPass(fxaa.pass)
    this.composer.addPass(unrealBloom.pass)
  }

  resize() {
    fxaa.update()
    unrealBloom.update()
    this.composer.setSize(gl.size.width, gl.size.height)
  }

  render() {
    this.composer.render()
  }
}

export const effects = new Effects()
