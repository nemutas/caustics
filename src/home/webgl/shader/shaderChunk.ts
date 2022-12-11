import causticsFrag from './causticsFrag.glsl'
import causticsVert from './causticsVert.glsl'
import groundFrag from './groundFrag.glsl'
import groundVert from './groundVert.glsl'

export const shaders = {
  caustics: {
    vertex: causticsVert,
    fragment: causticsFrag,
  },
  ground: {
    vertex: groundVert,
    fragment: groundFrag,
  },
}
