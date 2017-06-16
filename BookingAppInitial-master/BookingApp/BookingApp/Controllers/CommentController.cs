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
    public class CommentController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [EnableQuery]
        [Route("comments")]
        public IQueryable<Comment> GetComment()
        {
            return db.Comments;
        }

        [HttpGet]
        [Route("comments/{id1}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult GetComment(int id1)
        {
            Comment comment = db.Comments.Find(id1);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [Authorize(Roles ="AppUser")]
        [HttpPost]
        [Route("comments")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if(user != null)
            {
               // var rrr = db.Reservations.Join(db.Rooms, u1 => u1.RoomId, u2 => u2.Id, (u1, u2) => new { res = u1, room = u2 });
                var reservations = db.Reservations.Where(r => r.Room.AccommodationId.Equals(comment.AccommodationId) && r.UserId.Equals(user.appUserId) && r.Canceled.Equals(false)).ToList();

                if (reservations.Count > 0)
                {
                    DateTime min = reservations.Min(o => o.StartDate);
                    RoomReservation rr = reservations.FirstOrDefault(r => r.StartDate.Equals(min));

                    if (rr != null && rr.StartDate < DateTime.Now)
                    {
                        Comment c = db.Comments.FirstOrDefault(com => com.UserId.Equals(user.appUserId) && com.AccommodationId.Equals(comment.AccommodationId));
                        if (c == null)
                        {
                            db.Comments.Add(comment);
                            db.SaveChanges();

                            double averageGrade = CalculateAverageGrade(comment.AccommodationId);

                            Accommodation acc = db.Accommodations.Where(a => a.Id == comment.AccommodationId).FirstOrDefault();
                            acc.AverageGrade = averageGrade;

                            db.SaveChanges();
                        }
                        else
                        {
                            return BadRequest("You already commented!");
                        }
                    }
                    else
                    {
                        return BadRequest("You have not arrived to your accommodation yet, so you can not comment.");
                    }
                }
                else
                {
                    return BadRequest("You haven't made any reservations.");
                }
            }

            return CreatedAtRoute("DefaultApi", new { controller = "Comment",id1 = comment.AccommodationId, id2 = comment.UserId }, comment);
        }

        [Authorize(Roles = "AppUser")]
        [HttpDelete]
        [Route("comments/{id1}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(int id1)
        {
            Comment comment = db.Comments.Find(id1);
            if (comment == null)
            {
                return NotFound();
            }
            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (user != null)
            {
                try
                {
                    if (comment != null && comment.UserId.Equals(user.appUserId))
                    {
                        db.Comments.Remove(comment);
                        db.SaveChanges();

                        double averageGrade = CalculateAverageGrade(comment.AccommodationId);

                        Accommodation acc = db.Accommodations.Where(a => a.Id == comment.AccommodationId).FirstOrDefault();
                        acc.AverageGrade = averageGrade;

                        db.SaveChanges();
                    }
                    else
                    {
                        return BadRequest("You can not remove comment that is not yours!");
                    }
                }
                catch
                {
                    return BadRequest();
                }
            }

            return Ok(comment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentExists(int id1, int id2)
        {
            return db.Comments.Count(e => e.AccommodationId == id1 && e.UserId == id2) > 0;
        }


        private double CalculateAverageGrade(int id)
        {
            var comments = db.Comments.Where(c => c.AccommodationId == id).ToList();
            double sum = comments.Sum(g => g.Grade).Value;

            return sum / comments.Count;
        }
    }
}
