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
  vec2 f = (force * 2.0 - resolution) / max(resolution.x, resolution.y);
  f.y = -f.y;
  vec3 color = vec3(f.x, f.y, 0.0);

  float t = time;
  vec2 _st = st;
  _st *= 0.2;

  float s = snoise(_st * 10.0);

  _st.x += cos(s) * 1.5;
  _st.y += sin(s) * 1.5;

  _st.x += f.x * -2.0;
  _st.y += f.y * -2.0;

  _st.x += cos(s) * 0.5;
  _st.y += sin(s) * 0.5;

  float d = noise(_st);
  _st = scale2d(_st, vec2(2.0));
  float d2 = noise(_st);
 
  color = vec3(d);

  float c = circle(st, f, 0.8);

  color += d2 * vec3(c);
  color -= d * c; 

  //極座標
  // float d = distance(st, vec2(0.0));
  // float a = atan(st.y, st.x) / TWO_PI;
  // vec2 _st = vec2(d, a);

  gl_FragColor = vec4(color, 1.0);
}