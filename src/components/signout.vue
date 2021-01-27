<template>
   <v-app>
    <v-snackbar v-model="snackbar" :color="snackbarColor" :top="true" timeout="3000">
      {{ snackbarText }}
      <v-btn text @click="snackbar = false">閉じる</v-btn>
    </v-snackbar>
    <v-card width="400px" class="mx-auto mt-5">
        <v-card-title>
        <h1 class="display-1">ログアウト</h1>
        </v-card-title>
        <v-card-text>
        </v-card-text>
            <v-card-actions>
                 <v-btn @click="singout">Sign out Now!!</v-btn>
            </v-card-actions>
           

    </v-card>
    </v-app>
   
</template>

<script>
import router from "../router";
import firebase from "../firebase.js";
export default {
  name: "signout",
  data () {
    return {
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
   }
  },
  methods: {
    
  }
};
</script>