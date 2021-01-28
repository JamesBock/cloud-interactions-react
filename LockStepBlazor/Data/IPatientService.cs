using System.Collections.Generic;
using System.Threading.Tasks;
using LockStepBlazor.Application;
using LockStepBlazor.Application.Fhir.Queries;
using ReactTypescriptBP.Infrastructure;
using ReactTypescriptBP.Models;

namespace LockStepBlazor.Data
{
    public interface IPatientService
    {
       Task<Result<PatientListModel>> SearchAsync(string firstName = null);
        Task<GetPatient.Model> GetAsync(string id);
        PatientListModel PatientList { get; set; }
    }
}