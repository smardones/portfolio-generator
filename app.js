const inquirer = require("inquirer");
const { AnimationFrameScheduler } = require("rxjs/internal/scheduler/AnimationFrameScheduler");

const promptUser = () => {
    return inquirer.prompt([
        {   
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name!");
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About Me' section?",
            default: true
        },
        {
            type:"input",
            name: "about",
            message: "Provide some information about yourself:",
            when: ({ confirmAbout }) => confirmAbout
        }

        ]);
};

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    =================
    
    Add a New Project
    
    =================
    `);
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of your project? (Required)",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter the project's name!");
                    }
                }
            },
            {
                type: "input",
                name: "description",
                message: "Provide a description of the project (Required)",
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log("Please enter a description");
                    }
                }
            },
            {
                type: "checkbox",
                name: "language",
                message: "What did you do this project with? (Check all that apply)",
                choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
            },
            {
                type: "confirm",
                name: "feature",
                message: "Would you like to feature this project?",
                default: false
            },
            {
                type: "confirm",
                name: "confirmAddProject",
                message: "Would you like to enter another project?",
                default: false
            }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData));



// const fs = require('fs');
// const generatePage = require('./src/page-template.js');


// const pageHTML = generatePage(portfolioData));

// fs.writeFile("index.html", generatePage(name, github), err => {
//     if (err) throw err;

//     console.log("Portfolio complete! Checkout index.htm to see the output!")
// })