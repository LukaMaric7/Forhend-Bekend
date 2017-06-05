using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        [StringLength(25)]
        public string UserName { get; set; }

        [Required]
        [StringLength(64)]
        public string Email { get; set; }

        [Required]
        public String Password { get; set; }

        public List<Accommodation> Accommodations { get; set; }

        public List<Comment> Comments { get; set; }

        public List<RoomReservation> Reservations { get; set; }
    }
}