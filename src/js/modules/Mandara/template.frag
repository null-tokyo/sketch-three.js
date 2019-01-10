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

const float B = 12.0;

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);

  float d = distance(st, vec2(0.0));
  float a = atan(st.y, st.x) / TWO_PI;
  vec3 color = vec3(0.0);

  //鏡面効果
  float _a = a * B;
  float _ia = floor(_a);
  float _fa = fract(_a);

  if(mod(_ia, 2.0) > 0.0) {
    _fa = 1.0 - _fa;
  }

  vec2 _st = vec2(d, _fa);

  //ボロノイ
  _st = _st * B;
  vec2 _ist = floor(_st);
  vec2 _fst = fract(_st);

  float m_dist = 2.0;

  for(float x = -1.0; x <= 1.0; x++){
    for(float y = -1.0; y <= 1.0; y++){
      vec2 neighbor = vec2(x, y);
      vec2 point = _ist + neighbor;

      //point = 0.5 + 0.5*sin(u_time + 6.2831*point);

      float s = (sin(time + 6.899 * point.y) + sin(time + 2.899 * point.y) * 1.23 + sin(time + 8.7329 * point.y) * 2.23) / 3.0;
      float c = (cos(time + 6.899 * point.x) + cos(time + 2.899 * point.x) * 1.23 + cos(time + 8.7329 * point.x) * 2.23) / 3.0;
      point = 0.5 + 0.5 * vec2(s * m.x * 10.0, c * m.y * 10.0);

      vec2 diff = neighbor + point - _fst;
      float dist = length(diff);
      m_dist = min(m_dist, dist);
    }
  }

  color += m_dist;

  gl_FragColor = vec4(color, 1.0);
}