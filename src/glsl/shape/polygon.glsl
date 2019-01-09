float polygon (vec2 st, int N, float s) {
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  float d = cos(floor(.5+a/r)*r-a)*length(st);
  d = 1.0 - smoothstep(s, s+0.01, d);
  return d;
}