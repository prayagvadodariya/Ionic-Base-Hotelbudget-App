import { Injectable } from "@angular/core";
import { WebServiceHandler } from "./webServiceHandler";
import { Constant } from "./constant";
import { map } from "rxjs/operators";
import { Http, RequestOptions, Headers } from "@angular/http";
@Injectable()
export class webServicenew {
  public BASE_URL_NEW: string = this.constant.BASE_URL_NEW;
  public BASE_URL: string = this.constant.BASE_URL;

  constructor(
    private constant: Constant,
    public WebserviceHandler: WebServiceHandler,
    private http: Http
  ) {}

  //DateFilterApi
  DateFilterApi() {
    var URL = this.BASE_URL_NEW + "Date_filter";
    return this.WebserviceHandler.Get(URL).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  // LoginApi
  GetLoginPageApi(Parameter) {
    var URL = this.BASE_URL_NEW + "user/login";
    // var URL = this.BASE_URL_NEW + 'user.php';
    return this.WebserviceHandler.Post(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getDashboardDataAPI
  getDashboardDataAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "Dashboard";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getVendorAPI
  getVendorAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "vendor/list";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getVendorAPI
  getCapitalExpenseAPI(Parameter) {
    // console.log(Parameter);
    var URL = this.BASE_URL_NEW + "CapitalExpense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getCapitalHotelExpAPI
  getCapitalHotelExpAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getCapitalExpenseData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //GetAllNotificationListApi
  getAllNotificationListAPI(Parameter) {
    //old 
    // var URL = this.BASE_URL_NEW + "getAllNotification";
    // All Accept and All reject 
    var URL = this.BASE_URL_NEW + "getmoreNotificationList";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getNotificationListAPI
  getNotificationListAPI(Parameter) {
    //old 
    // var URL = this.BASE_URL_NEW + "getAllNotification";
    // All Accept and All reject 
    var URL = this.BASE_URL_NEW + "getAllNotificationNew";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //Notification - Get Comment List

  getCommentListAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getCommentList";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }


   //Notification - Add 

   getCommentadd(Parameter) {
    var URL = this.BASE_URL_NEW + "addNotificationComment";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //approveNotificationAPI
  approveNotificationAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "approvenotificationData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }


  //ResubmitNotificationAPI
  ResubmitNotificationAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "resubmitNotification";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  //onLogoutApi
  onLogoutApi(Parameter) {
    var URL = this.BASE_URL_NEW + "user/logout";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getCapitalExpDataAPI
  getCapitalExpDataAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getCapitalExpense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  //getCategotyListAPI
  getCategoryListAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "Expense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  //getExpenseListAPI
  getExpenseListAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "ExpenseRemaning";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getDepartmentListAPI
  getDepartmentListAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "GetDepartment";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getCategoryListAPI
  getExpenselistAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "category_list";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //getCategoryListAPI2
   getExpenselistAPI2(Parameter) {
    var URL = this.BASE_URL_NEW + "category_list";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  confirmExpenselistAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "ConfirmExpense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }


/// search Expence

searchExpenceAPI(Parameter) {
  var URL = this.BASE_URL_NEW + "SearchExpense";
  return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
    map(
      data => {
        return data.json();
      },
      error => {
        return error;
      }
    )
  );
}

getExpenseData(Parameter){
  var URL = this.BASE_URL_NEW + "GetExpenseData";
  return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
    map(
      data => {
        return data.json();
      },
      error => {
        return error;
      }
    )
  );
}
deleteExpenseData(Parameter){
  var URL = this.BASE_URL_NEW + "deleteExpense";
  return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
    map(
      data => {
        return data.json();
      },
      error => {
        return error;
      }
    )
  );
}


  //getConfirmExpenseAPI
  getConfirmExpenseAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "ConfirmExpense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  //serachExpenseAPI
  serachExpenseAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "SearchExpense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //addVendorAPI
  addVendorAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "vendor/add";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //updateVendorClickAPI
  updateVendorClickAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "vendor/update";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //addExpenseAPI
  addExpenseAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "AddExpense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getUserProfileAPI
  getUserProfileAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "ProfileView";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //changePasswordAPI
  changePasswordAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "user/update-password";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getCapitalExpenseAccountListAPI
  getCapitalExpenseAccountListAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getCapitalExpenseAccountData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

 ExpenseListAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "Expense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //AddCapitalExpenseAccountAPI
  AddCapitalExpenseAccountAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "addCapitalExpenseAccountData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //AddCapitalExpenseAPI
  AddCapitalExpenseAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "addCapitalExpenseData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  UpdateCapitalExpenseAPI(Parameter){
    var URL = this.BASE_URL_NEW + "updateCapitalExpenseData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );

  }

  //deleteCapitalExpAPI
  deleteCapitalExpAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "deleteCapitalExpenseData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //updateCapitalExpenseAPI
  updateCapitalExpenseAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "updateCapitalExpenseData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //checkExpenseAPI
  checkExpenseAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "GetExpenseData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getdeleteExpenseAPI
  getdeleteExpenseAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "deleteExpense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getupdateExpenseAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "updateExpense";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //updateUserProfileAPI
  updateUserProfileAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "user/updateProfile";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //invoiceProgressAPI
  invoiceProgressAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "expenseProgress";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  CapitalExpenseProgressAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "capitalExpenseProgress";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  /**
   * PM Module API List
   */
  getPMgetRooms(Parameter) {
    const URL = this.BASE_URL_NEW + "getPMRoom";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getPMSurveyRoomList(Parameter) {
    const URL = this.BASE_URL_NEW + "getPMSurveyRoomList";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getPMSurveyNewapione(Parameter) {
    const URL = this.BASE_URL_NEW + "getCategoryItems";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  pmSurveyRecords(Parameter) {
    const URL = this.BASE_URL_NEW + "getPMDashboardSurveyRecords";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  PMSurveyCategoryType(Parameter) {
    const URL = this.BASE_URL_NEW + "getPMSurveyCategoryType";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  PMSurveyCategoryAndItem(Parameter) {
    const URL = this.BASE_URL_NEW + "getPMSurveyCategoryAndItem";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  // Item Image Upload
  PMSurveyitemImageAdd(Parameter) {
    const URL = this.BASE_URL_NEW + "uploadSurveyItem";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  // New Pm servey add 2020
  PMSurveyitemAddNew(Parameter) {
    const URL = this.BASE_URL_NEW + "addPMRoomSurvey";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   // Update Pm servey add 2020
   PMSurveyitemUpdate(Parameter) {
    const URL = this.BASE_URL_NEW + "updatePMRoomSurvey";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  // Add Survey 
  PMSurveyAdd(Parameter) {
    const URL = this.BASE_URL_NEW + "addPMSurvey";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  addPMItem(Parameter) {
    const URL = this.BASE_URL_NEW + "addPMItem";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  addPMSurvey(Parameter) {
    const URL = this.BASE_URL_NEW + "deletePMSurvey";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getPMDashboardData(Parameter) {
    const URL = this.BASE_URL_NEW + "getPMDashboardData";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getPMAllSurveryAPI
  getPMAllSurveryAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getPMAllSurvey";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getPMRoomListAPI
  getPMAllRoomsAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getPMRoomList";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //Add Room
   addRoomAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "addPMRoom";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //Edit Room
  editRoomAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "updatePMRoom";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

    //Delete Room
    deleteRoomAPI(Parameter) {
      var URL = this.BASE_URL_NEW + "deletePMRoom";
      return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
        map(
          data => {
            return data.json();
          },
          error => {
            return error;
          }
        )
      );
    }

  //Update Room Status
  updateRoomStatusAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "updatePMRoomStatus";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  
 //getPMCategoryListForItemAPI
 getPMCategoryListForItemAPI(Parameter) {
  var URL = this.BASE_URL_NEW + "getPMCategoryListForItem";
  return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
    map(
      data => {
        return data.json();
      },
      error => {
        return error;
      }
    )
  );
}

  //getPMItemWiseDataForDashboard
  getPMItemWiseDataForDashboard(Parameter) {
    var URL = this.BASE_URL_NEW + "getPMItemWiseDataForDashboard";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //Get Category List
  getPMCategoryListAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getPMCategory";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //Add Category
  addPMCategoryApi(Parameter) {
    var URL = this.BASE_URL_NEW + "addPMCategory";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  //Edit Category
  editPMCategoryApi(Parameter) {
    var URL = this.BASE_URL_NEW + "updatePMCategory";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //Update Category Status
  updateCategoryStatusAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "updatePMCategoryStatus";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //Delete Category
   deletecategoryAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "deletePMCategory";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //Get Item List
   getPMItemListAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getPMItemList";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //Update Item Status
   updateItemStatusAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "updatePMItemStatus";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //Add Item
  addPMItemApi(Parameter) {
    var URL = this.BASE_URL_NEW + "addPMItem";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  //Edit Item
  editPMItemApi(Parameter) {
    var URL = this.BASE_URL_NEW + "updatePMItem";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //Delete Item
   deleteItemAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "deletePMItem";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //Get PM Notification List
   getPMNotificationAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getPMAllNotification";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getExportCapitalSubInvoices(Parameter) {
    var URL = this.BASE_URL_NEW + "getExportCapitalSubInvoices";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getBudgetForcastApi(Parameter) {
    var URL = this.BASE_URL_NEW + "getBudgetNForcast";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  saveForcastApi(Parameter) {
    var URL = this.BASE_URL_NEW + "saveForcast";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getExportSubInvoices(Parameter) {
    var URL = this.BASE_URL_NEW + "getExportSubInvoices";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //Get M3 Invoice
   getM3ExportInvoiceAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getM3ExportInvoice";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getM3ExportCapitalInvoiceAPI(Parameter) {
    var URL = this.BASE_URL_NEW + "getM3ExportCapitalInvoice";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //getPMViewSurveyAPI
  getPMViewSurveyAPI(Parameter)
  {
    var URL = this.BASE_URL_NEW + "getSurveyDataForView";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  //==================Pass-on-notes====================

  //getPassonNote
  getPassonNote(Parameter)
  {
    var URL = this.BASE_URL_NEW + "getAllPassonNotes";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   //getMyPassonNote
   getMyPassonNote(Parameter)
   {
     var URL = this.BASE_URL_NEW + "getUserPassonNotes";
     return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
       map(
         data => {
           return data.json();
         },
         error => {
           return error;
         }
       )
     );
   }

  //AddPassOnNote Data
  addPassonNote(Parameter)
  {
    var URL = this.BASE_URL_NEW + "addPassonNotes";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  EditPassOnNote(Parameter){
    var URL = this.BASE_URL_NEW + "updatePassOnNotes";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  DeleteNote(Parameter){
    var URL = this.BASE_URL_NEW + "deletePassonNotes";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }



  // ======================= Add Team Service =================
  AddTeamList(Parameter){
    var URL = this.BASE_URL_NEW + "team/Add";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }


   // ======================= Edit Team Service =================
   EditTeamList(Parameter){
    var URL = this.BASE_URL_NEW + "team/Update";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

   // ======================= Get User List (Team) Service =================
   GetUserList(Parameter){
    var URL = this.BASE_URL_NEW + "team/getUserList";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  getTeamList(Parameter){
    var URL = this.BASE_URL_NEW + "team/List";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  deleteTeam(Parameter){
    var URL = this.BASE_URL_NEW + "team/Delete";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  updateStatus(Parameter){
    var URL = this.BASE_URL_NEW + "team/updateStatus";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

  UpdatePinNote(Parameter){
    var URL = this.BASE_URL_NEW + "updatePassonNotesPinStatus";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

// Image delete Api

  ImagedelteArray(Parameter) {
    var URL = this.BASE_URL_NEW + "cutomer-support/removeImage";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }
  // Help Module /////

  

  HelpAdd(Parameter) {
    var URL = this.BASE_URL_NEW + "cutomer-support/help";
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(
      map(
        data => {
          return data.json();
        },
        error => {
          return error;
        }
      )
    );
  }

}
