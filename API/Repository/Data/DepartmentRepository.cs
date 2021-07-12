using API.Context;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class DepartmentRepository : GeneralRepository<MyContext, Department, int>
    {
        public readonly MyContext myContext1;
        public DepartmentRepository(MyContext myContext) : base(myContext)
        {
            this.myContext1 = myContext;
        }
    }
}
