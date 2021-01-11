<template>
      <v-app>
        <v-card width="400px" class="mx-auto mt-5">
            <v-card-title>
            <h1 class="display-1">サインアップ</h1>
            </v-card-title>
            <v-card-text>
                <v-text-field
                    label="E-mail" v-model="email" 
                ></v-text-field>
                <v-text-field
                    label="Password" v-model="password" 
                ></v-text-field>
            </v-card-text>
                <v-card-actions>
                    <v-btn @click="createUserAccount">Sign UP!!</v-btn>
                </v-card-actions>
            
        </v-card>
    </v-app>
</template>

<script>
import firebase from "../firebase.js";
export default {
  name: "signup",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    createUserAccount() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert("Create Account");
        })
        .catch(error => {
          alert("Error!", error.message);
          console.error("Account Regeister Error", error.message);
        });
    }
  }
};
</script>