using Sonar.Web.Model;
using System;

namespace Sonar.ViewModels
{
    public class EventVM
    {
        public int Id;
        public float? Longitude;
        public float? Latitude;
        public string Name;
        public string Description;
        public string Person;
        public DateTime? StartDate;
        public DateTime? EndDate;
        public string Town;
        public int TownId;
        public string EventState;
        public int StateId;
        public string ImageUrl;
        public string Contact;
        public string EventType;
        public int EventTypeID;
        public int? Radius;
    }

    public enum EventType
    {
        Neformalno = 1,
        Rekreativno = 2,
        Zabavno = 3,
        Piknik = 4,
        Edukativno = 5,
        Kulturno = 6,
        Ostalo = 7
    }
}