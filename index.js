const $ = require("jquery");
function DraggableJS(options) {
  if (!options || !options.hasOwnProperty("class"))
    this.draggableClass = "draggable";
  else this.draggableClass = options.class;
  if (!options || !options.hasOwnProperty("stackClass"))
    this.stackClass = "stack";
  else this.stackClass = options.stackClass;
  if (!options || !options.hasOwnProperty("dropClass"))
    this.dropClass = "dropzone";
  else this.dropClass = options.dropClass;

  Array.from($("." + this.draggableClass)).map(draggable => {
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
};

DraggableJS.prototype.end = function(e, draggable) {
  draggable.is_click = false;
  e = e.changedTouches[0];
  const classesFromPoint = getClassesFromPoint(e.pageX, e.pageY)
  if (classesFromPoint.includes(this.stackClass) || !classesFromPoint.includes(this.dropClass)) {
    $(draggable).css({
      top: 0,
      left: 0,
      position: "absolute",
      width: draggable.initalPosition.width,
      transform: `translate(${draggable.initalPosition.offset.x}px,${draggable
        .initalPosition.offset.y}px)`
    });
  }
};

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
};

new DraggableJS();

function getClassesFromPoint(x, y) {
  var elements = [],
    previousPointerEvents = [],
    current,
    i,
    d;

  // get all elements via elementFromPoint, and remove them from hit-testing in order
  while (
    (current = document.elementFromPoint(x, y)) &&
    elements.indexOf(current) === -1 &&
    current != null
  ) {
    // push the element and its current style
    elements.push(current);
    previousPointerEvents.push({
      value: current.style.getPropertyValue("pointer-events"),
      priority: current.style.getPropertyPriority("pointer-events")
    });

    // add "pointer-events: none", to get to the underlying element
    current.style.setProperty("pointer-events", "none", "important");
  }

  // restore the previous pointer-events values
  for (i = previousPointerEvents.length; (d = previousPointerEvents[--i]); ) {
    elements[i].style.setProperty(
      "pointer-events",
      d.value ? d.value : "",
      d.priority
    );
  }
  elements.shift();
  elements = elements.map(element => {
    return element.className.split(" ");
  });
  elements = [].concat.apply([], elements);
  // return our results
  return elements;
}
