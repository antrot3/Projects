using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
//using System.Data.Entity.Core.Objects;
//using System.Data.Entity.Infrastructure;
using SM.Store.Api.Entities;

namespace SM.Store.Api.DAL
{
    public class StoreDataContext : DbContext
    {
        //public StoreDataContext()
        //    : base("name=StoreDataContext")
        public StoreDataContext(string connectionString)
            : base(connectionString)
        {
            //this.Configuration.LazyLoadingEnabled = false;
            //if (HttpContext.Current != null)
            //{
            //    Database.SetInitializer<StoreDataContext>(new StoreDataContextInitializer());
            //}
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductStatusType> ProductStatusTypes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}