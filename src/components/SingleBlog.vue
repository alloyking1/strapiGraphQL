<template>
  <div>
    <div class="container customPadding">
      <div class="customPadding">
        <div class="card card shadow-lg p-3 mb-5 bg-white rounded mr-5 ml-5">
          <div class="container">
            <div class="card-head" style="padding: 4rem">
              <h1 style="font-size: 6rem">{{ blog.Title }}</h1>

              <button
                type="button"
                class="btn btn-primary mr-2"
                data-toggle="modal"
                data-target="#exampleModal"
                data-whatever="@mdo"
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-danger"
                @click="deletePost()"
              >
                Delete
              </button>
            </div>
            <hr />
            <p style="line-height: 26pt">
              {{ blog.Body }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Post</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label"
                  >Title:</label
                >
                <input type="text" v-model="blog.Title" class="form-control" />
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Body:</label>
                <textarea class="form-control" v-model="blog.Body"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="editPot()">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "SingleBlog",
  data() {
    return {
      blog: [],
      id: this.$route.params.id,
    };
  },

  methods: {
    editPot() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation updateBlog($id: ID!, $Title: String!, $Body: String!) {
              updateBlog(
                input: {
                  where: { id: $id }
                  data: { Title: $Title, Body: $Body }
                }
              ) {
                blog {
                  Title
                  Body
                }
              }
            }
          `,
          variables: {
            id: this.id,
            Title: this.blog.Title,
            Body: this.blog.Body,
          },
        })
        .then((res) => {
          console.log(res);
          alert("Edited");
        });
    },

    deletePost() {
      const check = confirm();
      if (check) {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation deleteBlog($id: ID!) {
                deleteBlog(input: { where: { id: $id } }) {
                  blog {
                    Title
                    Body
                  }
                }
              }
            `,
            variables: {
              id: this.id,
            },
          })
          .then((res) => {
            console.log(res);
          });
      } else {
        return false;
      }
    },
  },

  apollo: {
    blog: {
      query: gql`
        query blog($id: ID!) {
          blog(id: $id) {
            id
            Title
            Body
          }
        }
      `,
      variables() {
        return {
          id: this.id,
        };
      },
    },
  },
};
</script>


<style>
.customPadding {
  margin-top: 12rem !important;
  margin-bottom: 12rem !important;
  /* padding: 4rem; */
}
</style>