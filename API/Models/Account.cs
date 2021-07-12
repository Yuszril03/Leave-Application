using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    [Table("tb_m_account")]
    public class Account
    {
        [Key]
        public string NIK { get; set; }
        public string Password { get; set; }
        public int LeaveQuota { get; set; }
        public LeaveStatus LeaveStatus { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
        [JsonIgnore]
        public virtual ICollection<Role> Roles { get; set; }
        [JsonIgnore]
        public virtual ICollection<LeaveEmployee> LeaveEmployees { get; set; }
    }
}

public enum LeaveStatus
{
    Cuti, Masuk
}
