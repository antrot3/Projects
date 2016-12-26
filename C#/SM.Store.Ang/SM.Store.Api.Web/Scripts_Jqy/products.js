$(document).ready(function () {
    $("#divProducts").products();
});
(function ($) {
       
    var methods = {
        init: function (args) {
            $(this).products("loadPage", args);
        },

        loadPage: function (args) {
            var container = $(this);
                       
            var btnSearch = container.find("#btnSearch");
            if (btnSearch != null) {                
                btnSearch.click (function(event) {
                    methods.find(container);
                });
            }
            //var Accepted = container.find("#btnAccepted");
            //if (Accepted != null) {
            //    Accepted.live("click", function (event) {                   
            //        methods.loadAccepted(container);
            //    });
            //}

            var btnUpdateProduct = container.find("#btnUpdateProduct");
            if (btnUpdateProduct != null) {
                btnUpdateProduct.click(function (event) {
                    methods.updateProduct(container);
                });
            }            
            
            methods.getProductList();
            //methods.getProductListJson();        
                  
        }, // End loadPage function
  
        getProductList_0: function (container) {
            var input = 'CategoryID=3&PageIndex=0&PageSize=5&SortBy=ProductName&SortDirection=ascending'
            var uri = 'api/products?' + input;
            $.ajax({
                url: uri,
                type: "GET",
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
                    methods.displayProducts(container, data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },

        getProductList: function (container) {
            var input = 'ProductSearchField=CategoryID&ProductSearchText=3&PageIndex=0&PageSize=5&SortBy=ProductName&SortDirection=ascending'
            var uri = 'api/getproductlist?' + input;
            $.ajax({
                url: uri,
                type: "GET",
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
                    methods.displayProducts(container, data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },      

        getProductListJson: function (container) {
            var uri = 'api/getproductlistjson';
            var input = '{"CategoryId":0,"PaginationRequest":{"PageIndex":0,"PageSize":10,"Sort":{"SortBy":"ProductName","SortDirection":1}}}'
            $.ajax({
                url: uri,
                type: "POST",
                data: input,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    methods.displayProducts(container, data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },

        updateProduct: function (container) {
            var uri = 'api/updateproduct';
            var input = '{"ProductId":5,"UnitPrice":12.99,"StatusCode":1}'
            $.ajax({
                url: uri,
                type: "POST",
                data: input,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    alert("OK");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
                          
        displayProducts: function(container, data) {
            $('<span>', { text: "Total Count: " + data.TotalCount + ", Page Size: " + data.Products.length}).appendTo($('#count'));
            $.each(data.Products, function (key, item) {
                $('<li>', { text: methods.formatItem(item) }).appendTo($('#products'));
            });
        },

        formatItem: function (item) {
          return item.ProductName + ': $' + item.UnitPrice;
        },

        find: function (container) {            
            var uri = 'api/products/' + $('#prodId').val();            
            $.getJSON(uri)
                .done(function (data) {
                    $('#product').text(methods.formatItem(data));                    
            })
            .fail(function (jqXHR, textStatus, err) {
                $('#product').text('Error: ' + err);
            });
        }        
    };
        
    $.fn.products = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in products.js plug-in');
        }
    };
})(jQuery);

