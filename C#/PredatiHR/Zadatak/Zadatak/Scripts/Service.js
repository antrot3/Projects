app.service('crudService', function ($http) {


    //Create new record
    this.post = function (TablicaHitova) {
        var request = $http({
            method: "post",
            url: "/api/TablicaHitovasApi",
            data: TablicaHitova
        });
        return request;
    }
    //Get Single Records
    this.get = function (Id) {
        return $http.get("/api/TablicaHitovasApi/" + Id);
    }

    //Get All Employees
    this.getTablicaHitovas = function () {
        return $http.get("/api/TablicaHitovasApi");
    }


    //Update the Record
    this.put = function (Id, TablicaHitovas) {
        var request = $http({
            method: "put",
            url: "/api/TablicaHitovasAPI/" + Id,
            data: TablicaHitovas
        });
        return request;
    }
    //Delete the Record
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/TablicaHitovasAPI/" + Id
        });
        return request;
    }
    //Create new record
    this.post = function (TablicaHitova) {
        var request = $http({
            method: "post",
            url: "/api/TablicaHitovasApi",
            data: TablicaHitova
        });
        return request;
    }
    //Get Single Records
    this.get = function (Id) {
        return $http.get("/api/TablicaHitovasApi/" + Id);
    }

    //Get All Employees
    this.getTablicaHitovas = function () {
        return $http.get("/api/TablicaHitovasApi");
    }


    //Update the Record
    this.put = function (Id, TablicaHitovas) {
        var request = $http({
            method: "put",
            url: "/api/TablicaHitovasAPI/" + Id,
            data: TablicaHitovas
        });
        return request;
    }
    //Delete the Record
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/TablicaHitovasAPI/" + Id
        });
        return request;
    }
});
