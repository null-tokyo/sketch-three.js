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

// 独自のカラーパレット
vec3 customColor(vec2 st, vec2 m) {
  float r = snoise(st + m);
  float h = 1.0 + step(0.5, r) + step(0.7, r) + step(0.8, r);
  float s = 1.0 + step(0.1, r) + step(0.1, r) + step(0.2, r);
  float b = 1.0 + step(0.1, r) + step(0.1, r) + step(0.2, r);

  return vec3(fract(h/4.0 + (1.0 + m.y)*0.5), fract(s/4.0 + (1.0 + m.x)*0.5), b/6.0+0.4);
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);
  
  //ノイズ
  float n = noise(st * (400.0 * random(vec2(st.x * time, st.y * time))));
  
  //極座標
  float d = distance(st, vec2(0.0));
  float r = atan2(st.y, st.x) / PI*0.5;
  st = vec2(d, r);

  //列ごとに動きを変える
  float y = 0.0;
  for(float i = 0.0; i < 3.0; i++){
    y += step(i, mod(st.x * 10.0, 3.0));
  }
  float s = step(1.0, mod(st.x * 10.0, 2.0));
  st.y = st.y + time * 0.05 * y * (1.0 + (s * -2.0));

  //タイル化
  vec2 _st = st * B;

  vec2 index = vec2(0.0);
  for(float i = 0.0; i < B; i++){
    index.x += step(i, mod(_st.x, B));
    index.y += step(i, mod(_st.y, B));
  }

  vec2 p = fract(_st);

  //色変換
  vec3 color = customColor(index, m);
  color = hsb2rgb(color);

  gl_FragColor = vec4(color, 1.0);
}