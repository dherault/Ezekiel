import * as THREE from 'three'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE })

function run4D(element, bodies) {
  const width = window.innerWidth
  const height = window.innerHeight
  const clock = new THREE.Clock()
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 100)
  camera.position.set(0, 0, 5)
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  element.appendChild(renderer.domElement)

  const cameraControls = new CameraControls(camera, renderer.domElement)

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  )
  scene.add(mesh)

  const gridHelper = new THREE.GridHelper(50, 50)
  gridHelper.position.y = -1
  scene.add(gridHelper)

  renderer.render(scene, camera)

  function animate() {

    const delta = clock.getDelta()
    // const elapsed = clock.getElapsedTime()
    const updated = cameraControls.update(delta)

    // if ( elapsed > 30 ) { return; }

    requestAnimationFrame(animate)

    if (updated) {

      renderer.render(scene, camera)
    }
  }

  animate()
}

export default run4D
