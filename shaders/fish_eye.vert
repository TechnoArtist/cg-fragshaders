#version 300 es

/* Fish Eye
This optical effect can be accomplished with a barrel distortion
In order to accomplish a barrel distortion, implement the following equations:
scale and translate the texture coordinate such that it is in the range [-1.0, 1.0]
multiply by 2, then subtract 1
calculate 𝜽 = arctan(texture_coordinate_y, texture_coordinate_x)
calculate radius = magnitude of texture coordinate, raised to the power of 1.5
calculate final texture coordinate = (radius * cos(𝜽),  radius * sin(𝜽))
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
