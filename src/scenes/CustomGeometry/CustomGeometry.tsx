import React, { FunctionComponent, useEffect, useRef } from "react";
import {
  PerspectiveCamera,
  Scene,
} from "three";
import renderer from "../../models/Renderer";
import CustomGeometryModel from './models/CustomGeometry';

/** A basic scene setup with three js */
const CustomGeometry: FunctionComponent = () => {
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
    const customGeometry = new CustomGeometryModel();

    // Add elements to scene and set renderer size on mount
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set the z position of the camera (starts at 0,0,0)
    camera.position.z = 20;

    // Add elements to scene
    scene.add(customGeometry);

    function animate() {
      customGeometry.animate();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    if (mount) mount.appendChild(renderer.domElement);

    return function cleanup() {
      mount?.firstChild?.remove();
      scene.remove(customGeometry);
      customGeometry.dispose();
    };
  }, []);

  return <div ref={root} />;
};

export default CustomGeometry;
