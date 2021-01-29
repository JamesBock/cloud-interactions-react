import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import SessionManager, { IServiceUser } from "@Core/session";
import { IPatientModel } from "@Models/IPatientModel";
import { IPatientListModel } from "@Models/IPatientListModel";
import Axios from "axios";

export default class PatientService extends ServiceBase {
  public async search(
    limitTo: number,
    firstName: string = null
  ): Promise<Result<IPatientListModel>> {
    // const url = `/api/Patient/Search?`;

    // if (lastName !==null && lastName !=="" && firstName !== null && firstName !=="" ) {
    //   url = `${url}firstName=${firstName}&lastName=${lastName}`;
    // } else {
    //   firstName = firstName !==null && firstName !==""  ? `firstName=${firstName}`: "" ;
    //   lastName = lastName !==null && lastName !==""? `lastName=${lastName}` : "" ;
    //   url = `${url}${firstName}${lastName}`;
    // }
    const url = `/api/Patient/Search?limitTo=${limitTo}&`;
    if (firstName == null) {
      firstName = "";
    }
    const urlQuery = `${url}firstname=${firstName}`;
    // if (lastName == null) {
    //   lastName = "";
    //   url = `${url}&${lastName}`;
    // }
    // const result = await this.requestJson<IPatientListModel>({
    //   url: url,
    //   method: "GET",
    // });
    // return result;
    const result = await this.requestJson<IPatientListModel>({
      url: urlQuery,
      method: "GET",
    });
    return result;
  }

  public async next(nextLink: string, count: number): Promise<Result<IPatientListModel>>  {
    const result = await this.requestJson<IPatientListModel>({
      url: `/api/Patient/Next?count=${count}`,
      method: "GET",
    });
    return result;
  
  }
  public async read(id: string = null): Promise<Result<IPatientModel>> {
    const result = await this.requestJson<IPatientModel>({
      url: `/api/Patient/Read?${id}`,
      method: "GET",
    });
    return result;
  }
}
