using System.Web.Optimization;

namespace Sonar.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/appScripts").IncludeDirectory(
                "~/AngularApp", "*.js", true));

            bundles.Add(new ScriptBundle("~/vendorScripts").IncludeDirectory(
                    "~/Vendor/Scripts", "*.js", true));

            bundles.Add(new StyleBundle("~/vendorStyles").IncludeDirectory(
                "~/Vendor/Styles", "*.css", true));
        }
    }
}
