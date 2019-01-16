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


vec3 customColor (float d) {
  vec3 colorA = vec3(0.60273, 0.84, 0.95);
  vec3 colorB = vec3(0.82273, 0.85, 0.94);
  return hsb2rgb(mix(colorA, colorB, d));
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);
  vec2 f = (force * 2.0 - resolution) / max(resolution.x, resolution.y) * 0.5;

  float n = snoise(vec2(st.x * st.y * f.x * 0.2, st.y) * 0.1);
  float c = (cos((n - -3.39) / 3.99 ) * -1.44 + cos( (n - -1.79) / -2.87 ) * -1.19 + cos( n / 0.85 ) * -0.87);
  float s = (sin((n - -3.47) / 0.36 ) * -0.59 + sin( (n - -1.79) / 0.94 ) * -0.5 + sin( n / 0.39 ) * -0.87);
  
  st.x += c * 10.5 + s * time * f.x * 1.5;
  st.y += s * 10.5 + c * time * f.y * 0.5;

  st *= 2.0;
  float i = mod(2.0, st.x);
  float j = mod(2.0, st.y);

  // st = fract(st);
  
  //n = snoise(vec2(st.x * time * sin(time), st.y * time * cos(time)));

  c = (cos((n - -3.39) / 3.99 ) * -1.44 + cos( (n - -1.79) / -2.87 ) * -1.19 + cos( n / 0.85 ) * -0.87) * (i + j);
  s = (sin((n - -3.47) / 0.36 ) * -0.59 + sin( (n - -1.79) / 0.94 ) * -0.5 + sin( n / 0.39 ) * -0.87) * (i + j);

  float d = snoise(vec2(st.x + f.x + time * 0.2, st.y + time * 0.4));
  vec3 color = customColor(d);

  gl_FragColor = vec4(color, 1.0);
}