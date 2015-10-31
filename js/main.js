var ssMap = {};
$(document).ready(function main() {

	//Создаем рендер
	if(Detector.webgl)
    	var renderer = new THREE.WebGLRenderer({antialias : true});
    else
    {
    	alert("Увы, ваш браузер не поддерживает WebGL.")
    	return;
    }
    //Настраиваем рендер
    renderer.setClearColor(0x000000);
    renderer.setSize( window.innerWidth - 25, window.innerHeight - 25 );
	renderer.sortObjects = false;
	renderer.autoClear = false;
    //Добавляем в DOM
    document.body.appendChild( renderer.domElement );
    //Модель нашей системы - мы её передадим в компонент, распарсим и нарисуем
    var data = 
    {
        stars: {},
        planets: 
        [
            {type:"p", name: "SF-23 Planet 1", pos: {x:215,y:430}, moons:[]},
            {type:"p", name: "SF-23 Planet 2", pos: {x:256,y:-373}, moons:
            [
                {type:"m", name: "SF-23 Moon 2-1", id:0, pos: {x:38, y:-112}},
                {type:"m", name: "SF-23 Moon 2-2", id:1, pos: {x:52, y:134}},
                {type:"m", name: "SF-23 Moon 2-3", id:2, pos: {x:-84, y:105}}
            ]},
            {type:"p", name: "SF-23 Planet 3", pos: {x:100,y:329}, moons:[]},
            {type:"p", name: "SF-23 Planet 4", pos: {x:-206,y:-450}, moons:[]},
            {type:"p", name: "SF-23 Planet 5", pos: {x:-345,y:729}, moons:[]}
        ],
        jgs:{
            0: {type:"jg", names:
            [
                "Jumpgate Main Shipyard",
            ], id: 0, pos: {x:500, y:-50}, link: 1},
            1: {type:"jg", names:
            [
                "Jumpgate Solar Plants"
            ], id: 1, pos: {x:-440, y:400}, link: 2},
            2: {type:"jg", names:
            [
                "Jumpgate Trade Station"
            ], id: 2, pos: {x:200, y:-130}, link: 0},
            3: {type:"jg", names:
            [
                "Jumpgate Ore Mining"
            ], id: 3, pos: {x:-300, y:-280}, link: 1},
            4: {type:"jg", names:
            [
                "Jumpgate Cross"
            ], id: 4, pos: {x:-640, y:10}, link: 2}
        },
        position: {x:-440,y:400}
    };
    //Создаем компонент
    ssMap = new ssmap(renderer, data);
    //Биндим ивенты для всяких дел
    var elem = $("canvas");
    //Биндим скролл мыши для FF, все браузеры понимают mousewheel, а этот нет =/
    elem.bind("DOMMouseScroll", {camera:ssMap.camera}, ssMap.mousewheel);
    elem.bind("mousewheel", {camera:ssMap.camera}, ssMap.mousewheel);
    elem.bind("mousedown", ssMap.mousedown);
    elem.bind("mouseup", ssMap.mouseup);
    elem.bind("mousemove", {self: ssMap}, ssMap.mousemove);
    //Рисуем
    (function draw(){

        requestAnimationFrame( draw );
        
        renderer.clear();

        ssMap.draw.bind(ssMap).call(ssMap, {});
    })();
    
});
