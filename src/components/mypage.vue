<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout  align="center">
          <v-container>
                 <canvas 
            id="canvas" width="608" height="424"></canvas>
        </v-container>
          <v-container fluid class="overflow-y-auto">
      <v-row>
        <v-col
          v-for="badge in badges"
          :key="badge.name"
          :cols="4"
        >
          <v-card flat color="grey lighten-5">
            <v-img
              max-height="125"
              contain
              :src="badge.url"
              class="grey--text align-top"
            >
              <v-card-title v-text="badge.name"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
        
    

        </v-layout>
  </v-container>
</template>

<script>
import firebase from "../firebase.js"
import { fabric } from 'fabric-browseronly'
  export default {
    name: 'HelloWorld',
      data () {
          return {
             badges: [
      ],
        }
      },
    async mounted() {
      const storage = firebase.storage();
    const canvas = new fabric.Canvas('canvas',{preserveObjectStacking: true});
    const user = firebase.auth().currentUser;
    await firebase.firestore()
      .doc(`users/${user.uid}`).collection('holds').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
           
            var pathReference = storage.ref(`layout/${doc.data().src}`);
            pathReference.getDownloadURL().then(url=>{
              const obj = {url: url};
              const result1= { ...obj, ...doc.data() };


               //doc.data().url = url;
              this.badges.push(result1);
               console.log(doc.id, " => ", doc.data());

            });
            
        });
    });


    const rect = new fabric.Rect({
      fill: 'red',
      width: 100,
      height: 100,
      hasControls:true
    });
    new fabric.Image.fromURL('https://members.scouts.org.uk/images/content/badges/2015sc-as-ar.png', function(oImg) {
        oImg.scale(0.25);
        //oImg.hasControls =  oImg.hasBorders  = false;
         oImg.centeredScaling = true;
          oImg.lockScalingX = oImg.lockScalingY = true;
        canvas.add(oImg);
      });
    new fabric.Image.fromURL('https://members.scouts.org.uk/images/content/badges/2015sc-cs-out.png', function(oImg) {
      oImg.scale(0.25);
      //oImg.hasControls =  oImg.hasBorders  = false;
       oImg.centeredScaling = true;
          oImg.lockScalingX = oImg.lockScalingY = true;
      canvas.add(oImg);
    });
    new fabric.Image.fromURL('https://members.scouts.org.uk/images/content/badges/2015sc-cs-ski.png', function(oImg) {
      oImg.scale(0.25);
      //oImg.hasControls =  oImg.hasBorders  = false;
       oImg.centeredScaling = true;
         oImg.lockScalingX = oImg.lockScalingY = true;
      canvas.add(oImg);
    });
    new fabric.Image.fromURL('https://members.scouts.org.uk/images/content/badges/2015sc-cs-adv.png', function(oImg) {
      oImg.scale(0.25);
      //oImg.hasControls =  oImg.hasBorders  = false;
      oImg.centeredScaling = true;
      canvas.add(oImg);
    });
    canvas.add(rect);
  }
  }
</script>

<style>
#canvas {
  border: 4px solid;
}
</style>