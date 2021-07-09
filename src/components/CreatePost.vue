<template>
  <div class="container">
    <div class="mt-5">
      <div class="card-head" style="padding: 4rem">
        <h1 style="font-size: 6rem">
          Create New Post
          <hr />
        </h1>
      </div>
      <div class="card card shadow-lg p-3 mb-5 bg-white rounded mr-5 ml-5">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Title:</label>
            <input type="text" v-model="Title" class="form-control" />
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Body:</label>
            <textarea class="form-control" rows="8" v-model="Body"></textarea>
          </div>
        </form>
        <div>
          <button type="button" class="btn btn-primary" @click="createPost()">
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
      Title: "",
      Body: "",
    };
  },

  methods: {
    createPost() {
      if (this.Title && this.Body) {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation createBlog($Title: String!, $Body: String!) {
                createBlog(input: { data: { Title: $Title, Body: $Body } }) {
                  blog {
                    Title
                    Body
                  }
                }
              }
            `,
            variables: {
              Title: this.Title,
              Body: this.Body,
            },
          })
          .then((res) => {
            console.log(res);
            alert("Post Created");
          });
      } else {
        alert("all fields are required");
      }
    },
  },
};
</script>