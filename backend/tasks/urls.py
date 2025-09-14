from django.urls import path
from . import views



urlpatterns = [
    path("tasks/", views.TaskListView.as_view(), name = "tasks"),
    path("tasks/<int:pk>/", views.EditDeleteTaskView.as_view(), name = "manage-tasks"),
    path("tasks/completed/", views.TaskCompletedView.as_view(), name = "completed-tasks"),
]
