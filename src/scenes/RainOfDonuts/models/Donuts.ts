import { Scene } from "three";
import Donut from "./Donut";

class Donuts {
    private donuts: Donut[];

    constructor(numberOfDonuts: number) {
        this.donuts = new Array(numberOfDonuts).fill(null).map(() => {
            const donut = new Donut();
            return donut;
        });
    }

    addToScene(scene: Scene) {
        this.donuts.forEach((donut) => scene.add(donut));
    }

    animate() {
        for (let i = 0; i < this.donuts.length; i++) {
            const donut = this.donuts[i];
            donut.animate();
        }
    }

    dispose() {
        this.donuts.forEach((donut) => donut.dispose());
    }

    init() {
        this.donuts.forEach((donut) => donut.init());
    }

    removeFromScene(scene: Scene) {
        this.donuts.forEach((donut) => scene.remove(donut));
    }
}

export default Donuts;