﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;

namespace SM.Store.Api.Entities
{
    public class ProductStatusType
    {
        [Key]
        public int StatusCode { get; set; }
        public string Description { get; set; }
        public System.DateTime? AuditTime { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
