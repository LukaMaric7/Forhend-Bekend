using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class PlaceController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [EnableQuery]
        [Route("places")]
        public IQueryable<Place> GetPlace()
        {
            return db.Places;
        }

        [HttpGet]
        [Route("places")]
        [ResponseType(typeof(Country))]
        public IHttpActionResult GetPlace([FromUri] int id)
        {
            Place product = db.Places.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [Authorize]
        [HttpPut]
        [Route("places/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPlace(int id, Place product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(id))
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

        //[Authorize]
        [HttpPost]
        [Route("places")]
        [ResponseType(typeof(Place))]
        public IHttpActionResult PostPlace(Place product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Places.Add(product);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Place", id = product.Id }, product);
        }

        //[Authorize]
        [HttpDelete]
        [Route("places/{id}")]
        [ResponseType(typeof(Place))]
        public IHttpActionResult DeletePlace(int id)
        {
            Place product = db.Places.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Places.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlaceExists(int id)
        {
            return db.Places.Count(e => e.Id == id) > 0;
        }
    }
}
