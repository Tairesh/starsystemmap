ssmap.prototype.objects = function(data) {

    this.addStar = function(pos) {
        //Задаем радиус круга
        var radius = 50;
        //Создаем канвас в ширину и в высоту равный диаметру круга
        var canvas = document.createElement('canvas');
        canvas.width = radius*2;
        canvas.height = radius*2;
        //Задаем хар-ки круга и рисуем
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "#fff";
        ctx.beginPath();   
        ctx.arc(radius,radius,radius,0,2*Math.PI);
        ctx.fill();
        //Создаем текстуру на основе канваса
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;
        //Создаем точку расположения звезды
        var vertex = new THREE.Vector3();
        vertex.x = pos.x;
        vertex.y = pos.y;
        vertex.z = 0;
        //Создаем геометрию
        var geometry = new THREE.Geometry();
        //В список вершин геометрии заносим выше созданную точку
        geometry.vertices.push( vertex );
        //Создаем материал
        material = new THREE.ParticleBasicMaterial( { size: 215, map: texture, transparent: true } );
        //Создаем систему частиц и добавляем её в сцену
        particles = new THREE.ParticleSystem( geometry, material );
        particles.sortParticles = true;

        this.scene.add(particles);
    }

    this.addPlanet = function(name, id, pos)
    {
        var radius = 15;
        //Создаем канвас
        var canvas = document.createElement('canvas');
        canvas.width = radius*2;
        canvas.height = radius*2;
     
        //Задаем хар-ки и рисуем
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#666";
        ctx.fillStyle = "#444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(radius,radius,radius-2,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        //Создаем текстуру на основе канваса
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;

        var vertex = new THREE.Vector3();
        vertex.x = pos.x;
        vertex.y = pos.y;
        vertex.z = 0;

        var geometry = new THREE.Geometry();

        geometry.vertices.push( vertex );

        var material = new THREE.ParticleBasicMaterial( { size: 55, sizeAttenuation: true, map: texture, transparent: true } );
        material.color.setHex(0xaaaaaa);

        var particles = new THREE.ParticleSystem( geometry, material );
        particles.sortParticles = true;
        //Добавляем текстовую надпись
        particles.text = addText.bind(this).call(this, pos, name);
        //Добавляем орбиту.
        particles.orbit = this.addOrbit({x:0,y:0}, vectorLength(pos));
        this.sceneOrbits.add(particles.orbit);
        //Подсветка
        this.domEvent.bind(particles, "mouseover", function(e){
            e.target.material.color.setHex(0xffffff);
            e.target.orbit.hover();
        });
        this.domEvent.bind(particles, "mouseout", function(e){
            e.target.material.color.setHex(0xaaaaaa);
            e.target.orbit.unhover();
        });
    
        this.scene.add(particles);
    }
    //Маркер положения в системе
    this.addCurrPosMarker = function(pos)
    {
        var radius = 5;
        //Создаем канвас
        var canvas = document.createElement('canvas');
        canvas.width = radius*2;
        canvas.height = radius*2;
     
        //Задаем хар-ки и рисуем
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#f00";
        ctx.fillStyle = "#f00";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.rect(0,0,radius,radius);
        ctx.fill();
        //Создаем текстуру на основе канваса
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;

        var vertex = new THREE.Vector3();
        vertex.x = pos.x;
        vertex.y = pos.y-25;
        vertex.z = 0;

        var geometry = new THREE.Geometry();

        geometry.vertices.push( vertex );

        var material = new THREE.ParticleBasicMaterial( { size: 55, sizeAttenuation: true, map: texture, transparent: true } );
        material.color.setHex(0xcccccc);

        var particles = new THREE.ParticleSystem( geometry, material );
        particles.sortParticles = true;

        particles.text = addText.bind(this).call(this, {x:pos.x, y:pos.y-45}, "Текущая позиция");
        
        this.domEvent.bind(particles, "mouseover", function(e){
            e.target.material.color.setHex(0xffffff);
        });
        this.domEvent.bind(particles, "mouseout", function(e){
            e.target.material.color.setHex(0xcccccc);
        });
    
        this.scene.add(particles);
    }

    this.addMoon = function(name, id, pos, planetPos)
    {
        var radius = 8;
        //Создаем канвас
        var canvas = document.createElement('canvas');
        canvas.width = radius*2;
        canvas.height = radius*2;
     
        //Задаем хар-ки и рисуем
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#555";
        ctx.fillStyle = "#666";
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(radius,radius,radius-2,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        //Создаем текстуру на основе канваса
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;

        var vertex = new THREE.Vector3();
        vertex.x = planetPos.x + pos.x;
        vertex.y = planetPos.y + pos.y;
        vertex.z = 0;

        var geometry = new THREE.Geometry();

        geometry.vertices.push( vertex );

        var material = new THREE.ParticleBasicMaterial( { size: 55, sizeAttenuation: true, map: texture, transparent: true } );
        material.color.setHex(0xaaaaaa);

        var particles = new THREE.ParticleSystem( geometry, material );
        particles.sortParticles = true;

        particles.text = addText.bind(this).call(this, vertex, name);
        //Ставим центр окружности на позицию планеты, а радиус задаем как длину вектора позиции луны
        particles.orbit = this.addOrbit(planetPos, vectorLength(pos));

        this.sceneMoonsOrbits.add(particles.orbit);

        this.domEvent.bind(particles, "mouseover", function(e){
            e.target.material.color.setHex(0xffffff);
            e.target.orbit.hover();
        });
        this.domEvent.bind(particles, "mouseout", function(e){
            e.target.material.color.setHex(0xaaaaaa);
            e.target.orbit.unhover();
        });
    
        this.scene.add(particles);
    }

    this.addJG = function(names, id, pos)
    {
        var len = 20;
        //Создаем канвас
        var canvas = document.createElement('canvas');
        canvas.width = len*2;
        canvas.height = len*2;
     
        //Задаем хар-ки и рисуем
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#333";
        ctx.fillStyle = "#f00";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(len/2, 0);
        ctx.lineTo(0, len);
        ctx.lineTo(len, len);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        //Создаем текстуру на основе канваса
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;

        var vertex = new THREE.Vector3();
        vertex.x = pos.x;
        vertex.y = pos.y;
        vertex.z = 0;

        var geometry = new THREE.Geometry();

        geometry.vertices.push( vertex );

        var material = new THREE.ParticleBasicMaterial( { size: 65, sizeAttenuation: true, map: texture, transparent: true } );
        material.color.setHex(0xaaaaaa);

        var particles = new THREE.ParticleSystem( geometry, material );
        particles.sortParticles = true;

        particles.type = "jg";
        particles.id = id;

        particles.link = [];
        particles.link2 = [];
        particles.text = [];

        particles.orbit = this.addOrbit({x:0,y:0}, vectorLength(pos));

        for (var i = 0; i < names.length; i++) {
            particles.text[i] = addText.bind(this).call(this, pos, names[i]);
        }
        this.sceneOrbits.add(particles.orbit);
        //Подсветка
        this.domEvent.bind(particles, "mouseover", function(e){
            e.target.material.color.setHex(0xffffff);
            for (var i = 0; i < e.target.link.length; i++) {
                e.target.link[i].material.color.setHex(0xffffff);
            }
           for (var i = 0; i < e.target.link2.length; i++) {
                e.target.link2[i].material.color.setHex(0xffffff);
            }
            e.target.orbit.hover();
        });
        this.domEvent.bind(particles, "mouseout", function(e){
            e.target.material.color.setHex(0xaaaaaa);
            for (var i = 0; i < e.target.link.length; i++) {
                e.target.link[i].material.color.setHex(0xaaaaaa);
            }
            for (var i = 0; i < e.target.link2.length; i++) {
                e.target.link2[i].material.color.setHex(0xaaaaaa);
            }
           e.target.orbit.unhover();
        });
    
        this.scene.add(particles);

        return particles;
    }

    this.addOrbit = function(pos, radius)
    {
        //Задаем размер сегмента. 
        var resolution = 170;
        var size = 360 / resolution;
        //Геометрия и материал
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { color: 0x666666} );
        material.color.setHex(0x666666);
        for(var i = 0; i <= resolution; i++) {
            //Вычисляем угол сегмента, т.е. наш размер * смещение * 1 радиан.
            var segment = ( i * size ) * Math.PI / 180;
            //Вычисляем кординаты как косинус\синус угла нашего сегмента, что есть координата х\y для единичного радиуса, и умножаем на радиус, т.е. отдаляем координату.
            geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( Math.cos( segment ) * radius, Math.sin( segment ) * radius ), 0 ) );         
        }
        //Создаем линию и устанавливаем её позицию
        var line = new THREE.Line( geometry, material );
        line.position.x = pos.x;
        line.position.y = pos.y;

        //Подсветка
        line.hover = function() {
            this.material.color.setHex(0xffffff);
        };
        line.unhover = function() {
            this.material.color.setHex(0x666666);
        };

        this.scene.add(line);

        return line;

    }
    this.addLine = function(pos1, pos2)
    {
        var material = new THREE.LineBasicMaterial({
            color: 0xaaaaaa
        });

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(pos1.x, pos1.y, 0));
        geometry.vertices.push(new THREE.Vector3(pos2.x, pos2.y, 0));

        var line = new THREE.Line(geometry, material);

        this.sceneLinks.add(line);

        return line;
    }

    var vectorLength = function(vec) {
        return Math.sqrt(vec.x*vec.x + vec.y*vec.y);
    }
    //Рисование текста
    var addText = function(pos, text)
    {

        var g = new THREE.Geometry();

        var backgroundMargin = 50;
        var canvas1 = document.createElement('canvas');
        var context1 = canvas1.getContext('2d');

        canvas1.width = 900;
        canvas1.height = 900;

        context1.font = "Normal "+(40*2)+"px Tahoma";
        context1.fillStyle = "rgba(255,255,255,1)";
        context1.textAlign = "center";
        context1.fillStyle = "#fff";
        context1.textBaseline = "middle";
        context1.fillText(text, canvas1.width / 2, canvas1.height / 2);
        

        var texture1 = new THREE.Texture(canvas1) 
        texture1.needsUpdate = true;


        var v = new THREE.Vector3();
        v.x = pos.x;
        v.y = pos.y + 10;
        v.z = 0;

        g.vertices.push( v );

        var material = new THREE.ParticleBasicMaterial( { size: 415, sizeAttenuation: true, map: texture1, transparent: true } );
        
        var p1 = new THREE.ParticleSystem( g, material );
        p1.sortParticles = true;

        this.sceneText.add( p1 );
        return p1;
    }
    //Парсим модель
    //Добавляем звезду
    this.addStar({x:0,y:0});
    //Добавляем планеты
    for (var i = 0; i < data.planets.length; i++) {
        this.addPlanet(data.planets[i].name, i, data.planets[i].pos);
        //Добавляем луны
        for (var v = 0; v < data.planets[i].moons.length; v++) {
            
           this.addMoon(data.planets[i].moons[v].name, data.planets[i].moons[v].id, data.planets[i].moons[v].pos, data.planets[i].pos);
        }
    }
    //Добавляем врата
    var list = {};
    for (var v in data.jgs) {
        list[data.jgs[v].id] = this.addJG(data.jgs[v].names, v, data.jgs[v].pos);
    }
    //Строим связи между вратами
    for (var v in list) {
        //Строим связь между двумя гейтами(туда и обратно)
        list[data.jgs[v].id].link.push(this.addLine(data.jgs[v].pos, data.jgs[data.jgs[v].link].pos));
        list[data.jgs[v].link].link.push(this.addLine(data.jgs[v].pos, data.jgs[data.jgs[v].link].pos));
        //Магия
        list[data.jgs[v].id].link2.push(list[data.jgs[v].link].link[list[data.jgs[v].link].link.length -1]);
        list[data.jgs[v].link].link2.push(list[data.jgs[v].id].link[list[data.jgs[v].id].link.length - 1]);
    }
    //Маркер нашей позиции в системе
    this.addCurrPosMarker(data.position);
}


