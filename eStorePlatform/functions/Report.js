
var table ="";
var no_cust = 10;
var no_attr = 3;
var display_header = 0;


for(var row = 0 ; row < no_cust ; row++){
    table +="<tr>"
    for( var columns = 0; columns <no_attr ; columns++){
        //if condition to display header of the table
        if(display_header === 0){
            table = "";
            table +="<thead><tr><th>User</th>  <th>Order ID</th>  <th>Status</th></tr></thead>"
            display_header = 1;
            table +="<tr>"
        }
        table += "<td>"+ columns+"</td>";
    }
    table += "</tr>"
}

document.write("<table>"+ table +"</table>");