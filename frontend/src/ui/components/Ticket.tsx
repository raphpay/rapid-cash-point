interface TicketProps {
  items: { name: string; price: number; quantity: number }[];
  total: number;
}

export const Ticket = ({ items, total }: TicketProps) => {
  return (
    <div style={{ fontFamily: "monospace", width: "280px", padding: "10px" }}>
      <h3 style={{ textAlign: "center" }}>🚲 Mon Magasin de Vélo</h3>
      <hr />
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>
            {item.name} x{item.quantity}
          </span>
          <span>{(item.price * item.quantity).toFixed(2)} €</span>
        </div>
      ))}
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Total</strong>
        <strong>{total.toFixed(2)} €</strong>
      </div>
      <hr />
      <p style={{ textAlign: "center", fontSize: "12px" }}>
        Merci et à bientôt !
      </p>
    </div>
  );
};
