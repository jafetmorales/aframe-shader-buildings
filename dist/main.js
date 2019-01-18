!function(o){var e={};function n(r){if(e[r])return e[r].exports;var t=e[r]={i:r,l:!1,exports:{}};return o[r].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=o,n.c=e,n.d=function(o,e,r){n.o(o,e)||Object.defineProperty(o,e,{enumerable:!0,get:r})},n.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},n.t=function(o,e){if(1&e&&(o=n(o)),8&e)return o;if(4&e&&"object"==typeof o&&o&&o.__esModule)return o;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:o}),2&e&&"string"!=typeof o)for(var t in o)n.d(r,t,function(e){return o[e]}.bind(null,t));return r},n.n=function(o){var e=o&&o.__esModule?function(){return o.default}:function(){return o};return n.d(e,"a",e),e},n.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},n.p="",n(n.s=2)}([function(o,e){o.exports="\nprecision mediump float;\n\nuniform vec3 sunNormal;\n\nvarying vec3 pos;\nvarying float sunFactor;\n\nvoid main() {\n  pos = position;\n\n  sunFactor = 0.5 + max(dot(normal, sunNormal), 0.0);\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n"},function(o,e){o.exports="\nprecision mediump float;\n\nconst float PI = 3.1415926535897932384626433832795;\n\nuniform float xProportion;\nuniform float zProportion;\nuniform float yProportion;\nuniform float windowWidth;\nuniform float windowHeight;\nuniform vec3 wallColor;\nuniform vec3 windowColor;\n\nvarying vec3 pos;\nvarying float sunFactor;\n\nvoid main() {\n    float xx1 = step(windowWidth, sin(pos.x * 2.0 * PI / xProportion - PI / 2.0));\n    float xx2 = step(0.8, sin(pos.z * 2.0 * PI / zProportion + PI / 2.0));\n\n    float zz1 = step(windowWidth, sin(pos.z * 2.0 * PI / zProportion - PI / 2.0));\n    float zz2 = step(0.8, sin(pos.x * 2.0 * PI / xProportion + PI / 2.0));\n\n    float yy1 = step(windowHeight, sin(pos.y * 2.0 * PI / yProportion - 2.0));\n\n    vec3 inherentColor = mix(wallColor, windowColor, (xx1 * xx2 + zz1 * zz2) * yy1);\n\n    gl_FragColor = vec4(inherentColor * sunFactor, 1.0);\n}\n"},function(o,e,n){"use strict";n.r(e);var r=n(0),t=n.n(r),i=n(1),a=n.n(i);AFRAME.registerShader("buildings",{schema:{xProportion:{type:"number",default:5},zProportion:{type:"number",default:5},yProportion:{type:"number",default:4},windowWidth:{type:"number",default:0,min:-1,max:1},windowHeight:{type:"number",default:-.4,min:-1,max:1},wallColor:{type:"color",default:"#909090"},windowColor:{type:"color",default:"#181818"},sunPosition:{type:"vec3",default:{x:-1,y:1,z:-1}}},init:function(o){let e=new THREE.Vector3(o.sunPosition.x,o.sunPosition.y,o.sunPosition.z);this.material=new THREE.ShaderMaterial({uniforms:{xProportion:{value:o.xProportion},zProportion:{value:o.zProportion},yProportion:{value:o.yProportion},windowWidth:{value:-o.windowWidth},windowHeight:{value:-o.windowHeight},wallColor:{value:new THREE.Color(o.wallColor)},windowColor:{value:new THREE.Color(o.windowColor)},sunNormal:{value:e.normalize()}},vertexShader:t.a,fragmentShader:a.a})},update:function(o){this.material.uniforms.xProportion.value=o.xProportion,this.material.uniforms.zProportion.value=o.zProportion,this.material.uniforms.yProportion.value=o.yProportion,this.material.uniforms.windowWidth.value=-o.windowWidth,this.material.uniforms.windowHeight.value=-o.windowHeight,this.material.uniforms.wallColor.value.set(o.wallColor),this.material.uniforms.windowColor.value.set(o.windowColor);let e=new THREE.Vector3(o.sunPosition.x,o.sunPosition.y,o.sunPosition.z);this.material.uniforms.sunNormal.value=e.normalize()}}),AFRAME.registerGeometry("ell",{schema:{xProportion:{type:"number",default:5,min:1},zProportion:{type:"number",default:5,min:1},yProportion:{type:"number",default:4,min:2},buildings:{type:"string",default:"[{}]"}},init:function(o){let e=JSON.parse(o.buildings);var n=new THREE.Geometry;for(let r=0;r<e.length;++r){let t=e[r].x||0,i=e[r].z||0,a=e[r].y||0,s=Math.max(e[r].xCoreSections||2,1),l=Math.max(e[r].xWingSections||0,0),u=Math.max(e[r].zCoreSections||2,1),p=Math.max(e[r].zWingSections||0,0),c=s*o.xProportion,m=l*o.xProportion,w=u*o.zProportion,f=p*o.zProportion,d=a+(e[r].ySections||1)*o.yProportion;n.vertices.push(new THREE.Vector3(t,a,i)),n.vertices.push(new THREE.Vector3(t+m,a,i)),n.vertices.push(new THREE.Vector3(t+m,a,i-w)),n.vertices.push(new THREE.Vector3(t-c,a,i-w)),n.vertices.push(new THREE.Vector3(t-c,a,i+f)),n.vertices.push(new THREE.Vector3(t,a,i+f)),n.vertices.push(new THREE.Vector3(t,d,i)),n.vertices.push(new THREE.Vector3(t+m,d,i)),n.vertices.push(new THREE.Vector3(t+m,d,i-w)),n.vertices.push(new THREE.Vector3(t-c,d,i-w)),n.vertices.push(new THREE.Vector3(t-c,d,i+f)),n.vertices.push(new THREE.Vector3(t,d,i+f)),n.faces.push(new THREE.Face3(12*r+0,12*r+1,12*r+7)),n.faces.push(new THREE.Face3(12*r+0,12*r+7,12*r+6)),n.faces.push(new THREE.Face3(12*r+1,12*r+2,12*r+8)),n.faces.push(new THREE.Face3(12*r+1,12*r+8,12*r+7)),n.faces.push(new THREE.Face3(12*r+2,12*r+3,12*r+9)),n.faces.push(new THREE.Face3(12*r+2,12*r+9,12*r+8)),n.faces.push(new THREE.Face3(12*r+3,12*r+4,12*r+10)),n.faces.push(new THREE.Face3(12*r+3,12*r+10,12*r+9)),n.faces.push(new THREE.Face3(12*r+4,12*r+5,12*r+11)),n.faces.push(new THREE.Face3(12*r+4,12*r+11,12*r+10)),n.faces.push(new THREE.Face3(12*r+5,12*r+0,12*r+6)),n.faces.push(new THREE.Face3(12*r+5,12*r+6,12*r+11)),n.faces.push(new THREE.Face3(12*r+6,12*r+7,12*r+8)),n.faces.push(new THREE.Face3(12*r+8,12*r+9,12*r+6)),n.faces.push(new THREE.Face3(12*r+9,12*r+10,12*r+6)),n.faces.push(new THREE.Face3(12*r+10,12*r+11,12*r+6))}n.computeBoundingBox(),n.mergeVertices(),n.computeFaceNormals(),n.computeVertexNormals(),this.geometry=n}}),AFRAME.registerPrimitive("a-shader-buildings",{defaultComponents:{geometry:{primitive:"ell",buildings:[]},material:{shader:"buildings"}},mappings:{"x-proportion-geometry":"geometry.xProportion","z-proportion-geometry":"geometry.zProportion","y-proportion-geometry":"geometry.yProportion",buildings:"geometry.buildings","x-proportion-material":"material.xProportion","z-proportion-material":"material.zProportion","y-proportion-material":"material.yProportion","window-width":"material.windowWidth","window-height":"material.windowHeight","wall-color":"material.wallColor","window-color":"material.windowColor","sun-position":"material.sunPosition"}})}]);