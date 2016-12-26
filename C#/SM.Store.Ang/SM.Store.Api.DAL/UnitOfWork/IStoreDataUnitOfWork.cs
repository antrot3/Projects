using System;

namespace SM.Store.Api.DAL
{
    public interface IStoreDataUnitOfWork : IDisposable
    {
        StoreDataContext Context { get; set; }
        void Commit();
        bool LazyLoadingEnabled { get; set; }
    }

}
