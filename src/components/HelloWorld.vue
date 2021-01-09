<template>
  <div class="hello">
    <canvas id="canvas" width="500" height="500"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric-browseronly'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    const canvas = new fabric.Canvas('canvas');
    
    const rect = new fabric.Rect({
      fill: 'red',
      width: 100,
      height: 100,
      hasControls:false
    });
    canvas.add(rect);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#canvas {
  border: 4px solid;
}
</style>
