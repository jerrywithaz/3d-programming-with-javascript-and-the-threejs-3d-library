import React, { FunctionComponent, useEffect, useRef } from "react";
import {
    AxesHelper,
  PerspectiveCamera,
  Scene,
} from "three";
import SaturnModel from './models/Saturn';
import renderer from "../../models/Renderer";

/** A basic scene setup with three js */
const Saturn: FunctionComponent = () => {
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
    
    const axesHelper = new AxesHelper(10);
    // Objects rendered to scene
    const saturn = new SaturnModel();

    // Add elements to scene and set renderer size on mount
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set the z position of the camera (starts at 0,0,0)
    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 1;

    // Add elements to scene
    saturn.addToScene(scene);

    scene.add(axesHelper);

    function animate() {
      saturn.animate();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    if (mount) mount.appendChild(renderer.domElement);

    return function cleanup() {
      mount?.firstChild?.remove();
      scene.remove(axesHelper);
      saturn.removeFromScene(scene);
      saturn.dispose();
    };
  }, []);

  return <div ref={root} />;
};

export default Saturn;
