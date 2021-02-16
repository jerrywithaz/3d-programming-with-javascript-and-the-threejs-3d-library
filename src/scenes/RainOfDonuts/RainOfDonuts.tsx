import React, { FunctionComponent, useEffect, useRef } from "react";
import {
  PerspectiveCamera,
  Scene,
} from "three";
import Donuts from "./models/Donuts";
import renderer from './../../models/Renderer';

/** A basic scene setup with three js */
const RainOfDonuts: FunctionComponent = () => {
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
    const donuts = new Donuts(10);
    // Add elements to scene and set renderer size on mount
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set the z position of the camera (starts at 0,0,0)
    camera.position.z = 20;

    donuts.addToScene(scene);
    donuts.init();
    
    function animate() {
      donuts.animate();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    if (mount) mount.appendChild(renderer.domElement);

    return function cleanup() {
      mount?.firstChild?.remove();
      donuts.removeFromScene(scene);
      donuts.dispose();
    };
  }, []);

  return <div ref={root} />;
};

export default RainOfDonuts;
