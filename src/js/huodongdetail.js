import "../css/huodongdetail.less";

// webpackjs

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
if(scene){
    window.sessionStorage.setItem("scene",scene);
    window.sessionStorage.setItem("source",source);
}
setTimeout(() => {
    if(!scene){
        source = window.sessionStorage.getItem("source")
        scene = window.sessionStorage.getItem("scene")
    }
    if(scene){
        $("input[type=hidden][mark=mark]").val("探校小管家小程序,来源:"+scene.replace(/(\"|'*)/g,'')+(source?("("+source.replace(/(\"|'*)/g,'')+")"):""));
    }
}, 1000);
//webpackjs