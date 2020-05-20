#version 300 es

/* Toonify
This filter will round each color component to one of 5 levels (0.0, 0.25, 0.5, 0.75, 1.0)
Rounding can be done by multiplying by 4.0, then rounding, then dividing by 4.0
The result should be a cartoon-ish looking image
*/

precision highp float;

in vec3 vertex_position;
in vec2 vertex_texcoord;

uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec2 texcoord;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    texcoord = vertex_texcoord;
}
