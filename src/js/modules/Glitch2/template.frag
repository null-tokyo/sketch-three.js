uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec2 vector;
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
  vec2 m = (mouse * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 v = (vector * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 f = force / min(resolution.x, resolution.y);

  vec3 ci = vec3(0.7210, 0.9118, 0.9083);
  vec3 mz = vec3(0.9180, 0.2236, 0.9688);
  vec3 ye = vec3(1.0000, 0.9961, 0.3530);

  vec2 _st = st;
  vec2 i = fract(st * 2.0) + 0.01;
  float power = noise(i);

  _st.x += step(random(vec2(fract(time*0.2), fract(time*0.2))), i.y) * 0.3 * f.x;
  _st.x -= step(random(vec2(fract(time*0.5), fract(time*0.3))), i.y) * 0.3 * f.x;

  st.x += step(random(vec2(fract(time*0.2), fract(time*0.2))), i.y) * 0.15 * f.x;
  st.x -= step(random(vec2(fract(time*0.5), fract(time*0.3))), i.y) * 0.15 * f.x;

  float d = circle(st, vec2(0.0), 1.0);
  float d1 = circle(_st, vec2(0.0), 1.0);
  float n = noise(st*min(resolution.x, resolution.y)*0.15) * 0.5;
  
  float base = d * n / length(st + 0.5) + d*(st.x+0.3);
  float r = d1 * n / length(st + 0.5) + d1*(st.x+0.3);

  vec3 color = mix(ci, mz, base);
  vec3 color1 = mix(ye, ci, r);

  gl_FragColor = vec4(vec3(color1.r, color.g, color.b), 1.0);
}