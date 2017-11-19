(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function DraggableJS(options = {}) {
  this.options = options
  if (!options.hasOwnProperty("class")) {
    this.options.draggableClass = "draggable";
  } else this.options.draggableClass = options.class;
  if (!options.hasOwnProperty("stackClass")) {
    this.options.stackClass = "stack";
  } else this.options.stackClass = options.stackClass;
  if (!options.hasOwnProperty("dropClass")) {
    this.options.dropClass = "dropzone";
  } else this.options.dropClass = options.dropClass;
  if (!options.hasOwnProperty("clone")) {
    this.options.clone = false;
  } else this.options.clone = options.clone;

  Array.from($("." + this.options.draggableClass)).map(draggable => {
    this.initDraggable(draggable);
  });

  this.elementsInDropzone = new Set()
  this.zindex = 1000
}

DraggableJS.prototype.start = function(e, draggable) {
  draggable.is_click = true;
  draggable.tempPosition = {
    x: e.pageX,
    y: e.pageY
  };
  if (this.options.clone && getClassesFromPoint(e.pageX, e.pageY).includes(this.options.stackClass)) {
    const newDraggable = $(draggable)
      .clone()
      .prependTo($("." + this.options.stackClass));
    this.initDraggable(newDraggable);
    draggable.copy = true
  }

  $(draggable).css({ zIndex: ++this.zindex });
  draggable.tempOffset = $(draggable).offset();
};

DraggableJS.prototype.end = function(e, draggable) {
  draggable.is_click = false;
  if(draggable.hasOwnProperty('length')) draggable = draggable[0]
  const classesFromPoint = getClassesFromPoint(e.pageX, e.pageY);
  if (
    classesFromPoint.includes(this.options.stackClass) ||
    !classesFromPoint.includes(this.options.dropClass)
  ) {
    if (this.options.clone) {
      $(draggable).remove()
    } else {
      $(draggable).css({
        top: 0,
        left: 0,
        position: "absolute",
        width: draggable.initalPosition.width,
        transform: `translate(${draggable.initalPosition.offset.x}px,${draggable
          .initalPosition.offset.y}px)`,
      });
    }
    this.elementsInDropzone.delete(draggable)
  } else {
    this.elementsInDropzone.add(draggable)
  }
};

DraggableJS.prototype.move = function(e, draggable) {
  if (draggable.is_click) {
    const initialX = draggable.tempPosition.x;
    const initialY = draggable.tempPosition.y;
    $(draggable).css({
      transform: `translate(${e.pageX -
        initialX +
        draggable.tempOffset.left}px, ${e.pageY -
        initialY +
        draggable.tempOffset.top - 10}px)`,
      width: draggable.initalPosition.width,
      position: "absolute"
    });
  }
};

DraggableJS.prototype.initDraggable = function(draggable) {
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
  }, 5);
  $(draggable).on("touchstart", e =>
    this.start(e.changedTouches[0], draggable)
  );
  $(draggable).on("touchmove", e => this.move(e.changedTouches[0], draggable));
  $(draggable).on("touchend", e => this.end(e.changedTouches[0], draggable));
  $(draggable).on("mousedown", e => this.start(e, draggable));
  $(draggable).on("mouseup", e => this.end(e, draggable));
  // $(draggable).on("mouseleave", e => this.end(e, draggable));
  $(draggable).on("mousemove", e => this.move(e, draggable));
};

function getClassesFromPoint(x, y) {
  const previousPointerEvents = [];
  let elements = [];
  let current;
  let i;
  let d;

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
module.exports = DraggableJS;
if (window) window.DraggableJS = DraggableJS;

},{}]},{},[1]);
