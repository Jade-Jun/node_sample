module.exports = function(app, fs)
{
     app.get('/',function(req ,res){
        // res.render('main.html')
        /**
         * json data를 render의 두번째 인자로 전달함으로서 페이지에서 데이터를 사용가능하게함.
         */
        res.render('index', {
            title: "MY PAGE",
            length: 5
        });
     });
    //  app.get('/about',function(req,res){
    //     res.render('about.html');
    // });
}