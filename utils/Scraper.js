var cheerio = require('cheerio');

module.exports = {

    scrape: function(html){
        $ = cheerio.load(html);
        var properties = ['og:title', 'og:url', 'og:description', 'og:image']
        var pageInfo= {}

        $('meta').each(function(i, element){
            if(element.attribs.property!== null && element.attribs.property!== undefined){
                if(properties.indexOf(element.attribs.property)!== -1){
                    var prop = element.attribs.property.replace('og:', '');
                    pageInfo[prop] = element.attribs.content;
                }
                
            }
        })
        
        return pageInfo;
    }

}
