using System;
using System.Collections.Generic;
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
        public static List<string> GetRxCuisForFentanylandRiz()
        {
            return new List<string>() { "313992", "330765" };
        }
        public static string GetInteractionsForFentanylandRiz()
        {
            return "{\"nlmDisclaimer\":\"It is not the intention of NLM to provide specific medical advice, but rather to provide users with information to better understand their health and their medications. NLM urges you to consult with a qualified physician for advice about medications.\",\"userInput\":{\"sources\":[\"\"],\"rxcuis\":[\"313992\",\"330765\"]},\"fullInteractionTypeGroup\":[{\"sourceDisclaimer\":\"DrugBank is intended for educational and scientific research purposes only and you expressly acknowledge and agree that use of DrugBank is at your sole risk. The accuracy of DrugBank information is not guaranteed and reliance on DrugBank shall be at your sole risk. DrugBank is not intended as a substitute for professional medical advice, diagnosis or treatment..[www.drugbank.ca]\",\"sourceName\":\"DrugBank\",\"fullInteractionType\":[{\"comment\":\"Drug1 (rxcui = 313992, name = fentanyl 0.6 MG Oral Lozenge, tty = SCD). Drug2 (rxcui = 330765, name = rizatriptan 10 MG, tty = SCDC). Drug1 is resolved to fentanyl, Drug2 is resolved to rizatriptan and interaction asserted in DrugBank between Fentanyl and Rizatriptan.\",\"minConcept\":[{\"rxcui\":\"313992\",\"name\":\"fentanyl 0.6 MG Oral Lozenge\",\"tty\":\"SCD\"},{\"rxcui\":\"330765\",\"name\":\"rizatriptan 10 MG\",\"tty\":\"SCDC\"}],\"interactionPair\":[{\"interactionConcept\":[{\"minConceptItem\":{\"rxcui\":\"4337\",\"name\":\"fentanyl\",\"tty\":\"IN\"},\"sourceConceptItem\":{\"id\":\"DB00813\",\"name\":\"Fentanyl\",\"url\":\"http://www.drugbank.ca/drugs/DB00813#interactions\"}},{\"minConceptItem\":{\"rxcui\":\"88014\",\"name\":\"rizatriptan\",\"tty\":\"IN\"},\"sourceConceptItem\":{\"id\":\"DB00953\",\"name\":\"Rizatriptan\",\"url\":\"http://www.drugbank.ca/drugs/DB00953#interactions\"}}],\"severity\":\"N/A\",\"description\":\"The risk or severity of adverse effects can be increased when Fentanyl is combined with Rizatriptan.\"}]}]}]}";
        }
        

    }
}