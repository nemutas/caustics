varying vec2 v_uv;
varying vec3 v_oldPos;
varying vec3 v_newPos;

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {
  float beforeArea = length(dFdx(v_oldPos)) * length(dFdy(v_oldPos));
  float afterArea = length(dFdx(v_newPos)) * length(dFdy(v_newPos));
  vec3 color = vec3(beforeArea / afterArea);

  float dist = distance(vec2(0.5), v_uv) * 2.0;
  color = color * (1.0 - smoothstep(0.0, 1.0, dist));
  color += luma(color);

  gl_FragColor = vec4(color, 1.0);
}