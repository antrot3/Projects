//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Zadatak.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TablicaHitova
    {
        public TablicaHitova()
        {
            this.Prijenosicas = new HashSet<Prijenosica>();
        }
    
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Izvodac { get; set; }
        public string url { get; set; }
    
        public virtual ICollection<Prijenosica> Prijenosicas { get; set; }
    }
}
