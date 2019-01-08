uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

@import ../../../glsl/shape/circle;
@import ../../../glsl/util/color;
@import ../../../glsl/util/noise;

const float B = 30.0;

float PI = 3.141592653589793;

float atan2(in float y, in float x) {
    return x == 0.0 ? sin(y) * PI/2.0 : atan(y, x);
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  //vec2 st = (gl_FragCoord.xy) / min(resolution.x, resolution.y);
  
  //極座標
  float d = distance(st, vec2(0.0));
  float r = atan2(st.y, st.x) / PI*0.5;
  st = vec2(d, r);

  st.y = st.y + time * 0.5;

  //タイル化
  vec2 _st = st * B;

  vec2 index = vec2(0.0);
  for(float i = 0.0; i < B; i++){
    index.x += step(i, mod(_st.x, B));
    index.y += step(i, mod(_st.y, B));
  }

  vec2 p = fract(st * B);

  //色変換
  vec3 color = vec3(index.y * (1.0 / B), 0.5, 1.0);
  color = hsb2rgb(color);

  gl_FragColor = vec4(color, 1.0);
}