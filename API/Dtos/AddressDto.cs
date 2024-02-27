using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AddressDto
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Street { get; set; }
        public String City { get; set; }
        public String ZipCode { get; set; }
    }
}