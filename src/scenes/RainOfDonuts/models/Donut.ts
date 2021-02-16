import { Mesh, TorusGeometry, MeshBasicMaterial } from "three";
import randomNumber from "lodash/random";
import randomColor from 'randomcolor';

class Donut extends Mesh {
  private speed = randomNumber(0.01, 0.05);
  constructor() {
    super(
      new TorusGeometry(2, 1, 100, 100, Math.PI * 2),
      new MeshBasicMaterial({
        color: randomColor(),
      })
    );
  }
  animate() {
    this.position.y -= this.speed;
  }
  dispose() {
    if (!Array.isArray(this.material)) this.material?.dispose();
    this.geometry.dispose();
  }
  init() {
    this.position.x = randomNumber(-30, 30);
    this.position.y = randomNumber(0, 10);
    this.position.z = randomNumber(-10, 0);
  }
}

export default Donut;
