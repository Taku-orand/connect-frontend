import Auth0Lock from "auth0-lock";
var clientId = "8tZYoj0ohFai5MxvWj3qHGj6Ig7uZOCr";
var domain = "dev-u53mpmd1.jp.auth0.com";
export var lock = new Auth0Lock(clientId, domain);
var accessToken = null;
var profile = null;

lock.on("authenticated", function(authResult) {
  lock.getUserInfo(authResult.accessToken, function(error, profileResult) {
    if (error) {
      // Handle error
      return;
    }

    accessToken = authResult.accessToken;
    profile = profileResult;
    console.log(accessToken);
    console.log(profile);

    // Update DOM
  });
});
