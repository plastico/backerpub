<template>
  <div>
    <h1>SING OUT</h1>
    <button @click="singout">Sign out Now!!</button>
  </div>
</template>

<script>
import firebase from "../firebase.js";
export default {
  name: "signout",
  methods: {
    singout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logout!");
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>