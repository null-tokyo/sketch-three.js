uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec2 force;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

@import ../../../glsl/shape/circle;
@import ../../../glsl/shape/polygon;
@import ../../../glsl/util/color;
@import ../../../glsl/util/noise;
@import ../../../glsl/util/transform;
@import ../../../glsl/util/random2;

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);
  vec2 f = -1.0 * (force * 2.0 - resolution) / max(resolution.x, resolution.y);

  vec3 color = vec3(0.0);

  float c1 = (cos(st.y * 72.4) + cos(st.y * 21.2) *1.232 + cos(st.y * 11.22) *2.583) * 0.3333;
  float c2 = (cos(st.y * 65.59) + cos(st.y * 38.12) *1.532 + cos(st.y * 13.32) *2.923) * 0.3333;

  st.x += f.x * c1 * 0.1 + f.x * abs(c2) * 0.2 + snoise(st * c1) * f.x * 0.1;


  float c = circle(st, vec2(0.0, 0.0), 0.8);
  float r = circle(st, vec2(f.x * 0.05 * random(vec2(c1, time)), 0.0), 0.8);
  float b = circle(st, vec2(-f.x *  0.1 * random(vec2(c2, time)), 0.0), 0.8);
  color = vec3(r, c, b);

  //極座標
  // float d = distance(st, vec2(0.0));
  // float a = atan(st.y, st.x) / TWO_PI;
  // vec2 _st = vec2(d, a);

  gl_FragColor = vec4(color, 1.0);
}