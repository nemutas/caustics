varying float v_hight;

#include '../glsl/fbm.glsl'
// #include '../glsl/cnoise.glsl' //already import in fbm.glsl

void main() {
  vec3 pos = position;
  pos.z += fbm(position * 5.0) * 2.0;
  pos.z += cnoise(position * 3.0 + 5.0) * 1.5;

  v_hight = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}