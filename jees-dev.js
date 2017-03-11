var i, tabs, tabcontent;
var fetchorder = new XMLHttpRequest();
var lastread;
tabs = document.getElementsByClassName("tab");

document.getElementById("home").style.display = "block";

function menu(content){
	if(content == "orderlist") lastread = "!!@all";
	tabcontent = document.getElementsByClassName("content");
	for(i=0; i < tabcontent.length; i++){
		tabcontent[i].style.display = "none";
	}
	
	document.getElementById(content).style.display = "block";
}

setInterval(search, 100);

function search(){
	var purchase = document.getElementById("orderlist");	
	if(purchase.style.display == "block"){
		var find = document.getElementById("po").value;
		if( lastread != find){
			fetchorder.onreadystatechange=function(){
				if (this.readyState == 4 && this.status == 200){
					dataDisplay(this.responseText, find);
				}
			}
			var fetchurl = "echo.php";
	
			fetchorder.open("GET", fetchurl, true);
			fetchorder.send();
			lastread = find;
		}
	}	
}

function dataDisplay(response, finddata){
	var getData = JSON.parse(response);
	if(finddata.length == 0){
		var dataShow = '<table class=purchasedata width="100%">';
		dataShow += "<tr>";
		dataShow += '<th width="5%">NO.</th>';
		dataShow += '<th width="45%">COMPANY NAME</th>';
		dataShow += '<th width="25%">PURCHASE CODE</th>';
		dataShow += '<th width="25%">PURCHASE DATE</th>';
		dataShow += "</tr>";
		
		for(i = 0; i < getData.length; i++){
				dataShow += "<tr>";
				dataShow += '<td style="text-align:center;">' + (i+1) + "</td>";
				dataShow += "<td>" + getData[i].company + "</td>";
				dataShow += '<td style="text-align:center;">'  + getData[i].purchase + "</td>";
				dataShow += '<td style="text-align:center;">'  + getData[i].date + "</td>";
				dataShow += "</tr>";
		}
		
		dataShow += "</table>";
		document.getElementById("data").innerHTML = dataShow;
	}
	else{
		var findresult = [];
		for(i = 0; i < getData.length; i++){
			for(key in getData[i]){
				if(getData[i][key].toString().toUpperCase().indexOf(finddata.toUpperCase()) != -1) {
					findresult.push(getData[i]);
					i++;
				}
			}
		}
		var dataShow = '<table class=purchasedata width="100%">';
		dataShow += "<tr>";
		dataShow += '<th width="5%">NO.</th>';
		dataShow += '<th width="45%">COMPANY NAME</th>';
		dataShow += '<th width="25%">PURCHASE CODE</th>';
		dataShow += '<th width="25%">PURCHASE DATE</th>';
		dataShow += "</tr>";
		
		for(i = 0; i < findresult.length; i++){
				dataShow += "<tr>";
				dataShow += '<td style="text-align:center;">' + (i+1) + "</td>";
				dataShow += "<td>" + findresult[i].company + "</td>";
				dataShow += '<td style="text-align:center;">'  + findresult[i].purchase + "</td>";
				dataShow += '<td style="text-align:center;">'  + findresult[i].date + "</td>";
				dataShow += "</tr>";
		}
		
		dataShow += "</table>";
		document.getElementById("data").innerHTML = dataShow;
	}
}