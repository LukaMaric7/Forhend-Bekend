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

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class AccommodationTypeController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Route("accommodationTypes")]
        public IQueryable<AccommodationType> GetAccommodationType()
        {
            return db.AccommodationTypes;
        }

        [HttpGet]
        [Route("accommodationTypes")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult GetAccommodationType([FromUri] int id)
        {
            AccommodationType accommodationType = db.AccommodationTypes.Find(id);
            if (accommodationType == null)
            {
                return NotFound();
            }

            return Ok(accommodationType);
        }

        [Authorize]
        [HttpPut]
        [Route("accommodationTypes/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccommodationType(int id, AccommodationType accommodationType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accommodationType.Id)
            {
                return BadRequest();
            }

            db.Entry(accommodationType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
                if(AccommodationTypeNameExists(accommodationType.Name))
                {
                    return BadRequest();
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize]
        [HttpPost]
        [Route("accommodationTypes")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult PostAccommodationType(AccommodationType accommodationType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!AccommodationTypeNameExists(accommodationType.Name))
            {
                db.AccommodationTypes.Add(accommodationType);
                db.SaveChanges();
            }
            else
            {
                return BadRequest();
            }

            return CreatedAtRoute("DefaultApi", new {controller = "AccommodationType", id = accommodationType.Id }, accommodationType);
        }

        [Authorize]
        [HttpDelete]
        [Route("accommodationTypes/{id}")]
        [ResponseType(typeof(AccommodationType))]
        public IHttpActionResult DeleteAccommodationType(int id)
        {
            AccommodationType accommodationType = db.AccommodationTypes.Find(id);
            if (accommodationType == null)
            {
                return NotFound();
            }

            db.AccommodationTypes.Remove(accommodationType);
            db.SaveChanges();

            return Ok(accommodationType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationTypeExists(int id)
        {
            return db.AccommodationTypes.Count(e => e.Id == id) > 0;
        }

        private bool AccommodationTypeNameExists(string name)
        {
            return db.AccommodationTypes.Count(e => e.Name == name) > 0;
        }
    }
}
