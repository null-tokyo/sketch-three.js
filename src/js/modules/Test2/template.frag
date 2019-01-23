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
  vec2 f = (force * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec3 color = vec3(0.0);

  st.x += v.x;
  float circle = sin(length(st) * 30.0);

  color = vec3(circle) * abs(1.0 - sin(length(f)));

  gl_FragColor = vec4(color, 1.0);
}