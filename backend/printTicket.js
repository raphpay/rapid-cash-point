// backend/printTicket.js
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

async function printTicket({ items = [], total = 0 }) {
  console.log("Printing ticket");

  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: "usb", // could also be 'printer:POS-58' or 'tcp://IP'
    width: 48,
    characterSet: "SLOVENIA",
    removeSpecialCharacters: false,
    lineCharacter: "-",
  });

  try {
    printer.alignCenter();
    printer.println("Tof Bike");
    printer.drawLine();

    printer.alignLeft();
    items.forEach((item) => {
      const { name, quantity, price } = item;
      const line = `${name} x${quantity}   ${(price * quantity).toFixed(2)}€`;
      printer.println(line);
    });

    printer.drawLine();
    printer.println(`Total: ${total.toFixed(2)} €`);
    printer.drawLine();

    printer.alignCenter();
    printer.println("Merci pour votre achat !");
    printer.cut();

    const isConnected = await printer.isPrinterConnected();
    if (!isConnected) throw new Error("Imprimante non connectée");

    await printer.execute();
    console.log("✅ Ticket imprimé !");
    return { success: true };
  } catch (err) {
    console.error("❌ Erreur d'impression :", err);
    return { success: false, error: err.message };
  }
}

module.exports = printTicket;
