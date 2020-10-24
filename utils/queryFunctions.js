// =========================== dependencies start here =========================== // 
const mysql = require('mysql2');
const cTable = require('console.table');
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
    console.log('\nShowing Departments:');

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
    console.log('\nShowing Roles:');

    connection.query(
        'SELECT role_id, role_title, dept_name, salary FROM roles LEFT JOIN departments ON roles.department_id = departments.dept_id',
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    );
};
// ========== query functions end here ========== //

// ========== export query functions ========== //
module.exports = {
    viewDepartments,
    viewRoles
};