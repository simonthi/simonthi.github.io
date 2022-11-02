
const canvas = document.getElementById("renderCanvas"); // Get the canvas element 
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.CameraType = ORTHOGRAPHIC;

    // Enable mouse wheel inputs.
    camera.inputs.addMouseWheel();

    // Change the mouse wheel Y axis to controll the cameras height in the scene:
    //camera.inputs.attached["mousewheel"].wheelYMoveRelative = BABYLON.Coordinate.Y;

    // Revese the mouse wheel Y axis direction:
    // camera.inputs.attached["mousewheel"].wheelPrecisionY = -1;

    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(0, 0, 0));

    // This attaches the camera to the canvas
    camera.attachControl(true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    return scene;
}
const scene = createScene(); //Call the createScene function
engine.runRenderLoop(function () { //starts the render loop
    scene.render();
});
window.addEventListener("resize", function () { //manages resizing of browser
    engine.resize();
});

// SCENE CREATED

let loadGLTF = function(scn, folder, file){
    var assetsManager = new BABYLON.AssetsManager(scn);
    let meshTask = assetsManager.addMeshTask("glb task", "", folder, file);
    meshTask.onSuccess = function (task){
        task.loadedMeshes[0].position = new BABYLON.Vector3(-4, 0, 0);
    }
    meshTask.onError = function(task, message, exception){
        console.log(message, exception);
    }
    assetsManager.load();
};