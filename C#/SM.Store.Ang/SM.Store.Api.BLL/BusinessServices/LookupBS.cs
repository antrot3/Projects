using System.Collections.Generic;
using System;
using SM.Store.Api.Entities;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using SM.Store.Api.DAL;

namespace SM.Store.Api.BLL
{
    public class LookupBS : ILookupBS
    {
        //Instantiate directly from the IGenericRepository 
        private IGenericRepository<Entities.Category> _categoryRepository;
        private IGenericRepository<Entities.ProductStatusType> _productStatusTypeRepository; 
        
        public LookupBS(IGenericRepository<Entities.Category> cateoryRepository,
                        IGenericRepository<Entities.ProductStatusType> productStatusTypeRepository)
        {
            this._categoryRepository = cateoryRepository;
            this._productStatusTypeRepository = productStatusTypeRepository;
        }

        public IList<Models.Category> LookupCategories()
        {
            var query = this._categoryRepository.GetIQueryable();
            var list = query.Select(a => new Models.Category
            {
                CategoryID = a.CategoryID,
                CategoryName = a.CategoryName
            });

            return list.ToList();                 
        } 
        
        public IList<Models.ProductStatusType> LookupProductStatusTypes()
        {
            var query = this._productStatusTypeRepository.GetIQueryable();
            var list = query.Select(a => new Models.ProductStatusType
            {
                StatusCode = a.StatusCode,
                Description = a.Description
            });

            return list.ToList();
        }
    }
}
