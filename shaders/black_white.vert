#version 300 es

/* Black and White
Luminance is calculated as L = 0.299 * Red + 0.587 * Green + 0.114 * Blue
Black and white images are created by assigning the luminance value to all 3 color components
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
