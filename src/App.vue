<template>
  <v-app>
    <v-app-bar
      app
      color="purple lighten-1"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Backer Logo"
          class="shrink mr-2"
          contain
          src="@/assets/backerlogo.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Backer</h1>
        
      </div>

      <v-spacer></v-spacer>

 <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/mypage">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
         <v-btn text to="/signout">SignOut</v-btn>
         <v-btn text to="/signup">SignUp</v-btn>
     
      </v-toolbar-items>



      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div>

        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
