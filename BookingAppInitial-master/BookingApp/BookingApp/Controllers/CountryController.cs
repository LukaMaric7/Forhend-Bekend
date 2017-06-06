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
    public class CountryController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Route("countries")]
        public IQueryable<Country> GetCountry()
        {
            return db.Countries;
        }

        [HttpGet]
        [Route("countries")]
        [ResponseType(typeof(Country))]
        public IHttpActionResult GetCountry([FromUri] int id)
        {
            Country product = db.Countries.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPut]
        [Route("countries/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCountry(int id, Country product)
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
                if (!ProductExists(id))
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

        [HttpPost]
        [Route("countries")]
        [ResponseType(typeof(Country))]
        public IHttpActionResult PostCountry(Country product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Countries.Add(product);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = product.Id }, product);
        }

        [HttpDelete]
        [Route("countries/{id}")]
        [ResponseType(typeof(Country))]
        public IHttpActionResult DeleteCountry(int id)
        {
            Country product = db.Countries.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Countries.Remove(product);
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

        private bool ProductExists(int id)
        {
            return db.Countries.Count(e => e.Id == id) > 0;
        }
    }
}
