using API.Models;
using Leave_Application.Base;
using Leave_Application.Repository.Data;
using Microsoft.AspNetCore.Mvc;

namespace Leave_Application.Controllers.Data
{
    public class AccountController : BaseController<Account, AccountRepository, string>
    {
        private readonly AccountRepository accountRepository;

        public AccountController(AccountRepository accountRepository) : base(accountRepository)
        {
            this.accountRepository = accountRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
