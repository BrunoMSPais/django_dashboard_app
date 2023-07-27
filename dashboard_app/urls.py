from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("get-total-sales", views.getTotalSales, name="get total sales"),
    path(
        "get-anual-sales-report",
        views.getAnualSalesReport,
        name="get anual sales report",
    ),
    path("get-sales-by-product", views.getTop3Products, name="get sales by product"),
    path("get-sales-by-seller", views.getTop3Sellers, name="get sales by seller"),
]
