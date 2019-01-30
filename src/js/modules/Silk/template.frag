uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec2 vector;
uniform vec2 force;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

@import ../../../glsl/shape/circle;
@import ../../../glsl/shape/polygon;
@import ../../../glsl/util/color;
@import ../../../glsl/util/noise;
@import ../../../glsl/util/transform;
@import ../../../glsl/util/random2;

vec3 customColor (float f) {
  vec3 gray = vec3(0.95, 0.95, 0.95);
  vec3 darkgray = vec3(0.90, 0.90, 0.90);
  vec3 ddarkgray = vec3(0.87, 0.87, 0.87);
  vec3 white = vec3(0.98, 0.98, 0.98);

  vec3 c = vec3(0.7210, 0.9118, 0.9083);
  vec3 m = vec3(0.9254, 0.8657, 0.8914);
  vec3 y = vec3(1.0000, 0.9961, 0.3530);
  float d = smoothstep(0.0, 1.0, f);
  vec3 color = mix(darkgray, gray, smoothstep(0.0, 8.0, d));
  color = mix(color, white, smoothstep(0.0, 1.0, d));

  // color = mix(color, m, smoothstep(0.0, 1.0, f));
  // color = mix(color, c, smoothstep(0.0, 1.0, f));
  return color;
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 v = (vector * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 f = force / min(resolution.x, resolution.y);

  vec2 _st = st * 0.4;
  float t = time * 0.8;

  float n = snoise(st * 0.8);
  float c = (cos((t + n - -3.39) / 3.99 ) * -1.44 + cos( (t + n - -1.79) / -2.87 ) * -1.19 + cos( t  + n/ 0.85 ) * -0.87);
  float s = (sin((t + n - -3.47) / 0.36 ) * -0.59 + sin( (t + n - -1.79) / 0.94 ) * -0.5 + sin( t + n / 0.39 ) * -0.87);
  
  _st.x += c * 0.2;
  _st.y += s * 0.05;

  c = (cos((n - -3.39) / 3.99 ) * -1.44 + cos( (n - -1.79) / -2.87 ) * -1.19 + cos( n / 0.85 ) * -0.87);
  s = (sin((n - -3.47) / 0.36 ) * -0.59 + sin( (n - -1.79) / 0.94 ) * -0.5 + sin( n / 0.39 ) * -0.87);

  _st.x += -c * 0.4;
  _st.y += -s * 0.8;

  float d = snoise(_st + t * 0.4);
  float d2 = snoise(vec2(_st.x + 0.1 * f.x, _st.y) + t * 0.4);
  float d3 = snoise(vec2(_st.x - 0.1 * f.x, _st.y) + t * 0.4);

  //wave
  st *= 1.0;
  st.x -= f.x + v.x * 4.0;
  st.y += f.y + v.y * 4.0;

  float circle = sin(length(st * (5.0 + f.x * 20.0))) * f.x * 5.0 * 0.8;
  circle = smoothstep(0.0, 1.0, circle * 0.2) * sin(time * 10.0);

  vec3 color = customColor(d + circle);
  vec3 color1 = customColor(d2 + circle);
  vec3 color2 = customColor(d3 + circle);


  gl_FragColor = vec4(color1.r, color.g, color2.b, 1.0);
}