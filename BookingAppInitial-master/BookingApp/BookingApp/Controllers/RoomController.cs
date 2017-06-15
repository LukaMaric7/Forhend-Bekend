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
    public class RoomController : ApiController
    {
        BAContext db = new BAContext();

        [HttpGet]
        [Route("room")]
        public IQueryable<Room> GetRooms()
        {
            return db.Rooms;
        }

        [HttpGet]
        [Route("room/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult GetRoom(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        [Authorize(Roles = "Manager")]
        [HttpPut]
        [Route("room")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoom(Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user != null)
            {
                try
                {
                    Accommodation acc = db.Accommodations.Where(a => a.Id == room.AccommodationId).FirstOrDefault();
                    if (acc != null && acc.UserId == user.appUserId)
                    {
                        db.Entry(room).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                    else
                    {
                        return BadRequest("You can not modify room that is not yours!");
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RoomExists(room.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize(Roles = "Manager")]
        [HttpPost]
        [Route("room")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult PostRoom(Room room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user != null)
            {
                try
                {
                    Accommodation acc = db.Accommodations.Where(a => a.Id == room.AccommodationId).FirstOrDefault();
                    if (acc != null && acc.UserId == user.appUserId)
                    {
                        db.Rooms.Add(room);
                        db.SaveChanges();
                    }
                    else
                    {
                        return BadRequest("You can not add room into accommodation that is not yours!");
                    }
                }
                catch
                {
                    return BadRequest();
                }
            }

            return CreatedAtRoute("DefaultApi", new { controller = "Room", id = room.Id }, room);
        }

        [Authorize(Roles = "Manager")]
        [HttpDelete]
        [Route("room/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult DeleteRoom(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }
            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user != null)
            {
                try
                {
                    Accommodation acc = db.Accommodations.Where(a => a.Id == room.AccommodationId).FirstOrDefault();
                    if (acc != null && acc.UserId == user.appUserId)
                    {
                        db.Rooms.Remove(room);
                        db.SaveChanges();
                    }
                    else
                    {
                        return BadRequest("You can not remove room from accommodation that is not yours!");
                    }
                }
                catch
                {
                    return BadRequest();
                }
            }
            return Ok(room);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomExists(int id)
        {
            return db.Rooms.Count(e => e.Id == id) > 0;
        }
    }
}
