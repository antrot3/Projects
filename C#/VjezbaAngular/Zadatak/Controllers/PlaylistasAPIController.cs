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
    public class PlaylistasAPIController : ApiController
    {
        private HitoviEntities1 db = new HitoviEntities1();
        

        // GET: api/Playlistas
        public IEnumerable<Playlista> GetPlaylistas()
        {
            List<Playlista> list = db.Playlistas.ToList();
            IEnumerable<Playlista> Playlista = list.AsEnumerable();
            return Playlista;
        }

        // GET: api/Playlistas/5
        [ResponseType(typeof(Playlista))]
        public IHttpActionResult GetPlaylista(int id)
        {
            Playlista playlista = db.Playlistas.Find(id);
            if (playlista == null)
            {
                return NotFound();
            }
            
            return Ok(playlista);
        }

        // PUT: api/Playlistas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPlaylista(int id, Playlista playlista)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != playlista.Idplaylista)
            {
                return BadRequest();
            }

            db.Entry(playlista).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaylistaExists(id))
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

        // POST: api/Playlistas
        [ResponseType(typeof(Playlista))]
        public IHttpActionResult PostPlaylista(Playlista playlista)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Playlistas.Add(playlista);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PlaylistaExists(playlista.Idplaylista))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = playlista.Idplaylista }, playlista);
        }
        [HttpGet]
        // DELETE: api/Playlistas/5
        [ResponseType(typeof(Playlista))]
        public IHttpActionResult DeletePlaylista([FromUri] int id)
        {
            Playlista playlista = db.Playlistas.Find(id);
            if (playlista == null)
            {
                return NotFound();
            }

            db.Playlistas.Remove(playlista);
            db.SaveChanges();

            return Ok(playlista);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlaylistaExists(int id)
        {
            return db.Playlistas.Count(e => e.Idplaylista == id) > 0;
        }
        //Daje vezu između Playliste i Tablice Hitova
        //[FromUri] int id
        [HttpGet]
        public ICollection<TablicaHitova> DobitiVezu([FromUri]int id)
        {
            //id = id of playlist from $routeParams

            var allSongsFromThisPlaylist = db.TablicaHitovas
                .Where(x => db.Prijenosicas
                    .Any(y => (y.Idplaylista == id && x.Id == y.Id)))
                        .ToList();

            return allSongsFromThisPlaylist;
        }
       
    }
}