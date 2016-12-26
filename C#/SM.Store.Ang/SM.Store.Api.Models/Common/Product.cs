using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SM.Store.Api.Models
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public class Product
    {
        [JsonProperty(PropertyName = "ProductID")]        
        public int ProductID { get; set; }

        [JsonProperty(PropertyName = "ProductName")]
        //[Display(Name = "Product Name")]
        [Required(ErrorMessage = "Product Name is required<br/>")]
        public string ProductName { get; set; }

        [JsonProperty(PropertyName = "CategoryID")]
        //[Display(Name = "Category")]
        [Range(1, 2147483647, ErrorMessage = "Please select a category<br/>")]
        public int CategoryID { get; set; }

        [JsonProperty(PropertyName = "UnitPrice")]
        //[Display(Name = "Unit Price ($)")]        
        [RegularExpression(@"^\d+.\d{0,2}$", ErrorMessage = "Price can't have more than 2 decimal places")]
        [Range(0.01, 1000, ErrorMessage = "Price can't be larger than $1000<br/>")]
        public Nullable<decimal> UnitPrice { get; set; }

        [JsonProperty(PropertyName = "StatusCode")]
        //[Display(Name = "Product Status")]
        public Nullable<int> StatusCode { get; set; }

        [JsonProperty(PropertyName = "AvailableSince")]
        //[Display(Name = "Available Since")]
        public Nullable<DateTime> AvailableSince { get; set; }
    }
}
