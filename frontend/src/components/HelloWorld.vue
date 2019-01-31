<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      I just ran vue in electron baby. Great things are happening already
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
      <br>
      <a href="#" @click="logout()">Logout </a>
    </p>
    <p>
      <a href="#" @click="fetchTodos()">Fetch Todos </a>
    </p>
  </div>
</template>

<script>
const { remote } = window.require("electron");
const axios = require("axios"); //This should use require as its frontend
const authService = remote.require("./electron-services/auth-service");
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted: () => {
    axios
      .get("http://localhost:1337/todos", {
        headers: {
          Authorization: `Bearer ${authService.getAccessToken()}`
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if (error) throw new Error(error);
      });
  },
  methods: {
    logout() {
      authService.logout();
      remote.getCurrentWindow().close();
    },
    fetchTodos() {
      console.log(authService.getAccessToken());
      axios
        .get("http://localhost:1337/todos", {
          headers: {
            Authorization: `Bearer ${authService.getAccessToken()}`
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error) throw new Error(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
