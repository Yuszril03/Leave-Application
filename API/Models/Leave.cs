using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    [Table("tb_m_leave")]
    public class Leave
    {
        [Key]
        public int LeaveId { get; set; }
        public string LeaveName { get; set; }
        public string LeaveType { get; set; }
        public int LeaveRange { get; set; }
        [JsonIgnore]
        public virtual ICollection<LeaveEmployee> LeaveEmployees { get; set; }
    }
}
