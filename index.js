const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var contacts = [
	{ 
		name: "peter",
		phone: 123456	
	},
	{ 
		name: "pablo",
		phone: 789456	
	},
	{
		name: "pepe",
		phone: 98766
	}
];

var towns = [];

var initialTowns = [
	{
		name: "seville",
		population: 988394
	},
	{
		name: "huelva",
		population: 3465
	}
];

const BASE_API_URL = "/api/v1";

app.get(BASE_API_URL+"/towns", (req,res) =>{
	res.send(JSON.stringify(towns,null,2));
});

app.get(BASE_API_URL+"/towns/loadInitialData", (req,res) =>{
	initialTowns.forEach(element => towns.push(element));
	res.send(JSON.stringify(towns,null,2));
});

app.get(BASE_API_URL+"/contacts", (req,res) =>{
	res.send(JSON.stringify(contacts,null,2));
});


app.post(BASE_API_URL+"/contacts",(req,res) =>{
	contacts.push(req.body); 
	res.sendStatus(201,"CREATED");
});

app.post(BASE_API_URL+"/towns",(req,res) =>{
	towns.push(req.body); 
	res.sendStatus(201,"CREATED");
});

app.get(BASE_API_URL+"/contacts/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredContacts = contacts.filter((c) => {
		return (c.name == name);
	});
	
	
	if(filteredContacts.length >= 1){
		res.send(filteredContacts[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
});

app.get(BASE_API_URL+"/towns/:tName", (req,res)=>{
	
	var tName = req.params.tName;
	
	var filteredTowns = towns.filter((c) => {
		return (c.name == tName);
	});
	
	if(filteredTowns.length >= 1){
		res.send(filteredTowns[0]);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
});

app.delete(BASE_API_URL+"/towns/:tName", (req,res)=>{
	
	var tName = req.params.tName;
	
	var filteredTowns = towns.filter((c) => {
		return (c.name != tName);
	});
	
	
	if(filteredTowns.length < towns.length){
		towns = filteredTowns;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
	
});

app.put(BASE_API_URL+"/towns/:tName", (req,res)=>{
	
	var tName = req.params.tName;
	
	var filteredTowns = towns.filter((c) => {
		return (c.name != tName);
	});
	
	if(filteredTowns.length < towns.length){
		towns = filteredTowns;
		towns.push(req.body);
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"CONTACT NOT FOUND");
	}
	
});

app.post(BASE_API_URL+"/towns/:tName",(req,res) =>{
	console.error("No permitido")
	res.sendStatus(405,"NO PERMITIDO");
});

app.put(BASE_API_URL+"/towns",(req,res) =>{
	console.error("No permitido")
	res.sendStatus(405,"NO PERMITIDO");
});

app.delete(BASE_API_URL+"/towns", (req,res)=>{
	towns = new Array();
	res.sendStatus(200,"ALL DELETED");
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");