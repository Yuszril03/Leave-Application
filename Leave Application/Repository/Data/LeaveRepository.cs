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
    public class LeaveRepository : GeneralRepository<Leave, int>
    {
        private readonly Address address;
        private readonly string request;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;

        public LeaveRepository(Address address, string request = "Leave/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            _contextAccessor = new HttpContextAccessor();
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", _contextAccessor.HttpContext.Session.GetString("JWToken"));
        }
        public async Task<List<Leave>> GetLeaves()
        {
            List<Leave> entities = new List<Leave>();

            using (var response = await httpClient.GetAsync(request))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave>>(apiResponse);
            }
            return entities;
        }

        public async Task<Leave> GetLeave(int id)
        {
            Leave entities = new Leave();

            using (var response = await httpClient.GetAsync(request + id))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<Leave>(apiResponse);
            }
            return entities;
        }

        public async Task<ResponseVM> InsertLeave(Leave leave)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(leave), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request, content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }

        public async Task<ResponseVM> UpdateLeave(Leave leave)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(leave), Encoding.UTF8, "application/json");
            var result = await httpClient.PutAsync(request, content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }
    }
}
