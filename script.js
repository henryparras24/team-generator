const inquirer = require('inquirer');
const fs = require('fs');
const { isTypedArray } = require('util/types');
const allEmployees = []

function init(){

  createManager();
  //get html started

}

//create manager
function createManager(){
inquirer.prompt ([
{
    type: 'input',
    name: 'managerName',
    message: 'What is the managers name?',
    // validate: answer => {
    //     if (answer !== "") {
    //       return true;
    //     }
    //     return "Please enter at least one character.";
    //   }
},
{
      type: 'input',
      name: 'managerId',
      message: 'What is your managers id number?',
    //   validate: answer => {
    //     if (answer !== "" || answer !== [1-9]) {
    //       return true;
    //     }
    //     return "Please enter at least one number.";
    //   }
},
{
      type: 'input',
      name: 'officeNumber',
      message: 'What is your managers office number?',
},
{
      type: 'input',
      name: 'email',
      message: 'What is your managers email?',
},


])
.then((answers) => {
    
    console.log(answers);
    const managerDetails = new Manager (answers.managerName, answers.managerId, answers.officeNumber, answers.email); 
    allEmployees.push(managerDetails);
    //idArray.push(answers.managerId)
    createTeam();
    
  });


}

function createTeam(){

  inquirer.prompt ([
    {
      type: 'list',
            name: 'choice',
            message: 'Which team member would you like to add?',
            choices: ["engineer", "intern", "I don't want to add any more staff."]
      },
  ])

  .then((answers) => {
    switch(answers.choices) {
      case "engineer":
        createEngineer();
        break;
      case "intern":
        createIntern();
        break;
      default: 
      finishTeam();
      
    }
   
    
  });
}


//create engineer
function createEngineer(){
  inquirer.prompt ([
  {
      type: 'input',
      name: 'engineerName',
      message: 'What is the engineers name?',
      // validate: answer => {
      //     if (answer !== "") {
      //       return true;
      //     }
      //     return "Please enter at least one character.";
      //   }
  },
  {
        type: 'input',
        name: 'engineerId',
        message: 'What is your engineers id number?',


  },

        {type: 'input',
        name: 'engineerEmail',
        message: 'What is the engineers email?',
        
    },
    
    
    {
          type: 'input',
          name: 'engineerGithub',
          message: 'What is your engineers github?',
    },
  ])

  .then((answers) => {

    console.log(answers);
    const engineerDetails = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub); 
    allEmployees.push(engineerDetails);
    //idArray.push(answers.managerId)
    createTeam();

  })
}


//create intern
function createIntern(){
  inquirer.prompt ([
  {
      type: 'input',
      name: 'internName',
      message: 'What is the interns name?',
      // validate: answer => {
      //     if (answer !== "") {
      //       return true;
      //     }
      //     return "Please enter at least one character.";
      //   }
  },
  {
        type: 'input',
        name: 'internId',
        message: 'What is your interns id number?',


  },

        {type: 'input',
        name: 'internEmail',
        message: 'What is the interns email?',
        
    },
    
    
    {
          type: 'input',
          name: 'internSchool',
          message: 'What is your interns school?',
    },
  ])

  .then((answers) => {

    console.log(answers);
    const internDetails = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool); 
    allEmployees.push(internDetails);
    //idArray.push(answers.managerId)
    createTeam();

  })
}


const generateHTML = (answers) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
    .then(() => console.log('Successfully wrote to index.html'))
    .catch((err) => console.error(err));
};


// start the process
init();