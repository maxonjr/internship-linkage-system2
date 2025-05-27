
function message (){
	var age  =45;
	var x = 10;
	var name ="maximillien eliii";
	if (age <50)
	{
		document.write(name+""+(age+x)+"years");
	alert("are you under age ??");
	console.log ("this is the message function");
}else if (age == 45){	
document.write("you are 45")
}
else
{
	document.write("you are above 45")
}	

var cond = (age<=17)? "go back home" : "keep training ";
document.write(cond);
}
function getday (){
	theday = 2;
	
	switch(theday){
       case 1:
	   document.write("monday");
	    break;
	   case 2:
	   document.write("tuesday");
	    break; 
	   case 3:
	   document.write("wednesday");
        break;
       case 4:
	   document.write("thusday");
	    break;
	   case 5:
	   document.write("friday");
        break;
       default:
       document.write("tha day  not exist")	   
}}
function getnotifications(limit) {
	var limit;
	var = confirm ("are you okay with thi?");
	if (r==true){
	for(i=1;i<limit; i++)  {
		
		document.write("nots# "+i+"<br/>");
	}else{
		alert("cancel if you want")
	}
	}
function gettotal(a){
	var total = 0;
	var t = totsl + a;
    return t;
}}
