export default function Contact() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-4">Contact Us</h1>

          <div className="row mb-5">
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">📧 Email</h5>
                  <p className="card-text">
                    <strong>Support:</strong> support@jeevankosh.in<br/>
                    <strong>Feedback:</strong> feedback@jeevankosh.in<br/>
                    <strong>Partnerships:</strong> partners@jeevankosh.in
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">📱 Phone</h5>
                  <p className="card-text">
                    <strong>Support Hotline:</strong> +91-40-9876-5432<br/>
                    <strong>Hours:</strong> 24/7 (Calls answered 9AM-9PM)<br/>
                    <strong>Languages:</strong> English, Hindi, Telugu
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-5">
            <div className="card-body">
              <h5 className="card-title">🏢 Office Address</h5>
              <p className="card-text">
                Jeevankosh - AI Health Platform<br/>
                Tech Park, Hyderabad<br/>
                Telangana 500032, India<br/>
                <br/>
                <strong>Operational Offices:</strong><br/>
                Bangalore • Chennai • Delhi • Mumbai • Pune • Kolkata
              </p>
            </div>
          </div>

          <div className="card mb-5">
            <div className="card-body">
              <h5 className="card-title">❓ FAQ</h5>
              <div className="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      Is Jeevankosh a substitute for a doctor?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent=".accordion">
                    <div className="accordion-body">
                      No. Jeevankosh provides guidance and information only. Always consult a qualified doctor for diagnosis and treatment. For emergencies, call 108.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      Is my data safe?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent=".accordion">
                    <div className="accordion-body">
                      Yes. All data is encrypted and stored securely. We never sell or share your personal information with third parties.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      What languages are supported?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent=".accordion">
                    <div className="accordion-body">
                      We support Hindi, Telugu, Kannada, Tamil, and English. The system auto-detects your language and responds in the same language.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                      Is Jeevankosh free to use?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent=".accordion">
                    <div className="accordion-body">
                      Currently, Jeevankosh is free for all users. We may introduce premium features in the future, but core services will remain free.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                      How do I report a problem?
                    </button>
                  </h2>
                  <div id="faq5" className="accordion-collapse collapse" data-bs-parent=".accordion">
                    <div className="accordion-body">
                      Email us at support@jeevankosh.in with details of the issue. We typically respond within 24 hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-warning">
            <strong>⚠️ Emergency?</strong> Don't use this form for emergencies. Call 108 (Ambulance) or visit a hospital immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
