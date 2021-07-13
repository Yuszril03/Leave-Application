using API.Context;
using API.Models;
using API.Utils;
using API.ViewModel;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Net;

namespace API.Repository.Data
{
    public class EmployeeRepository : GeneralRepository<MyContext, Employee, string>
    {
        public readonly MyContext myContext;

        public EmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public JWTVM Auth(LoginVM loginVM, IConfiguration configuration)
        {
            JWT jWT = new JWT(configuration);
            JWTVM dataJWT = new JWTVM();
            int hasil = 0;
            if (loginVM.NIK != "" && loginVM.Password != "")
            {
                var cekEmployeeEmail = myContext.Employees.SingleOrDefault(e => e.Email == loginVM.NIK);
                var cekEmployeeNIK = myContext.Employees.SingleOrDefault(e => e.NIK == loginVM.NIK);
                if (cekEmployeeEmail != null)
                {
                    var cekPassword = myContext.Accounts.SingleOrDefault(e => e.NIK == cekEmployeeEmail.NIK);
                    var accountRole = myContext.AccountRoles.SingleOrDefault(e => e.NIK == cekEmployeeEmail.NIK);
                    if (Hashing.Validate(loginVM.Password, cekPassword.Password) == true)
                    {
                        //Benar
                        var role = myContext.Roles.SingleOrDefault(r => r.RoleId == accountRole.RoleId);
                        dataJWT.Token = jWT.GetJWT(cekEmployeeEmail.Email, role.RoleName, cekEmployeeEmail.FirstName);
                        dataJWT.Message = "Login Sukses";
                        dataJWT.Status = HttpStatusCode.OK;
                    }
                    else
                    {
                        //Password Salah
                        dataJWT.Token = null;
                        dataJWT.Message = "Password Salah";
                        dataJWT.Status = HttpStatusCode.BadRequest;
                    }
                }
                else if (cekEmployeeNIK != null)
                {
                    var cekPassword = myContext.Accounts.SingleOrDefault(e => e.NIK == loginVM.NIK);
                    var accountRole = myContext.AccountRoles.SingleOrDefault(e => e.NIK == cekEmployeeNIK.NIK);
                    if (Hashing.Validate(loginVM.Password, cekPassword.Password) == true)
                    {
                        //Benar
                        var role = myContext.Roles.SingleOrDefault(r => r.RoleId == accountRole.RoleId);
                        dataJWT.Token = jWT.GetJWT(cekEmployeeNIK.NIK, role.RoleName, cekEmployeeNIK.FirstName);
                        dataJWT.Message = "Login Sukses";
                        dataJWT.Status = HttpStatusCode.OK;
                    }
                    else
                    {
                        //Password Salah
                        dataJWT.Token = null;
                        dataJWT.Message = "Password Salah";
                        dataJWT.Status = HttpStatusCode.BadRequest;
                    }
                }
                else
                {
                    //Jika NIK dan Email tidak ada
                    dataJWT.Token = null;
                    dataJWT.Message = "NIK atau Email Belum Terdaftar Database";
                    dataJWT.Status = HttpStatusCode.BadRequest;
                }
            }
            else if (loginVM.NIK == "" && loginVM.Password != "")
            {
                // Jika nik/email null
                dataJWT.Token = null;
                dataJWT.Message = "NIK atau Email Kosong";
                dataJWT.Status = HttpStatusCode.BadRequest;
            }
            else if (loginVM.NIK != "" && loginVM.Password == "")
            {
                 ///Jika password null
                dataJWT.Token = null;
                dataJWT.Message = "Password Kosong";
                dataJWT.Status = HttpStatusCode.BadRequest;
            }
            else
            {
               // kosong semua
                dataJWT.Token = null;
                dataJWT.Message = "NIK dan Password Kosong";
                dataJWT.Status = HttpStatusCode.BadRequest;
            }


            return dataJWT;
        }

    }
}
