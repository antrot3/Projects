app.service('crudService', function ($http) {
    //Create new record
    this.post = function (TablicaHitova) {
        var request = $http({
            method: "post",
            url: "/api/TablicaHitovasApi/PostTablicaHitova",
            data: TablicaHitova
        });
        return request;
    }
    //Get Single Pjesma
    this.get = function (Id) {
        return $http.get("/api/TablicaHitovasApi/GetTablicaHitova/" + Id);
    }
    //Get All TablicaHitova
    this.getTablicaHitovas = function () {
        return $http.get("/api/TablicaHitovasApi/GetTablicaHitovas");
    }
   
    //Update the TablicaHitova
    this.put = function (Id, TablicaHitovas) {
        var request = $http({
            method: "put",
            url: "/api/TablicaHitovasAPI/PutTablicaHitova/" + Id,
            data: TablicaHitovas
        });
        return request;
    }
    //Delete the Pjesma
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/TablicaHitovasAPI/DeleteTablicaHitova/" + Id
        });
        return request;
    }
   ///Prijenosnica, povezuje Tablicu hitova s Playlistom
     this.post2 = function (Prijenosnicas) {
        var request = $http({
            method: "post",
            url: "/api/PrijenosnicasAPI/PostPrijenosica",
            data: Prijenosnicas
        });
        return request;
    }
   
    this.get2 = function (Id) {
        return $http.get("/api/PrijenosnicasAPI/GetPrijenosica/" + Id);
    }

    this.getPrijenosnicas = function () {
        return $http.get("/api/PrijenosnicasAPI/GetPrijenosicas");
    }

    this.put2 = function (Id, Prijenosnicas) {
        var request = $http({
            method: "put",
            url: "/api/PrijenosnicasAPI/PutPrijenosica/" + Id,
            data: Prijenosnicas
        });
        return request;
    }
    
    this.delete2 = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/PrijenosnicasAPI/DeletePrijenosica/" + Id
        });
        return request;
    }
    ///Playlista, tablcia u bazi podataka koja se puni pjesmama iz tablice hitova
    this.post3 = function (Playlistas) {
        var request = $http({
            method: "post",
            url: "/api/PlaylistasAPI/PostPlaylista",
            data: Playlistas
        });
        return request;
    }
    this.get3 = function (Id) {
        return $http.get("/api/PlaylistasAPI/GetPlaylista/" + Id);
    }
    this.getPlaylistas = function () {
        return $http.get("/api/PlaylistasAPI/GetPlaylistas");
    }
    this.put3 = function (Id, Prijenosnicas) {
        var request = $http({
            method: "put",
            url: "/api/PlaylistasAPI/PutPlaylista/" + Id,
            data: Prijenosnicas
        });
        return request;
    }
    this.delete3 = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/PlaylistasAPI/DeletePlaylista/" + Id
        });
        return request;
    }
    //Dohvaća Dobijanje veze
    this.get4 = function (Id) {
        return $http.get("/api/PlaylistasAPI/DobitiVezu/" + Id);
    }
});
