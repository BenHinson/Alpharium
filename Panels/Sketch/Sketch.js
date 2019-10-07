
// ---------------------------------Canvas---------------------------------

// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple

// https://www.w3schools.com/tags/ref_canvas.asp


var canvas;
var paint;
var context;

var eraser = document.getElementById('canvas').style.backgroundColor;
var curColor = "#000000";
var lineWidth = 2;
var clickColor = new Array();

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();


function init() {

  btnEvents();

    canvas = $('#canvas');
    var fullWidth = $('#canvas').width()
    var fullHeight = $('#canvas').height()
    canvas.attr("width", fullWidth)
    canvas.attr("height", fullHeight)
    context = canvas[0].getContext("2d");

    canvas.mousedown(function(e) {
        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    canvas.mousemove(function(e){
        if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
        }
    });

    canvas.mouseup(function(e){
        paint = false;
    });

    // canvas.mouseleave(function(e){
    //     paint = false;
    // });
}

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor)
}

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.lineJoin = "round";
    context.lineWidth = lineWidth;
    for(var i=0; i < clickX.length; i++) {		
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.strokeStyle = clickColor[i];
       context.stroke();
    }
  }

  function btnEvents() {
    document.getElementById("clearBtn").addEventListener("click", canvasClear);
    document.getElementById("eraserBtn").addEventListener("click", function(){curColor = eraser;  context.lineWidth=5});
    colorPicker("toolBtnBlack", "#000000");
    colorPicker("toolBtnWhite", "#FFFFFF");
    colorPicker("toolBtnBlue", "#00FFFF");
    colorPicker("toolBtnRed", "#FF0000");
    colorPicker("toolBtnGreen", "#32CD32");
    function colorPicker(id, color) {
      document.getElementById(id).addEventListener("click", function(){curColor = color});
    }
  }

  function canvasClear() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    window.clickX = new Array();
    window.clickY = new Array();
    window.clickDrag = new Array();
    window.clickColor = new Array();
  }

  $(document).ready(init);