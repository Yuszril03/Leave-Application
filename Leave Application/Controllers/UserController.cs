using API.ViewModel;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace Leave_Application.Controllers
{
    [Authorize(Roles = "Employee, Manager, Admin")]
    public class UserController : Controller
    {
        private readonly EmployeeRepository employeeRepository;
        private readonly IHostingEnvironment _hostingEnvironment;

        public UserController(EmployeeRepository homeRepository, IHostingEnvironment hostingEnvironment)
        {
            this.employeeRepository = homeRepository;
            this._hostingEnvironment = _hostingEnvironment;
        }
        public IActionResult Index()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
        public IActionResult LeaveRequest()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("LeaveRequest");
        }
        public IActionResult LeaveEmployees()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("LeaveEmployees");
        }
        public IActionResult LeaveResponse()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("LeaveResponse");
        }
        public IActionResult Profile()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("Profile");
        }
        public IActionResult ChangePassword()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("JWToken")))
            {
                return RedirectToAction("Index", "Home");
            }
            return View("ChangePassword");
        }

        //Tambahan
        [HttpGet("User/GetSessionNIK")]
        public async Task<JsonResult> GetSessionNIK()
        {
            var result = HttpContext.Session.GetString("NIK");
            return Json(result);
        }
        [HttpGet("User/DownloadFile/{fileName}")]
        public ActionResult DownloadFile(string fileName)
        {
            //Build the File Path.
            string path = "wwwroot/attachment/" + fileName;

            //Read the File data into Byte Array.
            byte[] bytes = System.IO.File.ReadAllBytes(path);

            //Send the File to Download.
            return File(bytes, "application/octet-stream", fileName);
        }

        //GetProfilKaryawan
        [HttpGet("User/GetProfil")]
        public async Task<JsonResult> GetProfil()
        {
            var result = await employeeRepository.GetProfil();
            return Json(result);
        }
        [HttpPost("User/CheckPassword")]
        public async Task<JsonResult> CheckPassword(ChangePassword changePassword)
        {
            var result =  employeeRepository.CheckPassword(changePassword);
            return Json(result);
        }
        [HttpPost("User/UpdatePassword")]
        public async Task<JsonResult> UpdatePassword(UpdatePassword updatePassword)
        {
            var result = employeeRepository.UpdatePassword(updatePassword);
            return Json(result);
        }
        [HttpGet("User/GetOneProfil")]
        public async Task<JsonResult> GetOneProfil()
        {
            var result2 = HttpContext.Session.GetString("NIK");
            var result = await employeeRepository.GetProfil(result2);
            return Json(result);
        }
        [HttpGet("User/CheckLeave")]
        public async Task<JsonResult> CheckLeave()
        {
            var result2 = HttpContext.Session.GetString("NIK");
            var result = await employeeRepository.CheckLeave(result2);
            return Json(result);
        }
        [HttpGet("User/GetEmployeesEachManager")]
        public async Task<JsonResult> GetEmployeesEachManager()
        {
            var result2 = HttpContext.Session.GetString("NIK");
            var result = await employeeRepository.GetEmployeesEachManager(result2);
            return Json(result);
        }
        [HttpGet("User/GetOneEmployeesEachManager/{nik}")]
        public async Task<JsonResult> GetOneEmployeesEachManager(string nik)
        {
            var result = await employeeRepository.GetOneEmployeesEachManager(nik);
            return Json(result);
        }
        [HttpGet("User/GetAllLeaveEmployee/{nik}")]
        public async Task<JsonResult> GetAllLeaveEmployee(string nik)
        {
            var result = await employeeRepository.GetAllLeaveEmployee(nik);
            return Json(result);
        }

        [HttpPost("User/SetName")]
        public JsonResult SetName(Coba entity)
        {
            HttpContext.Session.SetString("Name", entity.FirstName+" "+entity.LastName);
            return Json(entity);
        }

        [HttpGet("User/GetOneLeaveEmployee/{id}")]
        public async Task<JsonResult> GetOneLeaveEmployee(int id)
        {
            var result = await employeeRepository.GetOneLeaveEmployee(id);
            return Json(result);
        }
        [HttpGet("User/GetAccountLEaveEmployee/{nik}")]
        public async Task<JsonResult> GetAccountLEaveEmployee(string nik)
        {
            var result = await employeeRepository.GetAccountLEaveEmployee(nik);
            return Json(result);
        }
        [HttpGet("User/GetDataStatusLeave/{nik}")]
        public async Task<JsonResult> GetDataStatusLeave(string nik)
        {
            var result = await employeeRepository.GetDataStatusLeave(nik);
            return Json(result);
        }

        [HttpGet("User/GetDataYearLeave/{nik}")]
        public async Task<JsonResult> GetDataYearLeave(string nik)
        {
            var result = await employeeRepository.GetDataYearLeave(nik);
            return Json(result);
        }

        [HttpGet("User/GetCalendar")]
        public async Task<JsonResult> GetCalendar()
        {
            string path = "wwwroot/Calendar/2021.json";

            //Read the File data into Byte Array.
            var jsn = System.IO.File.ReadAllText(path);

            //Send the File to Download.
            return Json(JsonConvert.DeserializeObject<Calendar>(jsn));
        }

        [HttpPost("User/UploadFile")]
        public async Task<JsonResult> UploadFile()
        {
           
            var files = Request.Form.Files["FileUpload"];
            long unixTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            var fileName = unixTime+""+ System.IO.Path.GetFileName(files.FileName);
            if (System.IO.File.Exists(fileName))
            {
                System.IO.File.Delete(fileName);
            }
            //// Create new local file and copy contents of uploaded file
            using (var localFile = System.IO.File.OpenWrite("wwwroot/attachment/" + fileName))
            using (var uploadedFile = files.OpenReadStream())
            {
                uploadedFile.CopyTo(localFile);
            }
            return Json(fileName);

            //// Extract file name from whatever was posted by browser
            //var fileName = System.IO.Path.GetFileName(file.FileName);

            //// If file with same name exists delete it
            //if (System.IO.File.Exists(fileName))
            //{
            //    System.IO.File.Delete(fileName);
            //}

            //// Create new local file and copy contents of uploaded file
            //using (var localFile = System.IO.File.OpenWrite("wwwroot/attachment/" + fileName))
            //using (var uploadedFile = file.OpenReadStream())
            //{
            //    uploadedFile.CopyTo(localFile);
            //}

            ////ViewBag.Message = "File successfully uploaded";

            //return Json(fileName);

            }
    }
}
