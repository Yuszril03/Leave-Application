using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class DetailsCalendar
    {
        public int type { get; set; }
        public int year { get; set; }
        public string name { get; set; }
        public string initial { get; set; }
        public CalendarMonth monthly { get; set; }
    }
}
