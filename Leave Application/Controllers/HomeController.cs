using API.ViewModel;
using Leave_Application.Models;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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

        public IActionResult Index()
        {
            return View();
        }
        [Authorize]
        public IActionResult Privacy()
        {
            return View();
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
            return Json(jwtToken);
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
