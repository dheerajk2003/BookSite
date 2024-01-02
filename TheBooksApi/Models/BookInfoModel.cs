using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheBooksApi.Models
{
    public class BookInfoModel
    {
        [Key]
        public Guid Bid { get; set; } = Guid.NewGuid();
        [Required]
        [StringLength(50)]
        public string Title { get; set; }
        [Required]
        [Range(1, 9999, ErrorMessage = "Price cannot exceed 9999")]
        public int Price { get; set; }
        [StringLength(50)]
        public string Author { get; set; }
        [StringLength(50)]
        public string Type { get; set; }
        public string Publisher { get; set; }
        public string DOP { get; set; }
        public string DOC { get; } = DateTime.Now.ToString().Substring(0, 10);
        [Required]
        [ForeignKey("RegistrationModel")]
        public Guid Id { get; set; }
        //public RegistrationModel Registration { get; set; }
        public string? imageUrl { get; set; }

    }
}
