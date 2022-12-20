window.onload = function() {
    var width = window.screen.width;
    var height = window.screen.height;
    document.body.addEventListener("mousemove", (event) => {
        if (event.x >= width/2){
            if (event.y >= height/2){
                $("#id1").css( "font-variation-settings", "'HROT'"+30/(width/2)*(event.x-width/2)+",'VROT'"+(-((30)/(height/2)*(event.y-height/2)))+"");
                $("#id2").css( "font-variation-settings", "'HROT'"+30/(width/2)*(event.x-width/2)+",'VROT' 0");
                $("#id8").css( "font-variation-settings", "'HROT' 0, 'VROT'"+(-((30)/(height/2)*(event.y-height/2)))+"");
            } 

            if (event.y < height/2) {
                $("#id1").css( "font-variation-settings", "'HROT'"+30/(width/2)*(event.x-width/2)+",'VROT'"+(30 - (30/(height/2)*(event.y)))+"");
                $("#id2").css( "font-variation-settings", "'HROT'"+30/(width/2)*(event.x-width/2)+",'VROT' 0");
                $("#id8").css( "font-variation-settings", "'HROT' 0, 'VROT'"+(-((30)/(height/2)*(event.y-height/2)))+"");
            }
        }
        else if (event.x < width/2){
            if (event.y >= height/2){
                $("#id1").css( "font-variation-settings", "'HROT'"+(- (30/(width/2)*(width/2 - event.x)))+",'VROT'"+(-((30)/(height/2)*(event.y-height/2)))+"");
                $("#id2").css( "font-variation-settings", "'HROT'"+(- (30/(width/2)*(width/2 - event.x)))+",'VROT' 0");
                $("#id8").css( "font-variation-settings", "'HROT' 0, 'VROT'"+(-((30)/(height/2)*(event.y-height/2)))+"");
            } 

            if (event.y < height/2) {
                $("#id1").css( "font-variation-settings", "'HROT'"+(- (30/(width/2)*(width/2 - event.x)))+",'VROT'"+(30 - (30/(height/2)*(event.y)))+"");
                $("#id2").css( "font-variation-settings", "'HROT'"+(- (30/(width/2)*(width/2 - event.x)))+",'VROT' 0");
                $("#id8").css( "font-variation-settings", "'HROT' 0, 'VROT'"+(-((30)/(height/2)*(event.y-height/2)))+"");
            }
        } 
    });
}


var colors = ['#ffcc7a', '#29ffb8', '#c2c0c0', '#ff00ff', '#cc7550', '#ff00f7', '#00fff2', '#0040ff', '#ff9900', '#c79154', '#2fc475', '#63e05c'];

function randomize(values) {
    let index = values.length,  randomIndex;

    // While there remain elements to shuffle.
    while (index != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * index);
        index--;

        // And swap it with the current element.
        [values[index], values[randomIndex]] = [
            values[randomIndex], values[index]];
    }

    return values;
}



function colorize() {
    for(i = 0; i < 12; i++) {
        $("#id"+i+"").css( "color", ""+colors[i]+"");
        $("#id"+i+"").css( "border-color", ""+colors[i]+"");
    }
}


function  run(){
    $(".overlay").css( "display", "none");

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', (e) => {
                    const beta = e.beta;
                    const gamma = e.gamma;
                    if (beta < 45) {
                        $("#id1").css( "font-variation-settings", "'HROT'"+(gamma/1.5)+",'VROT'"+((45-beta)/1)+"");
                    } else {
                        $("#id1").css( "font-variation-settings", "'HROT'"+(gamma/1.5)+",'VROT'"+((beta-45)/-1)+"");
                    }
                });
            }
        })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', (e) => {
            const beta = e.beta;
            const gamma = e.gamma;
            if (beta < 45) {
                $("#id1").css( "font-variation-settings", "'HROT'"+(gamma/1.5)+",'VROT'"+((45-beta)/1)+"");
            } else {
                $("#id1").css( "font-variation-settings", "'HROT'"+(gamma/1.5)+",'VROT'"+((beta-45)/-1)+"");
            }
        });
    }
}
