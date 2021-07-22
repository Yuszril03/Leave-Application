using API.Models;
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
        private readonly DepartmentRepository departmentRepository;
        private readonly LeaveEmployeeRepository leaveEmployeeRepository;
        private readonly AccountRepository accountRepository;

        public AdminController(
            EmployeeRepository employeeRepository, 
            LeaveRepository leaveRepository, 
            DepartmentRepository departmentRepository,
            LeaveEmployeeRepository leaveEmployeeRepository,
            AccountRepository accountRepository)
        {
            this.employeeRepository = employeeRepository;
            this.leaveRepository = leaveRepository;
            this.departmentRepository = departmentRepository;
            this.leaveEmployeeRepository = leaveEmployeeRepository;
            this.accountRepository = accountRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Employee()
        {
            return View();
        }
        
        public IActionResult EditEmployee()
        {
            return View();
        }

        public IActionResult Leave()
        {
            return View();
        }
        
        public IActionResult EditLeave()
        {
            return View();
        }
        
        public IActionResult LeavesData()
        {
            return View();
        }

        public IActionResult Department()
        {
            return View();
        }
        
        public IActionResult EditDepartment()
        {
            return View();
        }

        public IActionResult Role()
        {
            return View();
        }

        public IActionResult ResetLeave()
        {
            return View();
        }

        [HttpGet("Admin/GetEmployees")]
        public async Task<JsonResult> GetEmployees()
        {
            var result = await employeeRepository.GetEmployees();
            return Json(result);
        }
        
        [HttpGet("Admin/GetManagers")]
        public async Task<JsonResult> GetManagers()
        {
            var result = await employeeRepository.GetManagers();
            return Json(result);
        }

        [HttpGet("Admin/GetLeaves")]
        public async Task<JsonResult> GetLeaves()
        {
            var result = await leaveRepository.GetLeaves();
            return Json(result);
        }

        [HttpGet("Admin/GetLeave/{id}")]
        public async Task<JsonResult> GetLeave(int id)
        {
            var result = await leaveRepository.GetLeave(id);
            return Json(result);
        }

        [HttpGet("Admin/GetDepartments")]
        public async Task<JsonResult> GetDepartments()
        {
            var result = await departmentRepository.GetDepartments();
            return Json(result);
        }
        
        [HttpGet("Admin/GetDepartment/{id}")]
        public async Task<JsonResult> GetDepartment(int id)
        {
            var result = await departmentRepository.GetDepartment(id);
            return Json(result);
        }
        
        [HttpGet("Admin/GetAccounts")]
        public async Task<JsonResult> GetAccounts()
        {
            var result = await accountRepository.GetAccounts();
            return Json(result);
        }
        
        [HttpGet("Admin/GetAccounts/{nik}")]
        public async Task<JsonResult> GetAccounts(string nik)
        {
            var result = await accountRepository.GetAccounts(nik);
            return Json(result);
        }

        [HttpGet("Admin/GetEmployee/{nik}")]
        public async Task<JsonResult> GetEmployee(string nik)
        {
            var result = await employeeRepository.GetEmployee(nik);
            return Json(result);
        }

        [HttpGet("Admin/GetLeaveEmployees/{id}")]
        public async Task<JsonResult> GetLeaveEmployees(int id)
        {
            var result = await leaveEmployeeRepository.GetLeaveEmployees(id);
            return Json(result);
        }

        [HttpPost("Admin/Register")]
        public async Task<JsonResult> Register(RegisterVM registerVM)
        {
            var result = await employeeRepository.InsertEmployee(registerVM);
            return Json(result);
        }

        [HttpPost("Admin/AddLeaves")]
        public async Task<JsonResult> AddLeaves(Leave leave)
        {
            var result = await leaveRepository.InsertLeave(leave);
            return Json(result);
        }
        
        [HttpPost("Admin/AddDepartment")]
        public async Task<JsonResult> AddDepartments(Department department)
        {
            var result = await departmentRepository.InsertDepartment(department);
            return Json(result);
        }
        
        [HttpPut("Admin/UpdateEmployee/{nik}")]
        public async Task<JsonResult> UpdateEmployee(Employee employee, string nik)
        {
            var result = await employeeRepository.UpdateEmployee(employee, nik);
            return Json(result);
        }
        
        [HttpGet("Admin/UpdateRoles")]
        public async Task<JsonResult> UpdateRoles(UpdateRoleVM updateRoleVM)
        {
            var result = await accountRepository.UpdateRoles(updateRoleVM);
            return Json(result);
        }

        [HttpPut("Admin/UpdateDepartment/{id}")]
        public async Task<JsonResult> UpdateDepartment(Department department, int id)
        {
            var result = await departmentRepository.UpdateDepartment(department, id);
            return Json(result);
        }

        [HttpPut("Admin/UpdateLeave/{id}")]
        public async Task<JsonResult> UpdateLeave(Leave leave, int id)
        {
            var result = await leaveRepository.UpdateLeave(leave, id);
            return Json(result);
        }

        [HttpPut("Admin/ResetLeave")]
        public async Task<JsonResult> ResetLeave(ResetLeaveVM resetLeaveVM)
        {
            var result = await accountRepository.ResetLeave(resetLeaveVM);
            return Json(result);
        }
    }
}
