var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { VendorComponent } from "../helper/vendor/vendor.component";
var routes = [
    { path: 'tabs', loadChildren: '../pages/tabs/tabs.module#TabsPageModule' },
    { path: 'dashboard', loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule' },
    { path: '', loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule' },
    { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
    { path: 'pm-survey-dashboard', loadChildren: '../pages/pm-survey-dashboard/pm-survey-dashboard.module#PMSurveyDashboardPageModule' },
    { path: 'forgotpassword', loadChildren: '../pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
    { path: 'settings', loadChildren: '../pages/settings/settings.module#SettingsPageModule' },
    { path: 'gmdashboard', loadChildren: '../pages/gmdashboard/gmdashboard.module#GMDashboardPageModule' },
    { path: 'expenseCategories', loadChildren: '../pages/expense-categories/expense-categories.module#ExpenseCategoriesPageModule' },
    { path: 'showExpense', loadChildren: '../pages/show-expense/show-expense.module#ShowExpensePageModule' },
    { path: 'add-expense', loadChildren: '../pages/add-expense/add-expense.module#AddExpensePageModule' },
    { path: 'add-vendor', loadChildren: '../pages/add-vendor/add-vendor.module#AddVendorPageModule' },
    { path: 'vendor-list', loadChildren: '../pages/vendor-list/vendor-list.module#VendorListPageModule' },
    // { path: 'update-vendor', loadChildren: '../pages/update-vendor/update-vendor.module#UpdateVendorPageModule' },
    { path: 'update-forecast', loadChildren: '../pages/update-forecast/update-forecast.module#UpdateForecastPageModule' },
    { path: 'search', loadChildren: '../pages/search/search.module#SearchPageModule' },
    { path: 'SearchList', loadChildren: '../pages/search-inner/search-inner.module#SearchInnerPageModule' },
    { path: 'Department', loadChildren: '../pages/department/department.module#DepartmentPageModule' },
    { path: 'update-expense', loadChildren: '../pages/update-expense/update-expense.module#UpdateExpensePageModule' },
    { path: 'capitalExpense', loadChildren: '../pages/capital-expense/capital-expense.module#CapitalExpensePageModule' },
    { path: 'CapitalExpenseInner', loadChildren: '../pages/capital-expense-inner/capital-expense-inner.module#CapitalExpenseInnerPageModule' },
    { path: 'addCapitalExpense', loadChildren: '../pages/add-capital-expense/add-capital-expense.module#AddCapitalExpensePageModule' },
    { path: 'export-invoices', loadChildren: '../pages/export-invoices/export-invoices.module#ExportInvoicesPageModule' },
    { path: 'export-invoice-inner', loadChildren: '../pages/export-invoice-inner/export-invoice-inner.module#ExportInvoiceInnerPageModule' },
    { path: 'dashboard-pm', loadChildren: '../pages/dashboard-pm/dashboard-pm.module#DashboardPmPageModule' },
    { path: 'change-password', loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule' },
    { path: 'edit-profile', loadChildren: '../pages/edit-profile/edit-profile.module#EditProfilePageModule' },
    { path: 'profile', loadChildren: '../pages/profile/profile.module#ProfilePageModule' },
    { path: 'search-invoices', loadChildren: '../pages/search-invoices/search-invoices.module#SearchInvoicesPageModule' },
    { path: 'search-invoices-results', loadChildren: '../pages/search-invoices-results/search-invoices-results.module#SearchInvoicesResultsPageModule' },
    { path: 'vendor', component: VendorComponent },
    { path: 'invoice-progress', loadChildren: '../pages/invoice-progress/invoice-progress.module#InvoiceProgressPageModule' },
    { path: 'CapitalExpenseCatPage', loadChildren: '../models/capital-expense-cat/capital-expense-cat.module#CapitalExpenseCatPageModule' },
    { path: 'notifications', loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule' },
    { path: 'relloacate-amount', loadChildren: '../models/relloacate-amount/relloacate-amount.module#RelloacateAmountPageModule' },
    { path: 'view-pm-survey', loadChildren: '../pages/view-pm-survey/view-pm-survey.module#ViewPmSurveyPageModule' },
    { path: 'survey-by-popup', loadChildren: '../models/survey-by-popup/survey-by-popup.module#SurveyByPopupPageModule' }
    //  { path: '', redirectTo: '../pages/tabs/(tab1:tab1)', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map