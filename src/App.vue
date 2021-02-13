<template>
  <v-app>
     <v-navigation-drawer app v-model="drawer" absolute
      temporary>

      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >

          <v-list-item text to="/mypage">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>


          <v-list-item  v-if="login" @click="signout">
            <v-list-item-title>SignOut</v-list-item-title>
          </v-list-item>
          <v-list-item  v-else to="/signin">
            <v-list-item-title>SignIn</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
      </v-navigation-drawer>
    <v-app-bar
      app
      color="purple lighten-1"
      dark
    >
      <v-app-bar-nav-icon  @click="drawer=!drawer" ></v-app-bar-nav-icon>
               <v-img
          alt="Backer Logo"
          class="shrink mr-2"
          contain
          src="@/assets/backerlogo.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Backer (ß)</h1>

      <v-spacer></v-spacer>

 <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/mypage">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
         <v-btn v-if="login" text @click="signout">SignOut</v-btn>
          <v-btn text v-else to="/signin">SignIn</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-main>
      <div>

        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>

import firebase from "./firebase.js";
import store from "./store";
export default {
  
  name: 'App',

  components: {
    
  },
  computed: {
  user() {
    return this.$store.getters.user;
  },
  login() {
    return this.$store.getters.isSignedIn;
  }
},

  data: () => ({
    drawer:null
    //
  }),
  methods:{
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          store.commit('onAuthStateChanged', null);
          store.commit('onUserStatusChanged', false);
          this.$router.go({path: this.$router.currentRoute.path, force: true});
        })
        .catch(error => {
          alert(error);
        });
    }


  }
};
</script>
