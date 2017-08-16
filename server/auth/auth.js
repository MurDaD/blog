let passport = require('passport');
let BasicStrategy = require('passport-http').BasicStrategy;
let ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
let BearerStrategy = require('passport-http-bearer').Strategy;

class Auth {
    constructor(app) {
        this.app = app;

        this.process();
    }

    process() {
        passport.use(new BasicStrategy(
            function (username, password, done) {
                this.app.models.ClientModel.findOne({clientId: username}, function (err, client) {
                    if (err) {
                        return done(err);
                    }

                    if (!client) {
                        return done(null, false);
                    }

                    if (client.clientSecret !== password) {
                        return done(null, false);
                    }

                    return done(null, client);
                });
            }
        ));

        passport.use(new ClientPasswordStrategy(
            function (clientId, clientSecret, done) {
                this.app.models.ClientModel.findOne({clientId: clientId}, function (err, client) {
                    if (err) {
                        return done(err);
                    }

                    if (!client) {
                        return done(null, false);
                    }

                    if (client.clientSecret !== clientSecret) {
                        return done(null, false);
                    }

                    return done(null, client);
                });
            }
        ));

        passport.use(new BearerStrategy(
            function (accessToken, done) {
                AccessToken.findOne({token: accessToken}, function (err, token) {

                    if (err) {
                        return done(err);
                    }

                    if (!token) {
                        return done(null, false);
                    }

                    if (Math.round((Date.now() - token.created) / 1000) > config.get('security:tokenLife')) {

                        AccessToken.remove({token: accessToken}, function (err) {
                            if (err) {
                                return done(err);
                            }
                        });

                        return done(null, false, {message: 'Token expired'});
                    }

                    User.findById(token.userId, function (err, user) {

                        if (err) {
                            return done(err);
                        }

                        if (!user) {
                            return done(null, false, {message: 'Unknown user'});
                        }

                        var info = {scope: '*'};
                        done(null, user, info);
                    });
                });
            }
        ));
    }
}