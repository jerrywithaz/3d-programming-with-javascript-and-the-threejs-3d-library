import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

class Cube extends Mesh {
    constructor() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: "#0089cc" });
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

export default Cube;
