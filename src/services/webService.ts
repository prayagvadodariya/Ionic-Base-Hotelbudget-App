import { Injectable } from '@angular/core';
import { WebServiceHandler } from './webServiceHandler';
import { Constant } from './constant';
import { map } from 'rxjs/operators';
import { Http, RequestOptions, Headers } from '@angular/http';
@Injectable()

export class WebService {

  public BASE_URL: string = this.constant.BASE_URL;
  public BASE_URL_NEW: string = this.constant.BASE_URL_NEW;

  constructor(private constant: Constant, public WebserviceHandler: WebServiceHandler,private http: Http) {
  }

 



 //----------------------------------Version---------------------------------------//
 //----------------------------------Version---------------------------------------//


    getAppVersion(Parameter) {

        var URL = this.BASE_URL + 'app-version/get';
        return this.WebserviceHandler.Post(URL,Parameter).pipe(map(data => {
            return data.json();
        }, error => {
            return error;
        }));
    }


  //----------------------------------User---------------------------------------//

  // LoginApi
  GetLoginPageApi(Parameter) {
    var URL = this.BASE_URL_NEW + 'user/login';
    return this.WebserviceHandler.Post(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;

    }));
  }

  //onLogoutApi
  onLogoutApi(Parameter)
  {
    var URL = this.BASE_URL + 'Logout';
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;

    }));

  }

  //getUserProfileAPI
  getUserProfileAPI(Parameter)
  {
    var URL = this.BASE_URL + 'GetUser';
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  GetForgotPasswordAPI(Parameter)
  {
    var URL = this.BASE_URL_NEW + 'user/forgot-password';
    return this.WebserviceHandler.Post(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //GetResetPasswordAPI
  GetResetPasswordAPI(Parameter)
  {
    var URL = this.BASE_URL_NEW + 'user/reset-password';
    return this.WebserviceHandler.Post(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));

  }
 //GetResetPasswordAPI
 SearchExpenseAPI(Parameter)
 {
   var URL = this.BASE_URL_NEW + 'api/SearchExpense';
   return this.WebserviceHandler.Post(URL, Parameter).pipe(map(data => {
     return data.json();
   }, error => {
     return error;
  }));

 }
  //updateUserProfileAPI
  updateUserProfileAPI(Parameter)
  {
    var URL = this.BASE_URL + 'EditUser';
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //changePasswordAPI
  changePasswordAPI(Parameter)
  {
    var URL = this.BASE_URL + 'ChangePassword';
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //getStateAPI
  getStateAPI(Parameter)
  {
    var URL = this.BASE_URL + 'GetState';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //addVendorAPI
  addVendorAPI(Parameter)
  {
    var URL = this.BASE_URL + 'vendor/add';
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));

  }
  //getVendorAPI
  getVendorAPI(Parameter)
  {
    var URL = this.BASE_URL + 'vendor/list';
    return this.WebserviceHandler.PostWithHeader(URL, Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));

  }

  //DateFilterApi
  DateFilterApi()
  {
    var URL = this.BASE_URL + 'DateFilterApi';
    return this.WebserviceHandler.Get(URL).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }


  
  //------------------------------Capital Expense Module-----------------------------------//
  //getCapitalExpenseAccountListAPI
  getCapitalExpenseAccountListAPI(Parameter)
  {
    var URL = this.BASE_URL + 'GetCapitalExpenseAccountList';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //AddCapitalExpenseAPI
  AddCapitalExpenseAPI(Parameter)
  {
    var URL = this.BASE_URL + 'AddCapitalExpense';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //GetCapitalExpenseForEditAPI
  GetCapitalExpenseForEditAPI(Parameter)
  {
    var URL = this.BASE_URL + 'GetCapitalExpenseForEdit';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));

  }

  //editCapitalExpenseAPI
  editCapitalExpenseAPI(Parameter)
  {
    var URL = this.BASE_URL + 'EditCapitalExpense';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //AddCapitalExpenseAccountAPI
  AddCapitalExpenseAccountAPI(Parameter)
  {
    var URL = this.BASE_URL + 'AddCapitalExpenseAccount';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //getGetDepartmentListAPI
  getDepartmentListAPI(Parameter)
  {
    var URL = this.BASE_URL + 'GetDepartmentList';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //getCategoryListAPI
  getCategoryListAPI(Parameter)
  {
    var URL = this.BASE_URL + 'GetCategoryList';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //getDashboardDataAPI
  getDashboardDataAPI(Parameter)
  {
    var URL = this.BASE_URL + 'Dashboard';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));

  }
 // getvendorDetailAPI
  getvendorDetailAPI(Parameter)
  {
    var URL = this.BASE_URL + 'GetVendorForEdit';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }

  //updateVendorClickAPI
  updateVendorClickAPI(Parameter)
  {
    var URL = this.BASE_URL + 'vendor/get-vendor';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }
//------------------------------------------Expense--------------------------------------------//
  //getConfirmExpenseAPI
  getConfirmExpenseAPI(Parameter)
  {
    var URL = this.BASE_URL + 'ConfirmExpense';
    return this.WebserviceHandler.PostWithHeader(URL,Parameter).pipe(map(data => {
      return data.json();
    }, error => {
      return error;
   }));
  }
  
}