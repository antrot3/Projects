app.controller('crudController', function ($scope, crudService, $http,$routeParams, $location, ShareData) {

    $scope.IsNewRecord = 1; //The flag for the new record
    loadRecords(); //loda elemente na stranici
    function loadRecords() {
            var ListaMuzike = crudService.getTablicaHitovas(); //The MEthod Call from service
            ListaMuzike.then(function (TablicaHitova)
            { $scope.TablicaHitovas = TablicaHitova.data },
            function (errorPl)
            {
               $log.error('Nije se uspjela ucitati tablica muzike', errorPl);
            });
        };
    //Kreira novu playlistu
    $scope.savePlaylista = function () {
            $scope.albumNameArray2 = [];
            angular.forEach($scope.Imeplaylista, function (ie) {
            $scope.albumNameArray2.push(ie.Ime);
            })
        }
    $scope.savePlaylista=function(){
            var Playlista = {                   
                Ime: $scope.Imeplaylista};
            if ($scope.IsNewRecord === 1) {
                var NovaPlaylista = crudService.post3(Playlista);
                NovaPlaylista.then(function (Playlista) {
                    $scope.mId = Playlista.data.Idplaylista;
                    loadRecords();
                }, function (err) {
                    console.log("Erroric" + err);
                });
            } else { 
                var PlaylistaPut = crudService.put3($scope.mId,Playlista);
                PlaylistaPut.then(function (p2) {
                    $scope.Message = "Updated Successfuly";
                    console.log("Uppdate suc" + err);
                    loadRecords();
                }, function (err) {
                    console.log("Err" + err);
                });
            }
    }
    //Kreirati novu pjesmu
    $scope.save = function () {
        $scope.NovaPjesma = [];
        angular.forEach($scope.Ime, function (ie) {
            if (!!ie.selected) $scope.NovaPjesma.push(ie.Ime);
                })
        }
    //Dodaje Pjesmu u Tablicu u bazi
    $scope.save = function () {
        var TablicaHitova = {
            Id: $scope.Id,
            Ime: $scope.Ime,
            Izvodac: $scope.Izvodac,
            url: $scope.url
            };
            //Ako je ISNewRecord ==1 onda je to nova pjesma
            if ($scope.IsNewRecord === 1) {
                var promisePost = crudService.post(TablicaHitova);
                promisePost.then(function (TablicaHitova) {
                    $scope.Id = TablicaHitova.data.Id;
                    $scope.Message = "Dodano";
                    loadRecords();
                }, function (err) {
                    console.log("Erroric" + err);
                });
            } else { //Ako ne onda već postoji u bazi
                var promisePut = crudService.put($scope.Id,TablicaHitova);
                promisePut.then(function (pl) {
                    $scope.Message = "Updated Successfuly";
                    loadRecords();
                }, function (err) {
                    console.log("Err" + err);
                });
            }
            },
    //// Briše odabranu Pjesmu
    $scope.delete = function () {
        var promiseDelete = crudService.delete($scope.Id);
        promiseDelete.then(function (pl) {
            var c = $scope.Id + 1;
            $scope.Message = "Deleted Successfuly";
            $scope.Id = c;
            $scope.Ime = "";
            $scope.Izvodac= "";
            $scope.url = "";
            loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        },
    //Briše playlistu
    $scope.deletePlaylista = function () {
        var promiseDelete = crudService.delete($scope.mId);
        promiseDelete.then(function (pl) {
                var c = $scope.mId + 1;
                $scope.Message = "Deleted Successfuly";
                $scope.mId = c;
                $scope.Ime = "";
                $scope.Izvodac = "";
                $scope.url = "";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        },
     //Dohvaća odabrani hit iz tablice i stavlja ga u tablicu lijevo za editiranje
     $scope.get = function (TablicaHitova) {
         var DohvatiHit = crudService.get(TablicaHitova.Id);
         DohvatiHit.then(function (pl) {
         var res = pl.data;
         $scope.Id = res.Id;
         $scope.Ime = res.Ime;
         $scope.Izvodac = res.Izvodac;
         $scope.url = res.url;
         $scope.IsNewRecord = 0;
         },function (errorPl) {
                console.log('failure loading Hit', errorPl);
                });
        },
        //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        var c = $scope.Id + 1;
        $scope.Id = "0";
        $scope.Ime = "";
        $scope.Izvodac = "";
        $scope.url = "";
    },
    //traži rout parametre
    ['$scope', '$routeParams',function (scope, $routeParams) {
            $routeParams.Id=$scope.Id;
        }];
    }
)
  