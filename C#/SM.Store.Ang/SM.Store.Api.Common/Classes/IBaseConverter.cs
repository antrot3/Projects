using System.Collections.Generic;

namespace SM.Store.Api.Common
{
    public interface IBaseConverter<TSourceObj, TDestinationObj>
        where TSourceObj : class
        where TDestinationObj : class
    {
        TDestinationObj ConvertObject(TSourceObj srcObj);
        List<TDestinationObj> ConvertObjectCollection(IEnumerable<TSourceObj> srcObj);
    }
}
