using System.Collections.Generic;
using SM.Store.Api.Entities;

namespace SM.Store.Api.BLL
{
    public interface ILookupBS 
    {
        IList<Models.Category> LookupCategories();
        IList<Models.ProductStatusType> LookupProductStatusTypes();        
    }
}
