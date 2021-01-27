using System.Threading.Tasks;
using LockStepBlazor.Application;
using LockStepBlazor.Application.Fhir.Queries;
using ReactTypescriptBP.Infrastructure;

namespace LockStepBlazor.Data
{
    public interface IPatientService
    {
       Task<Result<GetPatientList.Model>> SearchAsync(string firstName = null);
        Task<GetPatient.Model> GetAsync(string id);
    }
}