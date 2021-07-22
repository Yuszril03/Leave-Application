﻿using API.Models;

using Leave_Application.Base;
using Leave_Application.ViewModel;

using API.ViewModel;
using Leave_Application.Base;
using Leave_Application.Models;

using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
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

        public async Task<List<RegisterVM>> GetEmployeesEachManager(string nik)
        {
            List<RegisterVM> entities = new List<RegisterVM>();

            using (var response = await httpClient.GetAsync(request + "GetEmployeesEachManager/"+nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<RegisterVM>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<RegisterVM>> GetOneEmployeesEachManager(string nik)
        {
            List<RegisterVM> entities = new List<RegisterVM>();

            using (var response = await httpClient.GetAsync(request + "GetOneEmployeesEachManager/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<RegisterVM>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<LeaveEmployeeVM>> GetAccountLEaveEmployee(string nik)
        {
            List<LeaveEmployeeVM> entities = new List<LeaveEmployeeVM>();

            using (var response = await httpClient.GetAsync(request + "GetAccountLEaveEmployee/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<LeaveEmployeeVM>>(apiResponse);
            }
            return entities;
        }
        public async Task<List<LeaveEmployeeVM>> CheckLeave(string nik)
        {
            List<LeaveEmployeeVM> entities = new List<LeaveEmployeeVM>();

            using (var response = await httpClient.GetAsync(request + "CheckLeave/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<LeaveEmployeeVM>>(apiResponse);
            }
            return entities;
        }
        public async Task<List<ChartDonat>> GetDataStatusLeave(string nik)
        {
            List<ChartDonat> entities = new List<ChartDonat>();

            using (var response = await httpClient.GetAsync(request + "GetDataStatusLeave/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<ChartDonat>>(apiResponse);

                entities = JsonConvert.DeserializeObject<List<Employees>>(apiResponse);

            }
            return entities;
        }

        public async Task<List<ChartYearEmployeecs>> GetDataYearLeave(string nik)
        {
            List<ChartYearEmployeecs> entities = new List<ChartYearEmployeecs>();

            using (var response = await httpClient.GetAsync(request + "GetDataYearLeave/" + nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<ChartYearEmployeecs>>(apiResponse);
            }
            return entities;
        }

        public async Task<List<LeaveEmployeeVM>> GetAllLeaveEmployee(string nik)
        {
            List<LeaveEmployeeVM> entities = new List<LeaveEmployeeVM>();

            using (var response = await httpClient.GetAsync(request + "GetAllLeaveEmployee/"+nik))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<LeaveEmployeeVM>>(apiResponse);
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

        public async Task<List<LeaveEmployeeVM>> GetOneLeaveEmployee(int id)
        {
            List<LeaveEmployeeVM> entities = new List<LeaveEmployeeVM>();

            using (var response = await httpClient.GetAsync(request + "GetOneLeaveEmployee/" + id))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<LeaveEmployeeVM>>(apiResponse);
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
         public async Task<ResponseVM> InsertEmployee(RegisterVM registerVM)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(registerVM), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "Register/", content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }
        
        public async Task<ResponseVM> UpdateEmployee(Employee employee, string nik)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(employee), Encoding.UTF8, "application/json");
            var result = await httpClient.PutAsync(request + nik, content);
            string apiResponse = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ResponseVM>(apiResponse);
        }

    }
       
}

