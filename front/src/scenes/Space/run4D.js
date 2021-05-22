import * as THREE from 'three'
import CameraControls from 'camera-controls'

// import theme from '../../theme'

CameraControls.install({ THREE })

function run4D(element) {
  let running = true
  let meshes = []

  const width = window.innerWidth
  const height = window.innerHeight

  const clock = new THREE.Clock()
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 10000)

  camera.position.set(0, 0, 128)

  const renderer = new THREE.WebGLRenderer()

  renderer.setSize(width, height)
  element.innerHTML = ''
  element.appendChild(renderer.domElement)

  const cameraControls = new CameraControls(camera, renderer.domElement)

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
  )

  mesh.position.y = 0.5
  scene.add(mesh)

  const gridHelper = new THREE.GridHelper(1000, 18, '#444', '#444')
  // gridHelper.position.y = -1
  scene.add(gridHelper)

  function animate() {
    const delta = clock.getDelta()

    cameraControls.update(delta)
    renderer.render(scene, camera)

    if (running) requestAnimationFrame(animate)
  }

  function start() {
    running = true

    animate()
  }

  function stop() {
    running = false
  }

  function updateState(nextBodies) {
    meshes.forEach(mesh => {
      mesh.geometry.dispose()
      mesh.material.dispose()
      scene.remove(mesh)
    })

    meshes = []

    nextBodies.forEach(body => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(body.radius, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
      )

      sphere.position.z = body.a
      sphere.position.x = body.b
      sphere.position.y = body.c

      scene.add(sphere)
      meshes.push(sphere)
    })
  }

  return {
    start,
    stop,
    updateState,
  }
}

function nmToHex(wavelength) {
  const gamma = 0.80
  const intensityMax = 255
  let factor
  let red
  let green
  let blue

  if (wavelength >= 380 && wavelength < 440) {
    red = -(wavelength - 440) / (440 - 380)
    green = 0.0
    blue = 1.0
  }
  else if (wavelength >= 440 && wavelength < 490) {
    red = 0.0
    green = (wavelength - 440) / (490 - 440)
    blue = 1.0
  }
  else if (wavelength >= 490 && wavelength < 510) {
    red = 0.0
    green = 1.0
    blue = -(wavelength - 510) / (510 - 490)
  }
  else if (wavelength >= 510 && wavelength < 580) {
    red = (wavelength - 510) / (580 - 510)
    green = 1.0
    blue = 0.0
  }
  else if (wavelength >= 580 && wavelength < 645) {
    red = 1.0
    green = -(wavelength - 645) / (645 - 580)
    blue = 0.0
  }
  else if (wavelength >= 645 && wavelength < 781) {
    red = 1.0
    green = 0.0
    blue = 0.0
  }
  else {
    red = 0.0
    green = 0.0
    blue = 0.0
  }
    // Let the intensity fall off near the vision limits
  if (wavelength >= 380 && wavelength < 420) {
    factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380)
  }
  else if (wavelength >= 420 && wavelength < 701) {
    factor = 1.0
  }
  else if (wavelength >= 701 && wavelength < 781) {
    factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700)
  }
  else {
    factor = 0.0
  }
  if (red !== 0) {
    red = Math.round(intensityMax * (red * factor) ** gamma)
  }
  if (green !== 0) {
    green = Math.round(intensityMax * (green * factor) ** gamma)
  }
  if (blue !== 0) {
    blue = Math.round(intensityMax * (blue * factor) ** gamma)
  }

  return rgbToHex(red, green, blue)
}

function componentToHex(c) {
  const hex = c.toString(16)

  return hex.length === 1 ? `0${hex}` : hex
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export default run4D
