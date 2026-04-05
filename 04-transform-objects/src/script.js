import * as THREE from 'three'

/** ---------- Scene ---------- */
const scene = new THREE.Scene()

/** ---------- Camera ---------- */
const sizes = { width: 800, height: 600 }

const fov = 75
const aspectRatio = sizes.width / sizes.height
const near = 0.1
const far = 100
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far)

camera.position.z = 3
scene.add(camera)

/** ---------- Box Mesh ---------- */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

mesh.position.set(0.7, -0.6, 1)

/** ---------- Renderer ---------- */
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
