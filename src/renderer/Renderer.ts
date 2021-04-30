import * as THREE from "three";

interface RenderProps {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  raycaster: THREE.Raycaster
  mouse: THREE.Vector2

}

export interface RenderInitProps {
  element: HTMLDivElement;
}

export class Renderer implements RenderProps {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  raycaster: THREE.Raycaster
  mouse: THREE.Vector2
  element?: HTMLDivElement

  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(45, this.getAspectRatio(), 1, 500);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-1, -1);
  }

  init({ element }: RenderInitProps) {
    if (this.element) {
      console.warn("Already initiated, if you mean to recreate, clear first")
      return
    }
    this.element = element;
    element.appendChild(this.renderer.domElement);
    element.addEventListener('mousemove', this.onMouseMove, false);

    this.renderer.setSize(element.clientWidth, window.innerHeight);

    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      // Maybe do intersection of the line between the mouse moves
      // This way we don't skip space between renders
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(this.scene.children);

      if (intersects && intersects.length > 0) {
        //@ts-ignore
        intersects[0].object.material = new THREE.MeshBasicMaterial({ color: 0x11ee99 });
      }
      this.renderer.render(this.scene, this.camera);
    };
    animate()
  }

  getAspectRatio() {
    const width = this.element?.clientWidth || window.innerWidth;;
    return width / window.innerHeight
  }

  handleResize = (size: { width?: number, height?: number }) => {
    this.camera.aspect = this.getAspectRatio()
    this.camera.updateProjectionMatrix()
  }

  onMouseMove = (event: MouseEvent) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const width = this.element?.clientWidth || window.innerWidth;
    this.mouse.x = (event.clientX / width) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }

  remove(object: THREE.Object3D) {
    this.scene.remove(object)
  }

  removeAll(object: THREE.Object3D[]) {
    this.scene.remove(...object)
  }

  add(object: THREE.Object3D) {
    this.scene.add(object)
  }

  addAll(object: THREE.Object3D[]) {
    this.scene.add(...object)
  }
}