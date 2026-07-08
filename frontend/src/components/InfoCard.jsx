// import "../styles/InfoCard.css";

function InfoCard({ title, children }) {
  return (
    <div className="info-card">
      <h3>{title}</h3>

      <div>{children}</div>
    </div>
  );
}

export default InfoCard;
