import randomColor from "randomcolor";
import { BufferGeometry, DoubleSide, Mesh, MeshBasicMaterial, Vector3 } from "three";

class CustomGeometry extends Mesh {
    constructor() {
        const points = [new Vector3(3, 0, 0), new Vector3(0, 5, 0), new Vector3(0, 0, 2), new Vector3(1, 2, -2)];
        const geometry = new BufferGeometry();
        const material = new MeshBasicMaterial({
            color: randomColor(),
            side: DoubleSide,
          });

        geometry.setFromPoints(points);
        geometry.setIndex([0, 1, 2]);

        super(geometry, material);
    }
    animate() {
        this.rotation.x += 0.01;
        this.rotation.y += 0.01;
    }
    dispose() {
        if (!Array.isArray(this.material)) this.material?.dispose();
        this.geometry.dispose();
    }
}

export default CustomGeometry;
