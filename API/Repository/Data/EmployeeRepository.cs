using API.Context;
using API.Models;
using API.Utils;
using API.ViewModel;
using Microsoft.Extensions.Configuration;
using System.Collections;
using System.Collections.Generic;
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

        public ResponseVM Register(RegisterVM registerVM)
        {
            ResponseVM response = new ResponseVM();
            var checkNIK = myContext.Employees.Find(registerVM.NIK);
            if (checkNIK == null)
            {
                var checkEmail = myContext.Employees.Where(e => e.Email == registerVM.Email).FirstOrDefault<Employee>();
                if (checkEmail == null)
                {
                    //Employee
                    Employee employee = new Employee();
                    employee.NIK = registerVM.NIK;
                    employee.FirstName = registerVM.FirstName;
                    employee.LastName = registerVM.LastName;
                    employee.Gender = registerVM.Gender;
                    employee.Email = registerVM.Email;
                    employee.PhoneNumber = registerVM.PhoneNumber;
                    employee.ManagerId = registerVM.ManagerId;
                    employee.DepartmentId = registerVM.DepartmentId;
                    myContext.Employees.Add(employee);
                    myContext.SaveChanges();

                    //Account
                    string hash = Hashing.Hash(registerVM.Password);
                    var role = myContext.Roles.Single(r => r.RoleId == 4);
                    Account account = new Account()
                    {
                        NIK = employee.NIK,
                        Password = hash,
                        LeaveQuota = registerVM.LeaveQuota,
                        LeaveStatus = (LeaveStatus)registerVM.LeaveStatus,
                        Roles = new List<Role>()
                    };
                    account.Roles.Add(role);
                    myContext.Accounts.Add(account);
                    myContext.SaveChanges();

                    response.Message = "Sukses menambah data karyawan";
                    response.Result = 2;
                    response.Status = HttpStatusCode.OK;
                }
                else
                {
                    response.Message = "Email sudah digunakan";
                    response.Result = 1;
                    response.Status = HttpStatusCode.BadRequest;
                }
            }
            else
            {
                response.Message = "NIK sudah digunakan";
                response.Result = 1;
                response.Status = HttpStatusCode.BadRequest;
            }
            return response;
        }

        public IEnumerable GetEmployees()
        {
            var q = (from em in myContext.Employees
                     join ac in myContext.Accounts on em.NIK equals ac.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     select new
                     {
                         em.NIK,
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         Gender = (em.Gender==0)?"Pria":"Wanita",
                         em.PhoneNumber,
                         em.ManagerId,
                         dep.DepartmentName,
                         ac.LeaveQuota,
                         ac.LeaveStatus
                     }                   
                     );
            return q.ToList();
        }

        public JWTVM Auth(LoginVM loginVM, IConfiguration configuration)
        {
            JWT jWT = new JWT(configuration);
            JWTVM dataJWT = new JWTVM();
            if (loginVM.ValidateId != "" && loginVM.Password != "")
            {
                var validate = myContext.Employees.Where(e => e.Email == loginVM.ValidateId || e.NIK == loginVM.ValidateId).FirstOrDefault<Employee>();
                if (validate != null)
                {
                    var cekPassword = myContext.Accounts.FirstOrDefault(e => e.NIK == validate.NIK);
                    
                    if (Hashing.Validate(loginVM.Password, cekPassword.Password) == true)
                    {
                        //Benar
                        List<string> setRole = new List<string>();
                        var role = (from ar in myContext.AccountRoles join r in myContext.Roles on ar.RoleId equals r.RoleId  where ar.NIK == validate.NIK select new { r.RoleName }).ToList();
                        foreach (var item in role)
                        {
                            setRole.Add(item.RoleName);
                        }
                        var name = validate.FirstName + " " + validate.LastName;

                        dataJWT.Token = jWT.GetJWT(validate.Email, setRole, name);
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
            else if (loginVM.ValidateId == "" && loginVM.Password != "")
            {
                // Jika nik/email null
                dataJWT.Token = null;
                dataJWT.Message = "NIK atau Email Kosong";
                dataJWT.Status = HttpStatusCode.BadRequest;
            }
            else if (loginVM.ValidateId != "" && loginVM.Password == "")
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
