using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using NuGet.Protocol;
using TheBooksApi.Middleware;
using TheBooksApi.Models;

namespace TheBooksApi.Controllers
{
    [Route("api/BookInfoModels")]
    [ApiController]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BookInfoModelsController : ControllerBase
    {
        private readonly BooksContext _context;
        private readonly IWebHostEnvironment _environment;

        public BookInfoModelsController(BooksContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/BookInfoModels
        [HttpGet]

        public async Task<ActionResult<IEnumerable<BookInfoModel>>> GetBookInfo()
        {
            return await _context.BookInfo.ToListAsync();
        }

        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<BookInfoModel>>> GetAllTypes()
        {
            var allTypes = await _context.BookInfo.Select(book => book.Type).Distinct().ToListAsync();
            if(allTypes == null)
            {
                return NotFound();
            }
            return Ok(allTypes);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<BookInfoModel>> GetBookInfoModelBid(Guid id)
        {
            var bookInfoModel = await _context.BookInfo.FindAsync(id);

            if(bookInfoModel == null)
            {
                return NotFound();
            }

            return bookInfoModel;
        }

        // GET: api/BookInfoModels/5
        [HttpGet("allBooks/{id}")]
        public async Task<ActionResult<IEnumerable<BookInfoModel>>> GetBookInfoModel(Guid id)
        {
            //var bookInfoModel = await _context.BookInfo.FindAsync(id);

            var bookInfoModel = await _context.BookInfo.Where(u => u.Id == id).ToListAsync();

            if (bookInfoModel == null)
            {
                return NotFound();
            }

            return bookInfoModel;
        }


        // PUT: api/BookInfoModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookInfoModel(Guid id, BookInfoModel bookInfoModel)
        {
            if (id != bookInfoModel.Bid)
            {
                return BadRequest();
            }

            _context.Entry(bookInfoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookInfoModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookInfoModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("uploadImage")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PostBookImage(IFormFile file)
        {
            try
            {
                if(file == null)
                {
                    return NotFound();
                }

                var path = Path.Combine(_environment.ContentRootPath, "Images/", file.FileName);

                using (FileStream stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    stream.Close();
                }

                return Ok();
            }
            catch(Exception e) {


                Console.Error.WriteLine(e.StackTrace);
                return NotFound(e.Message);
                
            
             }
        }

        [HttpPost]
        public async Task<ActionResult<BookInfoModel>> PostBookInfoModel(BookInfoModel bookInfoModel)
        {
            try
            {
                _context.BookInfo.Add(bookInfoModel);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetBookInfoModel), new { id = bookInfoModel.Bid }, bookInfoModel);
            }
            catch (Exception e) 
            {
                Console.WriteLine(e.Message);
                Console.Error.WriteLine(e.StackTrace);
                return NotFound(e.Message); 
            
            }
        }


        // DELETE: api/BookInfoModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookInfoModel(Guid id)
        {
            try
            {
                var bookInfoModel = await _context.BookInfo.FindAsync(id);
                if (bookInfoModel == null)
                {
                    return NotFound();
                }

                try
                {
                    System.IO.File.Delete("Images/" + bookInfoModel.imageUrl);
                }
                catch 
                {
                    _context.BookInfo.Remove(bookInfoModel);
                    await _context.SaveChangesAsync();

                    return NoContent();
                }

                _context.BookInfo.Remove(bookInfoModel);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch {
                return NotFound();
            }
        }

        private bool BookInfoModelExists(Guid id)
        {
            return _context.BookInfo.Any(e => e.Bid == id);
        }
    }
}
