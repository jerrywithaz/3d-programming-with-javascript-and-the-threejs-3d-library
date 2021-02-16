import {
  BoxGeometry,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  SphereGeometry,
} from "three";
import randomColor from "randomcolor";

class DepthMaterialsModel {
  private plane: Mesh;
  private cubes: Mesh[];
  private spheres: Mesh[];
  private light: DirectionalLight;

  constructor() {
    this.plane = this.createPlane();
    this.cubes = [this.createCube(-6, -5, 10), this.createCube(6, -5, -10), this.createCube(0, -5, 0)];
    this.light = this.createLight();
    this.spheres = [this.createSphere(6, -5, 10), this.createSphere(6, -5, 0)];
  }
  addToScene(scene: Scene) {
    scene.add(this.plane);
    scene.add(this.light);
    this.cubes.forEach((cube) => {
      scene.add(cube);
    });
    this.spheres.forEach((sphere) => {
      scene.add(sphere);
    });
  }
  animate() {
    this.cubes[0].position.x += 0.001;
    this.cubes[1].position.x -= 0.001;
    this.spheres[0].position.x -= 0.001;

    this.cubes[0].rotation.y += 0.01;
    this.cubes[1].rotation.y -= 0.01;
    this.spheres[0].position.y -= 0.001;

    this.cubes[0].rotation.z -= 0.01;
    this.cubes[1].rotation.z -= 0.01;
    this.spheres[0].rotation.z -= 0.01;
    this.spheres[0].rotation.x -= 0.01;
    this.spheres[0].rotation.y -= 0.01;
  }
  cleanup(scene: Scene) {
    this.removeFromScene(scene);
    this.dispose();
  }
  createPlane(): Mesh {
    const geometry = new PlaneGeometry(1000, 1000, 50, 50);
    const material = new MeshBasicMaterial({
      color: "#0089cc",
      wireframe: true,
    });
    const plane = new Mesh(geometry, material);

    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    return plane;
  }
  createSphere(x: number, y: number, z: number): Mesh {
    const geometry = new SphereGeometry(2.5, 30, 30);
    // const material = new MeshLambertMaterial({
    //   color: randomColor(),
    //   side: DoubleSide,
    // });
    // const material = new MeshPhongMaterial({
    //   side: DoubleSide,
    //   color: randomColor(),
    //   shininess: 100,
    //   specular: '#ffffff',
    // });
    const material = new MeshStandardMaterial({
      side: DoubleSide,
      color: randomColor(),
      metalness: 1,
      roughness: 1,
      emissive: '#cccccc',
    });
    const sphere = new Mesh(geometry, material);

    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;

    return sphere;
  }
  createCube(x: number, y: number, z: number): Mesh {
    const geometry = new BoxGeometry(5, 5, 5);
    // const material = new MeshLambertMaterial({
    //   color: randomColor(),
    //   side: DoubleSide,
    // });
    // const material = new MeshPhongMaterial({
    //   side: DoubleSide,
    //   color: randomColor(),
    //   shininess: 100,
    //   specular: '#ffffff',
    // });
    const material = new MeshStandardMaterial({
      side: DoubleSide,
      color: randomColor(),
      metalness: 1,
      roughness: 0,
      emissive: '#cccccc'
    });
    const cube = new Mesh(geometry, material);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
  }
  createLight(): DirectionalLight {
    const light = new DirectionalLight("#0089cc");
    return light;
  }
  dispose() {
    this.disposeMesh(this.plane);
    this.cubes.forEach((cube) => {
      this.disposeMesh(cube);
    });
    this.spheres.forEach((sphere) => {
      this.disposeMesh(sphere);
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

export default DepthMaterialsModel;
