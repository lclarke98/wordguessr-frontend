console.log(process.env.VUE_APP_TEST)
import {CognitoAuth, StorageHelper} from 'amazon-cognito-auth-js';
import IndexRouter from '../router/index';
import UserInfoStore from './user-info-store';
import UserInfoApi from './user-info-api';


const CLIENT_ID = process.env.VUE_APP_COGNITO_CLIENT_ID;
const APP_DOMAIN = process.env.VUE_APP_COGNITO_APP_DOMAIN;
const REDIRECT_URI = process.env.VUE_APP_COGNITO_REDIRECT_URI;
const USERPOOL_ID = process.env.VUE_APP_COGNITO_USERPOOL_ID;
const REDIRECT_URI_SIGNOUT = process.env.VUE_APP_COGNITO_REDIRECT_URI_SIGNOUT;
const APP_URL = process.env.VUE_APP_APP_URL;

let authData = {
    ClientId : CLIENT_ID, // Your client id here
    AppWebDomain : APP_DOMAIN,
    TokenScopesArray : ['openid', 'email'],
    RedirectUriSignIn : REDIRECT_URI,
    RedirectUriSignOut : REDIRECT_URI_SIGNOUT,
    UserPoolId : USERPOOL_ID,
}

let auth = new CognitoAuth(authData);
auth.userhandler = {
    onSuccess: function(result) {
        console.log("On Success result", result);
        UserInfoStore.setLoggedIn(true);
        UserInfoApi.getUserInfo().then(response => {
            IndexRouter.push('/');
        });


    },
    onFailure: function(err) {
        UserInfoStore.setLoggedOut();
        IndexRouter.go({ path: '/error', query: { message: 'Login failed due to ' + err } });
    }
};

function getUserInfoStorageKey(){
    let keyPrefix = 'CognitoIdentityServiceProvider.' + auth.getClientId();
    let tokenUserName = auth.signInUserSession.getAccessToken().getUsername();
    let userInfoKey = keyPrefix + '.' + tokenUserName + '.userInfo';
    return userInfoKey;
}

let storageHelper = new StorageHelper();
let storage = storageHelper.getStorage();
export default{
    auth: auth,
    login(){
        auth.getSession();
    },
    logout(){
        if (auth.isUserSignedIn()) {
            let userInfoKey = this.getUserInfoStorageKey();
            auth.signOut();

            storage.removeItem(userInfoKey);
        }
    },
    getUserInfoStorageKey,

}