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
    public class DepartmentRepository : GeneralRepository<Department, string>
    {
        private readonly Address address;
        private readonly string request;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public DepartmentRepository(Address address, string request = "Department") : base(address, request)
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
        public async Task<List<Department>> GetDepartments()
        {
            List<Department> entities = new List<Department>();

            using (var response = await httpClient.GetAsync(request))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Department>>(apiResponse);
            }
            return entities;
        }

        public async Task<Department> GetDepartment(int id)
        {
            Department entities = new Department();

            using (var response = await httpClient.GetAsync(request + "/" + id))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<Department>(apiResponse);
            }
            return entities;
        }

        public async Task<ResponseVM> InsertDepartment(Department department)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(department), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request, content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }

        public async Task<ResponseVM> UpdateDepartment(Department department)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(department), Encoding.UTF8, "application/json");
            var result = await httpClient.PutAsync(request, content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }
    }
}
