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


vec3 customColor(vec3 st) {
  float r = st.x;
  float h = step(0.0, r) * 0.3 + step(0.7, r) * 0.3 + step(1.0, r) * 0.55;
  float s = 0.4;
  float b = 0.5;

  h = fract(h + 0.1);

  return vec3(h, s, b);
}

const float B = 3.0;

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);

  
  vec3 color = vec3(0.0);

  st = rotate2d(st, time * -0.4);
  st = scale2d(st, vec2(sin(time * -2.0)) * 0.2 - 2.0);

  vec2 _st = st * B;

  //_st = rotate2d(_st, time * 0.3);

  vec2 index = vec2(0.0);
  for(float i = 0.0; i < 2.0; i++){
    index.x += step(i, mod(_st.x, 2.0));
    index.y += step(i, mod(_st.y, 2.0));
  }

  float t = sin(time + 0.67) * sin(time + 1.23) * sin(time + 2.19);

  //_st = rotate2d(_st, time * 1.0 + (index.x + index.y) * PI/2.0);

  _st.x += smoothstep(0.0, 0.25, fract(t)) * (index.y - 1.0 - 1.0);
  _st.y += smoothstep(0.25, 0.5, fract(t)) * (index.x - 1.0);
  _st.x += smoothstep(0.5, 0.75, fract(t)) * (index.y - 1.0);
  _st.y += smoothstep(0.75, 1.0, fract(t)) * (index.x - 1.0 - 1.0);

  vec2 p = fract(_st);
  //float c = circle(p, vec2(0.5), 0.3);
  p = rotate2d(p - 0.5, time * 2.0 + (index.x + index.y) * PI/2.0);
  float poly1 = 1.0 - polygon(p, 4, 0.15 + 0.1) * 1.0 * snoise(vec2(index.x+ time * 0.0001, index.y + time * 0.0001));
  //float poly2 = polygon(p - 0.05 * snoise(p + time * 20.0), 3, 0.2) * 0.3;
  color = customColor(vec3(poly1));
  gl_FragColor = vec4(color, 1.0);
}