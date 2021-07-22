using API.Context;
using API.Models;
using System.Collections;
using System.Linq;

namespace API.Repository.Data
{
    public class LeaveEmployeeRepository : GeneralRepository<MyContext, LeaveEmployee, int>
    {
        public readonly MyContext myContext;
        public LeaveEmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public IEnumerable GetLeaveEmployee(int id)
        {
            var validate = myContext.LeaveEmployees.Where(e => e.LeaveId == id);
            return validate.ToList();
        }
    }
}
