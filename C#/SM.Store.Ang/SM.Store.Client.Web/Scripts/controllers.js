'use strict';
angular.module('smApp.controllers', ['ui.bootstrap', function () {
}])
.controller('productListController', ['$scope', 'LocalData', 'ProductStatusTypes', 'ProductList', function ($scope, LocalData, ProductStatusTypes, ProductList) {
    $scope.model = {};
    $scope.search = {};
    $scope.model.productSearchTypes = LocalData.getProductSearchTypes();
    //Local StatusType data for test.
    //$scope.model.productStatusTypes = LocalData.getProductStatusTypes();    
    $scope.model.productStatusTypes = ProductStatusTypes.query({}, function (data) {
        //var addItem = { StatusCode: 0, Description: "Please select..." }; //Not for ajax call.
        //data.unshift(addItem);
    });
    $scope.model.pageSizeList = LocalData.getPageSizeList();

    //Default paging and sorting paramters.
    var pCurrentPage = 0; //PageIndex
    var pPageItems = 5;   //PageSize  
    var pOrderBy = "";    //SortBy
    var pOrderByReverse = false;  //SortDirection = 0
    var resetSearchFlag = false;

    //Set search items for starting and reset.
    var initiateSearchItems = function () {
        $scope.model.pSearchType = { selected: "0" };
        $scope.model.pStatusType = { selected: 0 };
        $scope.model.pPageSizeObj = { selected: 5 };

        //Search parameter.
        $scope.search.pSearchText = "";
        $scope.search.pPriceLow = "";
        $scope.search.pPriceHigh = "";
        $scope.search.pAvailableFrom = "";
        $scope.search.pAvailableTo = "";

        $scope.errorMessage = undefined;
        $scope.showProductList = false;
    }
    initiateSearchItems();

    //Called from on-data-required directive.
    $scope.onServerSideItemsRequested = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
        loadProductList(currentPage, pageItems, orderBy, orderByReverse);
        //$timeout(loadProductList(currentPage, pageItems, orderBy, orderByReverse), 3000);        
    }

    //Ajax call for list data.
    var loadProductList = function (currentPage, pageItems, orderBy, orderByReverse) {
        //Bypass on initial page loading.
        if (currentPage != undefined) {
            pCurrentPage = currentPage;
            pPageItems = pageItems;
            if (orderBy == null) orderBy = "";
            pOrderBy = orderBy;
            pOrderByReverse = orderByReverse;

            $scope.errorMessage = undefined;
            $scope.isAjaxInProgress = true;

            //Ajax call and populate grid.           
            var filterJson = getFilterJson();
            if (filterJson.error != undefined && filterJson.error != "") {
                $scope.errorMessage = filterJson.error;
            }
            else {
                //Always call this (removing else check) if non-obstructive.
                ProductList.post(filterJson.json, function (data) {
                    $scope.model.productList = data.Products;
                    $scope.model.totalProductCount = data.TotalCount;
                }, function (error) {
                    alert("Error getting product list data.");
                });
                $scope.showProductList = true;
            }
        }
    }

    //Called from search button.
    $scope.clickGo = function () {
        if ($scope.setCurrentPage != 0) {
            //Directive current-page value change will auto call onServerSideItemsRequested().
            $scope.setCurrentPage = 0;
        }
        else {
            loadProductList(pCurrentPage, pPageItems, pOrderBy, pOrderByReverse);
        }
    }

    //Clear/reset search fields and hide grid.
    $scope.clickClear = function () {
        resetSearchFlag = true;
        initiateSearchItems();
        toggleDdlClass("ddlSearchType", "reset");
        toggleDdlClass("ddlProductStatusType", "reset");
    }

    //When page size is changed from ddl.
    $scope.changePageSize = function () {
        //If page size changed from ddl, set back to first page.
        //This will auto call onServerSideItemsRequested() function.
        //Reseting search items needs to bypass it.
        if (!resetSearchFlag) {
            $scope.setCurrentPage = 0;
        }
        else {
            resetSearchFlag = false;
        }
    }

    //Validate inputs and build JSON string.
    var getFilterJson = function () {
        var isValid = false;
        var filterJson = { json: "{", error: "" };
        if ($scope.model.pSearchType.selected != "0" && $scope.search.pSearchText != "") {
            filterJson.json += "\"ProductSearchFilter\": {" +
               "\"ProductSearchField\": \"" + $scope.model.pSearchType.selected + "\"" +
               ",\"ProductSearchText\": \"" + $scope.search.pSearchText + "\"" +
               "}, "
        }
        if ($scope.search.pAvailableFrom != "" || $scope.search.pAvailableTo != "") {
            //Convert to short date string and also validate some values such as "02/30/2014" as invalid. 
            var dateFrom = getFormattedDate($scope.search.pAvailableFrom);
            //var test = isDate($scope.search.pAvailableFrom); //Don't need this.
            if (dateFrom == "error") {
                filterJson.error += "Invalid Available From date.\n";
                //dateFrom = ""; //Enable this if non-obstructive.
            }
            var dateTo = getFormattedDate($scope.search.pAvailableTo);
            if (dateTo == "error") {
                filterJson.error += "Invalid Available To date.\n";
                //dateTo = ""; //Enable this if non-obstructive.
            }
            //From should not be later than To.
            if ($scope.search.pAvailableFrom != "" && $scope.search.pAvailableTo != "") {
                if ($scope.search.pAvailableFrom > $scope.search.pAvailableTo) {
                    filterJson.error += "Available To date should be greater or equal to Available From date.\n";
                }
            }
            filterJson.json += "\"DateSearchFilter\": {" +
                               "\"SearchDateFrom\": \"" + dateFrom + "\"" +
                               ",\"SearchDateTo\": \"" + dateTo + "\"" +
                               "}, "
        }
        if ($scope.search.pPriceLow != "" || $scope.search.pPriceHigh != "") {
            var priceLow = $scope.search.pPriceLow;
            if (priceLow != "" && !isNumeric(priceLow)) {
                filterJson.error += "Invalid Price Low value.\n";
                //priceLow = ""; //Enable this if non-obstructive.
            }
            var priceHigh = $scope.search.pPriceHigh;
            if (priceHigh != "" && !isNumeric(priceHigh)) {
                filterJson.error += "Invalid Price High value.\n";
                //priceHigh = ""; //Enable this if non-obstructive.
            }
            //High should not be smaller than Low.
            if (priceLow != "" && priceHigh != "") {
                if (parseFloat(priceLow) > parseFloat(priceHigh)) {
                    filterJson.error += "Price High should be greater or equal to Price Low.\n";
                }
            }
            filterJson.json += "\"PriceSearchFilter\": {" +
                               "\"SearchPriceLow\": \"" + priceLow + "\"" +
                               ",\"SearchPriceHigh\": \"" + priceHigh + "\"" +
                               "}, "
        }
        if ($scope.model.pStatusType.selected != "0") {
            filterJson.json += "\"StatusCode\": " + $scope.model.pStatusType.selected + ","
        }
        filterJson.json +=
            "\"PaginationRequest\": {" +
               "\"PageIndex\": " + pCurrentPage +
              ",\"PageSize\": " + pPageItems +
              ",\"Sort\": {" +
                  "\"SortBy\": \"" + pOrderBy + "\"" +
                 ",\"SortDirection\": " + (pOrderByReverse ? 1 : 0) +
              "}" +
           "}" +
        "}";
        return filterJson;
    }

    //Datepicker.
    $scope.openFrom = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedFrom = true;
        $scope.openedTo = false;
    };
    $scope.openTo = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedTo = true;
        $scope.openedFrom = false;
    };
    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1,
        showWeeks: 'false'
    };
    $scope.format = 'MM/dd/yyyy';

    //Toggle dropdown CSS classes for placeholder font colors.
    var toggleDdlClass = function (elemId, flag) {
        var elem = document.getElementById(elemId);
        if (elem.selectedIndex == 0 || flag == "reset")
            angular.element(elem).removeClass("control-color").addClass("placeholder-color");
        else
            angular.element(elem).removeClass("placeholder-color").addClass("control-color");
    };
    $scope.changeDdlClass = function (elemId) {
        toggleDdlClass(elemId);
    }

    //Action of clicking grid row.
    $scope.$watch("mySelectedItems[0]", function (newVal, oldVal) {
        var val;
        if (newVal != oldVal) {
            if (newVal == undefined && oldVal) val = oldVal;
            else val = newVal;
            alert("You selected product ID: " + val.ProductID);
        }
    });
}])

.controller('productListController_nt', ['$scope', '$timeout', 'LocalData', 'ProductStatusTypes', 'ProductList', 'ngTableParams', function ($scope, $timeout, LocalData, ProductStatusTypes, ProductList, ngTableParams) {
    $scope.model = {};
    $scope.model.productList = {};
    $scope.search = {};
    $scope.model.productSearchTypes = LocalData.getProductSearchTypes();
    $scope.model.productStatusTypes = ProductStatusTypes.query({}, function (data) {
        //var addItem = { StatusCode: 0, Description: "Please select..." }; //Not for ajax call.
        //data.unshift(addItem);
    });
    var pageSizeList = LocalData.getPageSizeList();

    //Default selected page size.
    var pageSizeSelectedDef = 5;

    //Paging and sorting paramters for fetching data.
    var pageIndex = 0;
    var pageSize = 0;
    var sortBy = "";
    var sortDirection = 0;

    //For keep state of sorting object.
    var sorting = {};

    //ng-table parameters and settings.
    $scope.tableParams = undefined;

    //Set search flag for bypassing non-search parameter settings.
    var searchFlag = false;
    //Set re-search flag for bypassing extra parameter change triggered call.
    var reSearchFlag = false;

    //Set search items for starting and reset.
    var setDefaultSearchItems = function () {
        $scope.model.pSearchType = { selected: "0" };
        $scope.model.pStatusType = { selected: 0 };

        //Search parameter.
        $scope.search.pSearchText = "";
        $scope.search.pPriceLow = "";
        $scope.search.pPriceHigh = "";
        $scope.search.pAvailableFrom = "";
        $scope.search.pAvailableTo = "";

        $scope.errorMessage = undefined;
        $scope.showProductList = false;
    }
    setDefaultSearchItems();

    //Called from clicking search Go button. The getData inside will be called from any change of params.
    var loadProductList = function () {
        //Set default values.
        pageIndex = 0;
        pageSize = pageSizeSelectedDef;

        //Subsequent clicking search Go button.
        if ($scope.tableParams != undefined) {
            //Leave same pageSize when called after changing search filter items.
            pageSize = $scope.tableParams.count();

            //Set param count differently from the current to trigger getData but bypass it.
            //The actual process still use pageSize value not this changed count.
            reSearchFlag = true;
            $scope.tableParams.count($scope.tableParams.count() + 1);
        }
        
        //Set ng-table parameters initially.
        $scope.tableParams = new ngTableParams({
            page: pageIndex + 1, // Page number
            count: pageSize,     // Count per page
            sorting: {}
        }, {
            defaultSort: 'asc',
            total: 0,                       
            countOptions: pageSizeList,
            countSelected: pageSize,
            //getData will also be called from ng-table.js whenever params changed
            getData: function ($defer, params) {
                if (!reSearchFlag) {
                    if (!searchFlag) {
                        //Retrieve changed params from pager and sorter for AJAX call input            
                        pageIndex = params.page() - 1;

                        //Go to page #1 if change page size. 
                        if (pageSize != params.count()) {
                            pageSize = params.count();
                            params.page(1);
                        }
                        sortBy = Object.getOwnPropertyNames(params.sorting())[0]
                        //Go to page #1 if change sorting on any column.
                        if (sortBy != undefined && sortBy != "") {
                            if (sorting !== params.sorting()) {
                                sorting = params.sorting();
                                sortDirection = sorting[sortBy] == "asc" ? 0 : 1;
                                params.page(1);
                            }
                        }
                        else {
                            sortBy = "";
                            sortDirection = 0;
                        }
                    }
                    else {
                        searchFlag = false;
                    }
                    $scope.errorMessage = undefined;

                    var filterJson = getFilterJson();
                    if (filterJson.error != undefined && filterJson.error != "") {
                        $scope.errorMessage = filterJson.error;
                    }
                    else {
                        //Always call this (removing else check) if non-obstructive.
                        ProductList.post(filterJson.json, function (data) {
                            //$scope.model.productList = data.Products;
                            $timeout(function () {
                                //Update table params.
                                params.total(data.TotalCount);
                                //Set start and end page numbers.
                                if (pageIndex == 0) {
                                    params.settings().startItemNumber = 1;
                                }
                                else {
                                    params.settings().startItemNumber = pageIndex * params.settings().countSelected + 1;
                                }
                                params.settings().endItemNumber = params.settings().startItemNumber + data.Products.length - 1;
                                //Set new data.
                                $defer.resolve(data.Products);
                                //Show grid.
                                $scope.showProductList = true;
                            }, 500);
                        }, function (error) {
                            alert("Error getting product list data.");
                        });
                    }
                }
                else
                {
                    //Reset re-search flag.
                    reSearchFlag = false;                   
                }
            }
        });       
    }

    //Called from search button.
    $scope.clickGo = function () {
        searchFlag = true;
        loadProductList();
    }

    //Clear/reset search fields and hide grid.
    $scope.clickClear = function () {
        setDefaultSearchItems();
        toggleDdlClass("ddlSearchType", "reset");
        toggleDdlClass("ddlProductStatusType", "reset");
    }

    //Validate inputs and build JSON string.
    var getFilterJson = function () {
        var isValid = false;
        var filterJson = { json: "{", error: "" };
        if ($scope.model.pSearchType.selected != "0" && $scope.search.pSearchText != "") {
            filterJson.json += "\"ProductSearchFilter\": {" +
               "\"ProductSearchField\": \"" + $scope.model.pSearchType.selected + "\"" +
               ",\"ProductSearchText\": \"" + $scope.search.pSearchText + "\"" +
               "}, "
        }
        if ($scope.search.pAvailableFrom != "" || $scope.search.pAvailableTo != "") {
            //Convert to short date string and also validate some values such as "02/30/2014" as invalid. 
            var dateFrom = getFormattedDate($scope.search.pAvailableFrom);
            //var test = isDate($scope.search.pAvailableFrom); //Don't need this.
            if (dateFrom == "error") {
                filterJson.error += "Invalid Available From date.\n";
                //dateFrom = ""; //Enable this if non-obstructive.
            }
            var dateTo = getFormattedDate($scope.search.pAvailableTo);
            if (dateTo == "error") {
                filterJson.error += "Invalid Available To date.\n";
                //dateTo = ""; //Enable this if non-obstructive.
            }
            //From should not be later than To.
            if ($scope.search.pAvailableFrom != "" && $scope.search.pAvailableTo != "") {
                if ($scope.search.pAvailableFrom > $scope.search.pAvailableTo) {
                    filterJson.error += "Available To date should be greater or equal to Available From date.\n";
                }
            }
            filterJson.json += "\"DateSearchFilter\": {" +
                               "\"SearchDateFrom\": \"" + dateFrom + "\"" +
                               ",\"SearchDateTo\": \"" + dateTo + "\"" +
                               "}, "
        }
        if ($scope.search.pPriceLow != "" || $scope.search.pPriceHigh != "") {
            var priceLow = $scope.search.pPriceLow;
            if (priceLow != "" && !isNumeric(priceLow)) {
                filterJson.error += "Invalid Price Low value.\n";
                //priceLow = ""; //Enable this if non-obstructive.
            }
            var priceHigh = $scope.search.pPriceHigh;
            if (priceHigh != "" && !isNumeric(priceHigh)) {
                filterJson.error += "Invalid Price High value.\n";
                //priceHigh = ""; //Enable this if non-obstructive.
            }
            //High should not be smaller than Low.
            if (priceLow != "" && priceHigh != "") {
                if (parseFloat(priceLow) > parseFloat(priceHigh)) {
                    filterJson.error += "Price High should be greater or equal to Price Low.\n";
                }
            }
            filterJson.json += "\"PriceSearchFilter\": {" +
                               "\"SearchPriceLow\": \"" + priceLow + "\"" +
                               ",\"SearchPriceHigh\": \"" + priceHigh + "\"" +
                               "}, "
        }
        if ($scope.model.pStatusType.selected != "0") {
            filterJson.json += "\"StatusCode\": " + $scope.model.pStatusType.selected + ","
        }
        filterJson.json +=
            "\"PaginationRequest\": {" +
               "\"PageIndex\": " + pageIndex +
              ",\"PageSize\": " + pageSize +
              ",\"Sort\": {" +
                  "\"SortBy\": \"" + sortBy + "\"" +
                 ",\"SortDirection\": " + sortDirection +
              "}" +
           "}" +
        "}";
        return filterJson;
    }

    //Datepicker.
    $scope.openFrom = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedFrom = true;
        $scope.openedTo = false;
    };
    $scope.openTo = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedTo = true;
        $scope.openedFrom = false;
    };
    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1,
        showWeeks: 'false'
    };
    $scope.format = 'MM/dd/yyyy';

    //Toggle dropdown CSS classes for placeholder font colors.
    var toggleDdlClass = function (elemId, flag) {
        var elem = document.getElementById(elemId);
        if (elem.selectedIndex == 0 || flag == "reset")
            angular.element(elem).removeClass("control-color").addClass("placeholder-color");
        else
            angular.element(elem).removeClass("placeholder-color").addClass("control-color");
    };
    $scope.changeDdlClass = function (elemId) {
        toggleDdlClass(elemId);
    }

    //For communicating with ng-table scope through prototype inheritance.  
    $scope.paging = {};

    //Action of clicking product name link.
    $scope.paging.openProductForm = function (id) {
        alert("You selected product ID: " + id);
    }
}])

.controller('aboutController', ['$scope', function ($scope) {
    $scope.message = 'This is an example.';
}])
;
//Global function.
function getFormattedDate(date) {
    if (date == "") return "";
    try {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }
    catch (err) {
        return "error";
    }
}
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

