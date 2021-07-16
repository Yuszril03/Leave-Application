using API.Models;
using Leave_Application.Base;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Leave_Application.Controllers
{
    //[Authorize(Roles ="Employee, Manager")]
    public class EmployeeController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository employeeRepository;

        public EmployeeController(EmployeeRepository employeeRepository) : base(employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        public IActionResult Beranda()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("Index");
        }
        public IActionResult CutiNormal()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("CutiNormal");
        }
        public IActionResult CutiSpesial()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("CutiSpesial");
        }
        public IActionResult DataCuti()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("DataCuti");
        }
        public IActionResult TanggapanCuti()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("TanggapanCuti");
        }
        public IActionResult Profil()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("Profil");
        }
        public IActionResult UbahKataSandi()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("UbahKataSandi");
        }

        //Tambahan
        [HttpGet("Employee/GetSessionNIK")]
        public async Task<JsonResult> GetSessionNIK()
        {
            var result = HttpContext.Session.GetString("NIK");
            return Json(result);
        }

        //GetProfilKaryawan
        [HttpGet("Employee/GetProfil")]
        public async Task<JsonResult> GetProfil()
        {
            var result = await employeeRepository.GetProfil();
            return Json(result);
        }
        [HttpGet("Employee/GetOneProfil")]
        public async Task<JsonResult> GetOneProfil()
        {
            var result2 = HttpContext.Session.GetString("NIK");
            var result = await employeeRepository.GetProfil(result2);
            return Json(result);
        }
    }
}
