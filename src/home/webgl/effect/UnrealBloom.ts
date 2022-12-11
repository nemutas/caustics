import * as THREE from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { gl } from '../core/WebGL'
import { gui } from '../utils/gui'

class UnrealBloom {
  public pass: UnrealBloomPass

  constructor() {
    this.pass = new UnrealBloomPass(new THREE.Vector2(gl.size.width, gl.size.height), 1.5, 0.4, 0.85)
    this.setGui()
  }

  private setGui() {
    const folder = gui.addFolder('unreal bloom')
    folder.add(this.pass, 'enabled')
    folder.add(this.pass, 'threshold', 0, 2, 0.01)
    folder.add(this.pass, 'strength', 0.5, 2, 0.01)
    folder.add(this.pass, 'radius', 0, 1, 0.01)
  }

  update() {
    this.pass.resolution.set(gl.size.width, gl.size.height)
  }
}

export const unrealBloom = new UnrealBloom()
