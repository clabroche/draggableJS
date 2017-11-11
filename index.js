const $ = require("jquery");
function DraggableJS(options) {
  if (!options || !options.hasOwnProperty("class"))
    this.draggableClass = ".draggable";
  else this.draggableClass = options.class;

  Array.from($(this.draggableClass)).map(draggable => {
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
    $(draggable).on("touchstart", e => this.start(e, draggable));
    $(draggable).on("touchmove", e => this.move(e, draggable));
    $(draggable).on("touchend", e => this.end(e, draggable));
  });
}

DraggableJS.prototype.start = function(e, draggable) {
  e = e.changedTouches[0];
  draggable.is_click = true;
  draggable.tempPosition = {
    x: e.pageX,
    y: e.pageY
  };
  draggable.tempOffset = $(draggable).offset();
}

DraggableJS.prototype.end = function(e, draggable) {
  draggable.is_click = false;
}

DraggableJS.prototype.move = function(e, draggable) {
  var i;
  e = e.changedTouches[0];
  if (draggable.is_click) {
    const initialX = draggable.tempPosition.x;
    const initialY = draggable.tempPosition.y;
    $(draggable).css({
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

new DraggableJS();
