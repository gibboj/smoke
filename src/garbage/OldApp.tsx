import { fragmentShaderSource, vertexShaderSource } from "../shaders"
import { resizeCanvasToDisplaySize } from "../utils"
import './App.css';
import React, { RefObject, useEffect } from "react";
import useWindowSize from "../useWindowSize";

// three 2d points
const positions = [
  0, 0,
  0, 0.5,
  0.7, 0,
];

function init(gl: WebGL2RenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  if (!vertexShader || !fragmentShader) {
    throw new Error("vertext or frament shader creation failed")
  }
  const program = createProgram(gl, vertexShader, fragmentShader)
  if (!program) {
    throw new Error("program creation failed")
  }
  const vao = gl.createVertexArray()

  setupAttributeData(gl, vao!, program)
  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);
  // Bind the attribute/buffer set we want.
  gl.bindVertexArray(vao);
  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);
}

function setupAttributeData(gl: WebGL2RenderingContext, vao: WebGLVertexArrayObject, program: WebGLProgram) {
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  gl.bindVertexArray(vao)
  gl.enableVertexAttribArray(positionAttributeLocation)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset)
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram()
  if (!program) {
    throw new Error("program creation failed")
  }
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  // check success
  var success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) return program;
  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) {
    throw new Error("shader creation failed")
  }
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;
  console.log("Create Shader:", gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

function OldApp() {
  const size = useWindowSize();
  const canvasRef: RefObject<HTMLCanvasElement> = React.createRef();

  useEffect(() => {
    if (canvasRef.current) {

      resizeCanvasToDisplaySize(canvasRef.current);
    }
  }, [size, canvasRef])

  useEffect(() => {
    var gl = (canvasRef.current as HTMLCanvasElement).getContext("webgl2");
    if (!gl) {
      // no webgl2 for you!
      return
    }
    init(gl)
  }, [canvasRef]);

  return (
    <div className="App">
      <canvas id="c" style={{ 'border': "2px solid green" }} className="full-height full-width" ref={canvasRef} ></canvas>
    </div>
  );
}

export default OldApp;
