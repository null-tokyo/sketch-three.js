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
  float h = step(0.0, r) * 0.0 + step(0.05, r) * 0.15 + step(0.25, r) * 0.15 + step(0.55, r) * 0.15 + step(0.75, r) * 0.15;
  float s = step(0.0, r) * 0.05 + step(0.2, r) * 0.4 + step(0.4, r) * 0.1 + step(0.5, r) * 0.1;
  float b = step(0.0, r) * 0.05 + step(0.06, r) * 0.4 + step(0.3, r) * 0.2 + step(0.7, r) * 0.2;

  h = fract(h + 0.1);

  return vec3(h, s, b);
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


  for(float i = 0.0; i < 10.0; i++) {
    st.x += cos(i * 0.01 + time * 0.01);
    st.y += sin(i * 0.01 + time * 0.01);
  }
  
  vec3 color = vec3(0.0);
  float d = 0.0;
  float dr = 0.0;
  float dg = 0.0;

  vec2 st1 = st;
  st1.x += 0.1;
  vec2 st2 = st;
  st2.x -= 0.1;

  for(float i = 0.0; i < 10.0; i++) {
    float t = time + i * 0.01;
    float s = (sin( (t - -2.8) / 0.29 ) * -0.67 + 0.12 + sin( (t - -1.0) / 0.46 ) * -0.93 + sin( (t - 0.83) / 1.77 ) * 0.0 + -0.07) * 0.4;
    float c = (cos( (t - -3.47) / 0.36 ) * -0.59 + cos( (t - -1.79) / 0.94 ) * -0.5 + cos( t / 0.39 ) * -0.87) * 0.4;
    st = vec2(st + vec2(s, c) * 0.2 * m.x);
    d += circle(st * snoise(st + vec2(s,c)), vec2(0.0), 0.3 + i * 0.01 * s) * 0.8 * m.y;
    st1 = vec2(st1 + vec2(c, s) * 0.2 * m.x);
    dr = circle(st1 * snoise(st1 + vec2(s,c)), vec2(0.0), 0.3 + i * 0.01 * s) * 0.8 * m.y;
    st2 = vec2(st2 + vec2(s, c) * 0.2 * m.x);
    dg = circle(st2 * snoise(st2 + vec2(s,c)), vec2(0.0), 0.3 + i * 0.01 * s) * 0.8 * m.y;
  }

  color = vec3(dr + d, d + dg, d);
  color = customColor(vec2(color.r, color.b), vec2(color.g, color.b));

  gl_FragColor = vec4(color, 1.0);
}