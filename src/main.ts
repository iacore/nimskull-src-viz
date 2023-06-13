import "./style.css"
import ForceGraph3D from "3d-force-graph"
import type { NodeObject } from "three-forcegraph"
import data from "./out.json"
const appel = document.querySelector<HTMLDivElement>("#app")!
import SpriteText from "three-spritetext"

import * as dat from "dat.gui"

const gui = new dat.GUI()

const options = {
  arrowLength: 4,
  arrowRelPos: 0.5,
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
    sprite.textHeight = 8
    return sprite
  })
  .linkDirectionalArrowLength(options.arrowLength)
  .linkDirectionalArrowRelPos(options.arrowRelPos)
// .linkDirectionalArrowColor("#ffffff")

gui
  .add(options, "arrowLength", 0, 10)
  .onChange((value: number) => myGraph.linkDirectionalArrowLength(value))
gui
  .add(options, "arrowRelPos", 0, 1)
  .onChange((value: number) => myGraph.linkDirectionalArrowRelPos(value))
