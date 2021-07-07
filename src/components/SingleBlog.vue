<template>
  <div>
    <div class="container customPadding">
      <div class="customPadding">
        <div class="card card shadow-lg p-3 mb-5 bg-white rounded mr-5 ml-5">
          <div class="container">
            <div class="card-head" style="padding: 4rem">
              <h1 style="font-size: 6rem">{{ blog.Title }}</h1>
            </div>
            <hr />
            <p style="line-height: 26pt">
              {{ blog.Body }}
            </p>
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