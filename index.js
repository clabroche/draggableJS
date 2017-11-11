const $ = require("jquery");
function DraggableJS(options) {
  if (!options || !options.hasOwnProperty("class"))
  this.draggableClass = ".draggable";
  else 
  this.draggableClass = options.class
  
  Array.from($(this.draggableClass)).map(draggable => {
    console.log(draggable.offsetTop);
    draggable.initalPosition = $(draggable).css([
      "width",
      "height",
      "top",
      "left",
      "bottom",
      "right",
      "marginRight",
      "marginTop",
      "marginLeft",
      "marginBottom",
      "paddingRight",
      "paddingTop",
      "paddingLeft",
      "paddingBottom",
      "position"
    ]);
    draggable.initalPosition.offset = {
      x: draggable.offsetLeft,
      y: draggable.offsetTop
    };
    setTimeout(function() {
      $(draggable).css({
        top: 0,
        left: 0,
        position: "absolute",
        width: draggable.initalPosition.width,
        transform: `translate(${draggable.initalPosition.offset.x}px,${draggable
          .initalPosition.offset.y}px)`
      });
    }, 100);
    $(draggable).on("touchstart", e => start(e, draggable));
    $(draggable).on("touchmove", e => move(e, draggable));
    $(draggable).on("touchend", e => end(e, draggable));
  });
}
function start(e, draggable) {
  e = e.changedTouches[0];
  draggable.is_click = true;
  draggable.tempPosition = {
    x: e.pageX,
    y: e.pageY
  };
  draggable.tempOffset = $(draggable).offset();
  // alert(JSON.stringify(e.pageX))
  console.log($(draggable));
}
function end(e, draggable) {
  draggable.is_click = false;
}
function move(e, draggable) {
  var i;
  e = e.changedTouches[0];
  if (draggable.is_click) {
    const initialX = draggable.tempPosition.x;
    const initialY = draggable.tempPosition.y;
    const moveSincelastMove = e.pageX - initialX;
    // console.log(`translate(${e.pageX - initialX}px, ${e.pageY - initialY}px)`);
    let transformX = $(draggable).css("transform");
    if (transformX) {
      // transformX = transformX.toString().split("(")[1].split(')')[0].split(",");
    }
    console.log(draggable.tempOffset.top);
    const allMove = $(draggable).css({
      transform: `translate(${e.pageX -
        initialX +
        draggable.tempOffset.left}px, ${e.pageY -
        initialY +
        draggable.tempOffset.top}px)`,
      width: draggable.initalPosition.width,
      position: "absolute"
    });
  }
}


new DraggableJS()