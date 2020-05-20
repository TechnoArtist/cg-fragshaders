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

precision mediump float;

in vec2 texcoord;

uniform float time;
uniform sampler2D image;

out vec4 FragColor;

void main() {
    //TODO one more transform step at the beginning, as in Fish Eye
    vec2 transform = texcoord; 
    transform = (transform * 2.0) - 1.0; 
    
    float radius = pow(sqrt(pow(transformation.x, 2.0) + pow(transformation.y, 2.0)), 1.5); 
    vec2 offset = texcoord * (sin(radius * 30.0 - time * 5.0) + 0.5) / 60.0; 
    
    FragColor = texture(image, transform + offset);
}
