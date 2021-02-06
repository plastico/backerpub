# backer

Backer is demo project for layout badges to collection.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Add src/firebase.js

```
import firebase from "firebase";
import "firebase/auth";

const config = {
apiKey: "*********",
authDomain: "*********",
projectId: "*********",
storageBucket: "*********",
messagingSenderId: "*********",
appId: "*********",
measurementId: "*********",
};

firebase.getCurrentUser = () => {
return new Promise((resolve, reject) => {
const unsubscribe = firebase.auth().onAuthStateChanged(user => {
unsubscribe()
resolve(user);
}, reject);
});
};

firebase.initializeApp(config);
firebase.analytics();

export default firebase;
```
