export const baseVertex = `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 uTexelSize;

    void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(uTexelSize.x, 0.0);
        vR = vUv + vec2(uTexelSize.x, 0.0);
        vT = vUv + vec2(0.0, uTexelSize.y);
        vB = vUv - vec2(0.0, uTexelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

export const advection = `
    precision highp float;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 uTexelSize;
    uniform float uDt;
    uniform float uDissipation;
    varying vec2 vUv;

    void main() {
        vec2 vel = texture2D(uVelocity, vUv).xy;
        vec2 prevPos = vUv - vel * uDt * uTexelSize;
        gl_FragColor = texture2D(uSource, prevPos) * uDissipation;
    }
`;

export const splat = `
    precision highp float;
    uniform sampler2D uTarget;
    uniform vec2 uPoint;
    uniform vec3 uColor;
    uniform float uRadius;
    uniform bool uIsVelocity;
    uniform vec2 uVelocityForce;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
        vec2 p = vUv - uPoint;
        p.x *= uResolution.x / uResolution.y;
        float splatEffect = exp(-dot(p, p) / uRadius);
        vec4 base = texture2D(uTarget, vUv);

        if (uIsVelocity) {
            gl_FragColor = base + vec4(uVelocityForce * splatEffect, 0.0, 0.0);
        } else {
            gl_FragColor = base + vec4(uColor * splatEffect, 0.0);
        }
    }
`;

export const curl = `
    precision highp float;
    uniform sampler2D uVelocity;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;

    void main() {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`;

export const vorticity = `
    precision highp float;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float uCurlStrength;
    uniform float uDt;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;

    void main() {
        float L = abs(texture2D(uCurl, vL).x);
        float R = abs(texture2D(uCurl, vR).x);
        float T = abs(texture2D(uCurl, vT).x);
        float B = abs(texture2D(uCurl, vB).x);
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(T - B, R - L);
        force /= length(force) + 0.0001;
        force *= uCurlStrength * C;

        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * uDt, 0.0, 1.0);
    }
`;

export const divergence = `
    precision highp float;
    uniform sampler2D uVelocity;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;

    void main() {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`;

export const pressure = `
    precision highp float;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;

    void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uDivergence, vR).x; // Wait, this should use UV
        // We'll fix this in the actual Jacob step by passing correct UV
        // Standard Jacob pass:
    }
`;

// More robust Jaccobi pass
export const jacobi = `
    precision highp float;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;

    void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float div = texture2D(uDivergence, vUv).x;
        gl_FragColor = vec4(0.25 * (L + R + B + T - div), 0.0, 0.0, 1.0);
    }
`;

export const gradSub = `
    precision highp float;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;

    void main() {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel - 0.5 * vec2(R - L, T - B), 0.0, 1.0);
    }
`;

export const display = `
    precision highp float;
    uniform sampler2D uSource;
    varying vec2 vUv;

    void main() {
        vec3 c = texture2D(uSource, vUv).rgb;
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`;

export const warpEffect = `
    uniform vec2 uBlackHoleScreenPos;
    uniform float uStrength;
    uniform float uRadius;

    void mainUv(inout vec2 uv) {
        vec2 delta = uv - uBlackHoleScreenPos;
        float dist = length(delta);

        if (dist < uRadius) {
            float warp = uStrength * (1.0 - dist / uRadius);
            warp = warp * warp;
            uv -= normalize(delta) * warp;
        }
    }
`;
