uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
/*
 * Random number generator with a vec2 seed
 *
 * Credits:
 * http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0
 * https://github.com/mattdesl/glsl-random
 */
highp float random2d(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt = dot(co.xy, vec2(a, b));
    highp float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
}

vec3 blur() {
    vec2 square = floor(gl_FragCoord.xy / 100.0);
    vec3 color = vec3(0.0);
    vec2 off1 = vec2(1.3333333333333333) * 100.0;
    square = floor((gl_FragCoord.xy + u_mouse) / 100.0);
    color += vec3(random2d(square), random2d(square * 1.345), 1.0) * 0.29411764705882354;
    square = floor((gl_FragCoord.xy + u_mouse)  / 100.0 + (off1 / u_resolution));
    color += vec3(random2d(square), random2d(square * 1.345), 1.0) * 0.35294117647058826;
    square = floor((gl_FragCoord.xy + u_mouse)  / 100.0 - (off1 / u_resolution));
    color += vec3(random2d(square), random2d(square * 1.345), 1.0) * 0.35294117647058826;
    return color; 
}

void main() {
    gl_FragColor = vec4(blur(), 1.0);
}