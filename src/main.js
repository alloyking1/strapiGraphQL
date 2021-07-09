import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

// custom
const router = new VueRouter({
  mode: 'history',
  routes : [

    { path: '/', component: require('./components/Home.vue').default },
    { path: '/create', component: require('./components/CreatePost.vue').default },
    { path: '/blog/:id', component: require('./components/SingleBlog.vue').default},
    { path: '/user/signup', component: require('./components/Register.vue').default},
  ],
})

import VueApollo from 'vue-apollo'
Vue.use(VueApollo)

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:1337/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})


new Vue({
  // apolloProvider: createProvider(),
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')
