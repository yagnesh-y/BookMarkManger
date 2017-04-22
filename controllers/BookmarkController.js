var Bookmark = require('../models/Bookmark');
var Promise = require('bluebird');
var superagent = require('superagent');
var Scraper = require('../utils/Scraper');


module.exports = {
    get: function(params) {
        return new Promise(function(resolve, reject){
            Bookmark.find(params, function(err, bookmarks){
                if(err){
                    reject(err)
                    return
                }
                var list =[]
                bookmarks.forEach(function(bookmark, i){
                    list.push(bookmark.summary())
                })

                resolve(list)
            })
        })
    },
    getById: function(id){
         return new Promise(function(resolve, reject){
            Bookmark.findById(id, function(err, bookmark){
                if(err){
                    reject(new Error('Bookmark not found'))
                    return
                }
                if(bookmark == null){
                    reject(new Error('Bookmark not found'))
                }
                resolve(bookmark.summary())
            })
        })
    },

    create: function(params){
        return new Promise(function(resolve, reject){
            superagent
            .get(params.url)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject(err);
                    return
                }
                var html = response.text;
                var metaData= Scraper.scrape(html);
            console.log(`title is ${metaData.title}`);
            console.log(`description is ${metaData.description}`);

             if (metaData.title === undefined || metaData.description === undefined) {
                //alert('Unable to fetch title and description for the URL mentioned! Please enter manually');
                reject('Data Not Found')
                return
            }
            Bookmark.create(metaData, function(err, bookmark){
                if(err){
                    reject(err)
                    return
                }
                resolve(bookmark.summary())
            })
        })
        })
    }
}