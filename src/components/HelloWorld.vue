<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout  align="center">
          <v-container>
                 <canvas 
            id="canvas" width="500" height="500"></canvas>
        </v-container>

        </v-layout>
  </v-container>
</template>

<script>
import { fabric } from 'fabric-browseronly'
  export default {
    name: 'HelloWorld',
    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
    mounted() {
    const canvas = new fabric.Canvas('canvas', {
      preserveObjectStacking: true
      });
    const rect = new fabric.Rect({
      fill: 'red',
      width: 100,
      height: 100,
    });
        canvas.add(rect);
    new fabric.Image.fromURL('https://members.scouts.org.uk/images/content/badges/2015sc-as-ar.png', function(oImg) {
        oImg.scale(0.25);
        oImg.hasControls = oImg.hasBorders = false;
        canvas.add(oImg);
      });
    new fabric.Image.fromURL('https://members.scouts.org.uk/images/content/badges/2015sc-cs-out.png', function(oImg) {
      oImg.scale(0.25);
      oImg.hasControls = oImg.hasBorders = false;
      canvas.add(oImg);
    });
    new fabric.Image.fromURL('https://members.scouts.org.uk/images/content/badges/2015sc-cs-ski.png', function(oImg) {
      oImg.scale(0.25);
      oImg.hasControls = oImg.hasBorders = false;
      canvas.add(oImg);
    });
    new fabric.Image.fromURL('https://members.scouts.org.uk/images/content/badges/2015sc-cs-adv.png', function(oImg) {
      oImg.scale(0.25);
      oImg.hasControls = oImg.hasBorders = false;
      canvas.add(oImg);
    });

  }
  }
</script>

<style>
#canvas {
  border: 4px solid;
}
</style>