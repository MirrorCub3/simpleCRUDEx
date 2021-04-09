
const Student = require('./Student');

let myDatabase = function() {
	this.students = []; // an array for students - an arrray of student objects
}

let studentIndex = 0; //tudent index and identifer are not the same

myDatabase.prototype.displayStudents = function() { // just for testing purposes
	for (let i=0;i<this.students.length;i++) {
		console.log(this.students[i]);
	}
}

myDatabase.prototype.postStudent = function(student) { // create
  for (let i=0;i<this.students.length;i++) { // looking to see if the student identifer index already exists - loops through every array obect
    if (this.students[i] && this.students[i].id == student.id) { //this.students[i] checks if it is null or not
      return false; // if the ids match,
    }
  }
//	this.students[studentIndex++] = student;
	this.students[studentIndex++] = new Student(student.id,student.name,student.age,student.grade);// adds the student to database
	return true;
}

// myDatabase.prototype.getStudent = function(id) { // like a get request
//   for (let i=0;i<this.students.length;i++) {
//     if (this.students[i] && id == this.students[i].id) // checks f there is a studnt existing with this id
// 		{
// //			return(this.students[i]);
//       return(new Student(this.students[i].id,this.students[i].name,this.students[i].age,this.students[i].grade));
// 		}
//   }
// 	return null;
// }

myDatabase.prototype.getStudent = function(id) {
  for (let i=0;i<this.students.length;i++) {
    if (this.students[i] && id == this.students[i].id)
		{
//			return(this.students[i]);
      return(new Student(this.students[i].id,this.students[i].name,this.students[i].age,this.students[i].grade));
		}
  }
	return null;
}

myDatabase.prototype.putStudent = function(student) { // put is a request from client to server
  for (let i=0;i<this.students.length;i++) {
    if (this.students[i] && this.students[i].id == student.id) { // only making the change of the id exists - opposite fof the post test
//			this.students[i] = student;
      this.students[i] = new Student(student.id,student.name,student.age,student.grade);// replaces the student info
      return true;
    }
  }
  return false;
}

myDatabase.prototype.deleteStudent = function(id) { // deleted student
  for (let i=0;i<this.students.length;i++) {
    if (this.students[i] && id == this.students[i].id) {
			  let tempPtr = this.students[i];
        this.students[i] = undefined; // takes the index and sets to undefined (null) - for checks in other functions for null
				return tempPtr;
    }
  }
	return null;
}

module.exports = myDatabase;
