import * as THREE from "three";

const PERCENTAGE_OF_SCREEN_WIDTH = 0.75;
const GRID_DEFAULT_DIMENSIONS = { width: 75, height: 75 }
const GRID_DEFAULT_VISIBILITY = false;
const GRID_DEFAULT_STEPS = 50
function getAspectRatio() {
    return (window.innerWidth * PERCENTAGE_OF_SCREEN_WIDTH) / window.innerHeight
}
interface RenderProps {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    grid: THREE.Group | null;
}

export interface RenderInitProps {
    element: HTMLDivElement;
    gridVisible?: Boolean
    gridDimensions?: Dimensions
    gridSteps?: number;
}

type Dimensions = { width: number, height: number }

export class Renderer implements RenderProps {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    grid: THREE.Group;
    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(45, getAspectRatio(), 1, 500);
        this.grid = this.createGridedBox(GRID_DEFAULT_DIMENSIONS.width, GRID_DEFAULT_DIMENSIONS.height, GRID_DEFAULT_STEPS)

    }

    init({ element, gridVisible = false }: RenderInitProps) {
        this.renderer.setSize(element.clientWidth, window.innerHeight);
        element.appendChild(this.renderer.domElement);

        this.camera.position.set(0, 0, 100);
        this.camera.lookAt(0, 0, 0);
        this.setGridVisibility(gridVisible)
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate()
    }

    handleResize = (size: { width?: number, height?: number }) => {
        this.camera.aspect = getAspectRatio()
        this.camera.updateProjectionMatrix()
    }

    setGridVisibility(gridVisible: Boolean) {
        this.grid.visible = !!gridVisible;
    }

    updateGrid(gridDimensions: Dimensions, gridSteps: number) {
        this.grid && this.grid.visible && this.scene.remove(this.grid)
        this.createGridedBox(gridDimensions.width, gridDimensions.height, gridSteps)
    }


    createGridedBox(width: number, height: number, steps: number = 1) {
        const topLeftX = width / 2 * -1;
        const topLeftY = height / 2 * -1;
        const stepSizeWidth = width / steps;
        const stepSizeHeight = height / steps;
        const material = new THREE.LineBasicMaterial({ color: 0x348955 });
        const axisMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const group = new THREE.Group();

        for (let step = 0; step <= steps; step++) {
            //const color = step === 0 ? 0xFFFFFF : (0x343955 + 0x030604 * step)

            const horizontal = topLeftX + step * stepSizeWidth;
            const vertical = topLeftY + step * stepSizeHeight;
            const geometry1 = this.createGridLine(horizontal, topLeftY, horizontal, topLeftY + height)
            const geometry2 = this.createGridLine(topLeftX, vertical, topLeftX + width, vertical)
            group.add(new THREE.Line(geometry1, (step === 0 ? axisMaterial : material)));
            group.add(new THREE.Line(geometry2, (step === 0 ? axisMaterial : material)));
        }

        this.scene.add(group)
        this.grid = group;
        return group;
    }

    createGridLine(x1: number, y1: number, x2: number, y2: number) {
        const points = [];
        points.push(new THREE.Vector3(x1, y1, 0));
        points.push(new THREE.Vector3(x2, y2, 0));

        return new THREE.BufferGeometry().setFromPoints(points)
    }

    createGrid() {

    }
}