'use scripts';
var express = require('express');
var app = express();
var json_file = require('jsonfile');
var mysql = require('mysql');
var config_file = '.config.json';
var conn;
json_file.readFile(config_file, function (err, data) {
    console.log(data);
    conn = mysql.createConnection(data);
});

app.use('/public', express.static('public'));
app.get('/', function (req, res) {
    res.redirect(302, 'index.html');
});
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/detail.html',function (req, res){
    res.sendFile(__dirname + '/detail.html');
})
app.get('/get_film',function(req,res){
    console.log('get_film');
    var params=req.query;
    if(params.film_id==undefined){
        res.status(400).send('Bad Request');
        return;
    }
    //console.log(typeof params.film_id);
    console.log('film_id:'+params.film_id);
    conn.query('select film_str from INFO where film_id = ?',params.film_id,function(err,result){
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        //console.log(JSON.parse(result[0]['film_str']));
        res.json(JSON.parse(result[0]['film_str']));
    });
});
app.get('/get_page', function (req, res) {
    console.log('get_page');
    var params = req.query;
    if (params.page_num == undefined || params.page_size == undefined||params.search_info) {
        res.status(400).send('Bad Request');
        return;
    }
    
    if (params.search == '') {
        var page_num = Number(params.page_num);
        var page_size = Number(params.page_size);
        console.log('Page num: '+page_num);
        console.log('Page size: '+page_size);
        conn.query('select film_str from INFO LIMIT ?,?; select max(id) from INFO; ',[page_num*page_size,page_size],function (err, data) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            var result = new Array();
            for (var i = 0; i < page_size; ++i) {
                result[i] = JSON.parse(data[0][i]['film_str']);
            }
            //console.log(data[1]);
            res.json({ film_list: result, all_num: data[1][0]['max(id)'] });

        });
    }else{
        var page_num = params.page_num;
        var page_size = params.page_size;
        console.log('search: '+params.search);
        console.log(page_num);
        conn.query('call SEARCH(?);',params.search,function (err, data,filed) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message)
                return;
            }
            //console.log(data);
            var result = new Array();
            for (var i = 0; i < page_size; ++i) {
                result[i] = JSON.parse(data[0][page_num * page_size + i]['film_str']);
            }
            res.json({ film_list: result, all_num: data[0].length });
        });
    }

});


var server = app.listen(1998, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("访问地址为 http://%s:%s", host, port)

})

