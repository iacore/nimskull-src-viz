import "./style.css"
import ForceGraph3D from "3d-force-graph"
import type { NodeObject } from "three-forcegraph"
import data from "./out.json"
const appel = document.querySelector<HTMLDivElement>("#app")!
import SpriteText from "three-spritetext"

import * as dat from "dat.gui"

const gui = new dat.GUI()

const options = {
  arrowSize: 4,
  arrowRelPos: 0.5,
}

const physicsSettings = {
  // defaults from https://github.com/anvaka/ngraph.physics.simulator/blob/master/index.js
  timeStep: 20,
  gravity: -1.2,
  theta: 0.8,
  springLength: 10,
  springCoefficient: 0.0008,
  dragCoefficient: 0.02
}

const myGraph = ForceGraph3D()

myGraph(appel)
  .graphData(data)
  .nodeAutoColorBy("group")
  .nodeThreeObject((node: NodeObject & { id: string; color: string }) => {
    const sprite = new SpriteText(node.id)
    sprite.color = node.color
    // sprite.material.depthWrite = false; // make sprite background transparent. only used with fully transparent background
    sprite.backgroundColor = "#00000055" // transparent black
    sprite.borderColor = node.color
    sprite.borderWidth = 0.5
    sprite.textHeight = 4
    return sprite
  })
  .forceEngine("ngraph")
  .ngraphPhysics(physicsSettings)
  .linkDirectionalArrowLength(options.arrowSize)
  .linkDirectionalArrowRelPos(options.arrowRelPos)
// .linkDirectionalArrowColor("#ffffff")

gui
  .add(options, "arrowSize", 0, 10)
  .onChange((value: number) => myGraph.linkDirectionalArrowLength(value))
gui
  .add(options, "arrowRelPos", 0, 1)
  .onChange((value: number) => myGraph.linkDirectionalArrowRelPos(value))

const guiPhysics = gui.addFolder("Physics Settings")
for (const key in physicsSettings) {
  guiPhysics
    .add(physicsSettings, key)
    .onChange(() => myGraph.ngraphPhysics(physicsSettings))
}
