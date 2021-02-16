import {
  Mesh,
  MeshBasicMaterial,
  Scene,
  SphereGeometry,
  TorusGeometry,
} from "three";
import randomColor from 'randomcolor';

const degreesToRadians =  (deg: number) => deg * Math.PI / 180;

// const radiansToDegrees =  (rad: number) => rad * 180 / Math.PI;

class Saturn {
  public planet: Mesh;
  public rings: Mesh[];

  constructor() {
    this.planet = this.createPlanet();
    this.rings = [this.createRing(1.5), this.createRing(2.25), this.createRing(3)];
  }
  addToScene(scene: Scene) {
    scene.add(this.planet);
    this.rings.forEach((ring) => {
      scene.add(ring);
    });
  }
  animate() {
    //   this.planet.position.y -= 0.01;
    //   for (let i = 0; i < this.rings.length; i++) {
    //       const ring = this.rings[i];
    //       ring.position.y -= 0.01;
          
    //   }
  }
  createPlanet() {
    const geometry = new SphereGeometry(1, 30, 40, 0, Math.PI, 0, Math.PI);
    const material = new MeshBasicMaterial({
      color: "#ffffff",
    });
    const planet = new Mesh(geometry, material);
    planet.position.y = 2;
    return planet;
  }
  createRing(size: number): Mesh {
    const geometry = new TorusGeometry(size, 0.25, 2, 100);
    const material = new MeshBasicMaterial({
      color: randomColor(),
    });
    const ring = new Mesh(geometry, material);
    
    ring.position.y = 2;
    ring.rotation.x = degreesToRadians(90);
    ring.rotation.y = degreesToRadians(30);

    return ring;
  }
  dispose() {
    this.disposeMesh(this.planet);
    this.rings.forEach((ring) => {
      this.disposeMesh(ring);
    });
  }
  disposeMesh(mesh: Mesh) {
    if (!Array.isArray(mesh.material)) mesh.material?.dispose();
    mesh.geometry.dispose();
  }
  removeFromScene(scene: Scene) {
    scene.remove(this.planet);
    this.rings.forEach((ring) => {
      scene.remove(ring);
    });
  }
}

export default Saturn;
