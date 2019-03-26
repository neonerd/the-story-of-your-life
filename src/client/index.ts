console.log('=== The Story of Your Life')

// ===
// === BROWSER SETPU
// ===
const monitorSettings = {
    w: window.innerWidth,
    h: window.innerHeight
}

// ===
// === APPLICATION SETUP
// ===

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
    width: monitorSettings.w,         // default: 800
    height: monitorSettings.h,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
})
app.renderer.view.style.position = "absolute"
app.renderer.view.style.display = "block"
app.renderer.autoResize = true

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

// The stage is the root container that will hold everything in our scene
const stage = new PIXI.Container()
const photo = PIXI.Sprite.fromImage("/res/stills_nos/tumblr_mw87reA3de1sfie3io1_1280.jpg")
photo.x = monitorSettings.w / 2;
photo.y = monitorSettings.h / 2;
// Make sure the center point of the image is at its center, instead of the default top left
photo.anchor.set(0.5);
// Add it to the screen
stage.addChild(photo);

//Get shader code as a string
var shaderCode = document.getElementById("shader-film-grain").innerHTML
//Create our Pixi filter using our custom shader code
var simpleShader = new PIXI.Filter('',shaderCode);
//Apply it to our object
photo.filters = [simpleShader]

function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);
    // do time delta
    (simpleShader.uniforms as any).time.value = (simpleShader.uniforms as any).time.value+1
    // this is the main render call that makes pixi draw your container and its children.
    app.renderer.render(stage);
}
animate()