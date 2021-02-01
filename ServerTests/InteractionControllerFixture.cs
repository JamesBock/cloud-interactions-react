using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using LockStepBlazor.Data.Services;
using Xunit;
using LockStepBlazor.Data.Models;
using System.Linq;
using System.Threading.Tasks;
using ReactTypescriptBP.Controllers;
using ReactTypescriptBP.Infrastructure;
using LockStepBlazor.Application.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using MediatR;
using LockStepBlazor.Data;
using Microsoft.AspNetCore.Mvc;
using DeepEqual.Syntax;
// using System.Linq.Async;

namespace ServerTests
{


    public class InteractionControllerFixture
    {
        private IMemoryCache cache = new MemoryCache(new MemoryCacheOptions());
        private MockPatientDataService patientDataService;
        private InteractionController systemUnderTest;

        public MockPatientDataService PatientDataService
        {
            get
            {
                if (patientDataService == null)

                {
                    patientDataService = new MockPatientDataService();
                }
                return patientDataService;
            }
        }

        public InteractionController SystemUnderTest
        {
            get
            {
                if (systemUnderTest == null)

                {
                    systemUnderTest = new InteractionController(patientDataService, cache);
                }
                return systemUnderTest;
            }
        }

        [Fact]
        public void WhenMedicationsIsCalledThenFentanyAndRizatriptanAreReturned()
        {

            //assemble
            var meds = new IGetFhirMedications.Model()
            {
                Requests = new List<MedicationConceptDTO>()
                {
                    UnitTestUtility.GetFentanylDTOasRequest(),
                    UnitTestUtility.GetRizatriptanDTOasRequest(),
             }
            };
            PatientDataService.MedDTOs = meds;

            //act
            var model = SystemUnderTest.GetMedications("dummyId");
            var expected = SystemUnderTest.Json(new Result<List<MedicationConceptDTO>>(meds.Requests));
            //assert
            expected.ShouldDeepEqual(model.Result);
        }
    }
}