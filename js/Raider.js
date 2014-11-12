/**
 * A raider is represented by a box and a free camera.
 * @param game
 * @constructor
 */
Raider = function(game) {

    // The game scene
    this.scene = game.scene;
    // The game
    this.game = game;

    // The raider camera
    //this.camera = this._initCamera();

    var _this = this;

    var canvas = this.scene.getEngine().getRenderingCanvas();

    var raider = game.assets['raider'].meshes;
    raider[0].isVisible = true;

    var raiderMaterial = new BABYLON.StandardMaterial("texture2", this.scene);
    raiderMaterial.diffuseTexture = new BABYLON.Texture("texture.jpg", this.scene);
    //raiderMaterial.specularColor = new BABYLON.Color3(0, 50, 0);

    this.scene.activeCamera.target = raider[0];
    raider[0].material = raiderMaterial;

};

Raider.prototype = {

    /**
     * Init the raider camera
     * @returns {BABYLON.FreeCamera}
     * @private
     */
    _initCamera : function() {

        var cam = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), this.scene);
        cam.attachControl(this.scene.getEngine().getRenderingCanvas());

        return cam;
    }

};