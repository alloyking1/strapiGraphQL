<template>
  <div>
    <div class="container">
      <br />

      <div class="container">
        <div class="row">
          <div class="col-sm">
            <div v-for="blog in blogs" :key="blog.id">
              <router-link class="text" :to="{ path: '/blog/' + blog.id }">
                <div class="customCard">
                  <div
                    class="card shadow-lg p-3 mb-5 bg-white rounded mr-5 ml-5"
                  >
                    <div class="card-head text-left">
                      <h2>
                        {{ blog.Title }}
                        <hr />
                      </h2>
                    </div>
                    <div class="card-body text-center">{{ blog.Body }}</div>
                  </div>
                </div>
              </router-link>
              <br />
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
  name: "HelloWorld",
  data() {
    return {
      blogs: [],
    };
  },

  apollo: {
    blogs: {
      query: gql`
        query {
          blogs {
            id
            Title
            Body
          }
        }
      `,
    },
  },
};
</script>

<style>
.customCard {
  padding: 6rem !important;
}
</style>