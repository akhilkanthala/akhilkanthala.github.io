//table=[{count: 0, bill: 0}];
$(document).ready(function(){
    
    if(localStorage.getItem('food')==null){
    localStorage.setItem("1-data",JSON.stringify([{count: 0, bill: 0}]));
    localStorage.setItem("2-data",JSON.stringify([{count: 0, bill: 0}]));
    localStorage.setItem("3-data",JSON.stringify([{count: 0, bill: 0}]));
    $.getJSON('main.json', function(data) {
        localStorage.setItem('food',JSON.stringify(data));
        var htm="";
        JSON.parse(localStorage.getItem("food")).forEach(function(val,index){
           var keys=Object.keys(val);
           htm+='<div draggable="true" ondragstart="return dragStart(event)"> <p>'+''+val.name+' '+'</p><p>'+''+val.price+' '+'</p></div>';
           document.getElementById("menu").innerHTML=htm;
        });
    }) ; 
}
else{
    htm="";
    JSON.parse(localStorage.getItem("food")).forEach(function(val,index){
        htm+='<div id="'+''+index+''+'" draggable="true" ondragstart="return dragStart(event)"> <p>'+''+val.name+' '+'</p><p>'+''+val.price+' '+'</p></div>';
        document.getElementById("menu").innerHTML=htm;
     });
}for(i=1;i<4;i++){
if(localStorage.getItem('table-'+i+'')==null){
        var htm1="";
           htm1+='<span>Rs.0.00 | Totalitems:0</span>';
           document.getElementById('table-'+i+'').innerHTML=htm1;
        }
else{
    var data=JSON.parse(localStorage.getItem(""+i+"-data"));
    var htm1="";
           htm1+='<span>Rs.'+data[0].bill+' | Totalitems:'+data[0].count+'</span>';
           document.getElementById("table-"+i+"").innerHTML=htm1;
}
}
});
function dragStart(ev) {
    ev.dataTransfer.effectAllowed='move';
  //  ev.currentTarget.style.border = "dashed";
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.dataTransfer.setDragImage(ev.target,0,0);
    return true;
 }
 function dragEnter(ev) {
    event.preventDefault();
    return true;
 }
 function dragOver(ev) {
    return false;
 }
 function dragDrop(ev,i) {
    var src = ev.dataTransfer.getData("Text");
    item=JSON.parse(localStorage.getItem("food"));
    addItem(item[src],i);
    console.log(i);
    for(k=1;k<4;k++){
        if(localStorage.getItem('table-'+k+'')==null){
                var htm1="";
                   htm1+='<span>Rs.0.00 | Totalitems:0</span>';
                   document.getElementById('table-'+k+'').innerHTML=htm1;
                }
        else{
            var data=JSON.parse(localStorage.getItem(""+k+"-data"));
            var htm1="";
                   htm1+='<span>Rs.'+data[0].bill+' | Totalitems:'+data[0].count+'</span>';
                   document.getElementById("table-"+k+"").innerHTML=htm1;
        }
        }
    ev.stopPropagation();
    return false;
 }
 function addItem(item,i){
     if(localStorage.getItem('table-'+i+'')==null){
        var oldItems=[];
        oldItems.push(item);
        localStorage.setItem('table-'+i+'',JSON.stringify(oldItems)); 
        var data=JSON.parse(localStorage.getItem(""+i+"-data"));
        data[0].count+=1;
        data[0].bill+=parseFloat(item.price);
        localStorage.setItem(""+i+"-data",JSON.stringify(data));

     }
     else{
            var oldItems1=(JSON.parse(localStorage.getItem("table-"+i+"")));
            var newItem={
                "name":item.name,
                "price":item.price
            }; 
            var data=JSON.parse(localStorage.getItem(""+i+"-data"));
            oldItems1.push(newItem);
            localStorage.removeItem('table-"+i+"');
            localStorage.setItem('table-"+i+"',JSON.stringify(oldItems1));
            data[0].count+=1;
            data[0].bill+=parseFloat(item.price);
            localStorage.setItem(""+i+"-data",JSON.stringify(data));
            console.log(localStorage.getItem(""+i+"-data"));
     }   
 }
 function fun(){
     alert("working");
 }