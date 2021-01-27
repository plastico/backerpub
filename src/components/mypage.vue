<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout  align="center">
      <v-row>
        <v-col>
          <v-container>
            <v-row><v-col>
                 <canvas 
            id="canvas" width="608" height="424"></canvas>
            </v-col></v-row>
            <v-row>
              <v-col>
                <v-btn v-on:click="deleteSelectedObjectsFromCanvas">delete</v-btn>
              </v-col>
              <v-col>
                <v-btn v-on:click="exportImage">export</v-btn>
                <a href="" id="download_link"></a>
              </v-col>
              <v-col>
                <v-btn v-on:click="reloadJSON">Reload</v-btn>
              </v-col>
              <v-col>
                <v-btn v-on:click="saveToJSON">save</v-btn>
              </v-col>
            </v-row>
           
            <v-row>
                <v-col :cols="2">
                       <v-btn v-on:click="toggleShowSlider">zoom</v-btn>   
          </v-col>  <v-col :cols="4">
           
                          <v-slider  v-show="show_slider"
                            v-model="scale"
                            thumb-label="always"
                            hint="Set scale"
                            max="30"
                            min="1"
                            @change="setZoom()"
                          ></v-slider> 
          </v-col>
             
              </v-row>
         
       
          </v-container>
        </v-col>
        <v-col :cols="5">
          <v-select
                  v-model="select"
                  :items="items"
                  item-text="name"
                  item-value="id"
                  label="type"
                  @change="updateBadges()">
                </v-select>
                  <v-container class="overflow-y-auto">
      <v-row>
        <v-col
          v-for="badge in badges"
          :key="badge.name"
           :cols="4"
        >
          <v-card flat color="grey lighten-5" @click="addBadgeToCanvas(badge.url)">
            <v-img
              max-height="125"
              contain
              :src="badge.url"
              class="grey--text align-top"
            >
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
        </v-col>
      </v-row>
        </v-layout>
  </v-container>
</template>

<script>
import firebase from "../firebase.js"
import axios from 'axios'
import { fabric } from 'fabric-browseronly'
  export default {
    name: 'HelloWorld',
      data () {
          return {
             badges: [ ],
             canvas:"",
             // 入力欄に表示される内容です。
              select: [],
              // リストに表示される内容です。
              items: [],
              show_slider: false,
              scale:10
        }
      },
      methods:{
         toggleShowSlider:function(){
            this.show_slider = !this.show_slider;
        },
        deleteSelectedObjectsFromCanvas:function(){
            var selection = this.canvas.getActiveObject();
             //console.log(JSON.stringify(selection));
            if (selection.type === 'activeSelection') {
                selection.forEachObject(element => {
                    console.log(element);
                    this.canvas.remove(element);
                });
            }
            else{
                this.canvas.remove(selection);
            }
            this.canvas.discardActiveObject();
            this.canvas.requestRenderAll();
        },
         exportImage:function() {
              
              
              var dlLink = document.getElementById('download_link');
              dlLink.href = this.canvas.toDataURL();
              dlLink.download = 'toData.png';
              dlLink.click();
   




         },
        updateBadges:function() {
          this.badges=[];
          const storage = firebase.storage();
          console.log(JSON.stringify(this.select));
          firebase.firestore()
            .doc(`badges/${this.select}`).collection('badges').get().then(querySnapshot => {
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

        },
        reloadJSON:function() {
          
     const storage = firebase.storage();
      const user = firebase.auth().currentUser;
      var storageRef = storage.ref(`users/${user.uid}/layout.json`);
      storageRef.getDownloadURL().then(url => {
        // 取得したURLにGETリクエストを投げる
        console.log(url)
        return axios.get(url)
      }).then(response => {
        // 返ってきたresponseのdataプロパティにjsonファイルの中身が格納されている
        //console.log(response)
        const data = response.data
        console.log(data)
        //const source = JSON.parse(data);
         this.canvas.loadFromJSON(data,() => {
              this.canvas.renderAll();
              //const tmp = this.canvas.item(0).getElement();
              this.scale = data.zoomParam;
              this.setZoom();
         })
         
       // commit('setData', { raceData: data })
      });

        },
         saveToJSON:function() {
          const storage = firebase.storage();
           const user = firebase.auth().currentUser;
           var storageRef = storage.ref(`users/${user.uid}/layout.json`);
           const saveJson = this.canvas;
           console.log(saveJson);
           const tmpJsonString = JSON.stringify(saveJson);
           const tmpObj = JSON.parse(tmpJsonString);
           tmpObj.zoomParam = this.scale;
           const jsonString = JSON.stringify(tmpObj);
           var blob = new Blob([jsonString], {type: "application/json"})
           const uploadTask = storageRef.put(blob);
              uploadTask.on('state_changed', 
                 /* snapshot => {
                    //const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    //this.fileLoading = percentage
                  }, */
                  err => {
                    console.log(err)
                    /*this['flash/setFlash']({
                      message: 'ファイルのアップロードに失敗しました。',
                      type: 'error'
                    })*/
                  },
                 /* () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                      this.fileLoading = 0
                      //this.thumbnail = downloadURL
                    })
                  }*/
                );
        },
        addBadgeToCanvas:function(url){
            
            //console.log(url);
            new fabric.Image.fromURL(url,async oImg => {
                    //oImg.scale(0.25);
                    //oImg.hasControls =  oImg.hasBorders  = false;
                    oImg.centeredScaling = true;
                    //oImg.lockScalingX = oImg.lockScalingY = true;
                    this.canvas.add(oImg);
                    //const scale = oImg.getObjectScaling();
                    oImg.set('scaleX', 100 / oImg.width);
                    oImg.set('scaleY', 100 / oImg.width);
                    this.canvas.discardActiveObject();
                    this.canvas.requestRenderAll();
                  }, { crossOrigin: '*' });

          
        },
         setZoom:function(){

            this.canvas.zoomToPoint(new fabric.Point(this.canvas.width / 2, this.canvas.height / 2), this.scale/10);
            this.canvas.setZoom(this.scale/10)
            //this.canvas.setZoom(this.scale/10);



        }
      },
    async mounted() {

    this.canvas = new fabric.Canvas('canvas',{preserveObjectStacking: true});
    this.reloadJSON();
    

    let firstRecord = true;

    firebase.firestore()
      .collection('badges').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
           
              this.items.push({ name:doc.data().name, id:doc.id});
              console.log(JSON.stringify(this.items));
              if (firstRecord){
                firstRecord=false;
                this.select = doc.id;
                this.updateBadges();
              }
          });
      });
      



    /* const user = firebase.auth().currentUser;
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
    }); */


    const rect = new fabric.Rect({
      fill: 'red',
      width: 100,
      height: 100,
      hasControls:true
    });
   
    this.canvas.add(rect);
  }
  }
</script>

<style>
#canvas {
  border: 4px solid;
}
</style>