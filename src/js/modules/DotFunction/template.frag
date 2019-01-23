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


void main() {
  //正規化
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 m = (mouse * 2.0 - resolution) / max(resolution.x, resolution.y);
  vec2 f = (force * 2.0 - resolution) / max(resolution.x, resolution.y) * 0.5;

  vec3 color = vec3(0.0);

      //極座標
  float d = distance(st, vec2(0.0));
  float a = atan(st.y, st.x) / TWO_PI;

  float sn = snoise(st * d);

  vec2 rd = normalize(vec2(abs(st.x), abs(st.y))) * 1.0;
  //vec2 _st = vec2(d, a);
  float map = 0.0;

  for(float i = 1.0; i < 15.0; i++) {
      float t = time * 2.0 * i;

      float c = ( cos(t + 0.1352 + a + i * TWO_PI/15.0) * 1.292 + cos(t + 0.824 + a + i * TWO_PI/15.0) * 0.821 + cos(t + a + i * TWO_PI/15.0) ) / 3.0  * sn;
      float s = ( sin(t + 0.852 + a + i * TWO_PI/15.0) * 2.0192 + sin(t + 0.391 + a + i * TWO_PI/15.0) * 1.821 + sin(t + 1.392 + a + i * TWO_PI/15.0) ) / 3.0  * sn;

      float c1 = ( cos(t + 0.3829 + d * i * TWO_PI/15.0) * 2.292 + cos(t + 1.824 + d + i * TWO_PI/15.0) * 0.2451 + cos(t + d + i * TWO_PI/15.0) ) / 3.0;
      float s1 = ( sin(t + 0.58352 + d + i * TWO_PI/15.0) * 1.292 + sin(t + 1.824 + d + i * TWO_PI/15.0) * 1.2321 + sin(t + d + i * TWO_PI/20.0) ) / 3.0;


      vec2 _st = vec2(
        abs(rd.x * dot(cos(time + abs(c * rd.y)), sin(time + abs(s * rd.y)))),
        abs(rd.y * dot(cos(time + abs(c1 * rd.y)), sin(time + abs(s1 * rd.y))))
      );

      _st *= 1.0;

      map += dot(_st.x, _st.y);
  }

  color = mix(vec3(0.4970, 0.8519, 0.9606), vec3(0.9437, 0.9479, 0.3706), smoothstep(0.0, 0.7, map));

  gl_FragColor = vec4(color, 1.0);
}