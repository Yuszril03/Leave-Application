using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class ResponseVM
    {
        public int Result { get; set; }
        public string Message { get; set; }
        public HttpStatusCode Status { get; set; }
    }
}
