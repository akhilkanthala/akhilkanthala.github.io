selectedImage=null;
$(document).ready(function(){
    if(localStorage.getItem('images')==null){
    $.getJSON('main.json', function(data) {
        localStorage.setItem('images',JSON.stringify(data));
        var htm="";
        JSON.parse(localStorage.getItem("images")).forEach(function(val,index){
           // var keys=localStorage.getItem(JSON.parse keys(va);
           var keys=Object.keys(val);
           htm+='<div class="grid-item" > <img src='+'"'+val.img+'" '+'class="gallery__img"></div>';
           document.getElementById("loa").innerHTML=htm;
        });
    }) ; 
}
else{
    htm="";
    JSON.parse(localStorage.getItem("images")).forEach(function(val,index){
        // var keys=localStorage.getItem(JSON.parse keys(va);
        var keys=Object.keys(val);
        htm+='<div class="grid-item" onclick="pic('+index+')" > <img src='+'"'+val.img+'" '+'class="gallery__img"></div>';
        document.getElementById("loa").innerHTML=htm;
     });
}
});
function pic(index){
    selectedImage=index;
    setFields();
}

function setFields() {
    images = JSON.parse(localStorage.getItem('images'));
    $("#url").val(images[selectedImage]["img"]);
    $("#nameadmin").val(images[selectedImage]["name"]);
    $("#info").val(images[selectedImage]["info"]);
    $("#date").val(images[selectedImage]["date"]);
  }
  
function add(){
    if(!validate()){
        return false;
    }
    var img=document.formadmin.url.value;
    
    var oldItems = JSON.parse(localStorage.getItem('images'));
    var newItem={
        "img":document.formadmin.url.value,
        "name":document.formadmin.nameadmin.value,
        "info":document.formadmin.info.value,
        "date":document.formadmin.date.value
    }  
    oldItems.push(newItem);
    localStorage.removeItem('images');
    localStorage.setItem('images',JSON.stringify(oldItems));
    console.log(localStorage.getItem('images'));
    selectedImage=null;
     location.reload();
} 

function remove(){
    if(selectedImage==null)
{
  alert("Please click on image you want to delete first!");
  return false;
}
if(!validate()){
    return false;
}
    var images=JSON.parse(localStorage.getItem('images'));  
    images.splice(selectedImage,1);
    localStorage.setItem('images', JSON.stringify(images));
    
    document.getElementById("alert").innerHTML="<p>successfully removed</p>";
    selectedImage=null;
    location.reload();
}
function edit(){

    if(selectedImage==null)
{
  alert("Please click on image you want to edit!");
  return false;
}
console.log("1");
    if(!validate()){
        return false;
    }
var images=JSON.parse(localStorage.getItem('images'));  
  images[selectedImage]["img"]=$('#url').val();
  images[selectedImage]["name"]=$('#nameadmin').val();
  images[selectedImage]["info"]=$('#info').val();
  images[selectedImage]["date"]=$('#date').val();
  localStorage.setItem('images', JSON.stringify(images));
  location.reload();
  document.getElementById("alert").innerHTML="<p>successfully updated</p>";
}
function validate(){
    var name = $('#nameadmin').val();
    var url = $('#url').val();
    var info = $('#info').val();
    var date = $('#date').val();
    var flag=0;
    if(name==""){
        document.getElementById("nameadmin1").innerHTML="<p>Please enter name of the image</p>";
        flag=flag+1;
    }
    if(info==""){
        document.getElementById("info1").innerHTML="<p>Please enter description of the image</p>";
        flag=flag+1;
    }
    if(url==""){
        document.getElementById("url1").innerHTML="<p>Please enter the url of image</p>";
        flag=flag+1;
    }
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    var reg=/\/Images[.]*/;
    if (!re.test(url) && !(reg.test(url))) { 
    flag=flag+1;
    document.getElementById("url1").innerHTML="<p>Please enter valid url of image</p>";
    }
    var now=new Date();
    var target=new Date(date);
    if(target>now){
       
        document.getElementById("date1").innerHTML="<p>Date cannot be in future</p>";
        flag=flag+1;
    }
    if(flag==0){
        return true;
    }
    else{
        return false;
    }
}