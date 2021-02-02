import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import SessionManager, { IServiceUser } from "@Core/session";
import { IMedicationConceptDTO } from "@Models/IMedicationConceptDTO";
import { IMedicationInteractionPair } from "@Models/IMedicationInteractionPair";
import { IPatientListModel } from "@Models/IPatientListModel";

export default class InteractionService extends ServiceBase {
  public async getInteractions(
    id: string = null
  ): Promise<Result<any>> {
    const result = await this.requestJson({
      url: `/api/interaction/${id}`,
      method: "GET",
    });
    return result;
  }
  public async getMedications(
    id: string = null
  ): Promise<Result<IMedicationConceptDTO[]>> {
    const result = await this.requestJson<IMedicationConceptDTO[]>({
      url: `/api/interaction/medications/${id}`,
      method: "GET",
    });
    return result;
  }
}
