using Hl7.Fhir.Model;
using LockStepBlazor.Data.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Hl7.Fhir.Rest;
using LockStepBlazor.Application.Interfaces;
using LockStepBlazor.Application.Fhir.Queries;
using LockStepBlazor.Application.Extensions;
using LockStepBlazor.Application;
using LockStepBlazor.Application.DrugInteractions;
using LockStepBlazor.Data;
using LockStepBlazor.Data.Services;
using Task = System.Threading.Tasks.Task;
using Moq;
using System.Threading;

namespace ServerTests
{
    public class MockPatientDataService : IPatientDataService
    {
        private readonly ILogger<PatientDataService> logger;
        //private readonly Mock<IMediator> mediator;

        public IGetFhirMedications.Model MedDTOs { get; set; }
        public GetRxCuiListAPI.Model RxCuis { get; set; }
        public IGetDrugInteractions.Model InterationsResponseString { get; set; }

        public MockPatientDataService(/*Mock<IMediator> mediator*/)
        {
            // this.mediator = mediator;
            // this.mediator.Setup(m => m.Send(It.IsAny<ParseInteractions.Query>(), It.IsAny<CancellationToken>())).ReturnsAsync(new ParseInteractions.Model()).Verifiable("Sure!!!!!!!!");
        }

        public async Task<IGetFhirMedications.Model> GetMedicationRequestsAsync(string id)
        {

            return MedDTOs;


        }

        public async Task<GetRxCuiListAPI.Model> GetRxCuisAsync(List<MedicationConceptDTO> requests)
        {
            return RxCuis;
        }


        public async Task<IGetDrugInteractions.Model> GetDrugInteractionListAsync(List<string> medDtos)
        {
            return InterationsResponseString;
        }

        public async Task<ParseInteractions.Model> ParseInteractionsAsync(string jstring, List<MedicationConceptDTO> meds)
        {
            // return await mediator.Send(new ParseInteractions.Query()
            // {
            //     Jstring = jstring,
            //     Meds = meds
            // }).ConfigureAwait(false);

            return new ParseInteractions.Model()
            {
                Interactions =
                new List<MedicationInteractionPair>()
            {
                    new MedicationInteractionPair()
                 {
                    MedicationPair = new ( new MedicationInteractionPair.MedicationInteractionViewModel()
                    {
                        FhirType = "MedicationRequest",
                         DisplayName = "Fentanyl",
                         InteractionId = Guid.NewGuid(),
                         Prescriber = "Dr. No",
                         ResourceId = "123456",
                         RxCui = "313992",

                        TimeOrdered = new DateTimeOffset(2020, 2, 1, 5, 15, 15, 1, new TimeSpan(5, 0, 0))
                    } , new MedicationInteractionPair.MedicationInteractionViewModel()
                            {
                                InteractionId = Guid.NewGuid(),
                                FhirType = "MedicationRequest",
                                Prescriber = "Dr. No",
                                ResourceId = "654321",
                                RxCui = "330765",
                                DisplayName = "Rizatriptan",
                                TimeOrdered = new DateTimeOffset(2020, 2, 1, 5, 15, 15, 1, new TimeSpan(5, 0, 0))
                            }),
                            DrugInteractionDetails = new List<MedicationInteractionPair.InteractionDetail>()
                            {
                                new MedicationInteractionPair.InteractionDetail()
                                {
                                    InteractionAssertion ="interaction asserted in DrugBank between Fentanyl and Rizatriptan.",
                                    LinkTupList = new List<(string, Uri)>(){
                                         ("Fentanyl", new Uri("http://www.drugbank.ca/drugs/DB00813#interactions"))
                                        ,
                                        ("Rizatriptan", new Uri("http://www.drugbank.ca/drugs/DB00953#interactions"))
                                    }
                                }
                            },
                            Comment = "{\"comment\":\"Drug1 (rxcui = 313992, name = fentanyl 0.6 MG Oral Lozenge, tty = SCD). Drug2 (rxcui = 330765, name = rizatriptan 10 MG, tty = SCDC). Drug1 is resolved to fentanyl, Drug2 is resolved to rizatriptan"


                 }
            }
            };
        }


    }

    //public async IAsyncEnumerable<DrugInteraction> GetDrugInteractionList(IEnumerable<string> drugs)
    //{
    //    var apiBase = new Uri("https://rxnav.nlm.nih.gov/REST/interaction/");
    //    var restClient = new HttpClient() { BaseAddress = apiBase };

    //}

    // public async Task<GetPatient.Model> GetPatientAsync(string id)
    // {
    //     return await mediator.Send(new GetPatient.Query()
    //     {
    //         PatientId = id
    //     }).ConfigureAwait(false);

    // }
    // public async Task<SearchPatient.Model> GetPatientListAsync(string firstName, string lastName)
    // {
    //     return await mediator.Send(new SearchPatient.Query()
    //     {
    //         FirstName = firstName
    //         // LastName = lastName
    //     }).ConfigureAwait(false);
    // }


}

