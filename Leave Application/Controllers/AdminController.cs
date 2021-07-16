using API.ViewModel;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Leave_Application.Controllers
{
    //[Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly EmployeeRepository employeeRepository;
        private readonly LeaveRepository leaveRepository;

        public AdminController(EmployeeRepository employeeRepository, LeaveRepository leaveRepository)
        {
            this.employeeRepository = employeeRepository;
            this.leaveRepository = leaveRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Employee()
        {
            return View();
        }

        public IActionResult Leave()
        {
            return View();
        }

        [HttpGet("Admin/GetEmployees")]
        public async Task<JsonResult> GetEmployees()
        {
            var result = await employeeRepository.GetEmployees();
            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> GetLeaves()
        {
            var result = await leaveRepository.GetLeaves();
            return Json(result);
        }

        [HttpPost("Admin/Register")]
        public async Task<JsonResult> Register(RegisterVM registerVM)
        {
            var result = await employeeRepository.InsertEmployee(registerVM);
            return Json(result);
        }
    }
}
