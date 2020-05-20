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
    /*
    Center the data on the origin:
        P.x -= (maxX + minX) / 2
        P.y -= (maxY + minY) / 2
    Scale it down by the same amount in both dimensions, such that the larger of the two ranges becomes (-0.5, 0.5):
        scale = max(maxX - minX, maxY - minY)
        P.x /= scale
        P.y /= scale
    Translate the points by (0.5, 0.5) to bring everything where you want it:
        P.x += 0.5
        P.y += 0.5
    */
    //float scale = min(texcoord.x, texcoord.y); 
    //float translate = (texcoord.x - texcoord.y) / 2.0; 
    
    //TODO Scale and translate by window size instead of trying to get something out of a single texel? 
    
    //vec2 transformation = texcoord * scale - translate; 
    vec2 transformation = texcoord; 
    transformation = transformation * 2.0 - 1.0; 
    
    float theta = atan(transformation.y, transformation.x); 
    float radius = pow(sqrt(pow(transformation.x, 2.0) + pow(transformation.y, 2.0)), 1.5); 
    
    transformation = vec2(radius * cos(theta), radius * sin(theta)); 
    
    FragColor = texture(image, transformation);
}
