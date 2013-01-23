/* DEBUG */

var logDiv = document.getElementById("log");  
var logDetailsDiv = document.getElementById("logDetails");  
  
function log( text ) {  
    logDiv.innerHTML = text;  
}  
  
function inspect( obj ) {  
  if (typeof obj === "undefined") {  
      return "undefined";  
  }  
  var _props = [];  
  
    for ( var i in obj ) {  
        _props.push( i + " : " + obj[i] );   
    }  
    return " {" + _props.join( ",<br>" ) + "} ";  
}


/* SPRITE ANIMATION */

var canvas, ctx, numInterval,
    width = 768,
    height = 1024,
    steps = [],
    maxSteps = 6,
    repeatIndex = 0,
    repeats = 10,
    currentStep = 0,
    fps = 1;

function clearCanvas() {
    ctx.clearRect(0,0,width,height);
}

function reDraw() {
    if(!sprites.complete) return;

    var objCurrentStep = steps[currentStep];
   
    log("Step: "+currentStep+" PosX: "+objCurrentStep.posX+" PosY: "+objCurrentStep.posY);

    try {
        ctx.drawImage(objCurrentStep.img,objCurrentStep.posX,objCurrentStep.posY,width,height,0,0,width,height);
    }catch(e){
       //log(inspect(e));
    }   
       
    if(currentStep==maxSteps-1) {
        //ended
        if(repeatIndex<repeats) {
            //verify if it should repeat
            repeatIndex++;
            currentStep = 0;
        }else{
            end();
        }
    }else {
        currentStep++;    
    }    
}

function end(){
    repeatIndex = 0;
    currentStep = 0;
    clearInterval(numInterval);
}

function registerSteps(){
    steps.push({posX:0,posY:0,img:sprites});
    steps.push({posX:width+20,posY:0,img:sprites});
    steps.push({posX:(width*2)+40,posY:0,img:sprites});

    maxSteps = steps.length;
}

function loop() {
  clearCanvas();
  reDraw();
}

(function init() {
    //config
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    sprites = new Image();
    sprites.src = 'img/spr-frames.jpg';
    sprites.onload = function() {
        registerSteps();
        numInterval = setInterval(loop, 1000/fps);        
    }    

})();

/* DRAG */

var posX, posY;

function touchStart( e ) { 
    var box = e.target; //document.getElementById("box");  
    //box.style.background = "green";  

    posX = e.layerX;
    posY = e.layerY;
    box.style.zIndex = getNextHighestZindex()+1 ;

    e.preventDefault();  
    return false;  
}  
  
function touchMove( e ) {  
    var targetEvent =  e.touches.item(0);  

    var box = targetEvent.target; //document.getElementById("box");  
    //box.style.background = "yellow";  

    box.style.left = targetEvent.clientX- posX + "px";  
    box.style.top= targetEvent.clientY - posY + "px";
    //box.style.zIndex = getNextHighestZindex()+1 ;

    e.preventDefault();  
    return false;  
}  

function getNextHighestZindex(){  
   var index_highest = 0;   

    $(".box").each(function() {
        // always use a radix when using parseInt
        var index_current = parseInt($(this).css("zIndex"), 10);
        if(index_current > index_highest) {
            index_highest = index_current;
        }
    });

    return index_highest
} 