import React, { FunctionComponent, useEffect, useRef } from "react";
import {
  PerspectiveCamera,
  Scene,
} from "three";
import BasicCube from "../../models/BasicCube";
import BasicSphere from "../../models/BasicSphere";
import BasicTorus from "../../models/BasicTorus";
import renderer from "../../models/Renderer";

/** A basic scene setup with three js */
const SetupScene: FunctionComponent = () => {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = root.current;
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Objects rendered to scene
    const cube = new BasicCube();
    const sphere = new BasicSphere();
    const torus = new BasicTorus();

    // Add elements to scene and set renderer size on mount
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set the z position of the camera (starts at 0,0,0)
    camera.position.z = 3;

    // Add elements to scene
    scene.add(cube);
    scene.add(sphere);
    scene.add(torus);

    torus.position.x = -2;
    sphere.position.x = -1;
    cube.position.x = 1;

    function animate() {
      cube.animate();
      sphere.animate();
      torus.animate();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    if (mount) mount.appendChild(renderer.domElement);

    return function cleanup() {
      mount?.firstChild?.remove();
      scene.remove(cube);
      scene.remove(sphere);
      scene.remove(torus);
      cube.dispose();
      sphere.dispose();
      torus.dispose();
    };
  }, []);

  return <div ref={root} />;
};

export default SetupScene;
