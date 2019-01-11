uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

@import ../../../glsl/shape/circle;
@import ../../../glsl/shape/polygon;
@import ../../../glsl/util/color;
@import ../../../glsl/util/noise;
@import ../../../glsl/util/transform;
@import ../../../glsl/util/random2;


vec3 customColor(vec3 st) {
  float r = st.x;
  float h = step(0.0, r) * 0.3 + step(0.7, r) * 0.3 + step(1.0, r) * 0.55;
  float s = 0.4;
  float b = 0.5;

  h = fract(h + 0.1);

  return vec3(h, s, b);
}

const int B = 5;

vec2 calPoint(vec2 st, int i, float r) {
  st.x = st.x + cos(TWO_PI/float(B) * float(i)) * r;
  st.y = st.y + sin(TWO_PI/float(B) * float(i)) * r;
  return st;
}

// float drawShape(vec2 st, int i, float r) {
//   st.x = sin(TWO_PI/float(B) * float(i)) * r;
//   st.y = sin(TWO_PI/float(B) * float(i)) * r;
//   circle(st, vec2(0,0), time);
// }

vec3 customColor(float r) {
  float h = 1.0 + step(0.5, r) + step(0.7, r) + step(0.8, r);
  float s = 1.0 + step(0.1, r) + step(0.1, r) + step(0.2, r);
  float b = 1.0 + step(0.1, r) + step(0.1, r) + step(0.2, r);

  return vec3(fract(h/4.0 + sin(time)), fract(s/4.0), b/6.0+0.4);
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);

  vec2 _st[B];

  vec3 color = vec3(0.0);

  //極座標
  // float d = distance(st, vec2(0.0));
  // float a = atan(st.y, st.x) / TWO_PI;
  // vec2 _st = vec2(d, a);

  float c = circle(st, vec2(0,0), time);
  float r = 0.2;

  vec2 st1 = rotate2d(st, time);
  vec2 st2 = rotate2d(st, time * -1.0);

  float d = 0.0;

  for(int i = 0; i < B; i++) {
    _st[i] = calPoint(vec2(0.0), i, r * (m.x));
    d += circle(st1, _st[i], r) * (1.0 / float(B));
    for(int j = 0; j < B; j++) {
      vec2 _jsx = calPoint(_st[i], j, r * (m.y));
      d -= circle(st2, _jsx, r * 2.0) * (1.0 / (float(B*B)));
      for(int k = 0; k < B; k++) {
        vec2 _ksx = calPoint(_jsx, k, r * (m.x + m.y));
        d += circle(st1, _ksx, r * 2.0 * 2.0) *  (1.0 / (float(B*B*B)));
      }
    }
  }

  color = vec3(d);
  gl_FragColor = vec4(color, 1.0);
}