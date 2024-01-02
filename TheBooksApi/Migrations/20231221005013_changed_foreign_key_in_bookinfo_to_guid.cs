using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheBooksApi.Migrations
{
    /// <inheritdoc />
    public partial class changed_foreign_key_in_bookinfo_to_guid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookInfo_Registration_RegistrationId",
                table: "BookInfo");

            migrationBuilder.DropIndex(
                name: "IX_BookInfo_RegistrationId",
                table: "BookInfo");

            migrationBuilder.RenameColumn(
                name: "RegistrationId",
                table: "BookInfo",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "BookInfo",
                newName: "RegistrationId");

            migrationBuilder.CreateIndex(
                name: "IX_BookInfo_RegistrationId",
                table: "BookInfo",
                column: "RegistrationId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookInfo_Registration_RegistrationId",
                table: "BookInfo",
                column: "RegistrationId",
                principalTable: "Registration",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
