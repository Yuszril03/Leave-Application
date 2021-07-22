using API.Models;
using API.ViewModel;
using Leave_Application.Base;
using Leave_Application.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        public HttpStatusCode CheckPassword(API.ViewModel.ChangePassword changePassword)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(changePassword), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(request + "CheckPassword", content).Result;
           
            return result.StatusCode;
        }

        public HttpStatusCode UpdatePassword(API.ViewModel.UpdatePassword updatePassword)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(updatePassword), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(request + "UpdatePassword", content).Result;

            return result.StatusCode;
        }

        public async Task<List<RegisterVM>> GetProfil()
        {
            List<RegisterVM> entities = new List<RegisterVM>();
            using (var response = await httpClient.GetAsync(request + "GetEmployees/"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<RegisterVM>>(apiResponse);
            }
            return entities;

        }
        public async Task<List<Leave_Application.ViewModel.RegisterVM>> GetEmployees()
        {
            List<Leave_Application.ViewModel.RegisterVM> entities = new List<Leave_Application.ViewModel.RegisterVM>();

            using (var response = await httpClient.GetAsync(request + "GetEmployees/"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();

                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.RegisterVM>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<Leave_Application.ViewModel.RegisterVM>> GetEmployeesEachManager(string nik)
        {
            List<Leave_Application.ViewModel.RegisterVM> entities = new List<Leave_Application.ViewModel.RegisterVM>();

            using (var response = await httpClient.GetAsync(request + "GetEmployeesEachManager/"+nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.RegisterVM>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<Leave_Application.ViewModel.RegisterVM>> GetOneEmployeesEachManager(string nik)
        {
            List<Leave_Application.ViewModel.RegisterVM> entities = new List<Leave_Application.ViewModel.RegisterVM>();

            using (var response = await httpClient.GetAsync(request + "GetOneEmployeesEachManager/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.RegisterVM>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<Leave_Application.ViewModel.LeaveEmployeeVM>> GetAccountLEaveEmployee(string nik)
        {
            List<Leave_Application.ViewModel.LeaveEmployeeVM> entities = new List<Leave_Application.ViewModel.LeaveEmployeeVM>();

            using (var response = await httpClient.GetAsync(request + "GetAccountLEaveEmployee/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.LeaveEmployeeVM>>(apiResponse);
            }
            return entities;
        }
        public async Task<List<Leave_Application.ViewModel.LeaveEmployeeVM>> CheckLeave(string nik)
        {
            List<Leave_Application.ViewModel.LeaveEmployeeVM> entities = new List<Leave_Application.ViewModel.LeaveEmployeeVM>();

            using (var response = await httpClient.GetAsync(request + "CheckLeave/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.LeaveEmployeeVM>>(apiResponse);
            }
            return entities;
        }
        public async Task<List<Leave_Application.ViewModel.ChartDonat>> GetDataStatusLeave(string nik)
        {
            List<Leave_Application.ViewModel.ChartDonat> entities = new List<Leave_Application.ViewModel.ChartDonat>();

            using (var response = await httpClient.GetAsync(request + "GetDataStatusLeave/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.ChartDonat>>(apiResponse);

               
            }
            return entities;
        }

        public async Task<List<Leave_Application.ViewModel.ChartYearEmployeecs>> GetDataYearLeave(string nik)
        {
            List<Leave_Application.ViewModel.ChartYearEmployeecs> entities = new List<Leave_Application.ViewModel.ChartYearEmployeecs>();

            using (var response = await httpClient.GetAsync(request + "GetDataYearLeave/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.ChartYearEmployeecs>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<Leave_Application.ViewModel.LeaveEmployeeVM>> GetAllLeaveEmployee(string nik)
        {
            List<Leave_Application.ViewModel.LeaveEmployeeVM> entities = new List<Leave_Application.ViewModel.LeaveEmployeeVM>();

            using (var response = await httpClient.GetAsync(request + "GetAllLeaveEmployee/"+nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.LeaveEmployeeVM>>(apiResponse);
            }
            return entities;
        }
        
        public async Task<List<Employees>> GetManagers()
        {
            List<Employees> entities = new List<Employees>();

            using (var response = await httpClient.GetAsync(request + "GetManagers/"))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Employees>>(apiResponse);
            }
            return entities;
        }
        
        public async Task<List<Employee>> GetEmployee(string nik)
        {
            List<Employee> entities = new List<Employee>();

            using (var response = await httpClient.GetAsync(request + "GetEmployee/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Employee>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<Leave_Application.ViewModel.LeaveEmployeeVM>> GetOneLeaveEmployee(int id)
        {
            List<Leave_Application.ViewModel.LeaveEmployeeVM> entities = new List<Leave_Application.ViewModel.LeaveEmployeeVM>();

            using (var response = await httpClient.GetAsync(request + "GetOneLeaveEmployee/" + id))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.LeaveEmployeeVM>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<Leave_Application.ViewModel.RegisterVM>> GetProfil(string nik)
        {
            List<Leave_Application.ViewModel.RegisterVM> entities = new List<Leave_Application.ViewModel.RegisterVM>();

            using (var response = await httpClient.GetAsync(request + "GetEmployees/"+nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Leave_Application.ViewModel.RegisterVM>>(apiResponse);
            }
            return entities;
        }
         public async Task<ResponseVM> InsertEmployee(RegisterVM registerVM)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(registerVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "Register/", content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }
        
        public async Task<ResponseVM> UpdateEmployee(Coba employee)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(employee), Encoding.UTF8, "application/json");
            var result = await httpClient.PutAsync(request, content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }

    }
       
}


