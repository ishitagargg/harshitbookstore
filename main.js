const express = require('express');
const app = express();
app.use(express.json());


const students = [];
app.get("/", (req, res)=>{
    res.send("home page ");
})

// Adding a new Student 
app.post('/register' , (req,res) => {
    const newStudent = req.body;
    if(!newStudent.StudentName || !newStudent.rollNo) {
        res.send("Student name and Roll no are required");
        return;
    }
    students.push(newStudent);
    res.send("Data for New Student is Added Successfully");
})

// All Students Name Data
app.get('/studentsName', (req,res) => {
    const n = req.query.n;
    const sort = req.query.sort;

    let StudentName = students.map(S => S.StudentName);
    if(n) {
        StudentName = StudentName.slice(0,n);
    }
    if(sort) {
        StudentName.sort();
    }
    res.send(StudentName);
})

// All Students Data
app.get('/students', (req,res) => {
    res.send(students);
})

// Searching a Specific Student
app.get('/students/:rollNo' ,(req,res) => {
    let rollno = req.params.rollNo;
    let stu = students.find(stu => stu.rollNo == rollno);

    if(stu) {
        res.send(stu);
        return;
    }
    res.send("No Data Found for this Roll No.");
})

// Deleting

// Deleting a specific student
app.delete('/students/:rollNo' ,(req,res) => {
    const rollno = req.params.rollNo;
    if(!rollno) {
        res.send("No Roll number Recived");
        return;
    }

    const studentIndex = students.findIndex(student => student.rollNo == rollno);

    if(studentIndex == -1) {
        res.send("No Student Found for this roll no.");
        return;
    } 

    students.splice(studentIndex,1);
    res.send("Student Deleted");
})

// In case we want to delete all our students
app.delete('/students', (req,res) => {
    let n = students.length;
    students.splice(0,n);
    res.send(students);
})

// Updating a specific roll number
app.put('/students/:rollNo' ,(req,res) => {
    const rollno = req.params.rollNo;
    const update = req.body;

    let studnet = students.find((studnet => studnet.rollNo==rollno));

    if(!studnet) {
        res.send("No Data found");
        return;
    }
    for( let key in update) {
        if(update.hasOwnProperty(key)) {
            studnet[key] = update[key];
        }
    }
    res.send("Data Updated")

})


// To make our app listen on a certain port of our system
app.listen(3000, () => {
    console.log("http://localhost:3000");
})