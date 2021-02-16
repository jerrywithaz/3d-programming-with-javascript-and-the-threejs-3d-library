import { BoxGeometry, Mesh, MeshBasicMaterial, PlaneGeometry, Scene } from "three";
import randomColor from "randomcolor";

class NormalMaterialsModel {
  private plane: Mesh;
  private cubes: Mesh[];

  constructor() {
    this.plane = this.createPlane();
    this.cubes = [this.createCube(-6, -5, 3), this.createCube(6, -5, -3)];
  }
  addToScene(scene: Scene) {
    scene.add(this.plane);
    this.cubes.forEach((cube) => {
      scene.add(cube);
    });
  }
  animate() {
    this.cubes[0].position.x += 0.01;
    this.cubes[1].position.x -= 0.01;
  }
  cleanup(scene: Scene) {
      this.removeFromScene(scene);
      this.dispose();
  }
  createPlane(): Mesh {
    const geometry = new PlaneGeometry(1000, 1000, 50, 50);
    const material = new MeshBasicMaterial({
      color: "#ffffff",
      wireframe: true,
    });
    const plane = new Mesh(geometry, material);

    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    return plane;
  }
  createCube(x: number, y: number, z: number ): Mesh {
    const geometry = new BoxGeometry(5, 5, 5);
    const material = new MeshBasicMaterial({
      color: randomColor(),
    });
    const cube = new Mesh(geometry, material);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
  }
  dispose() {
    this.disposeMesh(this.plane);
    this.cubes.forEach((cube) => {
      this.disposeMesh(cube);
    });
  }
  disposeMesh(mesh: Mesh) {
    if (!Array.isArray(mesh.material)) mesh.material.dispose();
    else mesh.material.forEach((material) => material.dispose());
    mesh.geometry.dispose();
  }
  removeFromScene(scene: Scene) {
    scene.remove(this.plane);
    this.cubes.forEach((cube) => {
      scene.remove(cube);
    });
  }
}

export default NormalMaterialsModel;
