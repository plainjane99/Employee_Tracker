// =========================== dependencies start here =========================== // 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
// =========================== dependencies end here =========================== // 

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'S69MtGpdkNtvbG@1Z9zs',
    database: 'company_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    console.log('Welcome to Employee Tracker. \n');
    promptUser();
});

viewDepartments = () => {
    console.log('\nShowing Departments:');

    connection.query(
        'SELECT * FROM departments',
        function(err, res) {
            if (err) throw err;
            console.table(res);
        }
    )
}
  
promptUser = () => {

    return inquirer.prompt([
        { 
            type: 'list',
            message: 'Please select an option.',
            name: 'selection',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
        }
    ])
        .then(chosen => {

            if (chosen.selection === 'View Departments') {
                viewDepartments();
            }
        })
    ;

};