app.controller('crudController',function ($scope, crudService, $http,$routeParams, $location, ShareData) {
    
    $scope.Id = $routeParams.id;
    $scope.pageSize = 3;
    $scope.currentPage = 1; 

    var b = $http.get('/api/TablicaHitovasApi/GetTablicaHitova/' + $scope.Id)
         .then(function (result) {
             $scope.$routeParams = $routeParams.id
             $scope.Id = result.data.Id;
             $scope.Ime = result.data.Ime;
             $scope.Prezime = result.data.Prezime;
             $scope.Adresa = result.data.Adresa;
             $scope.PostanskiBr = result.data.PostanskiBr;
             $scope.Grad = result.data.Grad;
             $scope.Drzava = result.data.Drzava;
             $scope.Email = result.data.Email;
             
         })

  
        $scope.IsNewRecord = 1; //The flag for the new record
 
        loadRecords(); 
        loadRecordsb();

        function loadRecords() {

                       
            var promiseGet = crudService.getTablicaHitovas(); //The MEthod Call from service

            promiseGet.then(function (TablicaHitova) { $scope.TablicaHitovas = TablicaHitova.data},
                  function (errorPl) {
                      $log.error('failure loading TablicaHitova', errorPl);
                  });
        

        };
        function loadRecordsb() {
            var promiseGetb = crudService.getPrijenosnicas(); //The MEthod Call from service

            promiseGetb.then(function (Prijenosica) { $scope.Prijenosnicas = Prijenosica.data },
                  function (errorPl) {
                      $log.error('failure loading TablicaHitova', errorPl);
                  });
        };


   

   
    //////
        $scope.edit = function () {
            $scope.albumNameArray = [];
            angular.forEach($scope.Ime, function (ie) {
                if (!!ie.selected) $scope.albumNameArray.push(ie.Ime);
            })
        }

     
        //Create the Muzika information to the server
        $scope.edit = function () {
            var TablicaHitova = {
                Id: $scope.Id,
                Ime: $scope.Ime,
                Prezime: $scope.Prezime,
                Adresa: $scope.Adresa,
                PostanskiBr: $scope.PostanskiBr,
                Grad: $scope.Grad,
                Drzava: $scope.Drzava,
                Email: $scope.Email
            };
            //If the flag is 1 the it si new record
          { //Else Edit the Muzika
                var promisePut = crudService.put($scope.Id,TablicaHitova);
                promisePut.then(function (pl) {
                    $scope.Message = "Updated Successfuly";
                    loadRecords();
                }, function (err) {
                    console.log("Err" + err);
                });
            }
 
         
             
        },
    $scope.save = function () {
        $scope.albumNameArray = [];
        angular.forEach($scope.Ime, function (ie) {
            if (!!ie.selected) $scope.albumNameArray.push(ie.Ime);
        })
    },


    //Create the Muzika information to the server
    $scope.save = function () {
        var TablicaHitova = {

            Id: $scope.Id,
            Ime: $scope.Ime,
            Prezime: $scope.Prezime,
            Adresa: $scope.Adresa,
            PostanskiBR: $scope.PostanskiBR,
            Grad: $scope.Grad,
            Drzava: $scope.Drzava,
            Email: $scope.Email
        };
        //If the flag is 1 the it si new record
            var promisePost = crudService.post(TablicaHitova);
            promisePost.then(function (TablicaHitova) {
                $scope.Id = TablicaHitova.data.Id;
                $scope.Message = "Dodano";
                loadRecords();
            }, function (err) {
                console.log("Erroric" + err);
            });
       



    },
    ////
        $scope.delete = function () {
            $scope.Message = "Deleted Successfuly";
            var promiseDelete = crudService.delete($scope.Id);
            promiseDelete.then(function (pl) {
                var c = $scope.Id + 1;
                $scope.Message = "Deleted Successfuly";
                $scope.Id = 0;
                $scope.Ime = "";
                $scope.Prezime = "";
                $scope.Adresa = "";
                $scope.PostanskiBr = "";
                $scope.Grad = "";
                $scope.Drzava = "";
                $scope.Email = "";
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        },
      $scope.get2 = function (Prijenosica) {
             var promiseGetSingle = crudService.get2(Prijenosica.Id);

             promiseGetSingle.then(function (pl) {
                 var res = pl.data;
                 $scope.PrijenosnicaId = res.PrijenosnicaId;
                 
                 $scope.IsNewRecord = 0;
             },
                   function (errorPl) {
                       console.log('failure loading Hit', errorPl);
                   });
         },
    $scope.delete2 = function () {
        $scope.Message = "Deleted Successfuly";
        var promiseDelete2 = crudService.delete2($scope.PrijenosnicaId);
        promiseDelete2.then(function (pl) {
            var c = $scope.Id + 1;
            $scope.Message = "Deleted Successfuly";
           
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


         $scope.save2 = function () {
             $scope.albumNameArray3 = [];
             angular.forEach($scope.Broj, function (ie) {
                 if (!!ie.selected) $scope.albumNameArray3.push(ie.Broj);

             })
         }
    
     
    //Create the Muzika information to the server
    $scope.save2 = function () {
        var Prijenosica = {
            Id: $scope.Id,
            Broj: $scope.Broj
        };


        var promisePost2 = crudService.post2(Prijenosica);
        promisePost2.then(function (Prijenosica) {
            $scope.PrijenosnicaId = Prijenosica.data.PrijenosnicaId;
            $scope.Message = "Dodano";
            
            loadRecordsb();
        }, function (err) {
            console.log("Erroric" + err);
        });
    },
       
        $scope.savePlaylista = function () {
            $scope.albumNameArray2 = [];
            angular.forEach($scope.Imeplaylista, function (ie) {
                $scope.albumNameArray2.push(ie.Ime);
               
            })
        }
      
        //Clear the Scopr models
        $scope.clear = function () {
            $scope.IsNewRecord = 1;
            var c = $scope.Id + 1;
            $scope.Id = "0";
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
  