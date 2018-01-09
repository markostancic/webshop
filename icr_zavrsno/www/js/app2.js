var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('MyCtrl', function($scope, $window, $http, $uibModal) {
    var vm = this;

    vm.searchText = "";
    vm.svi_proizvodi = [];
    vm.proizvodi = [];
    vm.username = '';
    vm.listaKategorija = [];
    vm.kategorijeProizvoda = {};
    vm.admin = [
        {username: "test" , password: "1234", confirmPassword: "1234"},
        {username: "username" , password: "username1", confirmPassword: "username1"},
        {username: "username2" , password: "username2", confirmPassword: "username2"}
    ];
    vm.kategorija = null;
    vm.proizvod = null;

    $scope.alerts = [
    ];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    vm.currentPage = 1;
    vm.itemsPerPage = 12;
    vm.totalItems = 10;
    vm.maxSize = 5;
    vm.autorizovan = false;

    vm.logout = function () {
        vm.autorizovan = false;
        $window.localStorage.removeItem("user");

    }

    vm.login = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: function($uibModalInstance, parent){
                var $ctrl = this;

                $ctrl.stanje = 'Login';

                $ctrl.username;
                $ctrl.password;
                $ctrl.login = function () {
                                    
                    for(var i in parent.admin){
                    console.log(parent.admin[i]);
                    if(parent.admin[i].username === $ctrl.username && 
                        parent.admin[i].password === $ctrl.password){
                            console.log("ulogovan");
                        vm.autorizovan = true;
                        $window.localStorage.setItem("user", $ctrl.username);
                        }
                }
                
                $uibModalInstance.close($ctrl.username);

                }

                $ctrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs: '$ctrl',
            resolve: {
                parent: function () {
                    return vm;
                }
            }
        });

        modalInstance.result.then(function (username) {
            console.log(username);
        }, function () {
            console.log('modal-component dismissed at: ' + new Date());
        });
    };
        vm.editUser = function () {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'editUser.html',
            controller: function ($uibModalInstance, user) {
                var $ctrl = this;
                $ctrl.username = user.username;
                $ctrl.password = user.password;
                $ctrl.confirmPassword = user.confirmPassword;
                $ctrl.save = function () {
                    user.username = $ctrl.username;
                    user.password = $ctrl.password;
                    user.confirmPassword = $ctrl.confirmPassword;
                    if ($ctrl.username == "" || $ctrl.password == "" || $ctrl.confirmPassword == "") {
                        $scope.alerts.push({type: 'warning', msg: 'Morate popuniti sva polja'});
                    } else if ($ctrl.password == $ctrl.confirmPassword) {
                        $scope.alerts.push({type: 'success', msg: 'Uspesno ste izmenili podatke'});
                        user.admin.push({username: $ctrl.username, password: $ctrl.password, confirmPassword: $ctrl.confirmPassword});
                    } else {
                        $scope.alerts.push({type: 'danger', msg: 'Lozinka i ponovljena lozinka moraju biti iste'});
                    }
                    console.log(user.admin);
                    
                    $uibModalInstance.close($ctrl.username);
                }

                $ctrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs: '$ctrl',
            resolve: {
                user: function () {
                    return vm;
                }
            }
        });

        modalInstance.result.then(function (username) {
            console.log(username);
        }, function () {
            console.log('modal-component dismissed at: ' + new Date());
        });
    }
        vm.oglas = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: function($uibModalInstance, parent){
                var $ctrl = this;

                $ctrl.stanje = 'Oglas';

                $ctrl.kategorija ="";
                $ctrl.naziv ="";
                $ctrl.godiste ="";
                $ctrl.kilometraza = "";
                $ctrl.karoserija = "";
                $ctrl.gorivo = "";
                $ctrl.kubikaza = "";
                $ctrl.snaga = "";
                $ctrl.kolicina = "";
                $ctrl.cena = "";
                $ctrl.brzina = "";
				$ctrl.kategorije  = parent.listaKategorija;//['Beograd', 'Novi Sad', 'Nis']
                $ctrl.karoserija = parent.listaTip;
                $ctrl.gorivo = parent.listaGorivo;
                $ctrl.brzina = parent.listaBrzina;

                $ctrl.oglas = function () {

                    if ($ctrl.kategorija == "" || $ctrl.naziv == "" || $ctrl.godiste == "" || $ctrl.kilometraza == "" || $ctrl.karoserija == "" || $ctrl.gorivo == "" || $ctrl.kubikaza == "" || $ctrl.snaga == "" || $ctrl.kolicina == "" || $ctrl.cena == "") {
                        $scope.alerts.push({type: 'warning', msg: 'Morate popuniti sva polja'});
                    } else {
                        console.log($ctrl.kategorija+ " "+ $ctrl.naziv);
                        $scope.alerts.push({type: 'success', msg: 'Uspesno ste dodali oglas'});
						parent.svi_proizvodi.push({"kategorija": $ctrl.kategorija, "naziv": $ctrl.naziv, "datum": $ctrl.godiste, "kilometraza": $ctrl.kilometraza, "karoserija": $ctrl.karoserija, "gorivo": $ctrl.gorivo, "kubikaza": $ctrl.kubikaza, "snaga": $ctrl.snaga, "brzina": $ctrl.brzina, "kolicina": $ctrl.kolicina, "cena": $ctrl.cena});
						parent.proizvodi.push({"kategorija": $ctrl.kategorija, "naziv": $ctrl.naziv, "datum": $ctrl.godiste, "kilometraza": $ctrl.kilometraza, "karoserija": $ctrl.karoserija, "gorivo": $ctrl.gorivo, "kubikaza": $ctrl.kubikaza, "snaga": $ctrl.snaga, "brzina": $ctrl.brzina, "kolicina": $ctrl.kolicina, "cena": $ctrl.cena});
                    } 
                    //console.log(vm.proizvod.kategorija);

                $uibModalInstance.close($ctrl.kategorija);
                }

                $ctrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs: '$ctrl',
            resolve: {
                parent: function () {
                    return vm;
                }
            }
        });

        modalInstance.result.then(function (kategorija) {
            console.log(kategorija);
        }, function () {
            console.log('modal-component dismissed at: ' + new Date());
        });
    };
    vm.removeProduct = function (el) {
        if(vm.autorizovan){
            if(confirm("Da li ste sigurni?")){
                var index = vm.proizvodi.indexOf(el);
                vm.proizvodi.splice(index, 1);
                vm.totalItems = vm.proizvodi.length;
            }
        }else{
            vm.login();
        }

    }
        vm.editProduct = function (el) {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'editMovie.html',
            controller: function ($uibModalInstance, movie) {
                var $ctrl = this;

                $ctrl.kategorija = movie.kategorija;
                $ctrl.naziv = movie.naziv;
                $ctrl.godiste = movie.datum;
                $ctrl.kilometraza = movie.kilometraza;
                $ctrl.karoserija = movie.karoserija;
                $ctrl.gorivo = movie.gorivo;
                $ctrl.kubikaza = movie.kubikaza;
                $ctrl.snaga = movie.snaga;
                $ctrl.menjac = movie.brzina;
                $ctrl.kolicina = movie.kolicina;
                $ctrl.cena = movie.cena;
                $ctrl.save = function () {
                    movie.kategorija = $ctrl.kategorija;
                    movie.naziv = $ctrl.naziv;
                    movie.datum = $ctrl.godiste;
                    movie.kilometraza = $ctrl.kilometraza;
                    movie.karoserija = $ctrl.karoserija;
                    movie.gorivo = $ctrl.gorivo;
                    movie.kubikaza = $ctrl.kubikaza;
                    movie.snaga = $ctrl.snaga;
                    movie.brzina = $ctrl.menjac;
                    movie.kolicina = $ctrl.kolicina;
                    movie.cena = $ctrl.cena;
                    $uibModalInstance.close($ctrl.kategorija);
                }

                $ctrl.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs: '$ctrl',
            resolve: {
                movie: function () {
                    return el;
                }
            }
        });

        modalInstance.result.then(function (kategorija) {
            el.kategorija = kategorija;
        }, function () {
            console.log('modal-component dismissed at: ' + new Date());
        });
    }
    vm.home = function(){
        vm.kategorija = null;
        vm.proizvod = null;
        vm.proizvodi = vm.svi_proizvodi;
        vm.totalItems = vm.proizvodi.length;
    }
    vm.selektujProizvod = function(el){
        vm.kategorija = el.kategorija;
        vm.proizvod = el;
    }

    vm.init = function(){
        vm.username = $window.localStorage.getItem("user");
        if(vm.username != null){
            vm.autorizovan = true;

        }
        var req = {
            method: "GET",
            url: "../automobili.json"
        }
        $http(req).then(
            function(resp){
                console.log(resp);
                var lista = [];
                vm.svi_proizvodi = resp.data;
                vm.kategorijeProizvoda = {};
                vm.listaKategorija = [];
                vm.listaRegion = [];
                vm.listaTip = [];
                vm.listaGorivo = [];
                vm.listaBrzina = [];
                for(var i in vm.svi_proizvodi){
                    var proizvod = vm.svi_proizvodi[i];
                    if(!(proizvod.kategorija in vm.kategorijeProizvoda)){
                        vm.listaKategorija.push(proizvod.kategorija);
                        vm.kategorijeProizvoda[proizvod.kategorija] = [proizvod];
                    }else if(!(proizvod.region in vm.kategorijeProizvoda)){
                        vm.listaRegion.push(proizvod.region);
                        vm.kategorijeProizvoda[proizvod.region] = [proizvod]; 
                    }else if(!(proizvod.karoserija in vm.kategorijeProizvoda)){
                        vm.listaTip.push(proizvod.karoserija);
                        vm.kategorijeProizvoda[proizvod.karoserija] = [proizvod]; 
                    }else if(!(proizvod.gorivo in vm.kategorijeProizvoda)){
                        vm.listaGorivo.push(proizvod.gorivo);
                        vm.kategorijeProizvoda[proizvod.gorivo] = [proizvod]; 
                    }else if(!(proizvod.brzina in vm.kategorijeProizvoda)){
                        vm.listaBrzina.push(proizvod.brzina);
                        vm.kategorijeProizvoda[proizvod.brzina] = [proizvod]; 
                    }else{
                        vm.kategorijeProizvoda[proizvod.kategorija].push(proizvod);
                    }
                    if(proizvod.naziv.toLowerCase().indexOf(vm.searchText.toLowerCase())!=-1){
                        lista.push(proizvod);
                    }
                }
                vm.totalItems = lista.length;
                vm.proizvodi = lista;
            }, function(resp){
                vm.message = 'error';
            });
    };

    vm.init();


});