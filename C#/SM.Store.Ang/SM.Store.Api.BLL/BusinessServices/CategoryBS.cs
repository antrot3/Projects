using System.Collections.Generic;
using System;
using SM.Store.Api.Entities;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using SM.Store.Api.DAL;

namespace SM.Store.Api.BLL
{
    public class CategoryBS : ICategoryBS
    {
        //Instantiate directly from the IGenericRepository for basic Category operation 
        private IGenericRepository<Entities.Category> _categoryRepository; 
        
        public CategoryBS(IGenericRepository<Entities.Category> cateoryRepository)
        {
            this._categoryRepository = cateoryRepository;            
        }

        public IList<Entities.Category> GetCategoryList()
        {
            return this._categoryRepository.GetAll();
        }                
    }
}
