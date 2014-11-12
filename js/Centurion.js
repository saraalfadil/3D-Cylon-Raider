/**
 * A centurion is represented by a box and a free camera.
 * @param game
 * @constructor
 */
Centurion = function(game) {

    // The game scene
    this.scene = game.scene;
    // The game
    this.game = game;

    var _this = this;

    var canvas = this.scene.getEngine().getRenderingCanvas();

    var centurionMaterial = new BABYLON.StandardMaterial("texture", this.scene);
    centurionMaterial.specularColor = new BABYLON.Color3(1.0, 0.2, 0.7);

    var centurion = game.assets['centurion'].meshes;

    for (j = 0; j < centurion.length; j++) {
        centurion[j].isVisible = true;
    }

    this.scene.activeCamera.target = centurion[0];

        //Create a scaling animation at 30 FPS
    var animationBox = new BABYLON.Animation("tutoAnimation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];
    //At the animation key 0, the value of scaling is "1"
    keys.push({
        frame: 0,
        value: 1
    });

    //At the animation key 20, the value of scaling is "0.2"
    keys.push({
        frame: 20,
        value: 0.2
    });

    //At the animation key 100, the value of scaling is "1"
    keys.push({
        frame: 100,
        value: 1
    });

    //Adding keys to the animation object
    animationBox.setKeys(keys);

    //Then add the animation object to box1
    centurion[100].animations.push(animationBox);
    console.log(game.assets['centurion'].skeletons);

    //Finally, launch animations on box1, from key 0 to key 100 with loop activated
    scene.beginAnimation(centurion[100], 0, 100, true);

};

Centurion.prototype = {

    /**
     * Init the centurion camera
     * @returns {BABYLON.FreeCamera}
     * @private
     */
    _initCamera : function() {

        var cam = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), this.scene);
        cam.attachControl(this.scene.getEngine().getRenderingCanvas());

        return cam;
    }

};