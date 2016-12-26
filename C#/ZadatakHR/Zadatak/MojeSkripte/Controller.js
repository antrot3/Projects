app.controller('crudController', function ($scope, crudService, $http,$routeParams, $location, ShareData) {
    
        $scope.IsNewRecord = 1; //The flag for the new record
 
        loadRecords(); 
        

        function loadRecords() {

                       
            var promiseGet = crudService.getTablicaHitovas(); //The MEthod Call from service

            promiseGet.then(function (TablicaHitova) { $scope.TablicaHitovas = TablicaHitova.data },
                  function (errorPl) {
                      $log.error('failure loading TablicaHitova', errorPl);
                  });

        };

       
       
        $scope.savePlaylista = function () {
            $scope.albumNameArray2 = [];
            angular.forEach($scope.Imeplaylista, function (ie) {
                $scope.albumNameArray2.push(ie.Ime);
               
            })
        }

        $scope.savePlaylista=function(){
            var Playlista = {                   
                Ime: $scope.Imeplaylista

            };
            if ($scope.IsNewRecord === 1) {
                var NoviPlaylista = crudService.post3(Playlista);
                NoviPlaylista.then(function (Playlista) {
                    $scope.mId = Playlista.data.Idplaylista;
                    loadRecords();
                }, function (err) {
                    console.log("Erroric" + err);
                });
            } else { //Else Edit the Muzika
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
    //////
        $scope.save = function () {
            $scope.albumNameArray = [];
            angular.forEach($scope.Ime, function (ie) {
                if (!!ie.selected) $scope.albumNameArray.push(ie.Ime);
            })
        }

     
        //Create the Muzika information to the server
        $scope.save = function () {
            var TablicaHitova = {
                Id: $scope.Id,
                Ime: $scope.Ime,
                Izvodac: $scope.Izvodac,
                url: $scope.url,
                
            };
            //If the flag is 1 the it si new record
            if ($scope.IsNewRecord === 1) {
                var promisePost = crudService.post(TablicaHitova);
                promisePost.then(function (TablicaHitova) {
                    $scope.Id = TablicaHitova.data.Id;
                    $scope.Message = "Dodano";
                    loadRecords();
                }, function (err) {
                    console.log("Erroric" + err);
                });
            } else { //Else Edit the Muzika
                var promisePut = crudService.put($scope.Id,TablicaHitova);
                promisePut.then(function (pl) {
                    $scope.Message = "Updated Successfuly";
                    loadRecords();
                }, function (err) {
                    console.log("Err" + err);
                });
            }
 
         
             
        },
    ////
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
        //Method to Get Single Muzika 
        $scope.get = function (TablicaHitova) {
            var promiseGetSingle = crudService.get(TablicaHitova.Id);

            promiseGetSingle.then(function (pl) {
                var res = pl.data;
                $scope.Id = res.Id;
                $scope.Ime = res.Ime;
                $scope.Izvodac = res.Izvodac;
                $scope.url = res.url;
          
                $scope.IsNewRecord = 0;
            },
                  function (errorPl) {
                      console.log('failure loading Hit', errorPl);
                  });
        },
      
        //Clear the Scopr models
        $scope.clear = function () {
            $scope.IsNewRecord = 1;
            var c = $scope.Id + 1;
           
            $scope.Ime = "";
            $scope.Izvodac = "";
            $scope.url = "";
        },
        ['$scope', '$routeParams',
        function (scope, $routeParams) {
            $routeParams.Id=$scope.Id;
        }
        
        ];

    }
)
  