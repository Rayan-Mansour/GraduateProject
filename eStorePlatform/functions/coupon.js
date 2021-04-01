function AddCoupon(){
    document.getElementById("AddCoupon").style.visibility = "visible";
  
  }
  
  
  function cancel(){
    document.getElementById("AddCoupon").style.visibility = "hidden";
  }
  var table ="";
var no_coupon = 6;
var no_attr = 2;
var display_header = 0;


for(var row = 0 ; row < no_coupon ; row++){
    table +="<tr>"
    for( var columns = 0; columns <no_attr ; columns++){
        //if condition to display header of the table
        if(display_header === 0){
            table = "";
            table +="<thead><tr><th>Percentage</th> <th>Code</th> <th>-</th></tr> </thead> "
            display_header = 1;
            table +="<tr>"
        }
        
        table += "<td>"+ columns+"</td>";
        if(columns === no_attr-1){
          table += "<td><button  class = deletebtn >Delete</button></td>"
        }
    }
    table += "</tr>"
}

document.write("<table>"+ table +"</table>");