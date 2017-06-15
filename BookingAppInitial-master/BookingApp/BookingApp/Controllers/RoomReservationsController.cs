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
    public class RoomReservationsController : ApiController
    {
        BAContext db = new BAContext();

        [HttpGet]
        [EnableQuery]
        [Route("reservation")]
        public IQueryable<RoomReservation> GetReservation()
        {
            return db.Reservations;
        }

        [HttpGet]
        [Route("reservation/{idRoom}/{idUser}/{time}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult GetReservation(int idRoom, int idUser, byte[] time)
        {
            RoomReservation reservation = db.Reservations.Find(new { RoomId = idRoom, UserId = idUser, TimeStamp = time });
            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        //[Authorize]
        [HttpPut]
        [Route("reservation/{Id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReservation(int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            RoomReservation r =db.Reservations.Where(o => o.Equals(Id)).FirstOrDefault();
            if( r != null)
            {
                r.Canceled = true;
            }

            db.Entry(r).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(Id))
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
        [Route("reservation")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult PostReservation(RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IQueryable<RoomReservation> query = db.Reservations.Where(o => o.RoomId.Equals(reservation.RoomId) && o.Canceled.Equals(false)
                                              && ((reservation.EndDate   >= o.StartDate && reservation.EndDate   <= o.EndDate ) ||
                                                  (reservation.StartDate >= o.StartDate && reservation.StartDate <= o.EndDate ) ||
                                                  (reservation.StartDate <= o.StartDate && reservation.EndDate   >= o.EndDate )));
            if (query.Count() == 0)
            {
                db.Reservations.Add(reservation);
                db.SaveChanges();
            }
            else
            {
                return BadRequest(ModelState);
            }

            return CreatedAtRoute("DefaultApi", new { controller = "RoomReservation", id = reservation.RoomId }, reservation);
        }

        //[Authorize]
        [HttpDelete]
        [Route("reservation/{id}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult DeleteReservation(int id)
        {
            RoomReservation reservation = db.Reservations.Find(id);
            if (reservation == null)
            {
                return NotFound();
            }
            if (reservation.StartDate > DateTime.Now)
            {
                reservation.Canceled = true;
            }
            else
            {
                return NotFound();
            }

            db.Entry(reservation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(reservation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReservationExists(int id)
        {
            return db.Reservations.Count(e => (e.Id == id)) > 0;
        }
    }
}
