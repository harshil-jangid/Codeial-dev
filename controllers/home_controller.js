const Post=require('../models/post');
const User=require('../models/user');

module.exports.home = function(req, res){
    
    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log('No posts there');
    //     }
    //     else{
    //         return res.render('home', {
    //             title: "Home",
    //             posts:posts
    //         });
    //     }
    // });

    Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec(
        function(err,posts){
            
            User.find({},function(err,users){
                if(err){
                    console.log('No posts there');
                }
                else{
                    return res.render('home', {
                        title: "Home",
                        posts:posts,
                        all_users:users
                    });
                }
            })
        }
    )
}

// module.exports.actionName = function(req, res){}