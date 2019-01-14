// Author @kyndinfo - 2016
// http://www.kynd.info
// Title: Easing Functions

float easeInQuad(float t) {
    return t * t;
}

float easeOutQuad(float t) {
    return -1.0 * t * (t - 2.0);
}

float easeInOutQuad(float t) {
    if ((t *= 2.0) < 1.0) {
        return 0.5 * t * t;
    } else {
        return -0.5 * ((t - 1.0) * (t - 3.0) - 1.0);
    }
}

float easeInCubic(float t) {
    return t * t * t;
}

float easeOutCubic(float t) {
    return (t = t - 1.0) * t * t + 1.0;
}

float easeInOutCubic(float t) {
    if ((t *= 2.0) < 1.0) {
        return 0.5 * t * t * t;
    } else {
        return 0.5 * ((t -= 2.0) * t * t + 2.0);
    }
}

float easeInExpo(float t) {
    return (t == 0.0) ? 0.0 : pow(2.0, 10.0 * (t - 1.0));
}

float easeOutExpo(float t) {
    return (t == 1.0) ? 1.0 : -pow(2.0, -10.0 * t) + 1.0;
}

float easeInOutExpo(float t) {
    if (t == 0.0 || t == 1.0) {
        return t;
    }
    if ((t *= 2.0) < 1.0) {
        return 0.5 * pow(2.0, 10.0 * (t - 1.0));
    } else {
        return 0.5 * (-pow(2.0, -10.0 * (t - 1.0)) + 2.0);
    }
}