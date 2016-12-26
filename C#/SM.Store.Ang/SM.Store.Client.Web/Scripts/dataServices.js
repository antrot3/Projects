'use strict';
var webApiBaseUrl = "http://localhost:10611/api/";

angular.module('smApp.AppServices', ['ngResource'])

//Web API call for product status types.
.factory('ProductStatusTypes', function ($resource) {
    return $resource(webApiBaseUrl + 'lookupproductstatustypes', {}, {
        query: { method: 'GET', isArray: true }
    });
})
//Web API call for product list.
.factory('ProductList', function ($resource) {
    return $resource(webApiBaseUrl + 'getproductlist_p', {}, {
        post: {
            method: 'POST', isArray: false,
            headers: { 'Content-Type': 'application/json' }
        }
    });
})
//Web API call for product object.
.factory('ProductObj', function ($resource) {
    return $resource(webApiBaseUrl + 'products/:id', {}, {
        query: { method: 'GET', isArray: false }
    });
})
;

angular.module('smApp.AppServices').service('LocalData', [function () {
    //Local data for product search types.
    this.getProductSearchTypes = function () {
        return [
          { id: "0", name: "Please select..." },
          { id: "CategoryId", name: "Category ID" },
          { id: "CategoryName", name: "Category Name" },
          { id: "ProductId", name: "Product ID" },
          { id: "ProductName", name: "Product Name" }
        ];
    }
    //For comparison test.
    //this.getProductStatusTypes = function () {
    //    return [
    //      { StatusCode: 0, Description: "Please select..." },
    //      { StatusCode: 1, Description: "Available" },
    //      { StatusCode: 2, Description: "Out of Stock" },
    //      { StatusCode: 3, Description: "Back Ordered" },
    //      { StatusCode: 4, Description: "Discontinued" },
    //      { StatusCode: 5, Description: "Undefined" }
    //    ];
    //}
    
    this.getPageSizeList = function () {
        return [
          { value: 5, text: "5" },
          { value: 10, text: "10" },
          { value: 25, text: "25" },
          { value: 50, text: "50" },
          { value: 100, text: "100" },
          { value: -1, text: "ALL" }
        ];
    }
}]);

