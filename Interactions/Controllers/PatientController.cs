using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Hl7.Fhir.Model;
using LockStepBlazor.Data;
using LockStepBlazor.Data.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Primitives;
using ReactTypescriptBP.Infrastructure;
using ReactTypescriptBP.Models;
using ReactTypescriptBP.Services;

namespace ReactTypescriptBP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : BaseController
    {
        private IMemoryCache cache;
        private MemoryCacheEntryOptions cacheOptions = new MemoryCacheEntryOptions();
        private readonly IPatientService patientService;


        public PatientController(IPatientService patientService, IMemoryCache cache)
        {
            this.patientService = patientService;
            this.cache = cache;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Search(//don't use searchAsync
            [FromQuery] int limitTo, [FromQuery] string firstName = null
           )
        {
            var response = await patientService.SearchAsync(limitTo, firstName);
            cache.Set("SearchBundle",
            response.Bundle,
            cacheOptions);
            var patients = new Result<PatientListModel>(response.Payload);
            return Json(patients);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Next([FromQuery] int count)
        {
            Bundle bundle;
            var bundleIsCached = cache.TryGetValue("SearchBundle", out bundle);
            var response = !bundleIsCached
            ? await patientService.SearchAsync(count, "")
            : await patientService.NavigateBundleAsync(bundle, Hl7.Fhir.Rest.PageDirection.Next);

            cache.Set("SearchBundle",
            response.Bundle,
            cacheOptions);
            var patients = new Result<PatientListModel>(response.Payload);
            return Json(patients);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Read([FromQuery] string id = null)
        {
            return Json(await patientService.GetAsync(id));
        }
    }
}