using API.Models;

using API.ViewModel;
using Leave_Application.Base;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Leave_Application.Repository.Data
{
    public class LeaveEmployeeRepository : GeneralRepository<LeaveEmployee, int>

    {
        private readonly Address address;
        private readonly string request;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;

        public LeaveEmployeeRepository(Address address, string request = "LeaveEmployee/") : base(address, request)
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
        public async Task<List<LeaveEmployee>> GetLeaveEmployees(int id)
        {
            List<LeaveEmployee> entities = new List<LeaveEmployee>();

            using (var response = await httpClient.GetAsync(request + "/GetLeaveEmployees/" + id))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<LeaveEmployee>>(apiResponse);
            }
            return entities;
        }
    }
}
