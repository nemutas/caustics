varying float v_hight;

void main() {
  vec3 color = vec3(v_hight);
  gl_FragColor = vec4(color, 1.0);
}