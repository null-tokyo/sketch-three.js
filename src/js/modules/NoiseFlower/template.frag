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

const float B = 12.0;

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);

  vec3 color = vec3(0.0);

  float d = distance(st, vec2(0.0));
  float a = atan(st.y, st.x) / TWO_PI;

  float _a = a * B;
  float _ia = floor(_a);
  float _fa = fract(_a);

  if(mod(_ia, 2.0) > 0.0) {
    _fa = 1.0 - _fa;
  }

  st = vec2(d, _fa);

  float c = (cos((time - -3.39) / 3.99 ) * -1.44 + cos( (time - -1.79) / -2.87 ) * -1.19 + cos(time / 0.85 ) * -0.87);
  float s = (sin((time - -3.47) / 0.36 ) * -0.59 + sin( (time - -1.79) / 0.94 ) * -0.5 + sin(time / 0.39 ) * -0.87);
  vec2 tn = vec2(c * m.x, s * m.y);
  float n = 0.0;
  float amplitude = 1.0;
  for(float i = 0.0; i < 8.0; i++) {
    n += amplitude * fract(snoise(st + tn));
    st *= 2.;
    amplitude *= .5;
  }

  color = mix(vec3(133.0/255.0, 109.0/255.0, 183.0/255.0), vec3(239.0/255.0, 232.0/255.0, 0.0/255.0), n);

  gl_FragColor = vec4(color, 1.0);
}