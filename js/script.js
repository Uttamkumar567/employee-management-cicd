 
// 1. Get HTML Elements
const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");
const searchInput = document.getElementById("search");
 
// 2. Load Employees from LocalStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];
 
// 3. Save Employees
function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}
 
// 4. Update Dashboard
function updateDashboard() {
    document.getElementById("totalEmployees").textContent = employees.length;
 
    document.getElementById("activeEmployees").textContent =
        employees.length;
}
 
// 5. Display Employees
function displayEmployees(data = employees) {
    employeeTable.innerHTML = "";
 
    data.forEach((employee) => {
        const row = document.createElement("tr");
 
        const nameCell = document.createElement("td");
        nameCell.textContent = employee.name;
 
        const emailCell = document.createElement("td");
        emailCell.textContent = employee.email;
 
        const departmentCell = document.createElement("td");
        departmentCell.textContent = employee.department;
 
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
 
        deleteButton.textContent = "Delete";
        deleteButton.style.background = "#dc2626";
 
        deleteButton.addEventListener("click", () => {
            employees = employees.filter(
                item => item.id !== employee.id
            );
 
            saveEmployees();
            displayEmployees();
            updateDashboard();
        });
 
        actionCell.appendChild(deleteButton);
 
        row.append(
            nameCell,
            emailCell,
            departmentCell,
            actionCell
        );
 
        employeeTable.appendChild(row);
    });
}
 
// 6. Add Employee
employeeForm.addEventListener("submit", function(event) {
    event.preventDefault();
 
    const employee = {
        id: Date.now(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim()
    };
 
    employees.push(employee);
 
    saveEmployees();
    displayEmployees();
    updateDashboard();
 
    employeeForm.reset();
});
 
// 7. Search Employees
searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();
 
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchValue) ||
        employee.department.toLowerCase().includes(searchValue)
    );
 
    displayEmployees(filteredEmployees);
});
 
// 8. Initial Application Load
displayEmployees();
updateDashboard();
 