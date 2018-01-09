var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('MyCtrl', function($scope, $window, $http, $uibModal) {
    var vm = this;

    vm.searchText = "";
    vm.svi_proizvodi = [];
    vm.proizvodi = [];
    vm.cenaOd;
    vm.cenaDo;
    vm.godisteOd;
    vm.godisteDo;
    vm.marka;
    vm.model;
    vm.region;
    vm.tip;
    vm.gorivo;
    vm.username = 'mladen@singi.ac.rs';
    vm.listaKategorija = [];
    vm.kategorijeProizvoda = {};
    vm.korpa = [];
    vm.users = [
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

                $ctrl.username = parent.username;
                $ctrl.password;
                $ctrl.login = function () {
                                    
                    for(var i in parent.users){
                    console.log(parent.users[i]);
                    if(parent.users[i].username === $ctrl.username && 
                        parent.users[i].password === $ctrl.password){
                            console.log("ulogovan");
                            //$ctrl.user = parent.user = parent.users[i] ;
                        vm.autorizovan = true;
                        $window.localStorage.setItem("user", $ctrl.username);
                        }
                }
                
                $uibModalInstance.close($ctrl.username);

                }
                $ctrl.username ="";
                $ctrl.password = "";
                $ctrl.confirmPassword = "";
                $ctrl.register = function(){

                            
                            var imeZauzeto = false;
                            for (var i in parent.users) {
                                if ($ctrl.username == parent.users[i].username) {
                                    imeZauzeto = true;
                                }
                            }
                            if (imeZauzeto == true) {
                                $scope.alerts.push({type: 'danger', msg: 'Korisnicko ime je zauzeto'});
                                return;
                            }

                            if ($ctrl.username == "" || $ctrl.password == "" || $ctrl.confirmPassword == "") {
                                $scope.alerts.push({type: 'warning', msg: 'Morate popuniti sva polja'});
                            } else if ($ctrl.password == $ctrl.confirmPassword) {
                                $scope.alerts.push({type: 'success', msg: 'Uspesno ste se registrovali'});
                                parent.users.push({username: $ctrl.username, password: $ctrl.password, poruke: [], favoriti: []});
                            } else {
                                $scope.alerts.push({type: 'danger', msg: 'Lozinka i ponovljena lozinka moraju biti iste'});
                            }
                            console.log(parent.users);
             
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
    vm.sortiraj = function(){
        var proizvod = vm.svi_proizvodi
        proizvod.sort(function(a,b){ 
            return b.cena - a.cena;
            
        });
        console.log(proizvod);
        var lista = [];
        for(var i in vm.svi_proizvodi){
                lista.push(proizvod[i]);
        }
        vm.totalItems = lista.length;
        vm.proizvodi = lista;
    }
    vm.sortiraj2 = function(){
        var proizvod = vm.svi_proizvodi
        proizvod.sort(function(a,b){ 
            return a.cena - b.cena; 
        });
        console.log(proizvod);
        var lista = [];
        for(var i in vm.svi_proizvodi){
                lista.push(proizvod[i]);
        }
        vm.totalItems = lista.length;
        vm.proizvodi = lista;
        
    }
    vm.home = function(){
        vm.kategorija = null;
        vm.proizvod = null;
        vm.proizvodi = vm.svi_proizvodi;
        vm.totalItems = vm.proizvodi.length;
    }
    vm.filterKategorije = function(kategorija){
        vm.kategorija = kategorija;
        vm.proizvod = null;
        vm.proizvodi = vm.kategorijeProizvoda[kategorija];
        vm.totalItems = vm.proizvodi.length;
    }

    vm.filterF = function(){
       
            var lista = [];
            for(var i in vm.svi_proizvodi){
                if(vm.svi_proizvodi[i].favorit == true){
                    lista.push(vm.svi_proizvodi[i]);
                }
            }
            vm.totalItems = lista.length;
            vm.proizvodi = lista;
        
    }
        vm.filterAuto = function(){
         vm.proizvodi = [];
         for(var i in  vm.svi_proizvodi){
             if(vm.svi_proizvodi[i].cena >= vm.cenaOd && vm.svi_proizvodi[i].cena <= vm.cenaDo && vm.svi_proizvodi[i].datum >= vm.godisteOd && vm.svi_proizvodi[i].datum <= vm.godisteDo || vm.svi_proizvodi[i].kategorija === vm.marka || vm.svi_proizvodi[i].naziv == vm.model){
                 vm.proizvodi.push(vm.svi_proizvodi[i]);
             }
         }
         console.log(vm.proizvodi);
    };
 vm.filter1 = function(lista){
      var ret = [];
      if(vm.cenaOd == null && vm.cenaDo == null){
           return lista;
      }else{
         for(var i in lista){
                if(lista[i].cena >= vm.cenaOd && lista[i].cena <= vm.cenaDo){
                     ret.push(lista[i]);
                }
         }
     }
     return ret;
    }


    vm.filter2 = function(lista){
      var ret = [];
      if(vm.godisteOd == null && vm.godisteDo == null){
           return lista;
      }else{
         for(var i in lista){
                if(lista[i].datum >= vm.godisteOd && lista[i].datum <= vm.godisteDo){
                     ret.push(lista[i]);
                }
         }
     }
     return ret;
    }
    vm.filter3 = function(lista){
      var ret = [];
      if(vm.marka == null){
           return lista;
      }else{
         for(var i in lista){
                if(lista[i].kategorija == vm.marka){
                     ret.push(lista[i]);
                }
         }
     }
     return ret;
    }
    vm.filter4 = function(lista){
      var ret = [];
      if(vm.model == null){
           return lista;
      }else{
         for(var i in lista){
                if(lista[i].naziv == vm.model){
                     ret.push(lista[i]);
                }
         }
     }
     return ret;
    }
    vm.filter5 = function(lista){
      var ret = [];
      if(vm.region == null){
           return lista;
      }else{
         for(var i in lista){
                if(lista[i].region == vm.region){
                     ret.push(lista[i]);
                }
         }
     }
     return ret;
    }
    vm.filter6 = function(lista){
      var ret = [];
      if(vm.gorivo == null){
           return lista;
      }else{
         for(var i in lista){
                if(lista[i].gorivo == vm.gorivo){
                     ret.push(lista[i]);
                }
         }
     }
     return ret;
    }
    vm.filter7 = function(lista){
      var ret = [];
      if(vm.tip == null){
           return lista;
      }else{
         for(var i in lista){
                if(lista[i].karoserija == vm.tip){
                     ret.push(lista[i]);
                }
         }
     }
     return ret;
    }

    vm.filter = function(){
         var lista1 = vm.filter1(vm.svi_proizvodi);
         var lista2 = vm.filter2(lista1);
         var lista3 = vm.filter3(lista2);
         var lista4 = vm.filter4(lista3);
         var lista5 = vm.filter5(lista4);
         var lista6 = vm.filter6(lista5);
         var lista7 = vm.filter7(lista6);
         vm.proizvodi = lista7;
        console.log(lista1);
        console.log(lista2);
        console.log(lista3);
        console.log(lista4);
        console.log(lista5);
        console.log(lista6);
         console.log(lista7);
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
            url: "automobili.json"
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

    vm.ukupnaCena = 0;
    vm.kupi = function(el){
        if (vm.autorizovan){
            if(vm.kolicina <= el.kolicina){
                    vm.korpa.push({proizvod: el, kolicina: vm.kolicina});
                    vm.ukupnaCena = (vm.kolicina * vm.proizvod.cena) + vm.ukupnaCena;
                    $scope.alerts.push({type: 'success', msg: 'Proizvod prebacen u korpu'});

            }else{
                $scope.alerts.push({ type: 'danger', msg: 'Narucili previse proizvoda' });

            }
        }else {
            vm.login();
        }
    };
        vm.set_favorit = function(el){
        if (!vm.autorizovan) {
            $scope.alerts.push({ type: 'danger', msg: 'Morate da budete ulogovani' } );
            return;
        }
        el.favorit = !el.favorit;
        if(el.favorit == true){
            $scope.alerts.push({ type: 'success', msg: 'Auto prebacen u grupu omiljenih' } )
        }else {
            $scope.alerts.push({ type: 'danger', msg: 'Vise nije omiljen' } )
        }
    };
    vm.init();


});