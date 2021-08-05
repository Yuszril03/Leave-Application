using API.Context;
using API.Models;
using API.Utils;
using API.ViewModel;
using Microsoft.EntityFrameworkCore;
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

        public IEnumerable CheckLeave(string nik)
        {
            var q = (from lm in myContext.LeaveEmployees
                     join ac in myContext.Accounts on lm.NIK equals ac.NIK
                     join em in myContext.Employees on ac.NIK equals em.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     join l in myContext.Leaves on lm.LeaveId equals l.LeaveId
                     where em.NIK == nik && lm.Status == Status.Approved
                     orderby lm.NoLeave descending
                     select new
                     {
                         //Leave Employee
                         lm.StartDate,
                         lm.EndDate,
                         lm.Status,
                         lm.NoLeave,
                         lm.Attachment,
                         lm.TotalDays,
                         //Employee
                         em.NIK,
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         em.PhoneNumber,
                         dep.DepartmentName,
                         //Leave
                         l.LeaveName,
                         l.LeaveType
                     }
                    );
            return q.ToList();
        }

        public IEnumerable GetAllLeaveEmployee(string nik)
        {
            var q = (from lm in myContext.LeaveEmployees
                     join ac in myContext.Accounts on lm.NIK equals ac.NIK
                     join em in myContext.Employees on ac.NIK equals em.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     join l in myContext.Leaves on lm.LeaveId equals l.LeaveId
                     where em.ManagerId == nik && lm.Status == Status.OnProgress
                     select new
                     {
                         //Leave Employee
                         lm.StartDate,
                         lm.EndDate,
                         lm.Status,
                         lm.NoLeave,
                         lm.Attachment,
                         lm.TotalDays,
                         //Employee
                         em.NIK,
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         em.PhoneNumber,
                         dep.DepartmentName,
                         //Leave
                         l.LeaveName,
                         l.LeaveType
                     }
                    );
            return q.ToList();
        }

        public IQueryable GetOneLeaveEmployee(int id)
        {
            var q = (from lm in myContext.LeaveEmployees
                     join ac in myContext.Accounts on lm.NIK equals ac.NIK
                     join em in myContext.Employees on ac.NIK equals em.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     join l in myContext.Leaves on lm.LeaveId equals l.LeaveId
                     where lm.NoLeave == id
                     select new
                     {
                         //Leave Employee
                         lm.StartDate,
                         lm.EndDate,
                         lm.Status,
                         lm.NoLeave,
                         lm.Attachment,
                         lm.TotalDays,
                         //Employee
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         em.PhoneNumber,
                         dep.DepartmentName,
                         //Leave
                         l.LeaveName,
                         l.LeaveType
                     }
                    );
            return q;
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
                    employee.Religion = registerVM.Religion;
                    employee.ManagerId = registerVM.ManagerId;
                    employee.DepartmentId = registerVM.DepartmentId;
                    myContext.Employees.Add(employee);
                    myContext.SaveChanges();

                    //Account
                    string guid = GUID.NewGUID();
                    var role = myContext.Roles.Single(r => r.RoleId == 1);
                    Account account = new Account()
                    {
                        NIK = employee.NIK,
                        Password = Hashing.Hash(guid),
                        LeaveQuota = registerVM.LeaveQuota,
                        LeaveStatus = (LeaveStatus)registerVM.LeaveStatus,
                        Roles = new List<Role>()
                    };
                    account.Roles.Add(role);
                    myContext.Accounts.Add(account);
                    myContext.SaveChanges();
                    Mailing.SendPasswordMail(employee.Email, guid, employee.FirstName);

                    response.Message = "Success adding new employee.";
                    response.Result = 2;
                    response.Status = HttpStatusCode.OK;
                }
                else
                {
                    response.Message = "Email already used.";
                    response.Result = 1;
                    response.Status = HttpStatusCode.BadRequest;
                }
            }
            else
            {
                response.Message = "NIK already used.";
                response.Result = 1;
                response.Status = HttpStatusCode.BadRequest;
            }
            return response;
        }

        public IEnumerable OnLeave()
        {
            var q = (from ac in myContext.Accounts
                     where ac.LeaveStatus == LeaveStatus.Leave
                     select new
                     {
                         ac.NIK
                     }
                    );
            return q.ToList();
        }
        
        public IEnumerable LeaveData(int year)
        {
            var data = (from le in myContext.LeaveEmployees 
                       where le.StartDate.Year == year && le.Status == Status.Approved
                       group le by le.StartDate.Month into date
                       select new
                       {
                           Month = date.Key,
                           Count = date.Count()
                       }).ToList();
            return data;
        }

        public IEnumerable DepartmentData()
        {
            var data = (from emp in myContext.Employees
                        join dep in myContext.Departments on emp.DepartmentId equals dep.DepartmentId
                        group emp by dep.DepartmentName into depart
                        select new
                        {
                            DepartmentName = depart.Key,
                            Count = depart.Count()
                        }).ToList();
            return data;
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
                         Gender = (em.Gender==0)?"Male":"Female",
                         em.PhoneNumber,
                         em.ManagerId,
                         dep.DepartmentName,
                         ac.LeaveQuota,
                         ac.LeaveStatus
                     }                   
                     );
            return q.ToList();
        }
        public IEnumerable GetAccountLEaveEmployee(string nik)
        {
            var q = (from lm in myContext.LeaveEmployees
                     join ac in myContext.Accounts on lm.NIK equals ac.NIK
                     join em in myContext.Employees on ac.NIK equals em.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     join l in myContext.Leaves on lm.LeaveId equals l.LeaveId
                     where em.NIK == nik 
                     orderby lm.NoLeave descending
                     select new
                     {
                         //Leave Employee
                         lm.StartDate,
                         lm.EndDate,
                         lm.Status,
                         lm.NoLeave,
                         lm.Attachment,
                         lm.TotalDays,
                         //Employee
                         em.NIK,
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         em.PhoneNumber,
                         dep.DepartmentName,
                         //Leave
                         l.LeaveName,
                         l.LeaveType
                     }
                      );
            return q.ToList();
        }
        public IEnumerable GetDataStatusLeave(string nik)
        {
            var q = (from em in myContext.Employees
                     join ac in myContext.Accounts on em.NIK equals ac.NIK
                     where em.ManagerId == nik
                     select new
                     {
                         ac.LeaveStatus
                     }
                      );
            return q.ToList();
        }
        public IEnumerable GetDataYearLeave(string nik)
        {
            var q = (from lm in myContext.LeaveEmployees
                     join ac in myContext.Accounts on lm.NIK equals ac.NIK
                     join em in myContext.Employees on ac.NIK equals em.NIK
                     where em.ManagerId == nik
                     select new
                     {
                         lm.StartDate,
                         lm.EndDate,
                         lm.Status,
                     }
                      );
            return q.ToList();
        }
        public IEnumerable GetEmployeesEachManager(string nik)
        {
            var q = (from em in myContext.Employees
                     join ac in myContext.Accounts on em.NIK equals ac.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     where em.ManagerId == nik
                     select new
                     {
                         em.NIK,
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         Gender = (em.Gender == 0) ? "Male" : "Female",
                         em.PhoneNumber,
                         em.ManagerId,
                         dep.DepartmentName,
                         ac.LeaveQuota,
                         ac.LeaveStatus
                     }
                     );
            return q.ToList();
        }
        public IEnumerable GetOneEmployeesEachManager(string nik)
        {
            var q = (from em in myContext.Employees
                     join ac in myContext.Accounts on em.NIK equals ac.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     where em.NIK == nik
                     select new
                     {
                         em.NIK,
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         Gender = (em.Gender == 0) ? "Male" : "Female",
                         em.PhoneNumber,
                         em.ManagerId,
                         dep.DepartmentName,
                         ac.LeaveQuota,
                         ac.LeaveStatus
                     }
                     );
            return q.ToList();
        }

        public IQueryable GetEmployees(string nik)
        {
            var q = (from em in myContext.Employees
                     join ac in myContext.Accounts on em.NIK equals ac.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     where em.Email==nik || em.NIK==nik
                     select new
                     {
                         em.NIK,
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         Gender = (em.Gender == 0) ? "Male" : "Female",
                         em.PhoneNumber,
                         em.ManagerId,
                         dep.DepartmentName,
                         ac.LeaveQuota,
                         ac.LeaveStatus
                     }
                     );
            return q;
        }

        public int CheckPassword(ChangePassword changePassword)
        {
            var check = myContext.Accounts.FirstOrDefault(a => a.NIK == changePassword.NIK);
            if(Hashing.Validate(changePassword.Password, check.Password) == true)
            {
                return 1;
            }
            return 0;
        }

        public int UpdatePassword (UpdatePassword updatePassword)
        {
            string hash = Hashing.Hash(updatePassword.Password);
            Account account = new Account()
            {
                NIK = updatePassword.NIK,
                Password = hash,
                LeaveQuota = updatePassword.LeaveQuota,
                LeaveStatus =updatePassword.LeaveStatus,
            };
            myContext.Entry(account).State = EntityState.Modified;
           var result=  myContext.SaveChanges();
            return result;
        }

        public IEnumerable GetManagers()
        {
            var q = (from em in myContext.Employees
                     join ac in myContext.Accounts on em.NIK equals ac.NIK
                     join ar in myContext.AccountRoles on ac.NIK equals ar.NIK
                     where ar.RoleId == 2
                     select new
                     {
                         em.NIK,
                         em.FirstName,
                         em.LastName
                     }
                     );
            return q.ToList();
        }

        public IEnumerable GetEmployee(string nik)
        {
            var q = (from em in myContext.Employees
                     join ac in myContext.Accounts on em.NIK equals ac.NIK
                     join dep in myContext.Departments on em.DepartmentId equals dep.DepartmentId
                     where em.NIK == $"{nik}"
                     select new
                     {
                         em.NIK,
                         em.FirstName,
                         em.LastName,
                         em.Email,
                         Gender = (em.Gender==0)?"Male":"Female",
                         em.PhoneNumber,
                         em.ManagerId,
                         dep.DepartmentId
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

                        dataJWT.Token = jWT.GetJWT(validate.NIK, setRole, name);

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
