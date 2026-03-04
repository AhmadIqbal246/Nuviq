"use client";

import React, { useEffect, useRef } from "react";
import * as shaders from "@/lib/fluidShaders";

export default function FluidBackground() {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl", { alpha: true });
        if (!gl) return;

        // Texture format check
        const ext = gl.getExtension("OES_texture_half_float");
        const extLinear = gl.getExtension("OES_texture_half_float_linear");
        const internalFormat = ext ? 0x8D61 : gl.RGBA;
        const texType = ext ? 0x8D61 : gl.UNSIGNED_BYTE;

        const SIM_RES = 128;
        const DYE_RES = 512;

        const config = {
            DENSITY_DISSIPATION: 0.98,
            VELOCITY_DISSIPATION: 0.99,
            PRESSURE_ITERATIONS: 20,
            CURL: 30,
            SPLAT_RADIUS: 0.005,
            SPLAT_FORCE: 6000,
            COLORS: [
                { r: 0.42, g: 0.39, b: 1.0 }, // #6c63ff
                { r: 0.0, g: 0.85, b: 1.0 },  // #00d9ff
                { r: 0.6, g: 0.47, b: 1.0 }   // #a078ff
            ]
        };

        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }

        function createProgram(gl, vsSource, fsSource) {
            const program = gl.createProgram();
            gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
            gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
            gl.linkProgram(program);
            return program;
        }

        const programs = {
            advect: createProgram(gl, shaders.baseVertex, shaders.advection),
            splat: createProgram(gl, shaders.baseVertex, shaders.splat),
            curl: createProgram(gl, shaders.baseVertex, shaders.curl),
            vorticity: createProgram(gl, shaders.baseVertex, shaders.vorticity),
            divergence: createProgram(gl, shaders.baseVertex, shaders.divergence),
            jacobi: createProgram(gl, shaders.baseVertex, shaders.jacobi),
            gradSub: createProgram(gl, shaders.baseVertex, shaders.gradSub),
            display: createProgram(gl, shaders.baseVertex, shaders.display)
        };

        function createFBO(w, h) {
            gl.activeTexture(gl.TEXTURE0);
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, texType, null);

            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.viewport(0, 0, w, h);
            gl.clear(gl.COLOR_BUFFER_BIT);

            return { texture, fbo, width: w, height: h };
        }

        function createDoubleFBO(w, h) {
            let fbo1 = createFBO(w, h);
            let fbo2 = createFBO(w, h);
            return {
                get read() { return fbo1; },
                get write() { return fbo2; },
                swap() { [fbo1, fbo2] = [fbo2, fbo1]; }
            };
        }

        const velocity = createDoubleFBO(SIM_RES, SIM_RES);
        const dye = createDoubleFBO(DYE_RES, DYE_RES);
        const pressure = createDoubleFBO(SIM_RES, SIM_RES);
        const divergence = createFBO(SIM_RES, SIM_RES);
        const curl = createFBO(SIM_RES, SIM_RES);

        const blit = (target) => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fbo : null);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };

        const quadVerts = new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

        const init = () => {
            handleResize();
            render();
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        let lastMouseX = 0;
        let lastMouseY = 0;
        let colorIndex = 0;

        const splat = (x, y, dx, dy, color) => {
            gl.viewport(0, 0, SIM_RES, SIM_RES);
            gl.useProgram(programs.splat);
            gl.uniform2f(gl.getUniformLocation(programs.splat, "uTexelSize"), 1.0 / SIM_RES, 1.0 / SIM_RES);
            gl.uniform2f(gl.getUniformLocation(programs.splat, "uPoint"), x, y);
            gl.uniform2f(gl.getUniformLocation(programs.splat, "uResolution"), canvas.width, canvas.height);
            gl.uniform1f(gl.getUniformLocation(programs.splat, "uRadius"), config.SPLAT_RADIUS);

            // Velocity splat
            gl.uniform1i(gl.getUniformLocation(programs.splat, "uIsVelocity"), 1);
            gl.uniform2f(gl.getUniformLocation(programs.splat, "uVelocityForce"), dx, dy);
            gl.uniform1i(gl.getUniformLocation(programs.splat, "uTarget"), 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(velocity.write);
            velocity.swap();

            // Dye splat
            gl.viewport(0, 0, DYE_RES, DYE_RES);
            gl.uniform1i(gl.getUniformLocation(programs.splat, "uIsVelocity"), 0);
            gl.uniform3f(gl.getUniformLocation(programs.splat, "uColor"), color.r, color.g, color.b);
            gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
            blit(dye.write);
            dye.swap();
        };

        const onMouseMove = (e) => {
            const x = e.clientX / canvas.width;
            const y = 1.0 - e.clientY / canvas.height;
            const dx = (x - lastMouseX) * config.SPLAT_FORCE;
            const dy = (y - lastMouseY) * config.SPLAT_FORCE;

            if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
                const col = config.COLORS[colorIndex % config.COLORS.length];
                splat(x, y, dx, dy, col);
                if (Math.random() < 0.02) colorIndex++;
            }
            lastMouseX = x;
            lastMouseY = y;
        };

        const render = () => {
            const dt = 0.016;

            // Advection
            gl.viewport(0, 0, SIM_RES, SIM_RES);
            gl.useProgram(programs.advect);
            gl.uniform2f(gl.getUniformLocation(programs.advect, "uTexelSize"), 1.0 / SIM_RES, 1.0 / SIM_RES);
            gl.uniform1f(gl.getUniformLocation(programs.advect, "uDt"), dt);
            gl.uniform1f(gl.getUniformLocation(programs.advect, "uDissipation"), config.VELOCITY_DISSIPATION);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            gl.uniform1i(gl.getUniformLocation(programs.advect, "uVelocity"), 0);
            gl.uniform1i(gl.getUniformLocation(programs.advect, "uSource"), 0);
            blit(velocity.write);
            velocity.swap();

            // Dye Advection
            gl.viewport(0, 0, DYE_RES, DYE_RES);
            gl.uniform1f(gl.getUniformLocation(programs.advect, "uDissipation"), config.DENSITY_DISSIPATION);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
            gl.uniform1i(gl.getUniformLocation(programs.advect, "uVelocity"), 0);
            gl.uniform1i(gl.getUniformLocation(programs.advect, "uSource"), 1);
            blit(dye.write);
            dye.swap();

            // Display
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.useProgram(programs.display);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, dye.read.texture);
            gl.uniform1i(gl.getUniformLocation(programs.display, "uSource"), 0);
            blit(null);

            requestAnimationFrame(render);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", onMouseMove);
        init();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-80"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
