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

  vec3 color = vec3(0.0);

  float speed = 2.0;
  float t = time * speed;
  float stopRatio = 0.6;
  float stopEveryAngle = PI/3.0;
  float t1 = (floor(t) + smoothstep(0.0, 1.0 - stopRatio, fract(t))) * stopEveryAngle;

  vec2 _st = vec2(cos(t1) * 0.1, sin(t1) * 0.1);
  st = rotate2d(st, t1);
  float d = polygon(st + _st, 3, 0.2 + sin(t1) * 0.1) * 0.3;
  st = rotate2d(st, t1);
  d += polygon(st + _st, 3, 0.2 + sin(t1) * 0.1) * 0.3;
  st = rotate2d(st, t1);
  d += polygon(st + _st, 3, 0.2 + sin(t1) * 0.1) * 0.3;
  st = rotate2d(st, t1);
  d += polygon(st + _st, 3, 0.2 + sin(t1) * 0.1) * 0.3;
  
  color = mix(
    vec3(0.23, 0742, 0.821),
    vec3(0.821, 0742, 0.23),
    d
  );

  gl_FragColor = vec4(color, 1.0);
}