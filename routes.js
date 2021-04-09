

let path = require("path");
let express = require("express");    //new
let router = express.Router();      //new


router.get("/",function(req,res){
//	res.sendFile(path.resolve(__dirname + "/public/views/index.html"));  //changed
	res.sendFile(path.resolve(__dirname,"public/views/index.html"));
});


const myDatabase = require('./myDatabase'); //handle to database
let db = new myDatabase();

const Student = require('./Student'); // handle to the student module

router.post('/create', function(req, res){ // makes a new item in database, if it's a post on an existing identifer, then ignore
	if (req.body.name == "") {
		res.json({retVal:false});
		return;
	}
	let obj = new Student(req.body.identifier,req.body.name, req.body.age, req.body.grade); // creating new instance of the student
	res.json({retVal:db.postStudent(obj)});
});


router.get('/read', function(req, res){
	res.json({retVal:db.getStudent(req.query.identifier)}); // passing in the identifer.  db.get student will return the info of the student in that identifier - currently name, later grade and age
});


router.put('/update', function(req, res){ // identical to post - also uses request.body - modifies an existing item
	if (req.body.name == "") {
		res.json({retVal:false});
		return;
	}
	let obj = new Student(req.body.identifier,req.body.name, req.body.age, req.body.grade); // create new instance of the student object
	res.json({retVal:db.putStudent(obj)});
});

router.delete('/delete/:identifier', function(req, res){ // this is what puts the identifer in the url (using the :) . if doing a delete, must use the : with identifier to get rid of
	res.json({retVal:db.deleteStudent(req.params.identifier)}); // use params.identifier to delete the specified identifer
});




module.exports = router;   //new
