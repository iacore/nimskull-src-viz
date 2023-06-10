import "./style.css"
import ForceGraph3D from "3d-force-graph"
import type { NodeObject } from "three-forcegraph"
import data from "./out.json"
const appel = document.querySelector<HTMLDivElement>("#app")!
import SpriteText from "three-spritetext"

const myGraph = ForceGraph3D({
  rendererConfig: {
    linkDirectionalArrowLength: 100,
    linkDirectionalArrowColor: "#ffffff",
  },
})
myGraph(appel)
  .graphData(data)
  .nodeAutoColorBy("group")
  .nodeThreeObject((node: NodeObject & { id: string, color: string }) => {
    const sprite = new SpriteText(node.id)
    sprite.color = node.color
    // sprite.material.depthWrite = false; // make sprite background transparent. only used with fully transparent background
    sprite.backgroundColor = "#00000055" // transparent black
    sprite.borderColor = node.color
    sprite.borderWidth = 0.5
    sprite.textHeight = 8
    return sprite
  })
