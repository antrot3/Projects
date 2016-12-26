app.controller('crudControllerDetalji', function ($scope, $http, $routeParams)
    {
        $scope.Id = $routeParams.id;

        var b = $http.get('/api/TablicaHitovasApi/GetTablicaHitova/' + $scope.Id)
             .then(function (result) {
                 $scope.$routeParams = $routeParams.id
                 $scope.Id = result.data.Id;
                 $scope.Ime = result.data.Ime;
                 $scope.Izvodac = result.data.Izvodac;
                 $scope.url = result.data.url;

             })


    ;
       
})
app.controller('crudControllerGlavna', function ($scope,crudService, $http, $routeParams) {
    $scope.IsNewRecord = 1;
   
    $scope.Id = $routeParams.id;
    loadRecords();
    loadRecordsb();
    //////
    function loadRecordsb() {
        var nekonesto = crudService.get4($routeParams.id)
            .then(function (blabla) { $scope.novatabela = blabla.data },
                      function (errorPl) {
                          
                          $log.error('failure loading TablicaHitova', errorPl);
                      })
    }
  
    function loadRecords() {
        var promiseGet = crudService.getTablicaHitovas(); //The MEthod Call from service

        promiseGet.then(function (TablicaHitova) { $scope.TablicaHitovas = TablicaHitova.data },
              function (errorPl) {
                  $log.error('failure loading TablicaHitova', errorPl);
              });

        var promiseGetb = crudService.getPrijenosnicas(); //The MEthod Call from service

        promiseGetb.then(function (Prijenosnica) { $scope.Prijenosnica = Prijenosnica.data },
              function (errorPl) {
                  $log.error('failure loading TablicaHitova', errorPl);
              });

    }

    $scope.get3 = function (TablicaHitova) {
        var rjesenje = crudService.get(TablicaHitova.Id);

        rjesenje.then(function (pl) {
            var rjesenje = pl.data;
            $scope.Id2 = rjesenje.Id;

            $scope.IsNewRecord = 0;
        },
              function (errorPl) {
                  console.log('failure loading Hit', errorPl);


                  ////////
              })
    },
    $scope.get2 = function (Prijenosnica) {
        var rjesenjeb = crudService.get2(Prijenosnica.PrijenosnicaId);

        rjesenjeb.then(function (p2) {
            var rjesenjeb = p2.data;
            $scope.Id2 = rjesenjeb.Id;
            $scope.Id3 = rjesenjeb.PrijenosnicaId;
            $scope.IsNewRecord = 0;
        },
              function (errorPl) {
                  console.log('failure loading Hit', errorPl);


                  ////////
              })
    }

   
    $scope.save2 = function () {
        $scope.albumNameArray3 = [];
        angular.forEach($scope.Id3, function (ie) {
            if (!!ie.selected) $scope.albumNameArray3.push(ie.PrijenosnicaId);
        })
    }
    
     
    //Create the Muzika information to the server
    $scope.save2 = function () {
        var Prijenosica = {
            Id: $scope.Id2,
            Idplaylista:$scope.Id
        }
        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            var promisePost2 = crudService.post2(Prijenosica);
            promisePost2.then(function (Prijenosica) {
                $scope.Id3 = Prijenosica.data.PrijenosnicaId;
                loadRecordsb();
                loadRecords();
            }, function (err) {
                console.log("Erroric" + err);
            });
        } else { //Else Edit the Muzika
            var promisePut = crudService.put2($scope.Id2, Prijenosica);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                loadRecordsb();
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            }
            );

        }
       
    },
    $scope.delete2 = function () {
        var promiseDeleteb = crudService.delete2($scope.Id3);
        promiseDeleteb.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            loadRecords();
            loadRecordsb();
        }, function (err) {
            console.log("Err" + err);
        });
    }
    /////
   
    }
)




