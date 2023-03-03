export default [
  //setting
  {
    path: "/setting",
    name: "setting",
    component: () => import("../../views/setting/AccountSettings.vue"),
  },
  // user
  {
    path: "/user",
    name: "user.index",
    component: () => import("../../views/user/Index.vue"),
  },
  {
    path: "/user/create",
    name: "user.create",
    component: () => import("../../views/user/Create.vue"),
  },
  {
    path: "/user/:user",
    name: "user.show",
    component: () => import("../../views/user/Show.vue"),
  },
  {
    path: "/user-trash",
    name: "user.trash",
    component: () => import("../../views/user/UserTrash.vue"),
  },
  {
    path: "/user/:user/edit",
    name: "user.edit",
    component: () => import("../../views/user/Edit.vue"),
  },
  // category
  {
    path: "/category",
    name: "category.index",
    component: () => import("../../views/category/Index.vue"),
  },
  {
    path: "/category/create",
    name: "category.create",
    component: () => import("../../views/category/Create.vue"),
  },
  {
    path: "/category/:category/edit",
    name: "category.edit",
    component: () => import("../../views/category/Edit.vue"),
  },
  {
    path: "/category/:category/show",
    name: "category.show",
    component: () => import("../../views/category/Show.vue"),
  },
  // table
  {
    path: "/table",
    name: "table.index",
    component: () => import("../../views/table/Index.vue"),
  },

  {
    path: "/table/create",
    name: "table.create",
    component: () => import("../../views/table/Create.vue"),
  },
  {
    path: "/table/:table/edit",
    name: "table.edit",
    component: () => import("../../views/table/Edit.vue"),
  },
  {
    path: "/table/:table/show",
    name: "table.show",
    component: () => import("../../views/table/Show.vue"),
  },
  // supplier
  {
    path: "/supplier",
    name: "supplier.index",
    component: () => import("../../views/supplier/Index.vue"),
  },
  {
    path: "/supplier/create",
    name: "supplier.create",
    component: () => import("../../views/supplier/Create.vue"),
  },
  {
    path: "/supplier/:supplier/edit",
    name: "supplier.edit",
    component: () => import("../../views/supplier/Edit.vue"),
  },
  {
    path: "/supplier/:supplier/show",
    name: "supplier.show",
    component: () => import("../../views/supplier/Show.vue"),
  },

  // menu
  {
    path: "/menu",
    name: "menu.index",
    component: () => import("../../views/menu/Index.vue"),
  },
  {
    path: "/menu/create",
    name: "menu.create",
    component: () => import("../../views/menu/Create.vue"),
  },
  {
    path: "/menu/:menu/edit",
    name: "menu.edit",
    component: () => import("../../views/menu/Edit.vue"),
  },
  {
    path: "/menu/:menu/show",
    name: "menu.show",
    component: () => import("../../views/menu/Show.vue"),
  },

  // purchase
  {
    path: "/purchase",
    name: "purchase.index",
    component: () => import("../../views/purchase/Index.vue"),
  },
  // {
  //   path: "/purchase/create",
  //   name: "purchase.create",
  //   component: () => import("../../views/purchase/Create.vue"),
  // },
  // {
  //   path: "/purchase/:purchase/edit",
  //   name: "purchase.edit",
  //   component: () => import("../../views/purchase/Edit.vue"),
  // },
  {
    path: "/purchase/show",
    name: "purchase.show",
    component: () => import("../../views/purchase/Show.vue"),
  },

  {
    path: "/purchase/:purchase/detail",
    name: "purchase.detail",
    component: () => import("../../views/purchase/Detail.vue"),
  },

  // chasier
  {
    path: "/cashier",
    name: "cashier.index",
    component: () => import("../../views/cashier/Index.vue"),
  },

  //report
  {
    path: "/purchase-report",
    name: "purchase.report",
    component: () => import("../../views/report/purchase/PurchaseReport.vue"),
  },
  {
    path: "/purchaseDetailBySupplier-report",
    name: "purchaseDetailBySupplier.report",
    component: () =>
      import("../../views/report/purchase/PurchaseDetailBySupplierReport.vue"),
  },
  {
    path: "/purchaseSummaryBySupplier-report",
    name: "purchaseSummaryBySupplier.report",
    component: () => import("../../views/report/purchase/PurchaseSummaryBySupplier.vue"),
  },

      // page not found handler
      { path: "*", component: () => import('../../views/errors/PageNotFound.vue') }

];
