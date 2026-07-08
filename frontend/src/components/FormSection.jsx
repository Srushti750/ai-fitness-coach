import "../styles/FormSection.css";

function FormSection({ title, children }) {
  return (
    <div className="form-section">
      <h3>{title}</h3>

      <div className="form-section-content">{children}</div>
    </div>
  );
}

export default FormSection;
