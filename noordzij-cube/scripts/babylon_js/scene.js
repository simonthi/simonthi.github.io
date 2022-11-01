
const canvas = document.getElementById("renderCanvas"); // Get the canvas element 
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    scene.createDefaultCameraOrLight(true, true, true);
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
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
    }
    meshTask.onError = function(task, message, exception){
        console.log(message, exception);
    }
    assetsManager.load();
};

const isTargetIn = (startPosition, endPosition, target, camera) => {
    // get the screen XY of the target, converted from its world coordinate
    const targetScreenPosition = BABYLON.Vector3.Project(
        target,
        BABYLON.Matrix.IdentityReadOnly,
        scene.getTransformMatrix(),
        camera.viewport.toGlobal(
            scene.getEngine().getRenderWidth(),
            scene.getEngine().getRenderHeight()
        )
    )

    const minX = Math.min(startPosition.x, endPosition.x)
    const minY = Math.min(startPosition.y, endPosition.y)
    const maxX = Math.max(startPosition.x, endPosition.x)
    const maxY = Math.max(startPosition.y, endPosition.y)

    // check if the target's screen XY is inside of the dragBox XY range or not
    if (
        targetScreenPosition.x >= minX &&
        targetScreenPosition.x <= maxX &&
        targetScreenPosition.y >= minY &&
        targetScreenPosition.y <= maxY
    ) {
        return true
    }
    return false
}