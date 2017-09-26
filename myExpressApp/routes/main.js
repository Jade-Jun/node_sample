module.exports = function(app, fs)
{
     app.get('/',function(req ,res){
        var sess = req.session;
        /**
         * json data를 render의 두번째 인자로 전달함으로서 페이지에서 데이터를 사용가능하게함.
         */
        res.render('index', {
            title: "MY PAGE",
            length: 5,
            name: sess.name,
            username: sess.username
        });
     });
     app.get('/list', function(req, res){
         // 현재경로가 routes이므로
         fs.readFile(__dirname + "/../data/" + "user.json", 'utf-8', function(err, data){
               console.log( data );
            res.end( data );
         });
     });

     /**
      * 파일을 읽은 후 유저 아이디를 찾아서 알려 줌
      */
     app.get('/getUser/:username', function(req, res) {
         fs.readFile(__dirname + "/../data/" + "user.json", 'utf-8', function(err, data){
            //  fs.ReadFile로 읽었을 경우에는 text로 읽어 지기 때문에 json으로 변환해줘야 함.
             var users = JSON.parse(data);
             res.json(users[req.params.username]);
         });
     });

     /**
      * insert user api
      */
     app.post('/addUser/:username', function(req, res) {
         var result = { };
         var username = req.params.username;

         /**
          * request validity check
          */
         if (!req.body["pwd"] || !req.body["name"]){
             result["success"] = 0;
             result["error"] = "invalid request";
             res.json(result);
             return;
         }

         /**
          * load data & duplication check
          */
        fs.readFile(__dirname + "/../data/user.json", 'utf-8', function(err, data) {
            var users = JSON.parse(data);
            if (users[username]) {
                // duplication found
                result['success'] = 0;
                result['error'] = 'duplicate';
                res.result(result);
                return;
            }

            // add data
            users[username] = req.body;

            // save data
            fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf-8", function(err, data) {
                 result = {"success": 1};
                res.json(result);
            });

        });

     });
     app.put('/updateUser/:username', function(req, res) {
         var result = { };
         var username = req.params.username;

          /**
          * request validity check
          */
          if (!req.body["pwd"] || !req.body["name"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        /**
         * exist user check
         */
        fs.readFile(__dirname + "/../data/user.json", 'utf-8', function(err, data) {
            var users = JSON.parse(data);
            if (users[username]) {
                // found user
                users[username] = req.body;
                 // save data
                fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf-8", function(err, data) {
                     result = {"success": 1};
                    res.json(result);
                });
            } else {
                result['success'] = 0;
                result['error'] = 'duplicate';
                res.result(result);
                return;
            }
        });
     });
     
     /**
      * delete user
      */
     app.delete('/deleteUser/:username', function(req, res) {
         var result = { };

         // load data
         fs.readFile(__dirname + "/../data/user.json", "utf-8", function(err, data) {
             var users = JSON.parse(data);

             // not found user
             if (!users[req.params.username]) {
                 result["success"] = 0;
                 result["error"] = "not found user";
                 res.json(result);
                 return;
             }

             // delete from data
             delete users[req.params.username];

             // save file
             fs.writeFile(__dirname + "/../data/user.json", JSON.stringify(users, null, '\t'), "utf-8", function(err, data) {
                 result["success"] = 1;
                 res.json(result);
                 return;
             });
         });
     });

     /**
      * login api
      */
     app.get('/login/:username/:pwd', function(req, res){
        var sess = req.session;

        fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
            var users = JSON.parse(data);
            var username = req.params.username;
            var pwd = req.params.pwd;
            var result = {};
            if(!users[username]){
                // USERNAME NOT FOUND
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            if(users[username]["pwd"] == pwd){
                result["success"] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
                res.json(result);

            }else{
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        })
    });

    /**
     * logout api
     */
    app.get('/logout', function(req, res){
        sess = req.session;
        if(sess.username){
            req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/');
                }
            })
        }else{
            res.redirect('/');
        }
    })

}