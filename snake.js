window.onload = init; //Oyunu init edip oynanmaya hazir hale getiriyoruz
const FRAME = 12;
const backgroundSize = 534;
let timerID = window.setInterval(loop, 1000/FRAME); 
let keyLock = "unlocked";
// variables
let canvas; 
let cvs; 
let snake;
let velocity;
let esa;  
let spesa;
let wall;

function init() { 
    snake={
        tailSize: 5,
        trail: [],
        x: 20, 
        y: 20,
        gridSize: 20
    }; 

    wall={
        trail: [],
        x: 20, 
        y: 20,
        gridSize: 20
    };

    velocity = {
        x: 0,
        y: 0
    };

    esa={
        x: 10,
        y: 10
    };

    spesa={
        x: 15,
        y: 15
    };
}

function loop() {
    update();
    draw();
}

function reset(){
    clearInterval(loop);
    init();
};

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update(){//snake in konumunu update ediyor
    keyLock = "unlocked";
    snake.x += velocity.x;
    snake.y += velocity.y;

    // Duvara carpinca oluyor
    if(snake.x*(snake.gridSize + 1) <= 0){
        reset();
    }

    if(snake.y*(snake.gridSize + 1) <= 0){
        reset();
    }

    if(snake.x*(snake.gridSize + 1) >= backgroundSize){
        reset();
    }

    if(snake.y*(snake.gridSize + 1) >= backgroundSize){
        reset();
    }
    // Kendini yeme snake trailin i sini artirarak kuyrugun her parcasini eklemis oluyoruz
    for(let i=0; i<snake.trail.length; i++){
        if(snake.x == snake.trail[i].gridPositionX && snake.y == snake.trail[i].gridPositionY){
            reset();
        }
    }
    // Esa'yi yeme
    if(esa.x == snake.x && esa.y == snake.y){
            snake.tailSize++;
            esa.x = randomInteger(1,Math.floor(backgroundSize/snake.gridSize)-1);
            esa.y = randomInteger(1,Math.floor(backgroundSize/snake.gridSize)-1);
    }
    //Special Esa'yi yeme
    if(spesa.x == snake.x && spesa.y == snake.y){
            snake.tailSize += 3;
            spesa.x = randomInteger(1,Math.floor(backgroundSize/snake.gridSize)-1);
            spesa.y = randomInteger(1,Math.floor(backgroundSize/snake.gridSize)-1);
    }
    // Duz hareket edecek. Arraye ekleme yapiliyor
    snake.trail.push(
        {
            gridPositionX: snake.x,
            gridPositionY: snake.y
        }
    );
    //arrayden shiftle deger cikariliyor(Esa yiyince tail size uzayinca trail[] lenght uzamis oluyor) fazla deger cikiyor
    while(snake.trail.length > snake.tailSize){
        snake.trail.shift();
    }
};
   
function draw(){

    canvas = document.getElementById("canvas1"); //canvasi seciyor
    cvs = canvas.getContext("2d"); //cizimin iki boyutlu oldugu belirtiliyor

    // Arka plan
    cvs.fillStyle = "#000";
    cvs.fillRect(0, 0, backgroundSize, backgroundSize);

    // Esa
    cvs.fillStyle = "#00FFFF";
    cvs.fillRect(esa.x*snake.gridSize, esa.y*snake.gridSize, snake.gridSize - 5, snake.gridSize - 5);

    // Spesa
    cvs.fillStyle = "#FF0000";
    if(snake.tailSize%10 == 0){
        cvs.fillRect(spesa.x*snake.gridSize, spesa.y*snake.gridSize, snake.gridSize - 5, snake.gridSize - 5);
    };

    // Score
    cvs.fillStyle = "#FFFFFF";
    cvs.font = "20px Arial";
    cvs.fillText(snake.tailSize-5, 30, 50);

    // Snake (For ile buyuklugu kadar cizilecek) fillrect ile ici dolu 2d cizim yapiliyo
    cvs.fillStyle = "#FFFF00";
    for(let i=0; i<snake.trail.length; i++){
        cvs.fillRect(snake.trail[i].gridPositionX * snake.gridSize, snake.trail[i].gridPositionY * snake.gridSize, snake.gridSize-5, snake.gridSize-5);
    }

    // Duvarlar
    cvs.fillStyle = "#808080";
    let startCoor = 0;
    while(startCoor < backgroundSize){
        cvs.fillRect(0, startCoor, 15, 15); // Sol
        cvs.fillRect(519, startCoor, 15, 15); // Sag
        cvs.fillRect(startCoor, 0, 15, 15); // Yukari
        cvs.fillRect(startCoor, 519, 15, 15); // Asagi
        startCoor += 20; 
    }
};

document.onkeydown = key_event;

function key_event(event){
    if (keyLock == "locked") return;
    
    //W
    if (event.keyCode == 87 && velocity.y != 1){
        velocity.x = 0;
        velocity.y = -1;
        keyLock = "locked";
    } 
    
    //A
    if (event.keyCode == 65 && velocity.x != 1){
        velocity.x = -1;
        velocity.y = 0;
        keyLock = "locked";
    } 

    //S
    if (event.keyCode == 83 && velocity.y != -1){
        velocity.x = 0;
        velocity.y = 1;
        keyLock = "locked";
    }

    //D
    if (event.keyCode == 68 && velocity.x != -1){
        velocity.x = 1;
        velocity.y = 0;
        keyLock = "locked";
    }

    // //Up arrow
    // if (event.keyCode == 38 && velocity.y != 1){
    //     velocity.x = 0;
    //     velocity.y = -1;
    //     keyLock = "locked";
    // } 
    
    // //Left arrow
    // if (event.keyCode == 37 && velocity.x != 1){
    //     velocity.x = -1;
    //     velocity.y = 0;
    //     keyLock = "locked";
    // } 

    // // Down arrow
    // if (event.keyCode == 40 && velocity.y != -1){
    //     velocity.x = 0;
    //     velocity.y = 1;
    //     keyLock = "locked";
    // }

    // //Right arrow
    // if (event.keyCode == 39 && velocity.x != -1){
    //     velocity.x = 1;
    //     velocity.y = 0;
    //     keyLock = "locked";
    // }
}