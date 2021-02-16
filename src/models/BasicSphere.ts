import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";

class BasicSphere extends Mesh {
    constructor() {
        const geometry = new SphereGeometry(0.5, 30, 40, 0, Math.PI, 0, Math.PI);
        const material = new MeshBasicMaterial({ color: "#ffffff", wireframe: true });
        super(geometry, material);
    }
    animate() {
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
        this.rotation.z += 0.01;
    }
    dispose() {
        if (!Array.isArray(this.material)) this.material?.dispose();
        this.geometry?.dispose();
    }
}

export default BasicSphere;