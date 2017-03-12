//  /* */ <-- This is comment Tag

//Initialization
var i, tabs, tabcontent;
var fetchorder = new XMLHttpRequest();
var lastread;
tabs = document.getElementsByClassName("tab");

document.getElementById("home").style.display = "block";


//This is function for switiching from Home page to Search page
function menu(content){
	if(content == "orderlist") lastread = "!!@all";
	tabcontent = document.getElementsByClassName("content");
	for(i=0; i < tabcontent.length; i++){
		tabcontent[i].style.display = "none";
	}
	
	document.getElementById(content).style.display = "block";
}

setInterval(search, 100); //This line is used to excute search function every 100ms, so any change in search box will automatically updated
<<<<<<< HEAD


=======


>>>>>>> abd1ea4... added a little help
//This is seach function
function search(){
	var purchase = document.getElementById("orderlist");	
	if(purchase.style.display == "block"){
		var find = document.getElementById("po").value;
		if( lastread != find){
			//This is AJAX. AJAX is used for acquiring file / data that will allow the webpage to update behind the scene
			fetchorder.onreadystatechange=function(){
				if (this.readyState == 4 && this.status == 200){
					dataDisplay(this.responseText, find); //This is callig dataDisplay function passing AJAX file and search keywords
				}
			}
			var fetchurl = "200_data.json"; //this is what AJAX trying to acquire
	
			fetchorder.open("GET", fetchurl, true);
			fetchorder.send();
			lastread = find;
		}
	}	
}

//This is display function on search. Anything you search will be displayed by this function
function dataDisplay(response, finddata){
	var getData = JSON.parse(response); //The AJAX file will parse the file as JSON. This is also can be used for SQL. The data will be saved as array of object with properties.
	// If the search keyword is blank, this condition will show all data
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
		document.getElementById("data").innerHTML = dataShow; //This line will search in HTML file, element with id="data", and fill it with dataShow content
	}

	// If there's some keyword in search (Or alphabet containing), this condition will show only the data needed / searched
	else{
		var findresult = [];
		// This for function here is searching in array of object that have properties containing the keyword and save it in a new array of objects
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
