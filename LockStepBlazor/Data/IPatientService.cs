using System.Collections.Generic;
using System.Threading.Tasks;
using Hl7.Fhir.Model;
using Hl7.Fhir.Rest;
using LockStepBlazor.Application;
using LockStepBlazor.Application.Fhir.Queries;
using LockStepBlazor.Application.Interfaces;
using ReactTypescriptBP.Infrastructure;
using ReactTypescriptBP.Models;

namespace LockStepBlazor.Data
{
    public interface IPatientService
    {
        Task<ICachePatientBundle> SearchAsync(int limitTo, string firstName = null);
        Task<GetPatient.Model> GetAsync(string id);
        PatientListModel PatientList { get; set; }
        Task<ICachePatientBundle> NavigateBundleAsync(Bundle bundle, PageDirection nav);
    }
}