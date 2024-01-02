using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TheBooksApi.Controllers
{
    [Route("api/getImage")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        public ImagesController() { }
        [HttpGet("{imageName}")]
        public IActionResult Get(string imageName)
        {
            try
            {
                Byte[] b = System.IO.File.ReadAllBytes("Images/" + imageName);   // You can use your own method over here.         
                return File(b, "image/jpeg");
            }
            catch (Exception ex)
            {
                return NotFound(ex);
            }
        }
    }
}
