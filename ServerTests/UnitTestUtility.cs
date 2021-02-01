using System;
using LockStepBlazor.Data.Models;

namespace ServerTests
{

    public static class UnitTestUtility
    {
        public static MedicationConceptDTO GetFentanylDTOasRequest()
        {
            return new MedicationConceptDTO()
            {
                FhirType = "MedicationRequest",
                CodeString = "codeString1",
                Prescriber = "Dr. No",
                ResourceId = "123456",
                RxCui = "313992",
                Text = "Fentanyl",
                Sys = "snomed",
                TimeOrdered = new DateTimeOffset(2020, 2, 1, 5, 15, 15, 1, new TimeSpan(5, 0, 0))


            };
        }
        public static MedicationConceptDTO GetRizatriptanDTOasRequest()
        {
            return new MedicationConceptDTO()
            {
                FhirType = "MedicationRequest",
                CodeString = "codeString2",
                Prescriber = "Dr. No",
                ResourceId = "654321",
                RxCui = "330765",
                Text = "Rizatriptan",
                Sys = "snomed",
                TimeOrdered = new DateTimeOffset(2020, 2, 1, 5, 15, 15, 1, new TimeSpan(5, 0, 0))


            };
        }


    }
}