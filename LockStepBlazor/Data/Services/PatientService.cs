using System.Threading.Tasks;
using MediatR;
using LockStepBlazor.Application;
using LockStepBlazor.Application.Fhir.Queries;
using ReactTypescriptBP.Infrastructure;
using System.Collections.Generic;
using ReactTypescriptBP.Models;

namespace LockStepBlazor.Data.Services
{
    public class PatientService : ServiceBase, IPatientService
    {
        private readonly IMediator mediator;

        public PatientListModel PatientList { get;  set; }
        
        public PatientService(IMediator mediator){
            this.mediator = mediator;
            PatientList =
                new PatientListModel(
                    new List<PatientModel>()
                    {
                        new PatientModel("0", "James", "Bock")
                    }
                , "badlink", "badlink", "badlink", "badlink");

        }

          public async virtual Task<Result<PatientListModel>> SearchAsync(string firstName = null)
        {
            var list = await mediator.Send(new GetPatientList.Query(){ FirstName = firstName});
            if (list.Payload.Patients.Count == 0)
            {
               
            return Ok(PatientList);
            }
            else    return Ok(list.Payload);

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