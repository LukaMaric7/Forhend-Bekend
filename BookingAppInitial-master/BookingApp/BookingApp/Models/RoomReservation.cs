using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class RoomReservation
    {
        public Room Room { get; set; }

        [Key]
        [Column(Order = 1)]
        [ForeignKey("Room")]
        public int RoomId { get; set; }

        public AppUser User { get; set; }

        [Key]
        [Column(Order = 2)]
        [ForeignKey("User")]
        public int UserId { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }

        [Key]
        [Column(Order = 3)]
        [Timestamp]
        public byte[] TimeStamp { get; set; }

    }
}