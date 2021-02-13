import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Auth from '@okta/okta-vue'
import Home from '../views/Home.vue'
import GameBoard from '../views/GameBoard.vue'

Vue.use(Auth, {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  client_id: '{yourClientId}',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})


const routes = [
  { path: '/implicit/callback',
    component: Auth.handleCallback()
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'GameBoard',
    component: GameBoard

  }
]

const router = new VueRouter({
  routes
})

export default router