#version 300 es

/* Ripple
This filter creates a ripple effect similar to dropping a pebble in a pond
In order to accomplish a ripple effect, implement the following equations:
scale and translate the texture coordinate such that it is in the range [-1.0, 1.0]
multiply by 2, then subtract 1
calculate radius = magnitude of texture coordinate
calculate a texture coordinate offset = texture_coordinate * (sin(radius * 30.0 - time * 5.0) + 0.5) / 60.0
calculate final texture coordinate = original_texture_coordinate + texture_coordinate_offset
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
