#version 300 es

/* Black and White
Luminance is calculated as L = 0.299 * Red + 0.587 * Green + 0.114 * Blue
Black and white images are created by assigning the luminance value to all 3 color components
*/

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {
    vec4 colors = texture(image, texcoord); 
    float luminance = 0.299 * colors.x + 0.587 * colors.y + 0.114 * colors.z; 
    FragColor = vec4(luminance, luminance, luminance, colors.w); 
}
