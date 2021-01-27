using System.Threading.Tasks;
using MediatR;
using LockStepBlazor.Application;
using LockStepBlazor.Application.Fhir.Queries;
using ReactTypescriptBP.Infrastructure;


namespace LockStepBlazor.Data.Services
{
    public class PatientService : ServiceBase, IPatientService
    {
        private readonly IMediator mediator;

        public PatientService(IMediator mediator){
            this.mediator = mediator;
        }

          public async virtual Task<Result<GetPatientList.Model>> SearchAsync(string firstName = null)
        {
            
            return Ok(await mediator.Send(new GetPatientList.Query()
            {
               
            }).ConfigureAwait(false));

        }
        public async Task<GetPatient.Model> GetAsync(string id)
        {
            
            return await mediator.Send(new GetPatient.Query()
            {
                PatientId = id
            }).ConfigureAwait(false);

        }      
            
            // if (!string.IsNullOrEmpty(term))
            // {
            //     term = term.ToLower();
            //     term = term.Trim();

           
            //     var queryNames = new SearchParams()
            //             .Where($"given={term}")
            //             .Where($"last={term}")
            //             .LimitTo(50);
            //     var searchCall = await client.SearchAsync<Patient>(queryNames);


            //     List<Patient> patients = new List<Patient>();
            //     while (searchCall != null)
            //     {
            //         foreach (var e in searchCall.Entry)
            //         {
            //             Patient p = (Patient)e.Resource;
            //             patients.Add(p);
            //         }
            //         searchCall = client.Continue(searchCall, PageDirection.Next);
            //     }
            //     return patients;
            // }
           
    }
}