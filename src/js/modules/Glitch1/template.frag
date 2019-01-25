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

#define OCTAVES 6
float customfmb (in vec2 st, float t) {
    // Initial values
    float value = 0.0;
    float amplitude = 1.5;
    float frequency = 0.5;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        float n = random(st);
        value += sin(st.x * frequency * 2.1 + t) * 3.2 * n;
        value += sin(st.y * frequency * 0.2151 + t*1.23) * 1.5 * n;
        value += sin(distance(st.x, st.y) * frequency * 3.9211 + t*2.23) * 2.132 * n; 
        value += sin(dot(st.x, st.y) * frequency * 1.78211 + t*1.823) * 0.82132 * n; 

        // value += sin(st.y * frequency * 0.2151 + t*1.23) * 1.5;
        // value += cos(st.y * frequency * 0.2151 + t*1.23) * 1.5;

        // value += cos(st.y * frequency * 4.2) * 0.5;
        // value += sin(st.x * frequency * 2.1) * 3.2;
        frequency *= .5;
        st *= 1.2;
        amplitude *= .05;
    }
    return value;
}
void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 v = (vector * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 f = force / min(resolution.x, resolution.y);

  float t = time * 2.0;
  vec3 color = vec3(0.0);

  vec3 gray = vec3(0.9254, 0.8657, 0.8914);
  vec3 ci = vec3(0.7210, 0.9118, 0.9083);
  vec3 mz = vec3(0.9180, 0.2236, 0.9688);
  vec3 ye = vec3(1.0000, 0.9961, 0.3530);

  float r = customfmb(st*10.0, t);
  color = mix(ye, mz, r);

  vec2 _st = st*10.0;
  _st += 0.1;
  _st += noise(vec2(fract(_st.y * 0.5 + time), fract(_st.y * 0.5 + f.x))) * f.x * 15.5;
  
  float g = customfmb(_st, t);
  color = mix(color, ci, g);
  
  gl_FragColor = vec4(color, 1.0);
}