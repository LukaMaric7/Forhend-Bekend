using BookingApp.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class ManagerController : ApiController
    {
        BAContext db = new BAContext();
        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
       
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("manager")]
        public List<AppUser> GetReservation()
        {
            List<AppUser> appUsers = new List<AppUser>();

            var role = db.Roles.Where(r => r.Name.Equals("Manager")).FirstOrDefault();
            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2) => new { UserRole = u1, User = u2 }).Select(x => x.User.appUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();
            foreach(var user in users)
            {
                appUsers.Add(user.AppUser);
            }

            return appUsers;
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("manager/{Id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult BanUnban(int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser user = db.AppUsers.Where(o => o.Id.Equals(Id)).FirstOrDefault();

            if(user == null)
            {
                return NotFound();
            }
            
            if(user.IsBanned)
            {
                user.IsBanned = false;
            }
            else
            {
                user.IsBanned = true;
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

    }
}
