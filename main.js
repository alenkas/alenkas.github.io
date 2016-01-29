
/* Game instructions */

// Testing block
//function getHeight(el) {
//    return parseInt(window.getComputedStyle(el, null).getPropertyValue("height"));
//}
//
//function getWidth(el) {
//    return parseInt(window.getComputedStyle(el, null).getPropertyValue("width"));
//}
//
//var div = document.getElementById("testing");
//
//div.style.top = Math.floor((Math.random() * 400) + 1) + "px";
//div.style.left = Math.floor((Math.random() * 400) + 1) + "px";
//
////var divHeight = getHeight(div);
////var divWidth = getWidth(div);
//
//var circle = document.getElementById("circle");
//
//circle.style.top = Math.floor((Math.random() * 400) + 1) + "px";
//circle.style.left = Math.floor((Math.random() * 400) + 1) + "px";
//
//
//circle.style.top = parseInt(Math.floor((Math.random() * 400) + 1) + "px");
//circle.style.left = parseInt(Math.floor((Math.random() * 400) + 1) + "px");
//
////var circleHeight = getHeight(circle);
////var circleWidth = getWidth(circle);
//
//var edgeX;
//var edgeY;
//
////var pos = div.getBoundingClientRect();
//
////console.log(pos.left, pos.top, pos.right, pos.bottom);
//


// Background

var global = {
    randomPosition: function() {
        return Math.floor((Math.random() * 99) + 1);
    }

};

var spaceshipCaught = 0;

function stars() {
    var star = document.createElement('div');
    star.className = "star";
    var randomPosX = global.randomPosition();
    var randomPosY = global.randomPosition();
    var randomSize = Math.floor((Math.random() * 10) + 1);
    star.style.top = randomPosY + "%";
    star.style.left = randomPosX + "%";
    star.style.width = randomSize + "px";
    star.style.height = star.style.width;
    document.body.appendChild(star);

    setTimeout(function(){
        star.remove();
    }, 5000);

    return star;
}

function starry_sky() {

    var random_numbers = Math.floor((Math.random() * 90) + 10);
    //var random_numbers = 1;
    for(var i = 0; i <= random_numbers; i ++) {


        function increaseSize(el) {
            var x = 0.7;
            var id = setInterval(move, 10);

            function move() {
                if(x >= 1.5) {
                    clearInterval(id);
                    decreaseSize(stars());
                } else {
                    x += 0.01;
                    el.style.transform = "scale(" + x + "," + x + ")";
                }
            }
            move();
            return id;
        }

        function decreaseSize(el) {
            var x = 1.5;
            var id2 = setInterval(move, 10);

            function move() {
                if(x <= 0.7) {
                    clearInterval(id2);
                    increaseSize(stars());
                } else {
                    x -= 0.01;
                    el.style.transform = "scale(" + x + "," + x + ")";
                }
            }
            move();
            return id2;
        }

        increaseSize(stars());
    }
}

starry_sky();

// Meteorites

var meteorite = {
    meteorite_init: function() {
        var meteorite = document.createElement('img');
        var meteoriteMinWidth = 40;
        var meteoriteMaxWidth = 60;

        // Meteorite should animate
        meteorite.setAttribute("src", "img/initial.png");
        meteorite.className = "meteorite";
        meteorite.style.top = -Math.floor((Math.random() * 300) + 1) + "px"; // Start falling from the very top
        meteorite.style.left = global.randomPosition() + "%";
        meteorite.style.width = Math.floor((Math.random() * meteoriteMaxWidth) +  meteoriteMinWidth) + "px";

        document.body.appendChild(meteorite);

        return meteorite;
    },
    meteoriteMin: 10,
    meteoriteMax: 25
};

//meteorite.meteorite_init();

var set = setInterval(function() {
    falling(meteorite.meteorite_init(), 50);
    //if(spaceshipCaught == 1) {
    //    console.log("gameOver");
    //
    //    // Working half-way
    //    var met = document.getElementsByClassName("meteorite");
    //    for(var i = 0; i < met.length; i++) {
    //        met[i].remove();
    //        console.log(true);
    //    }
    //    clearInterval(set);
    //}
}, 3000);

function falling(el, speed) {
    function move() {
        el.style.top = (parseInt(el.style.top) + 5) + "px";

    }
    var timer = setInterval(function() {
        // change value 200 to meteorite height - get it from css file
        if(parseInt(el.style.top) >= (parseInt(window.innerHeight) + parseInt(200))) {
            clearInterval(timer);
            el.remove();
        }
        if(spaceshipCaught == 5) {
            // Message repeats in console.log several times - find out why
            console.log("gameOver");
            el.remove();
            console.log(true);

            clearInterval(set);
            clearInterval(timer);
        }
        move();
    }, speed);

    move();
}



// Spaceship procedures

// Spaceship initialisation
function spaceship_initialise() {
    var spaceship = document.createElement("div");

    spaceship.id = "spaceship";
    spaceship.style.top = "50%";
    spaceship.style.left = "50%";
    document.body.appendChild(spaceship);

    return spaceship;
}
//
var spaceship = spaceship_initialise();

var key_Codes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

window.addEventListener("keydown", keyCode_values, false);

function getPosition() {
    var currentPosX = parseInt(spaceship.style.left);
    var currentPosY = parseInt(spaceship.style.top);

    return [currentPosX,currentPosY];
}

function goLeft() {
    var x = getPosition()[0];
    spaceship.style.left = (x - 2) + "%";
}

function goUp() {
    var y = getPosition()[1];
    spaceship.style.top = (y - 2) + "%";
}
function goRight() {
    var x = getPosition()[0];

    spaceship.style.left = (x + 2) + "%";
}
function goDown() {
    var y = getPosition()[1];
    spaceship.style.top = (y + 2) + "%";
}

function keyCode_values(e) {
    var x = e.keyCode;

    switch(e.keyCode) {
        case key_Codes.left:
            goLeft();
            break;
        case key_Codes.up:
            goUp();
            break;
        case key_Codes.right:
            goRight();
            break;
        case key_Codes.down:
            goDown();
            break;
    }

    return x;
}

var detectOverLap = (function() {
    function getPositions(elem) {
        var pos = elem.getBoundingClientRect();
        return [[pos.left, pos.right], [pos.top, pos.bottom]];
    }

    function comparePositions(p1, p2) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function(a, b) {
        var pos1 = getPositions(a),
            pos2 = getPositions(b);

        return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    }
})();


function handler() {
    var touching = [];

    function check() {
        var elems = document.getElementsByClassName("meteorite"),
            elemList = Array.prototype.slice.call(elems),
            within = elemList.indexOf(spaceship);

        if(within !== -1) {
            elemList.splice(within, 1);
        }
        for(var i = 0; i < elemList.length; i++) {
            if(detectOverLap(spaceship, elemList[i])) {
                touching.push(elemList[i].id);
            }
        }
        return touching;
    }

    // I don't like this function. Try to make it better
    var timer = setInterval(function(){
        if (check().length) {
            //console.log(spaceship.id + ' touches ' + touching.join(' and ') + '.');
            clearInterval(timer);
            spaceshipCaught++;
            console.log(spaceshipCaught);
            if(spaceshipCaught == 5) {
                clearInterval(timer);
                spaceship.remove();

                game_over();
            }
            spaceship.style.display = "none";
            setTimeout(function(){
                spaceship.style.display = "block";
                handler();
            }, 3000);
        }
        check();
    }, 1);

    check();

}

handler();

// Game Over scene

function game_over() {
    var sprite = document.createElement('div');
    sprite.id = "game_over";

    var message = document.createElement('h2');
    message.className = 'game_over_message';
    message.textContent = "Game over";

    var x = 0;

    setInterval(function(){
        x += 25;
        sprite.style.backgroundPosition = x + "% 0%";
        if(x >= 100) x = - 25;
    }, 300);

    document.body.appendChild(sprite);
    document.body.appendChild(message);
}




