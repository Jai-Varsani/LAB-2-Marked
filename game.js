function Bear() {
    //function to hold the html attributes of the bear
    this.dBear = 100;
    this.htmlElement = document.getElementById("bear");
    this.id = this.htmlElement.id;
    this.x = this.htmlElement.offsetLeft;
    this.y = this.htmlElement.offsetTop;
    
    this.setSpeed=function(speed){
        this.dBear=Number(speed);
    };

    //function to keep the bear in bounds

    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
    };

    this.move = function(xDir, yDir) { //use function to move in x and y direction
        this.fitBounds();//added to keep bear within borders, when this was added my bear stopped moving.
        this.x += this.dBear * xDir;
        this.y += this.dBear * yDir;
        this.display();
    };

    this.display = function(){ //changes style and display
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
        this.htmlElement.style.display = "block";
    };
    
}

function removeBee(){ // removes all the bees
    if(typeof bees !== 'undefined'){
        while(bees.length!== 0){
            var removeMyBee=bees.pop();
            var removeMyBeeId=document.getElementById(removeMyBee.id);
            removeMyBeeId.remove();
            console.log("popped");
        }
    }
}

function removeGameOver(){ //removes game over sign
    var checkGameOver=document.getElementById("gameOver");
    if(checkGameOver.style.display=="block"){
        checkGameOver.style.display="none";
    }
}

function start() {
    removeGameOver();
    removeBee();
    clearTimeout(updateTimer);
    hits.innerHTML=0;
    duration.innerHTML=0;

    hasStarted = false;
    //create the bear
    bear = new Bear();
    // Adding a event listener if someone presses a key
    document.addEventListener("keydown",moveBear,false);
    // add event listener for speed of the bear
    document.getElementById("speedBear").addEventListener("change",setTheSpeed,false);
    //create new array for bees
    bees = new Array();
    //create bees
    // creates the number of bees in the input box again and adds them
    makeBees();
}

function isItStart(){
    if(!hasStarted){
        hasStarted=true;
        lastStingTime = new Date();
        updateBees();
    }
}
//creating event handler for keyboard events to move the bear
function moveBear(e){

    //codes for the 4 keys declared using const
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;

    if(e.keyCode == KEYRIGHT){
        isItStart();
        bear.move(1,0)
    } //if right key is pressed move bear right

    if(e.keyCode == KEYLEFT) {
        isItStart();
        bear.move(-1,0)
    } // if left key is pressed move bear left

    if(e.keyCode == KEYUP) {
        isItStart();
        bear.move(0,-1)
    } //if up key is pressed move bear up

    if(e.keyCode == KEYDOWN) {
        isItStart();
        bear.move(0,1)
    } //if down key is pressed move bear down
}

function setTheSpeed(){
    let newSpeed= document.getElementById("speedBear").value;
    if(Number(newSpeed)){
        bear.setSpeed(newSpeed);
    }else{
        alert("Please enter a number or a number greater than 0!")
    }
    
}

class Bee {
    constructor(beeNumber) {
        //the HTML Element corresponding to the image of the bee
        this.htmlElement = createBeeImg(beeNumber);
        //its HTML id
        this.id = this.htmlElement.id;
        //the left position (x)
        this.x = this.htmlElement.offsetLeft;
        //top position (y)
        this.y = this.htmlElement.offsetTop;

        this.move = function(dx,dy){
            //move the bees by dx,dy
            this.x += dx;
            this.y += dy;
            this.display();
        };

        this.display = function(){
            //adjust the position of bees and display it
            this.fitBounds(); //add this to adjst bees to fit in the bounds
            this.htmlElement.style.left = this.x + "px";
            this.htmlElement.style.top = this.y + "px";
            this.htmlElement.style.display = "block";
        };

        this.fitBounds = function(){
            //check and make sure the bees stay in the board space
            let parent = this.htmlElement.parentElement;
            let iw = this.htmlElement.offsetWidth;
            let ih = this.htmlElement.offsetHeight;
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;

            if(this.x < 0) this.x = 0;
            if(this.x > w - iw) this.x = w - iw;
            if(this.y < 0) this.y = 0;
            if(this.y > h - ih) this.y = h - ih;
        };
    }
}

function createBeeImg(wNum) {
    //get dimension and position of board div
    let boardDiv = document.getElementById("board");
    let boardDivW = boardDiv.offsetWidth;
    let boardDivH = boardDiv.offsetHeight;
    let boardDivX = boardDiv.offsetLeft;
    let boardDivY = boardDiv.offsetTop;
    //create the image element
    let img = document.createElement("img");
    img.setAttribute("src","images/bee.gif");
    img.setAttribute("width","100");
    img.setAttribute("alt","A bee!");
    img.setAttribute("id","bee" + wNum);
    img.setAttribute("class","bee"); //set class of html tg image
    //add the IMG element to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);
    //set initial position
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivH);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (y) + "px"
    //return the image object

    return img;

}

function getRandomInt(maxNumber){
    return Math.floor(Math.random() * maxNumber);
}

function makeBees(){
    //get number of bees specified by the user
    let nbBees = document.getElementById("nbBees").value;
    nbBees = Number(nbBees); //try converting the content of the input to a number
    if(isNaN(nbBees)) { //check that the input field contains a valid number
        window.alert("Invalid number of bees");
        return;
    }
    
    let i = 1;
    while(i <= nbBees) {
        var num = i;
        var bee = new Bee(num);//create object and its image element
        bee.display(); //display the bee
        bees.push(bee); //add the bee to the bees array
        i++;
    }
}

function addBee(){
    let numBees = document.getElementById("nbBees").value;
    var newNumBees= Number(numBees) + 1;
    document.getElementById("nbBees").value= newNumBees;
    var newBee = new Bee(1);
    newBee.display();
    bees.push(newBee);
    updateBees();
}

function moveBees(){
    //get speed input field value
    let speed = document.getElementById("speedBees").value;
    //move each bee to a random location
    for (let i = 0;i < bees.length; i++) {
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx,dy);
        isHit(bees[i], bear); //we add this to count stings
    }
}

function updateBees(){ // update loop for game

    score=hits.innerHTML
    if(Number(score)>=1000){
        alert("Game Over!");
        document.getElementById("gameOver").style.display = "block";
        clearTimeout(updateTimer);
    }
    else{
        //use a update period
        let period = document.getElementById("periodTimer").value;//modify this to control refresh period
        //move the bees randomly
        moveBees();
        //update the timer for the next move
        updateTimer = setTimeout('updateBees()',period);
    }
        
    
}

function isHit(defender, offender) {
    if(overlap(defender, offender)) { //check if the two images overlap
        let score = hits.innerHTML;
        score = Number(score) + 1; //increment the score
        hits.innerHTML = score; //display the new score
        //calculate longest duration
        let newStingTime = new Date();
        let thisDuration = newStingTime - lastStingTime;
        lastStingTime = newStingTime;
        let longestDuration = Number(duration.innerHTML);
        if (longestDuration === 0 || isNaN(longestDuration)) {
        longestDuration = thisDuration;
        } else {
        if (longestDuration < thisDuration) longestDuration = thisDuration;
        }
        document.getElementById("duration").innerHTML = longestDuration;
    }
}

function overlap(element1, element2) {
    //consider the 2 rectangles wrapping the two elements
    //rectangle of the first element
    left1 = element1.htmlElement.offsetLeft;
    top1 = element1.htmlElement.offsetTop;
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;
    //rectangle of the second element
    left2 = element2.htmlElement.offsetLeft; //e2x
    top2 = element2.htmlElement.offsetTop; //e2y
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;
    
    //calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1,right2) - Math.max(left1,left2));
    y_intersect = Math.max(0,Math.min(bottom1, bottom2) - Math.max(top1,top2));
    intersectArea = x_intersect * y_intersect;
    //if intersection is nil no hit
    if(intersectArea == 0 || isNaN(intersectArea)){
        return false;
    }

    return true;
}