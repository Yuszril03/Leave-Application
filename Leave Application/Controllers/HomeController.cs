using API.ViewModel;
using Leave_Application.Models;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Leave_Application.Controllers
{
    public class HomeController : Controller
    {
        private readonly HomeRepository homeRepository;

        public HomeController(HomeRepository homeRepository)
        {
            this.homeRepository = homeRepository;
        }

        [HttpPut("Home/Put")]
        public JsonResult Put(Coba entity)
        {
            var result = homeRepository.Put(entity);
        
            HttpContext.Session.SetString("Name", entity.FirstName);
            return Json(result);
        }

        public IActionResult Index()
        {
            return View();
        }
        [Authorize]
        public IActionResult Privacy()
        {
            return View();
        }
        [HttpGet("Home/GetRegistrasiView")]
        public async Task<JsonResult> GetRegistrasiView()
        {
            var result = await homeRepository.GetRegistrasiView();
            return Json(result);
        }
        [HttpPost("Home/Auth")]
        public async Task<IActionResult> Auth(LoginVM loginVM)
        {
            var jwtToken = await homeRepository.LoginData(loginVM);
            if (jwtToken == null)
            {
                return RedirectToAction("Index", "Home");
            }
            HttpContext.Session.SetString("JWToken", jwtToken.Token);
            HttpContext.Session.SetString("Name", homeRepository.JwtName(jwtToken.Token));
            HttpContext.Session.SetString("NIK", homeRepository.JwtNIK(jwtToken.Token));
            var role = homeRepository.JwtRole(jwtToken.Token);
            string trueRole = "";
            int a = 0; int b = 0;
            int c = 0;
            foreach (var item in role)
            {
                if(item.Value == "Manager")
                {
                    a = 1;
                }else if (item.Value == "Admin")
                {
                    trueRole = "Admin";
                    c = 1;
                  
                }
                else if (item.Value == "Employee")
                {
                    b = 1;
                }
            }
            if (c != 1)
            {
                if (a == 1 && b == 0)
                {
                    trueRole = "Manager";
                    HttpContext.Session.SetString("Role", trueRole);
                }
                else if (a == 1 && b == 1)
                {
                    trueRole = "Manager";
                    HttpContext.Session.SetString("Role", trueRole);
                }

                else if (a == 0 && b == 1)
                {
                    trueRole = "Employee";
                    HttpContext.Session.SetString("Role", trueRole);
                }
            }
                    return RedirectToAction("Index", "User");


        }
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
