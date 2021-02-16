import React, { Component } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

/** A basic scene setup with three js using a class */
class SetupScene extends Component {
  private mount = React.createRef<HTMLDivElement>();
  static renderer = new WebGLRenderer(); // make the renderer a static variable to prevent multiple renderes being created.

  componentDidMount() {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Objects rendered to scene
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: "#ffffff" });
    const cube = new Mesh(geometry, material);

    SetupScene.renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Add elements to scene
    scene.add(cube);

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      SetupScene.renderer.render(scene, camera);
    }

    animate();

    this.mount.current?.appendChild(SetupScene.renderer.domElement);
  }

  componentWillUnmount() {

  }

  render() {
    return <div ref={this.mount} />;
  }
}

export default SetupScene;
