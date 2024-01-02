using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheBooksApi.Models;

namespace TheBooksApi.Controllers
{
    [Route("api/RegistrationModels")]
    [ApiController]
    public class RegistrationModelsController : ControllerBase
    {
        private readonly BooksContext _context;

        public RegistrationModelsController(BooksContext context)
        {
            _context = context;
        }

        // GET: api/RegistrationModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegistrationModel>>> GetRegistration()
        {
            return await _context.Registration.ToListAsync();
        }

        // GET: api/RegistrationModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegistrationModel>> GetRegistrationModel(Guid id)
        {
            var registrationModel = await _context.Registration.FindAsync(id);

            if (registrationModel == null)
            {
                return NotFound();
            }

            return registrationModel;
        }

        // PUT: api/RegistrationModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistrationModel(Guid id, RegistrationModel registrationModel)
        {
            if (id != registrationModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(registrationModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistrationModelExists(id))
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

        // POST: api/RegistrationModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegistrationModel>> PostRegistrationModel(RegistrationModel registrationModel)
        {
            _context.Registration.Add(registrationModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRegistrationModel), new { id = registrationModel.Id }, registrationModel);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<RegistrationModel>> PostUserLogin(RegistrationModel registrationModel)
        {
            var User = await _context.Registration.FirstOrDefaultAsync(u => u.Name == registrationModel.Name && u.Password == registrationModel.Password);
            if(User == null)
            {
                return NotFound("Invalid username or password");
            }
            return Ok(User.Id);
        }

// DELETE: api/RegistrationModels/5
[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistrationModel(Guid id)
        {
            var registrationModel = await _context.Registration.FindAsync(id);
            if (registrationModel == null)
            {
                return NotFound();
            }

            _context.Registration.Remove(registrationModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistrationModelExists(Guid id)
        {
            return _context.Registration.Any(e => e.Id == id);
        }
    }
}
