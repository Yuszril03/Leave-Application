using API.Context;
using API.Models;

namespace API.Repository.Data
{
    public class DepartmentRepository : GeneralRepository<MyContext, Department, int>
    {
        public readonly MyContext myContext;
        public DepartmentRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
    }
}
