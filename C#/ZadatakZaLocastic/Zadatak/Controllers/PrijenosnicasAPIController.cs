using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Zadatak.Models;

namespace Zadatak.Controllers
{
    public class PrijenosnicasAPIController : ApiController
    {
        private HitoviEntities1 db = new HitoviEntities1();

        // GET: api/Prijenosicas
        public IEnumerable<Prijenosica> GetPrijenosicas()
        {
            List<Prijenosica> list = db.Prijenosicas.ToList();
            IEnumerable<Prijenosica> Prijenosnica = list.AsEnumerable();
            return Prijenosnica;
        }
       

        // GET: api/Prijenosicas/5
        [ResponseType(typeof(Prijenosica))]
        public IHttpActionResult GetPrijenosica(int id)
        {
            Prijenosica prijenosica = db.Prijenosicas.Find(id);
            if (prijenosica == null)
            {
                return NotFound();
            }

            return Ok(prijenosica);
        }

        // PUT: api/Prijenosicas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPrijenosica(int id, Prijenosica prijenosica)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prijenosica.PrijenosnicaId)
            {
                return BadRequest();
            }

            db.Entry(prijenosica).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrijenosicaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Prijenosicas
        [ResponseType(typeof(Prijenosica))]
        public IHttpActionResult PostPrijenosica(Prijenosica prijenosica)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Prijenosicas.Add(prijenosica);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PrijenosicaExists(prijenosica.PrijenosnicaId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = prijenosica.PrijenosnicaId }, prijenosica);
        }

        // DELETE: api/Prijenosicas/5
        [ResponseType(typeof(Prijenosica))]
        public IHttpActionResult DeletePrijenosica(int id)
        {
            Prijenosica prijenosica = db.Prijenosicas.Find(id);
            if (prijenosica == null)
            {
                return NotFound();
            }

            db.Prijenosicas.Remove(prijenosica);
            db.SaveChanges();

            return Ok(prijenosica);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        //public ICollection<TablicaHitova> Jo([FromUri]int id)
        //{
        //    //id = id of playlist from $routeParams

        //    var allSongsFromThisPlaylist = db.TablicaHitovas
        //        .Where(x => db.Prijenosicas
        //            .Any(y => (y.Idplaylista == id && x.Id == y.Id)))
        //                .ToList();

        //    return allSongsFromThisPlaylist;
        //}
        private bool PrijenosicaExists(int id)
        {
            return db.Prijenosicas.Count(e => e.PrijenosnicaId == id) > 0;
        }
      
    }
}