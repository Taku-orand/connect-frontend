import Auth0Lock from "auth0-lock";
var clientId = "YOUR_AUTH0_APP_CLIENTID";
var domain = "YOUR_DOMAIN_AT.auth0.com";
var lock = new Auth0Lock(clientId, domain);
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

    // Update DOM
  });
});
