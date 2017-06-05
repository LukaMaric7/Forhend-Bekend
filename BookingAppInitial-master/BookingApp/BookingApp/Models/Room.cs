using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Room
    {
        public int Id { get; set; }

        [Required]
        public int RoomNumber { get; set; }

        [Required]
        public int BadCount { get; set; }

        [StringLength(1024)]
        public string Description { get; set; }

        [Required]
        public double PricePerNight { get; set; }

        public Accommodation Accommodation { get; set; }

        [Required]
        [ForeignKey("Accommodation")]
        public int AccommodationId { get; set; }

        public List<RoomReservation> Reservations { get; set; }
    }
}