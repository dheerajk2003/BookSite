using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace TheBooksApi.Models
{
    public class RegistrationModel
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        [StringLength(16,ErrorMessage = "name should contain maximum 16 character")]
        public string Name { get; set; }
        [Required]
        [StringLength(12,ErrorMessage = "password should be between 4 and 12 characters", MinimumLength = 4)]
        public string Password { get; set; }
    }
}
