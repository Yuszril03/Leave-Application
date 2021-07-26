namespace API.ViewModel
{
    public class UpdatePassword
    {
        public string NIK { get; set; }
        public string Password { get; set; }
        public int LeaveQuota { get; set; }
        public LeaveStatus LeaveStatus { get; set; }
    }
}
