using System.Collections.Generic;
using SM.Store.Api.Entities;
using SM.Store.Api.DAL;
using SM.Store.Api.Common;
using SM.Store.Api.Models;
using System;
using System.Threading.Tasks;

namespace SM.Store.Api.BLL
{
    public interface IProductBS
    {
        IList<Entities.Product> GetProducts();
        Entities.Product GetProductById(int id);        
        IList<Models.ProductCM> GetAllProductsByCategoryId(int categoryId);

        IList<Entities.Product> GetProductByCategoryId(int categoryId, PaginationRequest paging, out int totalCount);
        IList<Models.ProductCM> GetFullProducts(int categoryId, PaginationRequest paging, out int totalCount);
        IList<Models.ProductCM> GetProductList(ProductSearchField productSearchField, string productSearchText,
                            Decimal? priceLow, Decimal? priceHigh, DateTime? dateFrom, DateTime? dateTo, int? statusCode,
                            PaginationRequest paging, out int totalCount);

        int AddProduct(Entities.Product inputEt);
        void UpdateProduct(Entities.Product inputEt);
        void DeleteProduct(int id);
    }

}