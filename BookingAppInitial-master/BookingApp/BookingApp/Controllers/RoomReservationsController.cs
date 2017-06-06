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
    public class RoomReservationsController : ApiController
    {
        BAContext db = new BAContext();

        [HttpGet]
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

        [HttpPut]
        [Route("reservation//{idRoom}/{idUser}/{time}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReservation(int idRoom, int idUser, byte[] time, RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (idRoom != reservation.RoomId)
            {
                return BadRequest();
            }

            if (idUser != reservation.UserId)
            {
                return BadRequest();
            }

            if (time != reservation.TimeStamp)
            {
                return BadRequest();
            }

            db.Entry(reservation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(idRoom, idUser, time))
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
        [Route("reservation")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult PostReservation(RoomReservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Reservations.Add(reservation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "RoomReservation", id = reservation.RoomId }, reservation);
        }

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

            db.Reservations.Remove(reservation);
            db.SaveChanges();

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

        private bool ReservationExists(int idRoom, int idUser, byte[] time)
        {
            return db.Reservations.Count(e => (e.RoomId == idRoom && e.UserId == idUser && e.TimeStamp == time )) > 0;
        }
    }
}
