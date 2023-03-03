<template>
  <v-container fluid>
    <v-card
      class="mb-3"
      :style="{ visibility: trigger ? 'hidden' : 'visible' }"
    >
      <v-card-title>Purchase Summary By Supplier Report</v-card-title>
    </v-card>
    <v-card class="mb-3">
      <v-divider></v-divider>
      <v-card-text>
        <v-form @submit.prevent>
          <v-row>
            <v-col class="py-0" cols="12" sm="6" md="4">
              <v-card-subtitle class="pl-0"> From Date </v-card-subtitle>
              <v-text-field
                type="date"
                outlined
                v-model="form.data.fromDate"
                dense
              />
            </v-col>
            <v-col class="py-0" cols="12" sm="6" md="4">
              <v-card-subtitle class="pl-0"> To Date </v-card-subtitle>
              <v-text-field
                type="date"
                outlined
                v-model="form.data.toDate"
                dense
              />
            </v-col>
            <v-col class="py-0" cols="12" sm="6" md="4">
              <v-card-subtitle class="pl-0"> Supplier </v-card-subtitle>
              <v-autocomplete
                v-model="supplierId"
                :items="supplierOpts"
                required
                item-text="name"
                item-value="_id"
                outlined
                clearable
                label="Supplier"
                return-object
                dense
              >
              </v-autocomplete>
              <!-- :rules="[(v) => !!v || 'Supplier is required']" -->
            </v-col>
          </v-row>
          <div class="text-right">
            <v-btn color="primary" @click="onSubmit()">
              <v-icon left> mdi-magnify </v-icon>
              Search</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mb-3 report-body" rounded>
      <v-toolbar flat class="pr-3" v-if="!visiblePrintInvoice">
        <!-- <v-btn text color="primary" small>
          <v-icon left> mdi-eye </v-icon>
          <span>Show</span>
        </v-btn> -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" text>
              <v-icon left> mdi-eye </v-icon>
              <span>Show</span>
            </v-btn>
          </template>
          <v-list
            v-for="(val, key) in showPart"
            :key="key"
            style="min-width: 100px"
          >
            <v-list-item>
              <v-list-item-title>
                <v-checkbox
                  v-model="showPart[key]"
                  :label="key"
                  :value="showPart[key]"
                  dense
                />
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" text>
              <v-icon left> mdi-table </v-icon>
              <span>Columns</span>
            </v-btn>
          </template>
          <v-list
            v-for="(val, key) in columns"
            :key="key"
            style="min-width: 100px"
          >
            <v-list-item>
              <v-list-item-title>
                <v-checkbox
                  v-model="checkedColumns"
                  :label="val.label"
                  :value="val.value"
                  dense
                  @change="changeVal"
                />
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn icon small @click="$_printReport()">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div class="exportTable">
        <div id="print-area" class="report-body">
          <v-card-text class="text-center">
            <!--REPORT HEADER-->
            <div v-if="showPart.header" class="header">
              <div class="report-name">Purchase Summary By Supplier Report</div>
              <div class="company-name kh-moul">
                ប្រព័ន្ធគ្រប់គ្រងអាហារដ្ឋាន ភូមិចិន
              </div>
            </div>

            <!-- <div  class="report-name">
          មជ្ឈមណ្ឌលបណ្តុះបណ្តាល រ៉ាប៊ីត
        </div> -->
            <!-- <p class="font-weight-bold #2c3e50--text">PURCHASE BY SUPPLIER</p> -->
          </v-card-text>
          <v-card-text>
            <!--REPORT FILTER-->
            <div v-if="showPart.filter" class="filter">
              <v-row>
                <v-col cols="12" sm="6" lg="4">
                  <span class="title"> Date : </span>
                  <span class="text-caption">
                    {{ form.data.fromDate }} - {{ form.data.toDate }}
                  </span>
                  <div class="ra-mt-sm" />
                </v-col>
                <v-col cols="12" sm="6" lg="4">
                  <span class="title"> Supplier : </span>
                  <span class="text-caption"> [ {{ supplierName }} ] </span>
                  <div class="ra-mt-sm" />
                </v-col>
              </v-row>
            </div>

            <!-- <v-row>
          <v-col cols="12" sm="6" md="4" class="text-uppercase">
            <span class="black--text text-subtitle-1"> Date: </span>
            <div class="text-sm-caption #2c3e50--text">
              [ {{ form.data.fromDate }} - {{ form.data.toDate }} ]
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="text-uppercase font-font-weight-medium"
          >
            <span class="black--text text-subtitle-1"> Supplier: </span>
            <div class="text-sm-caption #2c3e50--text">
              [ {{ supplierName }} ]
            </div>
          </v-col>
        </v-row> -->
          </v-card-text>
          <!--REPORT CONTENT-->

          <v-card-text v-if="showPart.content" class="content">
            <table
              dense
              id="myTable"
              class="table-content"
              :class="'report-body ' + usePaper"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Supplier</th>
                  <th>Menu</th>
                  <th class="text-right">Qty</th>
                  <th class="text-right"></th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(doc, index) in reportData">
                  <tr :key="index">
                    <td>{{ index + 1 }}</td>
                    <td colspan="">
                      <b>{{ doc.supplier }}</b>
                    </td>
                    <td colspan="3"></td>
                    <td class="text-right">
                      <b>
                        {{ decimalNumber(doc.totalAmount, 2) }}
                      </b>
                      <!-- {{ decimalNumber(doc.totalQty, 2) }} -->
                    </td>
                  </tr>
                  <tr v-for="(item, i) in doc.details" :key="index + '-' + i">
                    <td></td>
                    <td></td>
                    <td>{{ item.name }}</td>
                    <td class="text-right">{{ decimalNumber(item.qty, 2) }}</td>
                    <td></td>
                    <td class="text-right">
                      {{ decimalNumber(item.amount, 2) }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </v-card-text>
          <!-- report timestamp  -->
          <v-card-actions>
            <div v-if="showPart.timestamp" class="timestamp">
              By {{ userFullName }}, {{ timestamp }}
              <span v-if="execTime"> ({{ execTime }} sec.) </span>
            </div>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import dayjs from "dayjs";
import constants from "@/constants";
import api from "@/utils/utilites";
import { decimalNumber } from "@/lib/numeral";
import moment from "moment";
import { has, includes } from "lodash";
import { Printd } from "printd";

import cssPrinting from "../../../../public/styles/report.css.js";
export default {
  data: () => ({
    cssTextPrinting: cssPrinting + "",
    decimalNumber,
    storagePath: constants.storagePath,
    loading: true,
    form: {
      submitting: false,
      data: {
        fromDate: dayjs(new Date()).startOf("months").format("YYYY-MM-DD"),
        toDate: dayjs(new Date()).endOf("months").format("YYYY-MM-DD"),
        supplierId: null,
      },
    },
    supplierId: null,
    reportData: [],
    supplierOpts: [],
    supplierName: null,
    showPart: {
      header: true,
      filter: true,
      content: true,
      footer: true,
      signature: false,
      timestamp: true,
    },
    execTime: 0,
    columns: [
      {
        label: "Date",
        value: "date",
      },
      {
        label: "Name",
        value: "name",
      },
      {
        label: "Total",
        value: "total",
      },
    ],
    checkedColumns: ["date", "name", "total"],
    trigger: false,
    visiblePrintInvoice: false,
    paperSize: "a4-p",
    paperOpts: [
      { label: "A4 Portrait", value: "a4-p" },
      { label: "A4 Landscape", value: "a4-l" },
      { label: "A5 Portrait", value: "a5-p" },
      { label: "A5 Landscape", value: "a5-l" },
      { label: "A6 Portrait", value: "a6-p" },
      { label: "A6 Landscape", value: "a6-l" },
    ],
    showPaperConfig: false,
    comUsed: "Invoice",
  }),
  components: {},
  props: {},
  filters: {
    filterDate(newVal) {
      return dayjs(newVal).format("DD-MM-YYYY");
    },
  },
  computed: {
    usePaper() {
      if (!this.showPaperConfig) {
        // return this.paperSize
        if (this.comUsed == "Invoice") {
          return "in-" + this.paperSize;
        } else {
          return this.paperSize;
        }
      }
      return paper;
    },
    timestamp() {
      return moment().format("ddd DD/MM/YYYY HH:mm:ss");
    },
    userFullName() {
      return " Kun smos Snea";
    },
  },
  watch: {
    supplierId(val) {
      if (val) {
        this.supplierName = val.name;
        this.form.data.supplierId = val._id;
      } else {
        this.form.data.supplierId = null;
        this.supplierName = null;
      }
    },
  },
  mounted() {
    this.fetchSupplier();

    // console.log("when component is mounted!");

    this.d = new Printd();

    const { contentWindow } = this.d.getIFrame();

    if (contentWindow) {
      contentWindow.addEventListener("beforeprint", () =>
        console.log("before print event!")
      );
      contentWindow.addEventListener("afterprint", () =>
        console.log("after print event!")
      );
    }
  },
  methods: {
    $_printReport() {
      this.d.print(document.getElementById("print-area"), [
        `
            svg{
              margin-bottom: 0px;
            }
            .card-title {
              text-align: center
              // margin: 15px 0px 0px 0px;
              line-height: 18px;
              font-size: 14px
            }
          `,
        this.cssTextPrinting,
      ]);
    },
    showMoreHeader(field) {
      return includes(this.checkedColumns, field);
    },
    changeVal(val) {
      console.log(val);
      this.checkedColumns = val;
    },
    // show() {
    //   return {
    //     header: true,
    //     filter: true,
    //     content: true,
    //     footer: true,
    //     signature: false,
    //     timestamp: true,
    //   };
    // },
    fetchSupplier() {
      api
        .get(`/suppliers/getAll`)
        .then((response) => {
          // console.log(response.data);
          this.supplierOpts = response.data;
        })
        .catch(({ response }) => {
          this.$store.dispatch("pushNotification", {
            message: response.data.message,
            type: "error",
          });
        });
    },
    onSubmit() {
      // if (this.$refs.form.validate()) {

      // }
      this.form.submitting = true;

      // console.log(dayjs(this.form.data.fromDate).startOf("days").toDate());
      //  fromDate: dayjs(this.form.data.fromDate).startOf("days").toDate(),
      //           toDate: dayjs(this.form.data.toDate).endOf("days").toDate(),
      console.log(this.form.data);

      api
        .post("reports/purchaseSummaryBySupplier", this.form.data)
        .then((response) => {
          this.reportData = response.data;
          //   console.log(response.data);
          // this.$store.dispatch("pushNotification", {
          //     message: response.data.message,
          //     type: "success",
          // });
        })
        .catch(({ response }) => {
          this.$store.dispatch("pushNotification", {
            message: response.data.message,
            type: "error",
          });
        })
        .finally(() => {
          this.form.submitting = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$body-color: #34495e;
$title-color: #2c3e50;
$filters-border-bottom-color: #ddd;
$table-th-bgcolor: #f5f7fa;
$table-th-color: #2c3e50;
$table-td-color: #34495e;
$table-border-bottom-color: #ddd;

.report-body {
  color: $body-color;
  font-size: 12px !important;
  // Kh font
  .kh-moul {
    font-family: Khmer OS Moul, Moul !important;
  }
  .kh-battambang {
    font-family: Khmer OS Battambang, Battambang !important;
  }
  // Header
  .header {
    text-align: center;
    padding-bottom: 10px;
    color: $title-color;
    .company-name {
      font-size: 20px;
      font-weight: 600;
      padding-bottom: 5px;
    }
    .report-name {
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      padding-bottom: 5px;
    }
    .report-period {
      font-size: 14px;
      font-weight: 500;
      padding-bottom: 5px;
    }
    .company-address {
      // .table-content': {
      //   'border-collapse': 'collapse',
      //   width: '100%',}
    }
  }
  // Filter
  .filter {
    padding-bottom: 0px;
    .title {
      font-size: 12px !important;
      color: $title-color;
      font-weight: 500;
    }
  }
  // Content
  .content {
    padding-bottom: 5px;
  }
  .table-content {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
    line-height: 23px;
    thead {
      th {
        color: $table-th-color;
        border-bottom: 1px solid $table-border-bottom-color;
        padding: 2px 5px;
        background-color: $table-th-bgcolor;
        text-align: left;
        text-transform: uppercase;
        position: sticky;
        top: 0px;
        box-shadow: 0.1em 0.15em 0.1em lightgray;
      }
    }
    tbody {
      th {
        color: $table-th-color;
        border-bottom: 1px solid $table-border-bottom-color;
        padding: 2px 5px;
        background-color: $table-th-bgcolor;
        text-align: left;
        text-transform: uppercase;
      }
    }
    td {
      color: $table-td-color;
      border-bottom: 1px solid $table-border-bottom-color;
      padding: 2px 5px;
      text-align: left;
      vertical-align: top;
    }
    tbody {
      tr:hover {
        background-color: #f4f7fa;
      }
    }
  }
  // Timestamp
  .timestamp {
    font-size: 12px;
    font-weight: 300;
    font-style: italic;
    padding-bottom: 10px;
  }
  // Footer
  .footer {
    padding-bottom: 10px;
    .title {
      font-size: 13px !important;
      color: $title-color;
      font-weight: 600;
    }
  }
  // Signature
  .signature {
    padding-top: 20px;
    clear: both;
    text-align: center;
    font-weight: 500;
  }
  .note-textarea {
    text-align: right;
    margin: 0;
  }
  // Grid layout
  .colspan-6 {
    flex-direction: column;
    width: 25%;
    font-size: 12px;
    float: left;
  }
  .colspan-8 {
    flex-direction: column;
    width: 33%;
    font-size: 12px;
    float: left;
  }
  .colspan-12 {
    flex-direction: column;
    width: 50%;
    font-size: 12px;
    float: left;
  }
  // Text align
  .text-left {
    text-align: left !important;
  }
  .text-right {
    text-align: right !important;
  }
  .text-center {
    text-align: center !important;
  }
  .ra-text-left {
    text-align: left !important;
  }
  .ra-text-right {
    text-align: right !important;
  }
  .ra-text-center {
    text-align: center !important;
  }
  .ra-text-underline {
    text-decoration-line: underline;
    text-decoration-style: solid;
  }
  .ra-text-dblunderline {
    text-decoration-line: underline;
    text-decoration-style: double;
  }
  // Text bold
  .text-bold {
    font-weight: bold;
  }
  .ra-text-bold {
    font-weight: bold;
  }
  // Text italic
  .text-italic {
    font-style: italic;
  }
  .ra-text-italic {
    font-style: italic;
  }
  // Text transform
  .ra-text-capital {
    text-transform: capitalize;
  }
  .ra-text-lower {
    text-transform: lowercase;
  }
  .ra-text-upper {
    text-transform: uppercase;
  }
  // Word break
  .ra-break-all {
    word-break: break-all;
  }
  .ra-break-work {
    word-break: break-word;
  }
}

#exportTable {
  padding: 10px;
}
.in-a4-p {
  width: 21cm;
}

.in-a4-l {
  width: 29.7cm;
}

.in-a5-p {
  width: 14.8cm;
}

.in-a5-l {
  width: 21cm;
}

.in-a6-p {
  width: 10.5cm !important;
}

.in-a6-l {
  width: 18.9cm;
}

.in-mini {
  width: 8cm;
}
/* END USE FOR PRINT INVOICE ONLY*/
</style>
