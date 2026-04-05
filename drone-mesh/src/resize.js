export function bindResize(camera, renderer) {
  function setSizes() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  setSizes();
  window.addEventListener("resize", setSizes);
}
