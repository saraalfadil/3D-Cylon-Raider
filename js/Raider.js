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
    raiderMaterial.specularColor = new BABYLON.Color3(0.5, 0, 0);
    raiderMaterial.emissiveColor = new BABYLON.Color3(0.3, 0, 0);

    this.scene.activeCamera.target = raider[0];
    raider[0].material = raiderMaterial;
    
    // Store reference to raider mesh for animation
    this.raiderMesh = raider[0];
    
    this.elapsedTime = 0;
    
    // Setup animation
    this._setupAnimations();

};

Raider.prototype = {

    /**
     * Setup animations for the raider
     * @private
     */
    _setupAnimations : function() {
        var _this = this;
        var orbitRadius = 15;
        var orbitSpeed = 0.003;
        
        // Register animation loop
        this.scene.registerBeforeRender(function() {
            _this.elapsedTime += 0.016; // ~60fps
            
            // Orbital movement
            _this.raiderMesh.position.x = Math.cos(_this.elapsedTime * orbitSpeed) * orbitRadius;
            _this.raiderMesh.position.z = Math.sin(_this.elapsedTime * orbitSpeed) * orbitRadius;
            
            // Rotate the raider on Y axis
            _this.raiderMesh.rotation.y += 0.005;
            
            // Pulsing glow effect
            var glowIntensity = 0.3 + 0.15 * Math.sin(_this.elapsedTime * 2);
            _this.raiderMesh.material.emissiveColor = new BABYLON.Color3(glowIntensity, 0, 0);
        });
    },

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