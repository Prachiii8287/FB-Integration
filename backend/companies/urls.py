from django.urls import path
# from . import views # Removed as template views are no longer used
from . import views

app_name = 'companies'

urlpatterns = [
    # API endpoints for companies
    path('api/register/', views.CompanyRegistrationView.as_view(), name='api_company_register'),
    path('api/profile/<uuid:id>/', views.CompanyDetailView.as_view(), name='api_company_profile'),
    
    # API endpoints for departments
    path('api/departments/', views.DepartmentListCreateView.as_view(), name='api_department_list_create'),
    path('api/departments/<uuid:id>/', views.DepartmentDetailView.as_view(), name='api_department_detail'),

    # API endpoints for admin users
    path('api/admin-users/', views.AdminUserListCreateView.as_view(), name='api_admin_user_list_create'),
    path('api/admin-users/<uuid:id>/', views.AdminUserDetailView.as_view(), name='api_admin_user_detail'),

    # Removed template-based URLs
    # path('register/', views.register_company, name='register'),
    # path('dashboard/', views.company_dashboard, name='company_dashboard'),
    # path('profile/', views.company_profile, name='company_profile'),
    # path('admin_dashboard/', views.admin_dashboard, name='admin_dashboard'),
    # path('admin-users/', views.admin_users, name='admin_users'),
    # path('admin-users/<uuid:user_id>/delete/', views.delete_admin_user, name='delete_admin_user'),
    # path('departments/', views.department_list, name='department_list'),
    # path('departments/add/', views.add_department, name='add_department'),
    # path('departments/<uuid:department_id>/edit/', views.edit_department, name='edit_department'),
    # path('departments/<uuid:department_id>/delete/', views.delete_department, name='delete_department'),
] 