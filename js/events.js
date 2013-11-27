ssmap.prototype.events = function() 
{
    var isMove = false; //Двигаем ли камеру
    var oldX = 0; var oldY = 0;

    //Прокрутка мыши
    this.wheel = function (e) {
        var delta =  e.originalEvent.deltaY || e.originalEvent.detail || e.originalEvent.wheelDelta; 
        var no_move = false;

        if (delta > 0) {
            e.data.camera.scale.x = e.data.camera.scale.y += 0.07;

            if (e.data.camera.scale.y > 1.52) {
                e.data.camera.scale.x = e.data.camera.scale.y = 1.52;
            }
        }
        else if (delta < 0) {
            e.data.camera.scale.x = e.data.camera.scale.y -= 0.07;

            if (e.data.camera.scale.x < 0.01) {
                e.data.camera.scale.x = e.data.camera.scale.y = 0.01;
            }
        }

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    };
    this.mousedown = function (e) {
        isMove = true;

      	oldX = e.pageX;
        oldY = e.pageY;
    };

    this.mouseup = function (e) {
        isMove = false; 
    };

    this.mousemove = function (e) {
     
        x = e.pageX;
        y = e.pageY;

        /*var vector = new THREE.Vector3( x, y, 0.5 );
        projector.unprojectVector( vector, e.data.camera );

        var ray =  = new THREE.Ray();
        ray.setOrigin( e.data.camera.position ).setDirection( vector.subSelf( e.data.camera.position ).normalize() );

        var intersects = ray.intersectObjects( [cube] );

        if ( intersects.length > 0 ) {

            if ( INTERSECTED != intersects[ 0 ].vertex ) {

                attributes.size.value[ INTERSECTED ] = PARTICLE_SIZE;

                INTERSECTED = intersects[ 0 ].vertex;

                attributes.size.value[ INTERSECTED ] = PARTICLE_SIZE * 1.25;
                attributes.size.needsUpdate = true;

            }

        } else if ( INTERSECTED !== null ) {

            attributes.size.value[ INTERSECTED ] = PARTICLE_SIZE;
            attributes.size.needsUpdate = true;
            INTERSECTED = null;

        }
*/
        if (!isMove) {
            return;
        }

        e.data.camera.position.x -= (x - oldX) / (1/e.data.camera.scale.x);
        e.data.camera.position.y += (y - oldY) / (1/e.data.camera.scale.x);

        oldX = x;
        oldY = y;
        

    };

}