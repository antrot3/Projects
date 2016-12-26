using System;
using System.Collections.Generic;

namespace SM.Store.Api.Models
{
    public class ProductResponse 
    {
        public Product Product { get; set; }
    }
    public class ProductCMResponse 
    {
        public ProductCM ProductCM { get; set; }
    }
     
    public class ProductListResponse 
    {
        public Products Products { get; set; }
        public int TotalCount { get; set; }
    }

    public class Products : List<ProductCM> { }
}
