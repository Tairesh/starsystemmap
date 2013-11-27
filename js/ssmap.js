function ssmap(renderer, data)
{
    //Создаем сцены
    this.scene = new THREE.Scene(); //Основная сцена
    this.sceneOrbits = new THREE.Scene(); //Орбиты
    this.sceneMoonsOrbits = new THREE.Scene(); //Орбиты лун
    this.sceneLinks = new THREE.Scene(); //Линки гейтов
    this.sceneText = new THREE.Scene(); //Текст
    //Камера
    this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 100000000 );
    this.camera.position.set( 0, 0, 1000 );
    this.camera.scale.x = this.camera.scale.y = 1.52;
    //сторонее threex расширение
    this.domEvent = new THREEx.DomEvent(this.camera, renderer.domElement);
    //События делаем
	this.events.bind(this).call(this, {}); //events.js
    //Скармливаем модель системы функции для рисования
	this.objects.bind(this).call(this, data); //objects.js

    this.draw = function() {
        renderer.render(this.sceneOrbits, this.camera );
        renderer.render(this.sceneMoonsOrbits, this.camera );
        renderer.render(this.sceneLinks, this.camera );
        renderer.render(this.scene, this.camera );
        renderer.render(this.sceneText, this.camera );

    }
}