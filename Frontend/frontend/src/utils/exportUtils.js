import jsPDF from "jspdf";

export const exportCSV = (jobs) => {
  const headers = ["Company", "Role", "Status"];

  const rows = jobs.map((j) => [
    j.companyName,
    j.role,
    j.status,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "jobs.csv";
  link.click();
};

export const exportPDF = (jobs) => {
  const doc = new jsPDF();

  jobs.forEach((job, i) => {
    doc.text(
      `${job.companyName} - ${job.role} - ${job.status}`,
      10,
      10 + i * 10
    );
  });

  doc.save("jobs.pdf");
};