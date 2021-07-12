using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    [Table("tb_t_accountrole")]
    public class AccountRole
    {
        public string NIK { get; set; }
        public int RoleId { get; set; }
        [JsonIgnore]
        public virtual Account Account { get; set; }
        [JsonIgnore]
        public virtual Role Role { get; set; }
    }
}
