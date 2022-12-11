#define NUM_OCTAVES 5

#include './cnoise.glsl'

float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100);
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * cnoise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}