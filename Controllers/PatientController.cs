using System.Threading.Tasks;
using LockStepBlazor.Data;
using LockStepBlazor.Data.Services;
using Microsoft.AspNetCore.Mvc;
using ReactTypescriptBP.Models;
using ReactTypescriptBP.Services;

namespace ReactTypescriptBP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService patientService ;

        public PatientController(IPatientService patientService)
        {
            this.patientService = patientService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Search(//not use searchAsync
            [FromQuery] string firstName = null
           )
        {
            return Json(await patientService.SearchAsync(firstName));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Read([FromQuery] string id = null)
        {
            return Json(await patientService.GetAsync(id));
        }
    }
}