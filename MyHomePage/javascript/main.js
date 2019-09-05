
$(document).ready(function(){
    if(localStorage.getItem('images')==null){
    $.getJSON('main.json', function(data) {
        localStorage.setItem('images',JSON.stringify(data));
        var htm="";
        JSON.parse(localStorage.getItem("images")).forEach(function(val){
           // var keys=localStorage.getItem(JSON.parse keys(va);
           var keys=Object.keys(val);
           htm+='<div class="grid-item" > <img src='+'"'+val.img+'" '+'class="gallery__img"></div>';
           document.getElementById("lo").innerHTML=htm;
        });
    }) ; 
}
else{
    htm="";
    JSON.parse(localStorage.getItem("images")).forEach(function(val){
        // var keys=localStorage.getItem(JSON.parse keys(va);
        var keys=Object.keys(val);
        htm+='<div class="grid-item" > <img src='+'"'+val.img+'" '+'class="gallery__img"></div>';
        document.getElementById("lo").innerHTML=htm;
     });
}
});

function validate(){
    var name=document.form.name.value;
    var subject=document.form.subject.value;
    if(name.length<1){
     //   document.getElementById("name").innerHTML=  "<p>Please enter your name</p>";  
        alert("please enter your name");
    }
    if(subject.length<1){
        //   document.getElementById("name").innerHTML=  "<p>Please enter your name</p>";  
           alert("please enter subject");
       }else{
           return true;
       }

}