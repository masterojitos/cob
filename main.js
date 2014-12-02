var COB = {
    context: '',
    height: 500,
    width: 500,
    keys_pressed: [],
    keys: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
    },
    background: {
        url: 'fondo.png',
        image: null,
        loading: 0,
        loaded: 1
    },
    player: {
        x: 100,
        y: 100,
        url: {
            UP: "diana-atras.png",
//            DOWN: "diana-frente.png",
            DOWN: "player.png",
            LEFT: "diana-izq.png",
            RIGHT: "diana-der.png"
        },
        image: '',
        loading: 0,
        loaded: 1
    },
    speed: 5,
    init: function() {
        COB.context = document.getElementById("cob").getContext("2d");
        
        COB.background.image = new Image();
        COB.background.image.src = COB.background.url;
        COB.background.image.onload = COB.image_loaded(COB.background);
        COB.player.image = new Image();
        COB.player.image.src = COB.player.url.DOWN;
        COB.player.image.onload = COB.image_loaded(COB.player);
        
        document.addEventListener('keydown', COB.keydown, true);
        document.addEventListener('keyup', COB.keyup, true);
    },
    image_loaded: function(image) {
        image.loading++;
        setTimeout(function() {
            COB.draw();
        }, 100);
    },
    keydown: function(e) {
        if (!COB.keys_pressed[e.keyCode]) COB.keys_pressed[e.keyCode] = '';
        COB.move();
    },
    keyup: function(e) {
        COB.keys_pressed.splice(e.keyCode, 1);
        COB.move();
    },
    move: function() {
//        while (COB.keys_pressed.length > 0) {
//            setTimeout(function() {
//                console.log(COB.keys_pressed)
//            }, 1000);
//        }
//        return;
        for (key in COB.keys_pressed) {
            switch (key) {
                case COB.keys.UP:
                    if (COB.player.y - COB.speed >= 0) {
                        COB.player.y -= COB.speed;
                    }
                    break;
                case COB.keys.DOWN:
                    if (COB.player.y + COB.player.image.height + COB.speed <= COB.height) {
                        COB.player.y += COB.speed;
                    }
                    break;
                case COB.keys.LEFT:
                    if (COB.player.x - COB.speed >= 0) {
                        COB.player.x -= COB.speed;
                    }
                    break;
                case COB.keys.RIGHT:
                    if (COB.player.x + COB.player.image.width + COB.speed <= COB.width) {
                        COB.player.x += COB.speed;
                    }
                    break;
            }
        }
        COB.draw();
    },
    draw: function() {
        if (COB.background.loading === COB.background.loaded) {
            COB.context.drawImage(COB.background.image, 0, 0);
        }
        if (COB.player.loading === COB.player.loaded) {
            COB.context.drawImage(COB.player.image, COB.player.x, COB.player.y);
        }
    }
};
$(document).on("ready", function() {
    COB.init();
});