﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheBooksApi.Migrations
{
    /// <inheritdoc />
    public partial class imageUploadString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imageUrl",
                table: "BookInfo",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageUrl",
                table: "BookInfo");
        }
    }
}
