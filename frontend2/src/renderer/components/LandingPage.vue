<template>
  <div>
    <div class="row">
      <header class="col-md-12">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand">Vue TODO List</a>
          <button class="btn btn-danger my-2 my-sm-0" @click="logout()" type="button">Logout</button>
        </nav>
      </header>
    </div>

    <div class="row" id="fetch-button-row">
      <div class="col-md-12">
        <button @click="fetchTodos()" class="btn btn-primary">Fetch Todos</button>
      </div>
      <!-- <a href="#" @click="logout()">Logout </a>
      <br>-->
    </div>

    <div class="row" id="todos-row">
      <div class="col-md-12">
        <ul class="list-group">
          <li class="list-group-item" v-for="todo in todos" :key="todo.id">{{todo.task}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const { remote } = window.require("electron");
const axios = require("axios"); //This should use require as its frontend
import authService from "../../main/services/auth-service";
export default {
  name: "HelloWorld",
  data: () => {
    return {
      todos: []
    };
  },
  mounted: () => {
    /* axios
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
      }); */
  },
  methods: {
    logout() {
      authService.logout();
      remote.getCurrentWindow().close();
    },
    async fetchTodos() {
      console.log(authService.getAccessToken());
      console.log(authService.sayHi());

      let accessToken = await authService.refreshTokens();

      console.log(accessToken);

      axios
        .get("http://localhost:1337/todos", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          console.log(response);
          this.todos = response.data;
          console.log(this.todos);
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
@import "~bootstrap/dist/css/bootstrap.min.css";

#fetch-button-row,
#todos-row {
  margin: 10px;
}
</style>
