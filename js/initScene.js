var Preloader = Preloader || {
    VERSION : 0.1,
    AUTHOR : 'Sara'
};

Preloader.Game = function(canvasId) {

    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);

    this.scene = this._initScene(engine);

    this.loader = new Preloader("models/", this.scene, this, {textId:'loadingValue'});
    this.loader.add("raider", "", "raider.babylon");
    //this.loader.add("centurion", "", "centurion4.babylon");
    this.loader.start();

    // The loaded assets
    this.assets = null;

    this.ready = false;

    // The render function
    var _this = this;
    engine.runRenderLoop(function () {
        if (_this.isReady()) {
            _this.scene.render();
        }
    });

    // Resize the babylon engine when the window is resized
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
        }
    },false);
};


Preloader.Game.prototype = {

    isReady : function() {
        return this.ready;
    },

    notify : function(assets) {
        this.assets = assets;

        var _this = this;
        this.raider = new Raider(_this);
        //this.centurion = new Centurion(_this);

        this.ready = true;
        document.getElementById("loadingWrapper").style.transform = "translateX(-300%)";
    },

    _setupMenu : function() {

    },

    /**
     * Init the environment of the game / skybox, camera, ...
     */
    _initScene : function(engine) {

        scene = new BABYLON.Scene(engine);

        // Update the scene background color
        scene.clearColor = new BABYLON.Color3(0,0,0);

        /* BSG Soundtrack
        var audio;
        audio = document.createElement("audio");
        audio.src = "bsgtitle.mp3";
        audio.play();*/

        // Skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("nebula", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("nebula/nebula", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        //Adding a light
        var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

        // Camera attached to the canvas
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 40, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(engine.getRenderingCanvas());

        // Move the light with the camera
        scene.registerBeforeRender(function () {
            light.position = camera.position;
        });

        return scene;
    }
};

// The function onload is loaded when the DOM has been loaded
document.addEventListener("DOMContentLoaded", function () {
    new Preloader.Game('renderCanvas');
}, false);



