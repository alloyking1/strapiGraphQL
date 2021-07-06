<template>
  <div>
    <h1>This is a single blog post</h1>
    <p>
      {{ blog }}
    </p>
  </div>
</template>

<script>
import gql from "graphql-tag";

// const PropertyQuery = gql`
//   query Property($id: ID!) {
//     Property(id: $id) {
//       id
//       slug
//       title
//     }
//   }
// `

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
          id: this.id, // Error here!
        };
      },
    },
  },
};
</script>