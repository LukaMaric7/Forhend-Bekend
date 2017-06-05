using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class Place
    {
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        public Region Region { get; set; }

        [Required]
        [ForeignKey("Region")]
        public int RegionId { get; set; }

        public List<Accommodation> Accommodations { get; set; }
    }
}