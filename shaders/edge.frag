#version 300 es

/* Edge Detection
Implement the Sobel edge detection algorithm
Retrieve color values for all texels surrounding current texel (RGB only)
Sample 1.0 / texture_width left and right, 1.0 / texture_height down and up

Compute horizontal gradient as follows:
sobel_h = bottom_right + (2.0 * center_right) + top_right - bottom_left - (2.0 * center_left) - top_left
Compute vertical gradient as follows:
sobel_v = bottom_left + (2.0 * bottom_center) + bottom_right - top_left - (2.0 * top_center) - top_right
The Sobel edge values can then be computed using the distance formula with the horizontal and vertical gradients
sobel_edge = sqrt(sobel_h^2 + sobel_v^2)
If the magnitude of the sobel edge vector is greater than or equal to 0.5, then make pixel black, otherwise make pixel normal color from the texture

Note: all modifications will be in the frag shader files.
*/

precision mediump float;

in vec2 texcoord;

uniform float width;
uniform float height;
uniform sampler2D image;

out vec4 FragColor;

void main() {
    float xd = 1.0 / width; 
    float yd = 1.0 / height; 
    vec3 bottom_left    = texture(image, vec2(texcoord.x - xd, texcoord.y - yd)).xyz; 
    vec3 bottom_center  = texture(image, vec2(texcoord.x - xd, texcoord.y     )).xyz; 
    vec3 bottom_right   = texture(image, vec2(texcoord.x - xd, texcoord.y + yd)).xyz; 
    vec3 center_left    = texture(image, vec2(texcoord.x,      texcoord.y - yd)).xyz; 
    //vec3 center_center  = texture(image, vec2(texcoord.x,      texcoord.y     )).xyz; 
    vec3 center_right   = texture(image, vec2(texcoord.x,      texcoord.y + yd)).xyz; 
    vec3 top_left       = texture(image, vec2(texcoord.x + xd, texcoord.y - yd)).xyz; 
    vec3 top_center     = texture(image, vec2(texcoord.x + xd, texcoord.y     )).xyz; 
    vec3 top_right      = texture(image, vec2(texcoord.x + xd, texcoord.y + yd)).xyz; 
    
    vec3 sobel_h = bottom_right + (2.0 * center_right) + top_right - bottom_left - (2.0 * center_left) - top_left; 
    vec3 sobel_v = bottom_left + (2.0 * bottom_center) + bottom_right - top_left - (2.0 * top_center) - top_right; 
    
    float sobel_edge = sqrt(pow(max(sobel_h.x, max(sobel_h.y, sobel_h.z)), 2.0) + pow(max(sobel_v.x, max(sobel_v.y, sobel_v.z)), 2.0)); 
    
    if(sobel_edge < 0.5) FragColor = vec4(0.0, 0.0, 0.0, 1.0); 
    else FragColor = texture(image, texcoord);
}
