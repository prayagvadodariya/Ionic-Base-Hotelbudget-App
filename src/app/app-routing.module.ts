
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authguard/auth.guard';
import { VendorComponent } from "../helper/vendor/vendor.component";

const routes: Routes = [

  { path: 'tabs', loadChildren: '../pages/tabs/tabs.module#TabsPageModule'  },
  { path: 'dashboard', loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule'},
  { path: '', loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule'},
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
  { path: 'department', loadChildren: '../pages/department/department.module#DepartmentPageModule' },
  { path: 'updateExpense', loadChildren: '../pages/update-expense/update-expense.module#UpdateExpensePageModule' },
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
  { path: 'vendor',  component: VendorComponent },
  // { path: 'capital-expense-cat',loadChildren: '../'}
  { path: 'invoiceProgress', loadChildren: '../pages/invoice-progress/invoice-progress.module#InvoiceProgressPageModule' },
  { path: 'expense-progress', loadChildren: '../pages/expense-progress/expense-progress.module#ExpenseProgressPageModule' },
  { path: 'capital-expense-cat', loadChildren: '../models/capital-expense-cat/capital-expense-cat.module#CapitalExpenseCatPageModule' },
  { path: 'notifications', loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule' },
  { path: 'relloacate-amount', loadChildren: '../models/relloacate-amount/relloacate-amount.module#RelloacateAmountPageModule' },
  { path: 'view-pm-survey', loadChildren: '../pages/view-pm-survey/view-pm-survey.module#ViewPmSurveyPageModule' },
  { path: 'survey-by-popup', loadChildren: '../models/survey-by-popup/survey-by-popup.module#SurveyByPopupPageModule' },
  { path: 'pm-dashboard', loadChildren: '../pages/pm-dashboard/pm-dashboard.module#PmDashboardPageModule' },
  { path: 'pmDashboardStatus', loadChildren: '../pages/pm-dashboard-status/pm-dashboard-status.module#PmDashboardStatusPageModule' },
  // { path: 'pm-dashboard-room-survey', loadChildren: '../pages/pm-dashboard-room-survey/pm-dashboard-room-survey.module#PmDashboardRoomSurveyPageModule' },
  // { path: 'pm-dashboard-survey-status', loadChildren: '../pages/pm-dashboard-survey-status/pm-dashboard-survey-status.module#PmDashboardSurveyStatusPageModule' },
  { path: 'manage-room', loadChildren: '../pages/manage-room/manage-room.module#ManageRoomPageModule' },
  { path: 'm3-export-invoice', loadChildren: '../pages/m3-export-invoice/m3-export-invoice.module#M3ExportInvoicePageModule' },
  { path: 'm3-export-capital-invoices', loadChildren: '../pages/m3-export-capital-invoices/m3-export-capital-invoices.module#M3ExportCapitalInvoicesPageModule' },
  { path: 'export-invoice-list', loadChildren: '../pages/export-invoice-list/export-invoice-list.module#ExportInvoiceListPageModule' },
  { path: 'export-capital-invoices-list', loadChildren: '../pages/export-capital-invoices-list/export-capital-invoices-list.module#ExportCapitalInvoiceListPageModule' },
  { path: 'customer-support', loadChildren: '../pages/customer-support/customer-support.module#CustomerSupportPageModule' },
  { path: 'manage-category', loadChildren: '../pages/manage-category/manage-category.module#ManageCategoryPageModule' },
  { path: 'manage-items', loadChildren: '../pages/manage-items/manage-items.module#ManageItemsPageModule' },
  { path: 'addsignature', loadChildren: '../pages/addsignature/addsignature.module#AddsignaturePageModule'},
  { path: 'guide', loadChildren: '../pages/guide/guide.module#GuidePageModule' },
  { path: 'addcategoty', loadChildren: '../pages/addcategoty/addcategoty.module#AddcategotyPageModule' },
  { path: 'pm-survey', loadChildren: '../pages/pm-survey/pm-survey.module#PmSurveyPageModule' },
  { path: 'pm-notification', loadChildren: '../pages/pm-notification/pm-notification.module#PmNotificationPageModule' },
  { path: 'add-item', loadChildren: '../pages/add-item/add-item.module#AddItemPageModule' },
  { path: 'add-room', loadChildren: '../pages/add-room/add-room.module#AddRoomPageModule' },
  { path: 'rmdashboard', loadChildren: '../pages/rmdashboard/rmdashboard.module#RMDashboardPageModule' },
  { path: 'pass-on-notes', loadChildren: '../pages/pass-on-notes/pass-on-notes.module#PassOnNotesPageModule' },
  { path: 'expense-search', loadChildren: '../pages/expense-search/expense-search.module#ExpenseSearchPageModule' },
  { path: 'create-pass-on-note', loadChildren: '../pages/create-pass-on-note/create-pass-on-note.module#CreatePassOnNotePageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'manage-teams', loadChildren: './pages/manage-teams/manage-teams.module#ManageTeamsPageModule' },
  { path: 'add-team', loadChildren: './pages/add-team/add-team.module#AddTeamPageModule' },
  { path: 'show-pass-on-note', loadChildren: '../pages/show-pass-on-note/show-pass-on-note.module#ShowPassOnNotePageModule' },
  { path: 'work-order', loadChildren: './pages/work-order/work-order.module#WorkOrderPageModule' },
  { path: 'create-work-order', loadChildren: './pages/create-work-order/create-work-order.module#CreateWorkOrderPageModule' },
  { path: 'work-order-details', loadChildren: './pages/work-order-details/work-order-details.module#WorkOrderDetailsPageModule' },
  { path: 'tax-exempt', loadChildren: './pages/tax-exempt/tax-exempt.module#TaxExemptPageModule' },
  { path: 'exemption-certificate', loadChildren: './pages/exemption-certificate/exemption-certificate.module#ExemptionCertificatePageModule' },
  { path: 'module-sign-page', loadChildren: '../models/module-sign-page/module-sign-page.module#ModuleSignPagePageModule' },
  { path: 'add-tax-exempt', loadChildren: './pages/add-tax-exempt/add-tax-exempt.module#AddTaxExemptPageModule' },
  { path: 'manage-work-order', loadChildren: './pages/manage-work-order/manage-work-order.module#ManageWorkOrderPageModule' },
  { path: 'update-pm-survey', loadChildren: '../pages/update-pm-survey/update-pm-survey.module#UpdatePmSurveyPageModule' },
  { path: 'service-request', loadChildren: './pages/service-request/service-request.module#ServiceRequestPageModule' },
  { path: 'service-request-details', loadChildren: './pages/service-request-details/service-request-details.module#ServiceRequestDetailsPageModule' },
  { path: 'add-request', loadChildren: './pages/add-request/add-request.module#AddRequestPageModule' },
  { path: 'edit-request', loadChildren: './pages/edit-request/edit-request.module#EditRequestPageModule' },
  { path: 'module-show-notification-comment', loadChildren: '../models/module-show-notification-comment/module-show-notification-comment.module#ModuleShowNotificationCommentPageModule' },
  { path: 'view-progress', loadChildren: '../models/view-progress/view-progress.module#ViewProgressPageModule' },
  { path: 'module-sign-page', loadChildren: '../models/module-sign-page/module-sign-page.module#ModuleSignPagePageModule' },
  { path: 'module-image-page', loadChildren: '../models/module-image-page/module-image-page.module#ModuleImagePagePageModule' },
  { path: 'modul-view-progress-new', loadChildren: '../models/modul-view-progress-new/modul-view-progress-new.module#ModulViewProgressNewPageModule' },
  { path: 'report-budget', loadChildren: './pages/report-budget/report-budget.module#ReportBudgetPageModule' },
  { path: 'modal-filtering', loadChildren: '../models/modal-filtering/modal-filtering.module#ModalFilteringPageModule' },
  { path: 'module-notification-pendding', loadChildren: '../models/module-notification-pendding/module-notification-pendding.module#ModuleNotificationPenddingPageModule' },
  { path: 'web-view-show-page', loadChildren: './web-view-show-page/web-view-show-page.module#WebViewShowPagePageModule' },
  { path: 'web-view-show-page2', loadChildren: './web-view-show-page2/web-view-show-page2.module#WebViewShowPage2PageModule' },
  { path: 'module-show-notification-comment2', loadChildren: './module-show-notification-comment2/module-show-notification-comment2.module#ModuleShowNotificationComment2PageModule' },
  { path: 'pm-survey2', loadChildren: '../pages/pm-survey2/pm-survey2.module#PmSurvey2PageModule' },
  { path: 'update-pm-survey2', loadChildren: '../pages/update-pm-survey2/update-pm-survey2.module#UpdatePmSurvey2PageModule' },







  // { path: 'add-expense', loadChildren: './pages/add-expense/add-expense.module#AddExpensePageModule' },



  // { path: 'pm-servey-new', loadChildren: './pages/pm-servey-new/pm-servey-new.module#PmServeyNewPageModule' },



  //  { path: '', redirectTo: '../pages/tabs/(tab1:tab1)', pathMatch: 'full' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}