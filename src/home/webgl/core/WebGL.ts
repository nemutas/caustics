import * as THREE from 'three'

class WebGL {
  public renderer: THREE.WebGLRenderer
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  public readonly time = new THREE.Clock()

  private resizeCallback?: (width: number, height: number, aspect: number) => void

  constructor() {
    const { width, height, aspect } = this.size

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(width, height)
    this.renderer.shadowMap.enabled = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 100)

    window.addEventListener('resize', this.handleResize)
  }

  private handleResize = () => {
    const { width, height, aspect } = this.size

    this.resizeCallback && this.resizeCallback(width, height, aspect)

    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  setup(container: HTMLElement) {
    container.appendChild(this.renderer.domElement)
  }

  setResizeCallback(callback: (width: number, height: number, aspect: number) => void) {
    this.resizeCallback = callback
  }

  get size() {
    const width = window.innerWidth
    const height = window.innerHeight
    return { width, height, aspect: width / height }
  }

  getMesh<T extends THREE.Material>(name: string) {
    return this.scene.getObjectByName(name) as THREE.Mesh<THREE.BufferGeometry, T>
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}

export const gl = new WebGL()
