<template>
  <div class="container">
    <div class="mt-5">
      <div class="card-head" style="padding: 4rem">
        <h1 style="font-size: 6rem">
          Create New User
          <hr />
        </h1>
      </div>
      <div class="card card shadow-lg p-3 mb-5 bg-white rounded mr-5 ml-5">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label"
              >User Name:</label
            >
            <input type="text" v-model="username" class="form-control" />
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Email:</label>
            <input type="email" v-model="email" class="form-control" />
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Password:</label>
            <input type="password" v-model="password" class="form-control" />
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Password:</label>
            <input
              type="password"
              v-model="password_confirm"
              class="form-control"
            />
          </div>
        </form>
        <div>
          <button type="button" class="btn btn-primary" @click="createUser()">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    };
  },

  methods: {
    createUser() {
      if (
        this.username &&
        this.email &&
        this.password &&
        this.password_confirm
      ) {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation register(
                $username: String!
                $email: String!
                $password: String!
              ) {
                register(
                  input: {
                    username: $username
                    email: $email
                    password: $password
                  }
                ) {
                  jwt
                  user {
                    username
                    email
                  }
                }
              }
            `,
            variables: {
              username: this.username,
              email: this.email,
              password: this.password,
            },
          })
          .then((res) => {
            console.log(res);
            alert("User created Created");
          });
      } else {
        alert("all fields are required");
      }
    },
  },
};
</script>