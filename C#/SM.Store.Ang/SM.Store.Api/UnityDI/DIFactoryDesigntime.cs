using System;
using System.Reflection;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;

namespace SM.Store.Api
{
    public static class DIFactoryDesigntime
    {
        private static volatile UnityContainer container;
        private static object syncRoot = new Object();

        public static InstanceT GetInstance<InstanceT>()
        {
            if (container == null)
            {
                lock (syncRoot)
                {
                    if (container == null)
                    {
                        container = new UnityContainer();
                        container.LoadConfiguration();
                    }
                }
            }

            InstanceT instance;
            try
            {
                instance = container.Resolve<InstanceT>();
                //Type instanceType = instance.GetType();                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return instance;
        }

        public static void CleanUp()
        {
            if (container != null)
                container.Dispose();
        }
    }
}
