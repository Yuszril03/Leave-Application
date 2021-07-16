using API.Models;
using API.ViewModel;
using Leave_Application.Base;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Leave_Application.Repository.Data
{
    public class HomeRepository : GeneralRepository<Employee, string>
    {
        private readonly Address address;
        private readonly string request;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;

        public HomeRepository(Address address, string request = "Employee/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            _contextAccessor = new HttpContextAccessor();
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
            //JWT
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", _contextAccessor.HttpContext.Session.GetString("JWToken"));
        }
        public async Task<JWTVM> LoginData(LoginVM loginVM)
        {
            JWTVM token = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(loginVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "Auth", content);
            if (result.IsSuccessStatusCode)
            {
                string apiResponse = await result.Content.ReadAsStringAsync();
                token = JsonConvert.DeserializeObject<JWTVM>(apiResponse);
            }
            return token;
        }
        public string JwtName(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken result = tokenHandler.ReadJwtToken(token);

            return result.Claims.FirstOrDefault(claim => claim.Type.Equals("Name")).Value;
        }
        public HttpStatusCode Put(Coba entity)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            var result = httpClient.PutAsync(request, content).Result;
            if (result.IsSuccessStatusCode)
            {

            }
            return result.StatusCode;
        }
        public string JwtNIK(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken result = tokenHandler.ReadJwtToken(token);

            return result.Claims.FirstOrDefault(claim => claim.Type.Equals("NIK")).Value;
        }
        public List<Claim> JwtRole(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken result = tokenHandler.ReadJwtToken(token);

            return result.Claims.Where(claim => claim.Type.Equals("role")).ToList();
        }
        public async Task<List<RegisterVM>> GetRegistrasiView()
        {
            List<RegisterVM> entities = new List<RegisterVM>();

            using (var response = await httpClient.GetAsync(request + "GetEmployees/"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<RegisterVM>>(apiResponse);
            }
            return entities;
        }
    }
}
