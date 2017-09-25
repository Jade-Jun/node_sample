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
     app.get('/list', function(req, res){
         // 현재경로가 routes이므로
         fs.readFile(__dirname + "/../data/" + "user.json", 'utf-8', function(err, data){
               console.log( data );
            res.end( data );
         });
     });
     app.get('/getUser/:username', function(req, res) {
         fs.readFile(__dirname + "/../data/" + "user.json", 'utf-8', function(err, data){
             var users = JSON.parse(data);
             res.json(users[req.params.username]);
         });
     });
    //  app.get('/about',function(req,res){
    //     res.render('about.html');
    // });
}