using System;
using System.Configuration;
using System.Data.Entity;

namespace SM.Store.Api.DAL
{
    public class StoreDataUnitOfWork : IStoreDataUnitOfWork
    {
        private StoreDataContext context;
        public StoreDataUnitOfWork(string connectionString)
        {
            //Needed if config file is in the separate assembly.
            var type = typeof(System.Data.Entity.SqlServer.SqlProviderServices);            
            
            //Used for design time DI configuration
            if (connectionString == "{connectionString}")
            {
                connectionString = ConfigurationManager.ConnectionStrings["StoreDataContext"].ConnectionString;
            }
            this.context = new StoreDataContext(connectionString);
        }

        public StoreDataContext Context
        {
            get
            {
                return this.context;
            }
            set
            {
                this.context = value;
            }
        }

        public void Commit()
        {            
            this.Context.SaveChanges();         
        }

        public bool LazyLoadingEnabled
        {
            get { return this.Context.Configuration.LazyLoadingEnabled; }
            set { this.Context.Configuration.LazyLoadingEnabled = value; }
        }

        public void Dispose()
        {
            this.Context.Dispose();
        }
    }
}
