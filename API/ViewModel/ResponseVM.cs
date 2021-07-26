using System.Net;

namespace API.ViewModel
{
    public class ResponseVM
    {
        public int Result { get; set; }
        public string Message { get; set; }
        public HttpStatusCode Status { get; set; }
    }
}
