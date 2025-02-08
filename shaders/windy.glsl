uniform vec2 iResolution; // Ensure this is defined
uniform float iTime; // Ensure this is defined

const mat2 mtx = mat2( .90,  .10, -.40,  .80 );

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(-0.490,-0.250))) * 900000.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm( vec2 p ) {
    float f = -0.0;
    f += 0.500000*noise( p + iTime  ); p = mtx*p*1.2;
    f += 0.15*noise( p ); p = mtx*p*2.01;
    f += 0.10*noise( p ); p = mtx*p*2.03;
    f += 0.141*noise( p ); p = mtx*p*1.01;
    f += 0.062500*noise( p ); p = mtx*p*1.04;
    f += -0.168*noise( p + sin(iTime) );
    return f/1.09;
}

float pattern( in vec2 p ) {
    return fbm( p + fbm( p + fbm( p ) ) );
}

vec3 colormap(float x) {
    vec3 amethyst = vec3(0.557, 0.329, 0.600);
    vec3 electricBlue = vec3(0.251, 0.718, 0.961);
    vec3 royalPurple = vec3(0.361, 0.251, 0.631);
    vec3 marianBlue = vec3(0.212, 0.325, 0.573);
    vec3 blueGreen = vec3(0.388, 0.675, 0.529);
    
    if (x < 0.25) {
        return mix(marianBlue, blueGreen, smoothstep(0.0, 0.25, x));
    } else if (x < 0.5) {
        return mix(blueGreen, electricBlue, smoothstep(0.25, 0.5, x));
    } else if (x < 0.75) {
        return mix(electricBlue, royalPurple, smoothstep(0.5, 0.75, x));
    } else {
        return mix(royalPurple, amethyst, smoothstep(0.75, 1.0, x));
    }
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution; // Use iResolution for UV calculation
    float shade = pattern(uv);
    fragColor = vec4(colormap(shade), shade);
}

// Ensure the main function is compatible with the shader component
void main() {
    vec4 fragColor;
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor; // Set the output color
}