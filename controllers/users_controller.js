module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Sign up'
    })
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Sign in'
    })
}

// get the sign up data
module.exports.create = function(req, res){
    // TODO later
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // TODO later
}