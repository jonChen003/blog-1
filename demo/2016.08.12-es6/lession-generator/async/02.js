var fs = require('fs');
var thunkify = require('./thunkify');
var readFile = thunkify(fs.readFile);

function* gen () {
    var f1 = './hello.txt', f2 = './world.txt';
    var r1 = yield readFile(f1);
    console.log('content from %s is: %s', f1, r1);
    var r2 = yield readFile(f2);
    console.log('content from %s is: %s', f2, r2);
}

var g = gen();
var result = g.next();

result.value(function(error, content){
    if(error) throw error;
    var result = g.next(content);
    result.value(function(error, content){
        if(error) throw error;
        g.next(content);
    });
});

// content is: hello
// content is: world