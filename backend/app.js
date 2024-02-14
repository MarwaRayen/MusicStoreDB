const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');
const { name } = require('ejs');


const app = express();
app.use(express.static('public'));

app.get('/public/style.css', function(req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/style.css');
});

const couch = new NodeCouchDb({
    auth: {
        user: 'marwa',
        pass: 'marwa'
    }
})


const dbName = 'musicstore';
const instrumentsViewUrl = '_design/instruments/_view/instruments';
const albumsViewUrl = '_design/albums/_view/albums';
const tracksViewUrl = '_design/tracks/_view/tracks';
let data1, data2, data3;



couch.listDatabases().then(function(dbs){
    console.log(dbs);
})


couch.get(dbName, instrumentsViewUrl).then(
    function(data, headers1, status1){
        data1 = data.data.rows;
        //console.log(data1);
        
    }, 
    function(err){
        console.log(err);
    }
)






couch.get(dbName, albumsViewUrl).then(
    function(data, headers2, status2){
        console.log(data.data.rows);
        data2 = data.data.rows;
    }, 
    function(err){
        console.log(err);
    }
)

couch.get(dbName, tracksViewUrl).then(
    function(data, headers3, status3){
        //console.log(data.data.rows);
        data3 = data.data.rows;
    }, 
    function(err){
        console.log(err);
    }
)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function(req, res){
    
    res.render('index', {
        instruments: data1,
        albums: data2,
        tracks: data3
    })
});

app.get('/instruments', function(req, res){

    couch.get(dbName, instrumentsViewUrl).then(
        function(data, headers1, status1){
            data1 = data.data.rows;
            res.json(data1);
        }, 
        function(err){
            console.log(err);
        }
    )
})

app.get('/albums', function(req, res){
    
        couch.get(dbName, albumsViewUrl).then(
            function(data, headers2, status2){
                data2 = data.data.rows;
                res.json(data2);
            }, 
            function(err){
                console.log(err);
            }
        )
})

app.get('/tracks', function(req, res){
        
            couch.get(dbName, tracksViewUrl).then(
                function(data, headers3, status3){
                    data3 = data.data.rows;
                    res.json(data3);
                }, 
                function(err){
                    console.log(err);
                }
            )
})
app.post('/instrument/add', function(req, res){
    const instru = req.body.instrument;
    const type = req.body.type;
    const edition = req.body.edition;
    const price = req.body.price;

    //res.send(instru + type + edition + price);
    couch.uniqid().then(function(ids){
        const id = ids[0];
        couch.insert(dbName, {
            _id: id,
            productType: "Instrument",
            instrument: instru,
            type: type,
            edition: edition,
            price: price
        }).then(function(data, headers, status){
            res.redirect('/');
        }, function(err){
            res.send(err);
        })
    })
})

app.post('/instrument/delete:id', function(req, res){
    const id = req.params.id;
    const rev = req.body.rev;
    couch.del(dbName, id, rev).then(function(data, headers, status){
        res.redirect('/');
    }, function(err){
        res.send(err);
    })
})

app.post('/instrument/update/:id', async function(req, res){
    const id = req.params.id;
    const rev = req.body.rev;
    const attr = req.body.att;
    const value = req.body.newVal;
    
    const Doc = await couch.get(dbName, id);
    const updatedDoc = Doc.data;
    updatedDoc[attr] = value;
    
    couch.update(dbName, updatedDoc).then(function(data, headers, status){
        res.redirect('/');
    }, function(err){
        res.send(err);
    })
})


app.post('/album/add', function(req, res){

    
    const name = req.body.name;
    const artist = req.body.artist;
    const support = req.body.supportType;
    const genre = req.body.genre;
    const numberTracks = req.body.numberTracks;
    const releaseDate = req.body.releaseDate;
    const price = req.body.price;

    //res.send(instru + type + edition + price);
    couch.uniqid().then(function(ids){
        const id = ids[0];
        couch.insert(dbName, {
            _id: id,
            productType: "Album",
            name: name,
            artist: artist,
            supportType: support,
            genre: genre,
            numberTracks: numberTracks,
            releaseDate: releaseDate,
            price: price

        }).then(function(data, headers, status){
            res.redirect('/');
        }, function(err){
            res.send(err);
        })
    })
})

app.post('/album/delete/:id', function(req, res){
    const id = req.params.id;
    const rev = req.body.rev;
    couch.del(dbName, id, rev).then(function(data, headers, status){
        res.redirect('/');
    }, function(err){
        res.send(err);
    })
})



app.post('/album/update:id', async function(req, res){
    const id = req.params.id;
    const rev = req.body.rev;
    const attr = req.body.att;
    const value = req.body.newVal;
    
    const Doc = await couch.get(dbName, id);
    const updatedDoc = Doc.data;
    updatedDoc[attr] = value;
    
    couch.update(dbName, updatedDoc).then(function(data, headers, status){
        res.redirect('/');
    }, function(err){
        res.send(err);
    })
})


app.post('/track/add', function(req, res){

    const name = req.body.name;
    const artist = req.body.artist;
    const support = req.body.supportType;
    const genre = req.body.genre;
    const album = req.body.album;
    const releaseDate = req.body.releaseDate;
    const price = req.body.price;

    //res.send(instru + type + edition + price);
    couch.uniqid().then(function(ids){
        const id = ids[0];
        couch.insert(dbName, {
            _id: id,
            productType: "Track",
            name: name,
            artist: artist,
            supportType: support,
            genre: genre,
            album: album,
            releaseDate: releaseDate,
            price: price

        }).then(function(data, headers, status){
            res.redirect('/');
        }, function(err){
            res.send(err);
        })
    })
})


app.post('/track/delete:id', function(req, res){
    const id = req.params.id;
    const rev = req.body.rev;
    couch.del(dbName, id, rev).then(function(data, headers, status){
        res.redirect('/');
    }, function(err){
        res.send(err);
    })
})



app.post('/track/update:id', async function(req, res){
    const id = req.params.id;
    const rev = req.body.rev;
    const attr = req.body.att;
    const value = req.body.newVal;
    
    const Doc = await couch.get(dbName, id);
    const updatedDoc = Doc.data;
    updatedDoc[attr] = value;
    
    couch.update(dbName, updatedDoc).then(function(data, headers, status){
        res.render('/');
    }, function(err){
        res.send(err);
    })
})

app.listen(5000, function(){
    console.log('server is starting on port 5000...');
});