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
        [EnableQuery]
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

        //[Authorize]
        [HttpPut]
        [Route("comments/{id1}/{id2}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComment(int id1, int id2, Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id1 != comment.AccommodationId || id2 != comment.UserId)
            {
                return BadRequest();
            }

            db.Entry(comment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id1, id2))
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
        [Route("comments")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comments.Add(comment);
            try
            {
                db.SaveChanges();
            }
            catch
            {
                return BadRequest("You already commented!");
            }

            return CreatedAtRoute("DefaultApi", new { controller = "Comment",id1 = comment.AccommodationId, id2 = comment.UserId }, comment);
        }

        //[Authorize]
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

            db.Comments.Remove(comment);
            db.SaveChanges();

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
    }
}
