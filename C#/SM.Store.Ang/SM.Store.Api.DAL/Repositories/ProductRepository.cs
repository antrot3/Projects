using System;
using SM.Store.Api.Entities;
using System.Linq;
using System.Collections.Generic;
using SM.Store.Api.DAL;
using System.Data.Entity;
using SM.Store.Api.Common;
using SM.Store.Api.Models;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Core.Objects;

namespace SM.Store.Api.DAL
{
    public class ProductRepository : GenericRepository<Entities.Product>, IProductRepository
    {
        public ProductRepository(IStoreDataUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }

        public IList<Entities.Product> GetProducts()
        {
            return this.GetAll();
        }

        public Entities.Product GetProductById(int id)
        {
            return this.GetById(id);
        }

        public IList<Models.ProductCM> GetProductList(ProductSearchField productSearchField, string productSearchText,
                            Decimal? priceLow, Decimal? priceHigh, DateTime? dateFrom, DateTime? dateTo, int? statusCode,
                            PaginationRequest paging, out int totalCount)
        {
            //Query to join parent and child entities and return custom model
            //IQueryable<Models.ProductCM> query = this.UnitOfWork.Context.Products
            //      .Join(this.UnitOfWork.Context.Categories, p => p.CategoryID, c => c.CategoryID,
            //            (p, c) => new { p, c })
            //      .Join(this.UnitOfWork.Context.ProductStatusTypes, p2 => p2.p.StatusCode, ps => ps.StatusCode,
            //            (p2, ps) => new Models.ProductCM
            //            {
            //                ProductID = p2.p.ProductID,
            //                ProductName = p2.p.ProductName,
            //                CategoryID = p2.p.CategoryID,
            //                CategoryName = p2.c.CategoryName,
            //                UnitPrice = p2.p.UnitPrice,
            //                StatusCode = p2.p.StatusCode,
            //                StatusDescription = ps.Description,
            //                AvailableSince = p2.p.AvailableSince
            //            });

            //Test
            //var rtnList = this.UnitOfWork.Context.Database.SqlQuery<Entities.Category>("GetAllCategorisAndProducts").ToList();

            //var blogs = ((IObjectContextAdapter)this.UnitOfWork.Context)
            //.ObjectContext
            //.Translate<Entities.Category>((reader, "Blogs", MergeOption.AppendOnly);    


            IQueryable<Models.ProductCM> query = this.UnitOfWork.Context.Products
                       .GroupJoin(this.UnitOfWork.Context.Categories,
                        p => p.CategoryID, c => c.CategoryID,
                        (p, c) => new { p, c })
                       .GroupJoin(this.UnitOfWork.Context.ProductStatusTypes,
                        p1 => p1.p.StatusCode, s => s.StatusCode,
                       (p1, s) => new { p1, s })
                       .SelectMany(p2 => p2.s.DefaultIfEmpty(), (p2, s2) => new { p2 = p2.p1, s2 = s2 })
                       .Select(f => new Models.ProductCM
                       {
                           ProductID = f.p2.p.ProductID,
                           ProductName = f.p2.p.ProductName,
                           CategoryID = f.p2.p.CategoryID,
                           CategoryName = f.p2.p.Category.CategoryName,
                           UnitPrice = f.p2.p.UnitPrice,
                           StatusCode = f.p2.p.StatusCode,
                           StatusDescription = f.s2.Description,
                           AvailableSince = f.p2.p.AvailableSince
                       });

            //var query =
            //    from pr in this.UnitOfWork.Context.Products
            //    join ca in this.UnitOfWork.Context.Categories
            //        on pr.CategoryID equals ca.CategoryID
            //    join ps in this.UnitOfWork.Context.ProductStatusTypes
            //        on pr.StatusCode equals ps.StatusCode into tempJoin
            //    from t2 in tempJoin.DefaultIfEmpty()
            //    select new Models.ProductCM
            //    {
            //        ProductID = pr.ProductID,
            //        ProductName = pr.ProductName,
            //        CategoryID = pr.CategoryID,
            //        CategoryName = ca.CategoryName,
            //        UnitPrice = pr.UnitPrice,
            //        StatusCode = pr.StatusCode,
            //        StatusDescription = t2.Description,
            //        AvailableSince = pr.AvailableSince
            //    };

            //More readable code:
            //var query =
            //    from pr in this.UnitOfWork.Context.Products
            //    from ca in this.UnitOfWork.Context.Categories
            //       .Where(ca => ca.CategoryID == pr.CategoryID)
            //    from ps in this.UnitOfWork.Context.ProductStatusTypes
            //       .Where(ps => ps.StatusCode == pr.StatusCode).DefaultIfEmpty()
            //    select new Models.ProductCM
            //            {
            //                ProductID = pr.ProductID,
            //                ProductName = pr.ProductName,
            //                CategoryID = pr.CategoryID,
            //                CategoryName = ca.CategoryName,
            //                UnitPrice = pr.UnitPrice,
            //                StatusCode = pr.StatusCode,
            //                StatusDescription = ps.Description,
            //                AvailableSince = pr.AvailableSince
            //            };

            var predicate = PredicateBuilder.True<Models.ProductCM>();

            if (!string.IsNullOrEmpty(productSearchText))
            {
                if (productSearchField == ProductSearchField.CategoryId && Util.IsNumeric(productSearchText))
                {
                    int categoryId = Convert.ToInt32(productSearchText);
                    predicate = predicate.And(p => p.CategoryID == categoryId);
                }
                if (productSearchField == ProductSearchField.CategoryName)
                {
                    predicate = predicate.And(p => p.CategoryName.ToLower().Contains(productSearchText.ToLower()));
                }
                if (productSearchField == ProductSearchField.ProductId && Util.IsNumeric(productSearchText))
                {
                    int productId = Convert.ToInt32(productSearchText);
                    predicate = predicate.And(p => p.ProductID == productId);
                }
                if (productSearchField == ProductSearchField.ProductName)
                {
                    predicate = predicate.And(p => p.ProductName.ToLower().Contains(productSearchText.ToLower()));
                }
            }
            if (priceLow != null)
            {
                predicate = predicate.And(p => p.UnitPrice >= priceLow.Value);
            }
            if (priceHigh != null)
            {
                predicate = predicate.And(p => p.UnitPrice <= priceHigh.Value);
            }
            if (dateFrom != null)
            {
                predicate = predicate.And(p => p.AvailableSince >= dateFrom.Value);
            }
            if (dateTo != null)
            {
                predicate = predicate.And(p => p.AvailableSince <= dateTo.Value);
            }
            if (statusCode != null)
            {
                predicate = predicate.And(p => p.StatusCode == statusCode.Value);
            }
            query = query.Where(predicate);

            //IList<Models.ProductCM> resultList1 = query.ToList();
            IList<Models.ProductCM> resultList =
                GenericSorterPager.GetSortedPagedList<Models.ProductCM>(query, paging, out totalCount);
            return resultList;
        }

        public IList<Models.ProductCM> GetFullProducts(int categoryId, PaginationRequest paging, out int totalCount)
        {
            IQueryable<Models.ProductCM> query = this.UnitOfWork.Context.Products
                       .GroupJoin(this.UnitOfWork.Context.Categories,
                        p => p.CategoryID, c => c.CategoryID,
                        (p, c) => new { p, c })
                       .GroupJoin(this.UnitOfWork.Context.ProductStatusTypes,
                        p1 => p1.p.StatusCode, s => s.StatusCode,
                       (p1, s) => new { p1, s })
                       .SelectMany(p2 => p2.s.DefaultIfEmpty(), (p2, s2) => new { p2 = p2.p1, s2 = s2 })
                       .Select(f => new Models.ProductCM
                       {
                           ProductID = f.p2.p.ProductID,
                           ProductName = f.p2.p.ProductName,
                           CategoryID = f.p2.p.CategoryID,
                           CategoryName = f.p2.p.Category.CategoryName,
                           UnitPrice = f.p2.p.UnitPrice,
                           StatusCode = f.p2.p.StatusCode,
                           StatusDescription = f.s2.Description,
                           AvailableSince = f.p2.p.AvailableSince
                       });

            //Add predicate for dynamic search
            var predicate = PredicateBuilder.True<Models.ProductCM>();
            if (categoryId > 0)
            {
                //predicate = predicate.And(p => p.CategoryID == categoryId);
                predicate = predicate.And(p => p.CategoryID == categoryId);
            }
            query = query.Where(predicate);

            IList<Models.ProductCM> resultList = GenericSorterPager.GetSortedPagedList<Models.ProductCM>(query, paging, out totalCount);
            return resultList;
        }

        public IList<Entities.Product> GetProductByCategoryId(int categoryId, PaginationRequest paging, out int totalCount)
        {
            IQueryable<Entities.Product> query = this.UnitOfWork.Context.Products
                                         .Where(a => a.CategoryID == categoryId)
                                        .Include(a => a.ProductStatusType)
                                        ;
            //totalCount= 0;
            //return query.ToList();      
            IList<Entities.Product> resultList = GenericSorterPager.GetSortedPagedList<Entities.Product>(query, paging, out totalCount, ChildLoad.Include);
            return resultList;
        }

        public IList<Models.ProductCM> GetAllProductsByCategoryId(int categoryId)
        {
            IQueryable<Models.ProductCM> query = this.UnitOfWork.Context.Products
                       .GroupJoin(this.UnitOfWork.Context.Categories,
                        p => p.CategoryID, c => c.CategoryID,
                        (p, c) => new { p, c })
                       .GroupJoin(this.UnitOfWork.Context.ProductStatusTypes,
                        p1 => p1.p.StatusCode, s => s.StatusCode,
                       (p1, s) => new { p1, s })
                       .SelectMany(p2 => p2.s.DefaultIfEmpty(), (p2, s2) => new { p2 = p2.p1, s2 = s2 })
                       .Select(f => new Models.ProductCM
                       {
                           ProductID = f.p2.p.ProductID,
                           ProductName = f.p2.p.ProductName,
                           CategoryID = f.p2.p.CategoryID,
                           CategoryName = f.p2.p.Category.CategoryName,
                           UnitPrice = f.p2.p.UnitPrice,
                           StatusCode = f.p2.p.StatusCode,
                           StatusDescription = f.s2.Description,
                           AvailableSince = f.p2.p.AvailableSince
                       });

            //Add predicate for dynamic search
            var predicate = PredicateBuilder.True<Models.ProductCM>();
            if (categoryId > 0)
            {
                //predicate = predicate.And(p => p.CategoryID == categoryId);
                predicate = predicate.And(p => p.CategoryID == categoryId);
            }
            query = query.Where(predicate);
            return query.ToList();
        }

        public int AddProduct(Entities.Product inputEt)
        {
            inputEt.ProductID = 0;
            inputEt.AuditTime = DateTime.Now;
            this.Insert(inputEt);
            this.CommitAllChanges();
            return inputEt.ProductID;
        }

        public void UpdateProduct(Entities.Product inputEt)
        {
            //Get entity to be updated
            Entities.Product updEt = GetProductById(inputEt.ProductID);

            if (!string.IsNullOrEmpty(inputEt.ProductName)) updEt.ProductName = inputEt.ProductName;
            if (inputEt.CategoryID > 0) updEt.CategoryID = inputEt.CategoryID;
            if (inputEt.UnitPrice != null) updEt.UnitPrice = inputEt.UnitPrice;
            if (inputEt.StatusCode > 0)
            {
                updEt.StatusCode = inputEt.StatusCode;
            }
            else
            {
                updEt.StatusCode = null;
            }
            updEt.AvailableSince = inputEt.AvailableSince;            
            updEt.AuditTime = DateTime.Now;

            this.Update(updEt);
            this.CommitAllChanges();
        }

        public void DeleteProduct(int id)
        {
            this.Delete(id);
            this.CommitAllChanges();
        }
    }
}
