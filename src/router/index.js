import Vue from 'vue';
import Router from 'vue-router';
import auth from '../app/auth';
import UserInfoStore from '../app/user-info-store';
import UserInfoApi from '../app/user-info-api';


Vue.use(Router);

//Components
import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
import History from '../views/GameHistory.vue';
import GameController from '../views/GameController.vue';
import GameBoard from '../views/GameBoard.vue';
import ErrorComponent from '@/components/Error';
import LogoutSuccess from '@/components/Logout';

function requireAuth(to, from, next) {
  if (!auth.auth.isUserSignedIn()) {
    UserInfoStore.setLoggedIn(false);
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    UserInfoApi.getUserInfo().then(response => {
      UserInfoStore.setLoggedIn(true);
      UserInfoStore.setCognitoInfo(response);
      next();
    });
  }
}

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      beforeEnter(to, from, next) {
        auth.auth.getSession();
      }
    },
    {
      path: '/login/oauth2/code/cognito',
      beforeEnter(to, from, next) {
        let currUrl = window.location.href;
        //console.log(currUrl);
        auth.auth.parseCognitoWebResponse(currUrl);
      }
    },
    {
      path: '/logout',
      component: LogoutSuccess,
      beforeEnter(to, from, next) {
        auth.logout();
        next();
      }
    },
    {
      path: '/error',
      component: ErrorComponent
    },
    {
      path: '/game',
      name: 'NewGame',
      component: GameController,
      beforeEnter: requireAuth
    },
    {
      path: '/StartGame',
      name: 'GameBoard',
      component: GameBoard,
      beforeEnter: requireAuth
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: requireAuth
    },
    {
      path: '/GameHistory',
      name: 'History',
      component: History,
      beforeEnter: requireAuth
    },
  ]
});
