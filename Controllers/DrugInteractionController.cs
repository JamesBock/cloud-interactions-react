using System.Collections.Generic;
using System.Threading.Tasks;
using LockStepBlazor.Data;
using LockStepBlazor.Data.Models;
using LockStepBlazor.Data.Services;
using Microsoft.AspNetCore.Mvc;
using ReactTypescriptBP.Models;
using ReactTypescriptBP.Services;

namespace ReactTypescriptBP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DrugInteractionController : ControllerBase
    {
        protected IDrugInteractionParserAsync DrugInteractionParser { get; set; }
        private PatientDataService PatientDataService { get; }

        public DrugInteractionController(PatientDataService patientDataService)
        {
            PatientDataService = patientDataService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetInteractions([FromQuery] string patientId = null)
        {
            var interactions = new List<MedicationInteractionPair>();
            var medicationConcepts = new List<MedicationConceptDTO>();
            var requestResult = await PatientDataService.GetMedicationRequestsAsync(patientId);

            medicationConcepts = requestResult.Requests;
            if (medicationConcepts.Count > 0)
            {
                var rxcuisResult = await PatientDataService.GetRxCuisAsync((medicationConcepts));
                var drugResult = await PatientDataService.GetDrugInteractionListAsync((rxcuisResult).MedDtos);
                var parsedInteractions = await PatientDataService.ParseInteractionsAsync(await drugResult.Meds, medicationConcepts);

            }

            return Json(interactions);
        }
    }
}