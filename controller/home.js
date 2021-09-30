//User
exports.getHome = (req,res,next)=>{
    res.render(
        './user/index',
        {
            pageTitle : "🏠 Home",
            path : "/",
        }
    );
};


//Common
exports.get404 = (req,res,next)=>{
    res.status(404).render(
        '404',
        {
            pageTitle: "⛔ 404",
            path : '',
        }
    )
};