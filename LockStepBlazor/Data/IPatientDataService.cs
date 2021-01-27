using Hl7.Fhir.Model;
using Hl7.Fhir.Rest;
using LockStepBlazor.Application;
using LockStepBlazor.Application.DrugInteractions;
using LockStepBlazor.Application.Fhir.Queries;
using LockStepBlazor.Application.Interfaces;
using LockStepBlazor.Data.Models;
using LockStepBlazor.Data.Services;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace LockStepBlazor.Data
{
    public interface IPatientDataService
    {
        Task<IGetDrugInteractions.Model> GetDrugInteractionListAsync(List<string> rxcuis);
        Task<IGetFhirMedications.Model> GetMedicationRequestsAsync(string id);
       
        Task<NavigateBundle.Model> NavigateBundleAsync(Bundle bundle, PageDirection nav);
        Task<GetRxCuiListAPI.Model> GetRxCuisAsync(List<MedicationConceptDTO> requests);
        Task<ParseInteractions.Model> ParseInteractionsAsync(string jstring, List<MedicationConceptDTO> meds);
    }
}