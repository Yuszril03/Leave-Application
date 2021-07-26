using System.Net;
namespace API.ViewModel
{
    public class JWTVM
    {
        public string Token { get; set; }
        public string Message { get; set; }
        public HttpStatusCode Status { get; set; }
    }
}
