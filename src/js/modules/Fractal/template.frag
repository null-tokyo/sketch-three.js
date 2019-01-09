uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

@import ../../../glsl/shape/circle;
@import ../../../glsl/util/color;
@import ../../../glsl/util/noise;

const float B = 20.0;

float atan2(in float y, in float x) {
    return x == 0.0 ? sin(y) * PI/2.0 : atan(y, x);
}

vec3 customColor(vec2 st, vec2 m) {
  float r = st.x;
  float h = step(0.0, r) * 0.4 + step(0.05, r) * 0.15 + step(0.25, r) * 0.15 + step(0.55, r) * 0.15 + step(0.75, r) * 0.15;
  float s = step(0.0, r) * 0.6 + step(0.2, r) * 0.2 + step(0.4, r) * 0.1 + step(0.5, r) * 0.1;
  float b = step(0.0, r) * 0.9 + step(0.05, r) * -0.4 + step(0.3, r) * -0.2 + step(0.7, r) * -0.2;

  h = fract(h + m.x);

  return vec3(h, s, b/6.0+0.4);
}

float polygon (vec2 st, int N, float s) {
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  float d = cos(floor(.5+a/r)*r-a)*length(st);
  d = 1.0 - smoothstep(s, s+0.01, d);
  return d;
}

vec2 fractal (vec2 st, float a, float r, float t) {
  return vec2(st.x + r * cos(a + time), st.y + r * sin(a + time));
}

float size(float i, float l, float m) {
  return ((l + 1.0) - i) * (0.015 + m * 0.015);
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);

  vec3 color = vec3(0.0);

  vec2 _st = st;
  vec2 _st1 = st;
  vec2 _st2 = st;
  vec2 _st3 = st;

  float d = 0.0;
  float r = 0.1;
  const float loop = 5.0;

  //d += polygon(vec2(_st.x, _st.y), 3, 0.1) * 0.2;
  for(float i = 0.0; i < loop; i++){
    float sm = snoise(m * i);
    r = 0.15 + sm * 0.1;

    float si = (sin(time + 0.12) + sin(time + 1.2) * 1.23 + sin(time + 2.3) * 2.12) / 3.0;
    float cs = (cos(time + 0.23) + cos(time + 1.32) * 0.91 + cos(time + 2.8) * 1.92) / 3.0;

    float s1a = 0.0 + m.x * TWO_PI * i;
    _st1 = fractal(_st1, s1a, r + m.y * 0.15 * i, time * si);
    d += polygon(vec2(_st1.x, _st1.y), 3, size(i + m.y, loop, sm)) * 0.15;
    _st1 = fractal(_st1, s1a, r + m.y * 0.15 * i, time * cs);
    d += polygon(vec2(_st1.x, _st1.y), 3, size(i + m.y, loop, cs)) * 0.15;

    float s2a = TWO_PI / 3.0 + m.x * TWO_PI * i;
    _st2 = fractal(_st2, s2a, r + m.y * 0.15 * i, time * si);
    d += polygon(vec2(_st2.x, _st2.y), 3, size(i + m.y, loop, sm)) * 0.15;
    _st2 = fractal(_st2, s2a, r + m.y * 0.15 * i, time * cs);
    d += polygon(vec2(_st2.x, _st2.y), 3, size(i + m.y, loop, cs)) * 0.15;

    float s3a = TWO_PI * 2.0 / 3.0 + m.x * TWO_PI * i;
    _st3 = fractal(_st3, s3a, r + m.y * 0.15 * i, time * si);
    d += polygon(vec2(_st3.x, _st3.y), 3, size(i + m.y, loop, sm)) * 0.15;
    _st3 = fractal(_st3, s3a, r + m.y * 0.15 * i, time * cs);
    d += polygon(vec2(_st3.x, _st3.y), 3, size(i + m.y, loop, cs)) * 0.15;
  }

  color = vec3(d);
  color = customColor(vec2(d, d), m);

  gl_FragColor = vec4(color, 1.0);
}