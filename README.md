# draggableJS

## Install
 - Download file [ dist/draggable.js](https://raw.githubusercontent.com/clabroche/draggableJS/master/dist/draggable.js) 
 - Import jquery 3.5+ in your HTML
 `<script src="path/to/jquery"></script>`
 - Import draggableJS in your HTML
 `<script src="<path/to/draggableJS>/draggable.js"></script>`

## Use draggableJS

To use DraggableJS you need to initialize it:
``` javascript
const draggableJS = new DraggableJS(<options>)
``` 
options: 

| options        | default           | type  | description | 
| ------------- |:----:| -----:|-----:|
| draggableClass     | draggable | string | Html class to move elements |
| stackClass | stack      |   string | Html class where you can stack elements |
| dropClass | dropzone |    string | html class where you can drop elements |
| clone | clone |  boolean | if true, clone elements in the stackClass |


And in your html your class you can specify classes to match with the library: 

``` html
<div class="stack">
	<div price="1000" class="draggable element">element1</div>
	<div price="10" class="draggable element">element2</div>
	<div price="100" class="draggable element">element3</div>
	<div price="42" class="draggable element">element4</div>
</div>
<div class="dropzone">DropZone</div>
```

You can watch elements in the dropzone to point the `draggableJS.elementsInDropzone` in the library. 

For instance, to check price of elements in the dropzone: 
``` javascript
Array.from(draggableJS.elementsInDropzone)
	.map(element => console.log($(element).attr('price')))
```

## Demo
https://clabroche.github.io/draggableJS/
