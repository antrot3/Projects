using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using SM.Store.Api.BLL;
using SM.Store.Api.Common;
using SM.Store.Api.DAL;
using SM.Store.Api.Models;

namespace SM.Store.Api.Controllers
{    
    [RoutePrefix("api/lookup")]
    public class LookupController : ApiController
    {  
        [Route("~/api/lookupcategories")]
        public IList<Models.Category> Get_LookupCategories()
        {
            ILookupBS bs = DIFactoryDesigntime.GetInstance<ILookupBS>();
            IList<Models.Category> rtnList = bs.LookupCategories();
            return rtnList;
        }

        [Route("~/api/lookupproductstatustypes")]
        public IList<Models.ProductStatusType> Get_LookupProductStatusTypes()
        {
            ILookupBS bs = DIFactoryDesigntime.GetInstance<ILookupBS>();
            IList<Models.ProductStatusType> rtnList = bs.LookupProductStatusTypes();
            return rtnList;
        }
    }
}
