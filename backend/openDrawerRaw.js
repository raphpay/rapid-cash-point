const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

async function openDrawerRaw() {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: "usb", // adapte selon ton interface exacte
  });

  try {
    const isConnected = await printer.isPrinterConnected();
    if (!isConnected) throw new Error("Imprimante non connectée");

    // Commande brute pour ouvrir tiroir : ESC p 0 25 250
    printer.raw(Buffer.from([27, 112, 0, 25, 250]));

    await printer.execute();
    console.log("✅ Commande ESC/POS envoyée");
  } catch (error) {
    console.error("❌ Erreur :", error);
  }
}

module.exports = openDrawerRaw;
