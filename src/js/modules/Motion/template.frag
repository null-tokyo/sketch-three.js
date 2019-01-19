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

float stopRatio = 0.6;

float customPoly(vec2 st, float i, float l, float r, float s, float speed) {
  float t = time * speed;

  float stopEveryAngle = TWO_PI/l;

  float t1 = (floor(t) + smoothstep(0.0, 1.0 - stopRatio, fract(t))) * stopEveryAngle;

  float x = cos(t1 + stopEveryAngle * i + t) * r;
  float y = sin(t1 + stopEveryAngle * i + t) * r;
  
  vec2 _st = st + vec2(x, y);

  st = rotate2d(_st, t1 * l + stopEveryAngle * i);

  float d = polygon(st, 3, s);
  return d;
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);
  vec2 f = (force * 2.0 - resolution) / max(resolution.x, resolution.y) * 0.5;

  vec3 color = vec3(0.0);
  float d = 0.0;

  for(float i = 0.0; i < 6.0; i++) {
    d += customPoly(st, i, 6.0, 0.1, 0.008, 1.5) * 0.1;
  }

  for(float i = 0.0; i < 8.0; i++) {
    d += customPoly(st, i, 8.0, 0.22, 0.02, -0.8) * 0.2;
  }

  for(float i = 0.0; i < 10.0; i++) {
    d += customPoly(st, i, 10.0, 0.36, 0.028, 1.0) * 0.3;
  }

  for(float i = 0.0; i < 12.0; i++) {
    d += customPoly(st, i, 12.0, 0.52, 0.042, -0.4) * 0.4;
  }
  if(d == 0.0) {
    color = vec3(0.23, 0742, 0.821);
  }else if(d == 0.1) {
    color = vec3(0.7220, 0.7558, 0.9682);
  }else if(d == 0.2) {
    color = vec3(1.0000, 0.5819, 0.5406);
  }else if(d == 0.3) {
    color = vec3(0.821, 0742, 0.23);
  }else if(d == 0.4) {
    color = vec3(0.8016, 0.8188, 1.0000);
  }else{
    color = vec3(0.23, 0742, 0.821);
  }

  gl_FragColor = vec4(color, 1.0);
}