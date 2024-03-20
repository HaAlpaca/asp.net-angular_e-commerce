using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AddressDto
    {
        [Required]
        public String FirstName { get; set; }
        [Required]
        public String LastName { get; set; }
        [Required]
        public String Street { get; set; }
        [Required]
        public String City { get; set; }
        [Required]
        public String Zipcode { get; set; }
        [Required]
        public String Country { get; set; }
    }
}