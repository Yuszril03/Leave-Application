using API.Context;
using API.Models;
using API.Utils;
using API.ViewModel;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace API.Repository.Data
{
    public class EmployeeRepository : GeneralRepository<MyContext, Employee, string>
    {
        public readonly MyContext myContext;
        Hashing hash;
        public EmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public JWT Auth(LoginVM loginVM, IConfiguration configuration)
        {
            //int hasil = 0;
            //if (loginVM.NIK != "" && loginVM.Password != "")
            //{
            //    var cekEmployeeEmail = myContext.Employees.SingleOrDefault(e => e.Email == loginVM.NIK);
            //    var cekEmployeeNIK = myContext.Employees.SingleOrDefault(e => e.NIK == loginVM.NIK);
            //    if (cekEmployeeEmail != null)
            //    {
            //        var cekPassword = myContext.Accounts.SingleOrDefault(e => e.NIK == cekEmployeeEmail.NIK);
            //        if (hash.(loginVM.Password, cekPassword.Password) == true)
            //        {
            //            hasil = 1; // benar
            //        }
            //        else
            //        {
            //            hasil = 5; // Jika pw salah
            //        }
            //    }
            //    else if (cekEmployeeNIK != null)
            //    {
            //        var cekPassword = myContext.Accounts.SingleOrDefault(e => e.NIK == loginVM.NIK);
            //        if (hash.ValidatePassword(loginVM.Password, cekPassword.Password) == true)
            //        {
            //            return 1; // Benar
            //        }
            //        else
            //        {
            //            return 5; // Jika PW Salah
            //        }
            //    }
            //    else
            //    {
            //        hasil = 4; // Jika nik/email null/tdak ada
            //    }
            //}
            //else if (loginVM.NIK == "" && loginVM.Password != "")
            //{
            //    hasil = 2; // Jika nik/email null
            //}
            //else if (loginVM.NIK != "" && loginVM.Password == "")
            //{
            //    hasil = 3; ///Jika password null
            //}
            //else
            //{
            //    hasil = 0; // kosong semua
            //}



            return null;
        }

    }
}
