using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addAttribute_Religion_on_Employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Religion",
                table: "tb_m_employee",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Religion",
                table: "tb_m_employee");
        }
    }
}
