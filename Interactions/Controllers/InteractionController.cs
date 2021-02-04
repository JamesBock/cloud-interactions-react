using System.Collections.Generic;
using System.Threading.Tasks;
using LockStepBlazor.Data;
using LockStepBlazor.Data.Models;
using LockStepBlazor.Data.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using ReactTypescriptBP.Infrastructure;
using ReactTypescriptBP.Models;
using ReactTypescriptBP.Services;

namespace ReactTypescriptBP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InteractionController : BaseController
    {
        private IMemoryCache cache;
        protected IDrugInteractionParserAsync DrugInteractionParser { get; set; }
        private IPatientDataService PatientDataService { get; set; }

        public InteractionController(IPatientDataService patientDataService, IMemoryCache cache)
        {
            PatientDataService = patientDataService;
            this.cache = cache;
        }

        [HttpGet("[action]")]
        public async IAsyncEnumerable<JsonResult> Interaction([FromQuery] string id = null)
        {
            var interactions = new List<MedicationInteractionPair>();
            var medicationConcepts = new List<MedicationConceptDTO>();

            var requestResult = await PatientDataService.GetMedicationRequestsAsync(id);
            var meds = new List<MedicationConceptDTO>(requestResult.Requests);
            yield return Json(meds);


            meds = requestResult.Requests;
            if (meds.Count > 0)
            {
                var rxcuisResult = await PatientDataService.GetRxCuisAsync((meds));
                var drugResult = await PatientDataService.GetDrugInteractionListAsync((rxcuisResult).RxCuis);
                var parsedInteractions = await PatientDataService.ParseInteractionsAsync(await drugResult.Meds, meds);

                var ints = parsedInteractions.Interactions;
                yield return Json(ints);//links not hydrating...moved this implementation to ParseInterationHandler...
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Medications([FromQuery] string id)
        {
    
            var requestResult = await PatientDataService.GetMedicationRequestsAsync(id);
            var MedDtos = new Result<List<MedicationConceptDTO>>(requestResult.Requests);
            return Json(MedDtos);
        }
    }
}