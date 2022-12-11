uniform float u_time;
varying vec2 v_uv;
varying vec3 v_oldPos;
varying vec3 v_newPos;

#include '../glsl/cnoise.glsl'

void main() {
  v_uv = uv;
  vec3 pos = position;
  float decay = smoothstep(0.0, 0.3, length(pos.xy));
  pos.z += sin(length(pos) * 20.0 - u_time * 3.0) * 0.3 * decay;
  pos.z += cnoise(position * 5.0 + u_time * 0.1);

  v_oldPos = position;
  v_newPos = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}