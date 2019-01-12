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

vec3 customColor (float d) {
  vec3 colorA = vec3(0.62, 0.785, 0.7278);
  vec3 colorB = vec3(0.692, 0.812, 0.578);
  return hsb2rgb(mix(colorA, colorB, d));
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);


  float n = snoise(vec2(st.x, st.y));
  float c = (cos((n - -3.39) / 3.99 ) * -1.44 + cos( (n - -1.79) / -2.87 ) * -1.19 + cos( n / 0.85 ) * -0.87);
  float s = (sin((n - -3.47) / 0.36 ) * -0.59 + sin( (n - -1.79) / 0.94 ) * -0.5 + sin( n / 0.39 ) * -0.87);
  
  st.x += c * 0.3;
  st.y += s * 0.3;
  n = snoise(vec2(st.x * time * sin(time), st.y * time * cos(time)));

  c = (cos((n - -3.39) / 3.99 ) * -1.44 + cos( (n - -1.79) / -2.87 ) * -1.19 + cos( n / 0.85 ) * -0.87);
  s = (sin((n - -3.47) / 0.36 ) * -0.59 + sin( (n - -1.79) / 0.94 ) * -0.5 + sin( n / 0.39 ) * -0.87);
  
  float d = snoise(st + time);

  // float circ = circle(st, vec2(-0.8, -0.1), 0.5);
  // circ -= circle(st, vec2(-0.8, -0.1), 0.4);
  // circ += circle(st, vec2(-0.8, -0.1), 0.3);
  // circ -= circle(st, vec2(-0.8, -0.1), 0.2);
  // circ += circle(st, vec2(-0.8, -0.1), 0.1);

  vec3 color = customColor(d);

  gl_FragColor = vec4(color, 1.0);
}