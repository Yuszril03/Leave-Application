using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<LeaveEmployee> LeaveEmployees { get; set; }
        public DbSet<AccountRole> AccountRoles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasOne(a => a.Account)
                .WithOne(e => e.Employee)
                .HasForeignKey<Account>(f => f.NIK);

            modelBuilder.Entity<Account>()
                .HasMany(le => le.LeaveEmployees)
                .WithOne(a => a.Account);

            modelBuilder.Entity<Department>()
                .HasMany(e => e.Employees)
                .WithOne(d => d.Department);

            modelBuilder.Entity<Leave>()
                .HasMany(le => le.LeaveEmployees)
                .WithOne(l => l.Leave);

            modelBuilder.Entity<Employee>()
                .HasMany(m => m.Employees)
                .WithOne(e => e.Manager)
                .HasForeignKey(f => f.ManagerId);

            modelBuilder.Entity<Role>()
                .HasMany(a => a.Accounts)
                .WithMany(r => r.Roles)
                .UsingEntity<AccountRole>(
                a => a.HasOne(a => a.Account)
                .WithMany().HasForeignKey(a => a.NIK),
                r => r.HasOne(r => r.Role)
                .WithMany().HasForeignKey(r => r.RoleId));
        }
    }
}
