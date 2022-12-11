import * as THREE from 'three'
import { caustics } from './Caustics'
import { gl } from './core/WebGL'
import { ground } from './Ground'
import { controls } from './utils/OrbitControls'

export class TCanvas {
  private animeID?: number

  constructor(private parentNode: ParentNode) {
    this.init()
    this.createLights()
    this.createObjects()
    this.setAnimationFrame()
  }

  private init() {
    gl.setup(this.parentNode.querySelector('.three-container')!)
    gl.scene.background = new THREE.Color('#012')
    gl.scene.fog = new THREE.Fog('#012', 10, 15)
    gl.camera.position.set(0, 4, 7)
  }

  private createLights() {
    const ambient = new THREE.AmbientLight('#025', 0.1)
    gl.scene.add(ambient)

    const spotLight = new THREE.SpotLight('#07a')
    spotLight.position.set(0.5, 5, 0.5)
    spotLight.castShadow = true
    spotLight.penumbra = Math.PI / 4
    spotLight.angle = Math.PI / 4
    spotLight.shadow.mapSize = new THREE.Vector2(2048, 2048)
    spotLight.name = 'spotlight'
    gl.scene.add(spotLight)

    const spotLight2 = spotLight.clone()
    spotLight2.castShadow = false
    spotLight2.intensity = 0.03
    spotLight2.position.y = -5
    spotLight2.name = 'spotlight2'
    gl.scene.add(spotLight2)
  }

  private createObjects() {
    {
      const geometry = new THREE.PlaneGeometry(30, 30, 256, 256)
      const material = new THREE.MeshStandardMaterial({ displacementBias: -0.1 })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = -Math.PI / 2
      mesh.receiveShadow = true
      mesh.name = 'ground'
      gl.scene.add(mesh)
    }

    {
      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshStandardMaterial()
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(-0.5, 1, -0.5)
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.name = 'box'
      gl.scene.add(mesh)
    }

    {
      const geometry = new THREE.SphereGeometry(0.7, 64, 32)
      const material = new THREE.MeshStandardMaterial()
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(-3, 0.1, 0.5)
      mesh.castShadow = true
      mesh.receiveShadow = true
      gl.scene.add(mesh)
    }

    {
      const geometry = new THREE.TorusKnotGeometry(0.7, 0.3, 300, 50, 6, 3)
      const material = new THREE.MeshStandardMaterial()
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(1, -0.2, 1)
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.rotation.x = -Math.PI / 2
      gl.scene.add(mesh)
    }
  }

  // ----------------------------------
  // animation frame
  private setAnimationFrame() {
    const anime = () => {
      const dt = gl.time.getDelta()

      caustics.render(dt)
      const light = gl.scene.getObjectByName('spotlight') as any
      light.map = caustics.texture
      const light2 = gl.scene.getObjectByName('spotlight2') as any
      light2.map = caustics.texture

      ground.render(true)
      const groundMesh = gl.getMesh<THREE.MeshStandardMaterial>('ground')
      groundMesh.material.displacementMap = ground.texture

      const box = gl.getMesh('box')
      box.rotation.y += dt * 0.3
      box.rotation.x += dt * 0.4

      controls.update()
      gl.render()

      requestAnimationFrame(anime)
    }
    this.animeID = requestAnimationFrame(anime)
  }

  // ----------------------------------
  // dispose
  dispose() {
    this.animeID && cancelAnimationFrame(this.animeID)
  }
}
