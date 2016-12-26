using System;
using System.Collections.Generic;

namespace SM.Store.Api.Models
{ 
    public class CategoryListResponse
    {
        public Categories Categories { get; set; }
    }
    
    //Object to hold collections for multiple result sets     
    public class CategoriesProductsResponse 
    {
        public CategoriesCM Categories { get; set; }
        public ProductsCM Products { get; set; }        
    }

    public class Categories : List<Category> { }
    
    //Collection for Cetegory complex type
    public class CategoriesCM : List<CategoryCM> { }

    //Collection for Product complex type
    public class ProductsCM : List<ProductCM> { }
}
