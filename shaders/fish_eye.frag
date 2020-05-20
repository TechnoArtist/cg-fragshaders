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

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {
    float scale = max(texcoord.x, texcoord.y); 
    float translate = abs(texcoord.x - texcoord.y); 
    
    vec2 transformation = (texcoord - translate) * scale; 
    transformation = transformation * 2.0 - 1.0; 
    
    float theta = atan(transformation.y, transformation.x); 
    float radius = pow(sqrt(pow(transformation.x, 2.0) + pow(transformation.y, 2.0)), 1.5); 
    
    transformation = vec2(radius * cos(theta), radius * sin(theta)); 
    
    FragColor = texture(image, transformation);
}
