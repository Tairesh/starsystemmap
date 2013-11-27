function ssmap(renderer, data)
{
    //Создаем сцены
    this.scene = new THREE.Scene(); //Звезды и деления квадрантов
    this.sceneOrbits = new THREE.Scene(); //Звезды и деления квадрантов
    this.sceneMoonsOrbits = new THREE.Scene(); //Звезды и деления квадрантов
    this.sceneLinks = new THREE.Scene(); //Звезды и деления квадрантов
    this.sceneText = new THREE.Scene(); //Звезды и деления квадрантов
    //Камера
    this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 100000000 );
    this.camera.position.set( 0, 0, 1000 );
    this.camera.scale.x = this.camera.scale.y = 1.52;

    this.domEvent = new THREEx.DomEvent(this.camera, renderer.domElement);


	this.events.bind(this).call(this, {}); //events.js
	this.objects.bind(this).call(this, data); //objects.js

    this.draw = function() {
        renderer.render(this.sceneOrbits, this.camera );
        renderer.render(this.sceneMoonsOrbits, this.camera );
        renderer.render(this.sceneLinks, this.camera );
        renderer.render(this.scene, this.camera );
        renderer.render(this.sceneText, this.camera );

    }
}