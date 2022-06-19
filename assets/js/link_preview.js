function previewLink(pageURL){
    let htmlDom = description = image = title = null;
    return (
        fetch(pageURL)
        .then( response => response.text() )
        .then( data => {
        htmlDom = new DOMParser().parseFromString(data, 'text/html').querySelector('head');
        //check if data exists
        if(htmlDom){
            //retrieve description
            if ( htmlDom.querySelector('meta[name=\'description\']')){
                description = htmlDom.querySelector('meta[name=\'description\']').getAttribute('content');
            }else if( htmlDom.querySelector('meta[property=\'og:description\']') ) {
                description = htmlDom.querySelector('meta[property=\'og:description\']').getAttribute('content');
            }else if( htmlDom.querySelector('meta[name=\'twitter:description\']')){
                description = htmlDom.querySelector('meta[name=\'twitter:description\']').getAttribute('content');
            }else{
                description = "";
            }

            //retrieve title
            if ( htmlDom.querySelector('meta[property=\'og:title\']')){
                title = htmlDom.querySelector('meta[property=\'og:title\']').getAttribute('content');
            }else if( htmlDom.querySelector('meta[name=\'title\']' )) {
                title = htmlDom.querySelector('meta[name=\'title\']').getAttribute('content');
            }else{
                title = "";
            }

            //retrieve image
            if ( htmlDom.querySelector('meta[property=\'og:image\']')){
                image = htmlDom.querySelector('meta[property=\'og:image\']').getAttribute('content');
            }else if( htmlDom.querySelector('meta[name=\'twitter:image:src\']') ) {
                image = htmlDom.querySelector('meta[name=\'twitter:image:src\']').getAttribute('content');
            }else if(htmlDom.querySelector('link[rel=\'icon\']') ){
                image = htmlDom.querySelector('link[rel=\'icon\']').getAttribute('href');
            }else{
                image = "";
            }
        }

        return {
            image : image,
            url : pageURL,
            title : title,
            description : description
        }
    }) 
    .catch( error => console.log(error) )
)//end of return
}

//to use
let me = previewLink("https://simon-ugorji.medium.com").then( data => console.log(data));