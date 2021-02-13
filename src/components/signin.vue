<template>


  <div>
    <v-app>
            <v-snackbar v-model="snackbar" :color="snackbarColor" :top="true" timeout="3000">
      {{ snackbarText }}
      <v-btn text @click="snackbar = false">閉じる</v-btn>
    </v-snackbar>
    <v-card width="400px" class="mx-auto mt-5">
      <v-form @submit.prevent="userSingIn">
        <v-card-title>
        <h1 class="display-1">Log in</h1>
        </v-card-title>
        <v-card-text>


            <v-text-field
                label="E-mail" v-model="email" 
            ></v-text-field>
            <v-text-field
                label="Password" type="password"  v-model="password" 
            ></v-text-field>
        </v-card-text>
            <v-card-actions>
                 <v-btn type="submit" >Sign in Now!!</v-btn>
            </v-card-actions>
             </v-form>
    </v-card>

      <p class="text-center"> To make your account, please <router-link to="/signup">sign up</router-link></p>
     
        
    </v-app>




    
  </div>
</template>

<script>
import firebase from "../firebase.js";
import store from "../store";

export default {
  name: "signin",
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
    };
  },
  methods: {
    userSingIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {

          user = user ? user.user : {};
          store.commit('onAuthStateChanged', user);
          store.commit('onUserStatusChanged', user.uid ? true : false);

           this.snackbarText = 'ログイン成功!';
          this.snackbarColor = 'success';
          this.snackbar = true;
          this.$router.push("/mypage");
        });
    }
  }
};
</script>