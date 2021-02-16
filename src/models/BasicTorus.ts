import { Mesh, MeshBasicMaterial, TorusGeometry } from "three";

class BasicTorus extends Mesh {
    constructor() {
        const geometry = new TorusGeometry(5, 1, 100, 5, Math.PI * 2);
        const material = new MeshBasicMaterial({ color: '#ffffff', wireframe: true });
        super(geometry, material);
    }
    animate() {
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
        this.rotation.z += 0.01;
    }
    dispose() {
        if (!Array.isArray(this.material)) this.material?.dispose();
        this.geometry.dispose();
    }
}

export default BasicTorus;
