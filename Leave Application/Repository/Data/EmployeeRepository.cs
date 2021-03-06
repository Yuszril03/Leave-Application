using API.Models;

using Leave_Application.Base;
using Leave_Application.ViewModel;
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
    public class EmployeeRepository : GeneralRepository<Employee, string>
    {
        private readonly Address address;
        private readonly string request;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;

        public EmployeeRepository(Address address, string request = "Employee/") : base(address, request)
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

        public async Task<List<RegisterVM>> GetProfil()
        {
            List<RegisterVM> entities = new List<RegisterVM>();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", _contextAccessor.HttpContext.Session.GetString("JWToken"));
        }
        public async Task<List<Employees>> GetEmployees()
        {
            List<Employees> entities = new List<Employees>();

            using (var response = await httpClient.GetAsync(request + "GetEmployees/"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<RegisterVM>>(apiResponse);
            }
            return entities;
        }
        public async Task<List<RegisterVM>> GetProfil(string nik)
        {
            List<RegisterVM> entities = new List<RegisterVM>();

            using (var response = await httpClient.GetAsync(request + "GetEmployees/"+nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<RegisterVM>>(apiResponse);
            }
            return entities;
        }

    }

                entities = JsonConvert.DeserializeObject<List<Employees>>(apiResponse);
            }
            return entities;
        }

        public async Task<ResponseVM> InsertEmployee(RegisterVM registerVM)
        {
            string apiResponse = null;
            StringContent content = new StringContent(JsonConvert.SerializeObject(registerVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "Register/", content);
            apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }
    }
}
