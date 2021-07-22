using API.Models;

using API.ViewModel;
using Leave_Application.Base;
using Leave_Application.Models;
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
    public class AccountRepository : GeneralRepository<Account, string>
    {
        private readonly Address address;
        private readonly string request;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        
        public AccountRepository(Address address, string request = "Account/") : base(address, request)
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


        public async Task<List<Account>> GetAccounts()
        {
            List<Account> entities = new List<Account>();

            using (var response = await httpClient.GetAsync(request))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Account>>(apiResponse);
            }
            return entities;
        }
        
        public async Task<Account> GetAccounts(string nik)
        {
            Account entities = new Account();

            using (var response = await httpClient.GetAsync(request + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<Account>(apiResponse);
            }
            return entities;
        }

        public async Task<ResponseVM> UpdateRoles(UpdateRoleVM updateRoleVM)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(updateRoleVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PutAsync(request + "UpdateRoles", content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }

        public async Task<ResponseVM> ResetPassword(ResetPasswordVM resetPasswordVM)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(resetPasswordVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PutAsync(request + "ResetPassword", content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }

        public async Task<ResponseVM> ResetLeave(ResetLeaveVM resetLeaveVM)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(resetLeaveVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PutAsync(request + "ResetLeave", content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }
    }
}
