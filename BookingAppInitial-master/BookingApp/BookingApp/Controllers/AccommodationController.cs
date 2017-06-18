using BookingApp.Models;
using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Newtonsoft.Json;
using System.Web.Http.OData;
using BookingApp.Hubs;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class AccommodationController : ApiController
    {
        BAContext db = new BAContext();

        [HttpGet]
        [EnableQuery]
        [Route("accommodation")]
        public IQueryable<Accommodation> GetAccommodations()
        {
            return db.Accommodations;
        }

        [HttpGet]
        [Route("accommodation/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult GetAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            return Ok(accommodation);
        }

        [Authorize(Roles = "Manager, Admin")]
        [HttpPut]
        [Route("accommodation")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccommodation(Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            } 
            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));
            if (!db.AppUsers.FirstOrDefault(o => o.Id.Equals(user.appUserId)).IsBanned)
            {
                if (user != null)
                {
                    var userRole = user.Roles.First().RoleId;
                    var role = db.Roles.FirstOrDefault(r => r.Id == userRole);
                    bool isAdmin = role.Name.Equals("Admin");
                    try
                    {
                        if (isAdmin || (accommodation != null && accommodation.UserId.Equals(user.appUserId)))
                        {
                            db.Entry(accommodation).State = EntityState.Modified;
                            db.SaveChanges();
                            if(isAdmin)
                            {
                                NotificationHub.Notify_NotApprovedAccommodation("");
                                NotificationHub.Notify_AccommodationApproved(accommodation.UserId.ToString(), accommodation.Id);
                            }
                        }
                        else
                        {
                            return BadRequest("You can't modify accommodation that is not yours!");
                        }
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return BadRequest("You can't modify accommodation if you are not logged in!");
                }
            }
            else
            {
                return BadRequest("You are banned, can not perform this operation.");
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize(Roles = ("Manager"))]
        [HttpPost]
        [Route("accommodation")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation()
        {
            Accommodation accommodation = new Accommodation();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (!db.AppUsers.FirstOrDefault(o => o.Id.Equals(user.appUserId)).IsBanned)
            {

                var httpRequest = HttpContext.Current.Request;
                accommodation = JsonConvert.DeserializeObject<Accommodation>(httpRequest.Form[0]);

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {
                            return BadRequest();
                        }
                        else
                        {
                            var filePath = HttpContext.Current.Server.MapPath("~/Content/AccommodationPictures/" + postedFile.FileName);
                            accommodation.ImageURL = "Content/AccommodationPictures/" + postedFile.FileName;
                            postedFile.SaveAs(filePath);
                        }
                    }
                }

                db.Accommodations.Add(accommodation);
                db.SaveChanges();
                NotificationHub.Notify_NewAccommodationAdded(accommodation.Id);
            }
            else
            {
                return BadRequest("You are banned, can not perform this operation.");
            }
            return CreatedAtRoute("DefaultApi", new { controller = "Accommodation", id = accommodation.Id }, accommodation);
        }

        [Authorize(Roles = ("Manager"))]
        [HttpDelete]
        [Route("accommodation/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }
            var user = db.Users.FirstOrDefault(u => u.UserName.Equals(User.Identity.Name));

            if (!db.AppUsers.FirstOrDefault(o => o.Id.Equals(user.appUserId)).IsBanned)
            {
                if (user != null)
                {
                    try
                    {
                        if (accommodation != null && accommodation.UserId.Equals(user.appUserId))
                        {
                            db.Accommodations.Remove(accommodation);
                            db.SaveChanges();
                        }
                        else
                        {
                            return BadRequest("You can not remove accommodation that is not yours!");
                        }
                    }
                    catch
                    {
                        return BadRequest();
                    }
                }
            }
            else
            {
                return BadRequest("You are banned, can not perform this operation.");
            }
            return Ok(accommodation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int id)
        {
            return db.Accommodations.Count(e => e.Id == id) > 0;
        }

    }
}
