import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import SessionManager, { IServiceUser } from "@Core/session";
import { IPatientModel } from "@Models/IPatientModel";
import { IPatientListModel } from "@Models/IPatientListModel";

export default class PatientService extends ServiceBase {
  public async search(
    firstName: string = null
  
  ): Promise<Result<IPatientListModel>> {
    // var url = `/api/Patient/Search?`;

    // if (lastName !==null && lastName !=="" && firstName !== null && firstName !=="" ) {
    //   url = `${url}firstName=${firstName}&lastName=${lastName}`;
    // } else {
    //   firstName = firstName !==null && firstName !==""  ? `firstName=${firstName}`: "" ;
    //   lastName = lastName !==null && lastName !==""? `lastName=${lastName}` : "" ;
    //   url = `${url}${firstName}${lastName}`;
    // }
    var url =  `/api/Patient/Search?`
    if (firstName == null) {
      firstName = "";
      url = url+firstName;
    }
    // if (lastName == null) {
    //   lastName = "";
    //   url = `${url}&${lastName}`;
    // }
    // var result = await this.requestJson<IPatientListModel>({
    //   url: url,
    //   method: "GET",
    // });
    // return result;
    var result = await this.requestJson<IPatientListModel>({
      url: url,
      method: "GET",
    });
    return result;
  }
  
  public async read(id: string = null): Promise<Result<IPatientModel>> {
    var result = await this.requestJson<IPatientModel>({
      url: `/api/Patient/Read?${id}`,
      method: "GET",
    });
    return result;
  }
}
