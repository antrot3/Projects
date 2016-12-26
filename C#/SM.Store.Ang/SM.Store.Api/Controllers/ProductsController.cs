using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using SM.Store.Api.BLL;
using SM.Store.Api.Common;
using SM.Store.Api.DAL;
using SM.Store.Api.Models;

namespace SM.Store.Api.Controllers
{    
    [RoutePrefix("api/products")]
    public class ProductsController : ApiController
    {
        [Route("~/api/getproductList")]
        public ProductListResponse GetProductList([ModelBinder(typeof(FieldValueModelBinder))] GetProductsBySearchRequest request)
        {
            var resp = new ProductListResponse();
            resp.Products = new Models.Products();

            Models.ProductSearchField searchField = 0;
            string searchText = null;
            Decimal? priceLow = null;
            Decimal? priceHigh = null;
            DateTime? dateFrom = null;
            DateTime? dateTo = null;
            if (request.ProductSearchFilter != null)
            {
                searchField = request.ProductSearchFilter.ProductSearchField;
                searchText = request.ProductSearchFilter.ProductSearchText;
            }
            if (request.PriceSearchFilter != null)
            {
                if (!String.IsNullOrEmpty(request.PriceSearchFilter.SearchPriceLow)) priceLow = Convert.ToDecimal(request.PriceSearchFilter.SearchPriceLow);
                if (!String.IsNullOrEmpty(request.PriceSearchFilter.SearchPriceHigh)) priceHigh = Convert.ToDecimal(request.PriceSearchFilter.SearchPriceHigh);
            }
            if (request.DateSearchFilter != null)
            {
                if (!String.IsNullOrEmpty(request.DateSearchFilter.SearchDateFrom)) dateFrom = Convert.ToDateTime(request.DateSearchFilter.SearchDateFrom);
                if (!String.IsNullOrEmpty(request.DateSearchFilter.SearchDateTo)) dateTo = Convert.ToDateTime(request.DateSearchFilter.SearchDateTo);
            }
            int totalCount = 0;

            IProductBS bs = default(IProductBS);
            //IProductBS prodBs = DIFactoryDesigntime.GetInstance<IProductBS>();
            //try
            //{
            bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            //}
            //catch (Exception ex)
            //{
            //    var msg = ex.Message;
            //}

            //IProductRepository productRepo = new ProductRepository(new StoreDataModelUnitOfWork());
            IEnumerable<ProductCM> rtnList = bs.GetProductList(searchField, searchText,
                       priceLow, priceHigh, dateFrom, dateTo, request.StatusCode, request.PaginationRequest, out totalCount);
            resp.Products.AddRange(rtnList);
            resp.TotalCount = totalCount;
            return resp;
        }

        [Route("~/api/getproductlist_p")]
        public ProductListResponse Post_GetProductList([FromBody] GetProductsBySearchRequest request)
        {
            var resp = new ProductListResponse();
            resp.Products = new Models.Products();

            Models.ProductSearchField searchField = 0;
            string searchText = null;
            Decimal? priceLow = null;
            Decimal? priceHigh = null;
            DateTime? dateFrom = null;
            DateTime? dateTo = null;
            if (request.ProductSearchFilter != null)
            {
                searchField = request.ProductSearchFilter.ProductSearchField;
                searchText = request.ProductSearchFilter.ProductSearchText;
            }
            if (request.PriceSearchFilter != null)
            {
                if (!String.IsNullOrEmpty(request.PriceSearchFilter.SearchPriceLow)) priceLow = Convert.ToDecimal(request.PriceSearchFilter.SearchPriceLow);
                if (!String.IsNullOrEmpty(request.PriceSearchFilter.SearchPriceHigh)) priceHigh = Convert.ToDecimal(request.PriceSearchFilter.SearchPriceHigh);
            }
            if (request.DateSearchFilter != null)
            {
                if (!String.IsNullOrEmpty(request.DateSearchFilter.SearchDateFrom)) dateFrom = Convert.ToDateTime(request.DateSearchFilter.SearchDateFrom);
                if (!String.IsNullOrEmpty(request.DateSearchFilter.SearchDateTo)) dateTo = Convert.ToDateTime(request.DateSearchFilter.SearchDateTo);
            }
            int totalCount = 0;

            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            IList<Models.ProductCM> rtnList = bs.GetProductList(searchField, searchText,
                                    priceLow, priceHigh, dateFrom, dateTo, request.StatusCode, request.PaginationRequest, out totalCount);
            resp.Products.AddRange(rtnList);
            resp.TotalCount = totalCount;
            return resp;
        }

        //Usually not used.
        [Route("~/api/getproducts")]
        public IList<Models.ProductCM> GetAllProducts()
        {
            //IProductBS bs = default(IProductBS);
            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            IList<Models.ProductCM> rtn = default(IList<Models.ProductCM>);
            //try
            //{
                rtn = bs.GetAllProductsByCategoryId(0);
            //}
            //catch (Exception ex)
            //{
            //    var msg = ex.Message;
            //}
            return rtn;
        }

        [Route("~/api/getallproducts")]
        public ProductListResponse GetAllProducts([ModelBinder(typeof(FieldValueModelBinder))] GetProductsBySearchRequest request)
        {
            var resp = new ProductListResponse();
            resp.Products = new Models.Products();
            int totalCount = 0;
            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            IList<Models.ProductCM> rtnList = bs.GetFullProducts(0, request.PaginationRequest, out totalCount);
            resp.Products.AddRange(rtnList);
            resp.TotalCount = totalCount;
            return resp;
        }

        [Route("~/api/getallproductsbycategoryid/{categoryId:int}")]
        public IList<Models.ProductCM> GetAllProductsByCategoryId(int categoryId)
        {
            //IProductBS bs = default(IProductBS);
            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            return bs.GetAllProductsByCategoryId(categoryId);
        }

        [Route("{id:int}", Name = "GetProductById")]
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProductById(int id)
        {
            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            var eProduct = bs.GetProductById(id);
            if (eProduct == null)
            {
                return NotFound();
            }
            else
            {
                IBaseConverter<Entities.Product, Models.Product> convtResult = new AutoMapConverter<Entities.Product, Models.Product>();
                Models.Product mProduct = convtResult.ConvertObject(eProduct);
                return Ok(mProduct);
            }
        }
        
        [Route("~/api/addproduct")]
        public HttpResponseMessage Post_AddProduct([FromBody] Models.Product mProduct)
        {
            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            IBaseConverter<Models.Product, Entities.Product> convtResult = new AutoMapConverter<Models.Product, Entities.Product>();
            Entities.Product eProduct = convtResult.ConvertObject(mProduct);
            bs.AddProduct(eProduct);

            var response = Request.CreateResponse(HttpStatusCode.Created);

            // Generate a link to the new product and set the Location header in the response.
            string uri = Url.Link("GetProductById", new { id = eProduct.ProductID });
            response.Headers.Location = new Uri(uri);
            return response;
        }

        [Route("~/api/updateproduct")]
        public void Post_UpdateProduct_([FromBody] Models.Product mProduct)
        {
            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            IBaseConverter<Models.Product, Entities.Product> convtResult = new AutoMapConverter<Models.Product, Entities.Product>();
            Entities.Product eProduct = convtResult.ConvertObject(mProduct);
            bs.UpdateProduct(eProduct);
        }

        [Route("~/api/deleteproduct")]
        public void DeleteProduct(int id)
        {
            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            bs.DeleteProduct(id);
        }

        [Route("~/api/deleteproducts")]
        public void Post_DeleteProduct(List<int> ids)
        {
            IProductBS bs = DIFactoryDesigntime.GetInstance<IProductBS>();
            if (ids.Count > 0)
            {
                ids.ForEach(delegate(int id)
                {
                    bs.DeleteProduct(id);
                });
            }

        }        
    }
}
