using Microsoft.EntityFrameworkCore;

namespace TheBooksApi.Models
{
    public class BooksContext : DbContext
    {
        public BooksContext(DbContextOptions<BooksContext> options) : base(options)
        {
            
        }
        public DbSet<BookInfoModel> BookInfo { get; set; }
        public DbSet<RegistrationModel> Registration { get; set; }
    }
}
