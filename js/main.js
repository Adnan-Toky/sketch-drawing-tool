//Try to draw something on the screen & see magic...
window.onload = function(){
    "use strict";
    var c = document.getElementById("myCanvas");
    var w = window.innerWidth || 360;
    var h = window.innerHeight || 560;
    
    c.height = h;
    c.width = w;
    
    var ctx = c.getContext("2d");
    
    var strokeColor = undefined;
    var strokeWidth = 6;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowColor = "rgb(0,0,255)";
    ctx.shadowBlur = 1;
    var duelLine = true;
    
    var totalDivider = 12;
    var dividerAngle = 2*Math.PI/totalDivider;
    
    
    var rootX = w/2;
    var rootY = h/2;
    
    var drawing = false;
    
    function randomColor(){
        return "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
    }
    
    function getAngle(x,y){
        var angle = Math.atan((y-rootY)/(rootX-x));
        return angle;
    }
    
    function getPoint(x,y,r,t,n){
        var thita = n*dividerAngle+t;
        var nx = r*Math.cos(thita);
        var ny = r*Math.sin(thita);
        return [rootX-nx,rootY-ny];
    }
    
    function drawOthersAlt(x,y,r,t,n){
        var p1 = getPoint(x,y,r,t,n);
        ctx.beginPath();
        ctx.moveTo(p1[0],p1[1]+1);
        ctx.lineTo(p1[0],p1[1]);
        ctx.stroke();
        ctx.closePath();
    }
    
    function drawOthers(x,y,r,t,n){
        var p1 = getPoint(x,y,r,t,n);
        ctx.beginPath();
        ctx.moveTo(p1[0],p1[1]+1);
        ctx.lineTo(p1[0],p1[1]);
        ctx.stroke();
        ctx.closePath();
    }
    
    function drawStart(x,y){
        drawing = true;
        if(!strokeColor) ctx.strokeStyle = randomColor();
        else{
            ctx.strokeStyle = strokeColor;
            ctx.shadowColor = strokeColor;
        }
        ctx.lineWidth = strokeWidth;
    }
    
    function drawMove(x,y){
        if(drawing){
            var r = Math.sqrt(Math.pow(rootX-x,2)+Math.pow(rootY-y,2));
            var t = getAngle(x,y)%dividerAngle;
            var t2 = getAngle(x,h-y)%dividerAngle;
            for(var n = 0; n < totalDivider; n++){
                drawOthers(x,y,r,t,n);
                if(duelLine) drawOthersAlt(x,y,r,t2,n);
            }
        }
    }
    
    function drawEnd(){
        drawing = false;
    }
    
    function touchStartHandler(e){
        e.preventDefault();
        var touchObject = e.changedTouches[0];
        var x = parseInt(touchObject.clientX);
        var y = h-parseInt(touchObject.clientY);
        drawStart(x,y);
    }
    
    function touchMoveHandler(e){
        e.preventDefault();
        var touchObject = e.changedTouches[0];
        var x = parseInt(touchObject.clientX);
        var y = h-parseInt(touchObject.clientY);
        drawMove(x,y);
    }
    
    function touchEndHandler(){
        drawEnd();
    }
    
    c.addEventListener("touchstart",touchStartHandler);
    c.addEventListener("touchmove",touchMoveHandler);
    c.addEventListener("touchend",touchEndHandler);
    
    function mouseDownHandler(e){
        e.preventDefault();
        var x = parseInt(e.clientX);
        var y = h-parseInt(e.clientY);
        drawStart(x,y);
    }
    
    function mouseMoveHandler(e){
        e.preventDefault();
        var x = parseInt(e.clientX);
        var y = h-parseInt(e.clientY);
        drawMove(x,y);
    }
    
    function mouseUpHandler(){
        drawEnd();
    }
    
    c.addEventListener("mousedown",mouseDownHandler);
    c.addEventListener("mousemove",mouseMoveHandler);
    c.addEventListener("mouseup",mouseUpHandler);
    
    
    document.querySelector("#color").addEventListener("input",function(){
        strokeColor = this.value;
    })
    
    document.querySelector("#bgcolor").addEventListener("input",function(){
        c.style.background = this.value;
    })
    
    document.querySelector("#divider").addEventListener("input",function(){
        totalDivider = this.value;
        dividerAngle = 2*Math.PI/totalDivider;
    })
    
    document.querySelector("#clear").addEventListener("click",function(){
        ctx.clearRect(0,0,w,h);
    })
    
    document.querySelector("#size").addEventListener("input",function(){
        strokeWidth = this.value;
    })
}