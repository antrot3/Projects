app.service("angularService", function ($http) {

    //get All Eployee
    this.getEmployees = function () {
        return $http.get("Home/GetAll");
    };

    // get Employee By Id
    this.getEmployee = function (employeeID) {
        var response = $http({
            method: "post",
            url: "Home/GetEmployeeById",
            params: {
                id: JSON.stringify(employeeID)
            }
        });
        return response;
    }

    // Update Employee 
    this.updateEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "Home/UpdateEmployee",
            data: JSON.stringify(employee),
            dataType: "json"
        });
        return response;
    }

    // Add Employee
    this.AddEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "Home/AddEmployee",
            data: JSON.stringify(employee),
            dataType: "json"
        });
        return response;
    }

    //Delete Employee
    this.DeleteEmp = function (employeeId) {
        var response = $http({
            method: "post",
            url: "Home/DeleteEmployee",
            params: {
                employeeId: JSON.stringify(employeeId)
            }
        });
        return response;
    }
});