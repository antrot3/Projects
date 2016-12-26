using Sonar.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sonar.Web.Mappers
{
    public class EventMapper
    {
        public static EventVM Map(Model.Event Event)
        {
            return new EventVM()
            {
                Id=Event.Id,
                Name = Event.Name,
                Description = Event.Description,
                StartDate = Event.StartDate,
                EndDate = Event.EndDate,
                Longitude = Event.Longitude,
                Latitude = Event.Latitude,
                Radius=Event.Radius
            };
        }

        public static Model.Event Map(EventVM Event)
        {
            return new Model.Event()
            {
                Id=Event.Id,
                Name = Event.Name,
                Description = Event.Description,
                StartDate = Event.StartDate,
                EndDate = Event.EndDate,
                Longitude = Event.Longitude,
                Latitude = Event.Latitude,
                Radius=Event.Radius
                //PersonType=person.PersonType
            };
        }
    }
}