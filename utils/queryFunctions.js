// =========================== dependencies start here =========================== // 
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
// =========================== dependencies end here =========================== // 

// ========== connection functions start here ========== //
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
// ========== connection functions end here ========== //

// ========== query functions start here ========== //
const viewDepartments = () => {
    console.log('\n');
    console.log('-------------------');
    console.log('Showing Departments');
    console.log('-------------------');

    connection.query(
        'SELECT * FROM departments',
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    );
};

const viewRoles = () => {
    console.log('\n');
    console.log('-------------');
    console.log('Showing Roles');
    console.log('-------------');

    connection.query(
        'SELECT roles.id, role_title, dept_name, salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id',
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    );
};

const viewEmployees = () => {
    console.log('\n');
    console.log('-----------------');
    console.log('Showing Employees');
    console.log('-----------------');

    connection.query(
        `SELECT employees.id, employees.first_name, employees.last_name, role_title, dept_name, salary,
        CONCAT(manager_alias.first_name, ' ', manager_alias.last_name) AS manager_name FROM roles
            RIGHT JOIN employees ON employees.id = roles.id
            RIGHT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees AS manager_alias ON employees.manager_id = manager_alias.id`,
            
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    );
};

const addDepartment = () => {
    console.log('\n');
    console.log('---------------------');
    console.log('Adding New Department');
    console.log('---------------------');

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'dept_name',
                message: 'Please type in a department name:',
                validate: deptInput => {
                    if (deptInput) {
                        return true;
                    } else {
                        console.log("Please enter a department name.");
                        return false;
                    }
                }
            }
        ])
        .then(newDept => {
            console.log(newDept);

            connection.query(
                'INSERT INTO departments SET ?', newDept,

                function(err, res) {
                    if (err) throw err;
                    console.log('\nDepartment has been added!');
                    viewDepartments();
                }
            );
        })
    ;
};

// ========== query functions end here ========== //

// ========== export query functions ========== //
module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment
};