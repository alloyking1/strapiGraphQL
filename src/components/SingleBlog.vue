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
                data-target=".bd-example-modal-lg"
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

        <!-- Large modal -->

        <div
          class="modal fade bd-example-modal-lg"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="container">
              <div class="modal-content" style="margin: 3rem">
                <!-- form -->

                <form>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter title"
                    />
                  </div>

                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Blog post</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
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