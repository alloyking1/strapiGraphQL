<template>
  <div>
    <div class="container">
      <div class="container">
        <div class="customPadding">
          <div class="row">
            <div class="col-sm">
              <div class="customCard">
                <h1
                  style="
                    font-size: 3rem;
                    text-align: center;
                    padding-bottom: 6rem;
                  "
                >
                  All Blog Post
                </h1>
              </div>
              <div v-for="blog in blogs" :key="blog.id">
                <router-link
                  class="nav-link"
                  :to="{ path: '/blog/' + blog.id }"
                >
                  <div class="container">
                    <div class="customCard">
                      <div
                        class="
                          card
                          shadow-lg
                          p-3
                          mb-5
                          bg-white
                          rounded
                          mr-5
                          ml-5
                        "
                      >
                        <div class="card-head" style="padding: 4rem">
                          <h1 style="font-size: 6rem">
                            {{ blog.Title }}
                            <hr />
                          </h1>
                        </div>
                        <div class="card-body text-center">
                          <p style="line-height: 26pt">{{ blog.Body }}</p>
                        </div>
                      </div>
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
.customPadding {
  margin-top: 12rem !important;
  margin-bottom: 12rem !important;
  /* padding: 4rem; */
}
</style>