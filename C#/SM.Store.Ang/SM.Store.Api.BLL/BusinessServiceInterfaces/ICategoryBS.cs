using System.Collections.Generic;
using SM.Store.Api.Entities;

namespace SM.Store.Api.BLL
{
    public interface ICategoryBS 
    {
        IList<Entities.Category> GetCategoryList();
        //Entities.Category GetCategoryById(int id);        
        //int AddCategory(Entities.Category inputEt);
        //void UpdateCategory(Entities.Category inputEt);
        //void DeleteCategory(int id); 
    }
}
