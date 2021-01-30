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
    public class InteractionController : ControllerBase
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
            System.Console.WriteLine("************************START***************************************");
            System.Console.WriteLine(Json(meds).Value);
            System.Console.WriteLine("************************FINISH***************************************");
            yield return Json(meds);


            medicationConcepts = requestResult.Requests;
            if (medicationConcepts.Count > 0)
            {
                var rxcuisResult = await PatientDataService.GetRxCuisAsync((medicationConcepts));
                var drugResult = await PatientDataService.GetDrugInteractionListAsync((rxcuisResult).MedDtos);
                var parsedInteractions = await PatientDataService.ParseInteractionsAsync(await drugResult.Meds, medicationConcepts);


                yield return Json(parsedInteractions);//links not hydrating...still missing large portion of inplementation
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetMedications([FromRoute] string id)
        {
            var medicationConcepts = new List<MedicationConceptDTO>();
            var requestResult = await PatientDataService.GetMedicationRequestsAsync(id);
            var MedDtos = new Result<List<MedicationConceptDTO>>(medicationConcepts);
            return Json(MedDtos);
        }
    }
}