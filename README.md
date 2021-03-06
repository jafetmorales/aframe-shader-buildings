aframe-shader-buildings
===

An [A-Frame](https://aframe.io) [WebXR](https://webvr.info/) component for cheaply creating boxy buildings.
Allows you to place thousands of buildings in your scene!
Details are perfectly sharp, no matter how close you get.

![sample screenshot](sample.png)

[live example scene](https://dougreeder.github.io/aframe-shader-buildings/example.html)
On desktop, drag to turn and use WASD keys to move. 

Usage
---

Include using 
```html
<script src="https://unpkg.com/aframe-shader-buildings@^0.6.0/dist/main.js"></script>
```


Declaration of a single two-tiered building:
```html
<a-shader-buildings sun-position="-0.5 1.0 1.0" buildings=
		'[{"x":5,"z":-995,"xSections":12,"xWingSections":5,"zSections":12,"zWingSections":5,"ySections":30},{"x":0,"z":-1000,"y":120,"xSections":9,"xWingSections":4,"zSections":9,"zWingSections":4,"ySections":30}]'
></a-shader-buildings>
```
The `buildings` attribute is JSON, which is problematic in HTML attributes.  
Normally, the `buildings` attribute is set programatically (see example.html).
The recommended workaround for declaring in HTML is 
to use single quotes around the attribute value, which all modern browsers parse correctly 
(but an HTML linter will complain about).

All buildings in the same entity will have the same style, so typically you'll define a number of a-shader-buildings
entities, each with a different style.


Parameters 
---
Typically, you'll leave the entity x, y, and z as zero, but you don't have to.

### x-proportion-geometry, x-proportion-material
default: 5

set these to the same value - this is the length of a section of wall that contains one window along the x-axis in meters


### z-proportion-geometry, z-proportion-material
default: 5

set these to the same value - this is the length of a section of wall that contains one window along the z-axis in meters

### y-proportion-geometry, y-proportion-material
default: 4

set these to the same value - this is the height of a story in meters

### window-width
default: 0.0 (half the section is window)
min: -1.0
max: 1.0

proportion of a section which is window

### window-height
default: -0.4
min: -1.0
max: 1.0

proportion of a story which is window

### wall-color
default: '#909090'

the base color of walls

### window-color
default: '#181818'

the base color of windows

### sun-position
default: {x:-1.0, y:1.0, z:-1.0}

The direction from which the sun is shining

### buildings
default: "[]" (no buildings)

JSON string of an array of objects, each object describing a building tier, containing some of the following properties.
A building consists of 1 or more tiers.  A tier contains 1 or more stories. 
Currently, all tiers are ell-shaped.

* x: location of tier, relative to group. Should be a multiple of the x-proportion
* z: location of tier, relative to group. Should be a multiple of the z-proportion
* y: location of tier, relative to group. Should be a multiple of the y-proportion
* xCoreSections: # sections (and thus, windows) in the tier core along the x axis. Add about 0.15 (depending on the windowWidth) to make a wall windowless.
* xWingSections: # sections (and thus, windows) in the wing along the x axis. Add about 0.15 (depending on the windowWidth) to make a wall windowless.
* zCoreSections: # sections (and thus, windows) in the tier core along the z axis. Add about 0.15 (depending on the windowWidth) to make a wall windowless.
* zWingSections: # sections (and thus, windows) in the wing along the z axis. Add about 0.15 (depending on the windowWidth) to make a wall windowless.
* ySections: # stories in the tier. Add up to about 0.4 to give a tier some attic space.



Development
---
`npm install`

edit files

`npm run build`




Internals
---
The geometry of all buildings of a single entity is merged, so there's only one draw call.

Ell-shaped buildings use only 12 triangles per tier, regardless of the number of windows.




To Do
---

* Use a modified version of a Phong shader, for more realism
* rotate buildings for more variety
* More building shapes: tee, cee, plus, eee and box, for starters.
