using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    [Table("tb_t_leaveEmployee")]
    public class LeaveEmployee
    {
        [Key]
        public int NoLeave { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalDays { get; set; }
        public string Attachment { get; set; }
        public Status Status { get; set; }
        public string NIK { get; set; }
        public int LeaveId { get; set; }
        [JsonIgnore]
        public virtual Account Account { get; set; }
        [JsonIgnore]
        public virtual Leave Leave { get; set; }
    }
}

public enum Status
{
    Approved, Rejected, OnProgress
}
