uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec2 vector;
uniform vec2 force;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

@import ../../../glsl/shape/polygon;
@import ../../../glsl/util/color;
@import ../../../glsl/util/noise;
@import ../../../glsl/util/transform;
@import ../../../glsl/util/random2;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.2, pct, st.y) -
          smoothstep( pct, pct+0.2, st.y);
}

vec3 customColor(float d) {
  vec3 gray = vec3(0.9254, 0.8657, 0.8914);
  vec3 c = vec3(0.7210, 0.9118, 0.9083);
  vec3 m = vec3(0.9180, 0.2236, 0.9688);
  vec3 y = vec3(1.0000, 0.9961, 0.3530);
  vec3 color = mix(gray, y, smoothstep(0.0, 0.8, d));
  color = mix(color, m, smoothstep(0.0, 0.9, d));
  color = mix(color, c, smoothstep(0.0, 1.0, d));
  return color;
}

void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 v = (vector * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 f = force / min(resolution.x, resolution.y);



  vec3 color = vec3(0.0);
  //st.y += 0.5;

  float t = time * 2.0;
  st = rotate2d(st, time*0.23);

  float r = (st.x*st.x + st.y*st.y);
  float a = atan(st.y, st.x);
  float circle = 0.0;

  for(float i = 1.0; i < 10.0; i++) {
    st.y = (sin(t + a * 1.21 * i) * 1.23 + sin(t + a * 2.120 * i) * 2.52 + sin(t + a * 0.520 * i) * 0.232) * 0.1 * i * abs(f.y*0.4) + 0.28 * i * abs(f.x * 0.5);
    circle += plot(st, r) * 0.12;
  }
  // st.y -= sin(time + a * 29.0) * 0.21 + 0.5;
  // st.y += sin(time + a * 22.0) * 0.81 + 0.5;
  //st.x += sin(time + a * 12.0 + f.x);
  color = customColor(circle);

  gl_FragColor = vec4(color, 1.0);
}