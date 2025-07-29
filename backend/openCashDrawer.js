// backend/openCashDrawer.js
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

async function openCashDrawer() {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: "usb", // adapte à ton interface
  });

  try {
    const isConnected = await printer.isPrinterConnected();
    if (!isConnected) throw new Error("Caisse non connectée");

    printer.openCashDrawer();
    await printer.execute();
    console.log("🧾 Tiroir ouvert !");
    return { success: true };
  } catch (err) {
    console.error("❌ Erreur ouverture tiroir :", err);
    return { success: false, error: err.message };
  }
}

module.exports = openCashDrawer;
