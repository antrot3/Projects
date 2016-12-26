using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sonar.Web.API
{
    public class HelperApiController : ApiController
    {
        [HttpPost]
        public List<object> kordinateUSmijeruZapada([FromUri]string longitude, [FromUri]string latitude, [FromUri]string distance)
        {
            double R = 6371000; // meters , earth Radius approx
            double PI = 3.1415926535;
            double RADIANS = PI / 180;
            double DEGREES = 180 / PI;

            double lat2;
            double lon2;

            double lat1 = double.Parse(longitude) * RADIANS;
            double lon1 = double.Parse(latitude) * RADIANS;
            double radbear = 90 * RADIANS; // 0 - sjever, 90 - istok, 180 - jug, 270 - zapad

            var distance2 = double.Parse(distance);

            lat2 = Math.Asin(Math.Sin(lat1) * Math.Cos(distance2 / R) +
                    Math.Cos(lat1) * Math.Sin(distance2 / R) * Math.Cos(radbear));
            lon2 = lon1 + Math.Atan2(Math.Sin(radbear) * Math.Sin(distance2 / R) * Math.Cos(lat1),
                           Math.Cos(distance2 / R) - Math.Sin(lat1) * Math.Sin(lat2));

            List<object> lista = new List<object>();
            lista.Add(new { longitude = lat2 * DEGREES, latitude = lon2 * DEGREES });
            return lista;
        }
    }
}
