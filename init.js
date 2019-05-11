'use scripts';
var mysql=require('mysql');
var json_file=require('jsonfile');
var file_name= 'films_all.json';
var config_file='.config.json';
var conn;
json_file.readFile(config_file, function (err, data){
    console.log(data);
    conn=mysql.createConnection(data);
    conn.connect();
});
json_file.readFile(file_name, function (err, data) {
    if (err) {
        throw err;
    } else {
        
        for(var i=0;i<data.length;++i){
            var k='';
            var t=JSON.stringify(data[i]);
            k+=t.toString();
            //console.log(data[i]._id);
            //console.log(k);
            //console.log(data[i].title);

            conn.query('insert into INFO values(?,?,?)',[i+1,data[i]._id,k],function(err,result){
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                return;
                }
            });
            conn.query('insert into TITLE values(?,?)',[data[i]._id,data[i].title],function(err,result){
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                return;
                }
            });
            
            for(var j=0;j<data[i].casts.length;++j){
                //console.log(data[i].casts[j].name);
                conn.query('insert into CASTS values(?,?)',[data[i]._id,data[i].casts[j].name],function(err,result){
                    if(err){
                        console.log('[SELECT ERROR] - ',err.message);
                    return;
                    }
                });
            }
            
            
        }
        conn.end();
    }
});
