import "../css/huodong.less";

/* webpackjs */
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return decodeURI(pair[1]);}
       }
       return(false);
}
let source = getQueryVariable("source");
let scene = getQueryVariable("scene");
setTimeout(() => {
    if(source){
        window.sessionStorage.setItem("source",getQueryVariable("source"))
    }
    if(scene){
        window.sessionStorage.setItem("scene",getQueryVariable("scene"))
    }
}, 1000);
/* webpackjs */