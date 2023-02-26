import User from "../models/userModel.js"; // This has data to be used
import excelJS from "exceljs";
const exportUser = async (req, res) => {
  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
  const path = "./excel"; // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "S no.", key: "_id", width: 10 },
    { header: "Name", key: "name", width: 10 },
    { header: "Email", key: "email", width: 10 },
  ];

  const users = await User.find({});
  // Looping through User data
  let counter = 1;
  users.forEach((user) => {
    user.s_no = counter;
    worksheet.addRow(user); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "user.xlsx");

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });

    // const data = await workbook.xlsx.write(res).then(() => {
    //   res.status(200).end();
    //   //   res.send({
    //   //     status: "success",
    //   //     message: "file successfully downloaded",
    //   //     // path: `${path}/users.xlsx`,
    //   //   });
    // });

    // const data = await workbook.xlsx
    //   .writeFile(`${path}/users.xlsx`)
    //   .then(() => {
    //     res.send({
    //       status: "success",
    //       message: "file successfully downloaded",
    //       path: `${path}/users.xlsx`,
    //     });
    //   });
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export default exportUser;
