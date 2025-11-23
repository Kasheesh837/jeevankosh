export default function Home({ user }) {
  return (
    <div className="container-main">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Welcome Section */}
          <div className="card mb-5 border-0 shadow-lg">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{width: '80px', height: '80px'}}>
                  <img src="/ChatGPT Image Nov 23, 2025, 10_12_40 PM.png" alt="Jeevankosh Logo" style={{width: '70px', height: '70px', objectFit: 'contain'}} />
                </div>
                <h1 className="display-6 fw-bold text-dark mb-2">Welcome, {user?.name}!</h1>
                <p className="lead text-muted mb-4">
                  Your intelligent health, safety, and education companion
                </p>
              </div>

              {/* Feature Grid */}
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm-hover transition-all">
                    <div className="card-body p-4 text-center">
                      <div className="text-primary mb-3">
                        <i className="bi bi-chat-dots fs-2"></i>
                      </div>
                      <h5 className="card-title fw-semibold mb-2">AI Assistant</h5>
                      <p className="card-text text-muted small mb-3">
                        Get instant, multilingual responses to your health and safety questions
                      </p>
                      <a href="/chat" className="btn btn-primary px-4">
                        Start Conversation
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm-hover transition-all">
                    <div className="card-body p-4 text-center">
                      <div className="text-success mb-3">
                        <i className="bi bi-lightbulb fs-2"></i>
                      </div>
                      <h5 className="card-title fw-semibold mb-2">Educational Resources</h5>
                      <p className="card-text text-muted small mb-3">
                        Access curated health, safety, and environmental information
                      </p>
                      <a href="/info" className="btn btn-success px-4">
                        Explore Resources
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm-hover transition-all">
                    <div className="card-body p-4 text-center">
                      <div className="text-warning mb-3">
                        <i className="bi bi-bell fs-2"></i>
                      </div>
                      <h5 className="card-title fw-semibold mb-2">Community Alerts</h5>
                      <p className="card-text text-muted small mb-3">
                        Stay informed with real-time local safety notifications
                      </p>
                      <a href="/alerts" className="btn btn-warning px-4 text-white">
                        View Alerts
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm-hover transition-all">
                    <div className="card-body p-4 text-center">
                      <div className="text-info mb-3">
                        <i className="bi bi-geo-alt fs-2"></i>
                      </div>
                      <h5 className="card-title fw-semibold mb-2">Location Services</h5>
                      <p className="card-text text-dark fw-medium mb-1">
                        {user?.location || 'Location Not Set'}
                      </p>
                      <small className="text-muted">Used for localized emergency information</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-transparent border-0 py-4">
              <h5 className="card-title fw-bold mb-0 text-dark">Platform Features</h5>
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3">
                    <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                      <i className="bi bi-mic text-primary"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Voice & Text Input</h6>
                      <p className="text-muted small mb-0">Multiple interaction methods</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3">
                    <div className="bg-success bg-opacity-10 rounded p-2 me-3">
                      <i className="bi bi-translate text-success"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Multilingual Support</h6>
                      <p className="text-muted small mb-0">Automatic language detection</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3">
                    <div className="bg-info bg-opacity-10 rounded p-2 me-3">
                      <i className="bi bi-phone text-info"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Mobile Optimized</h6>
                      <p className="text-muted small mb-0">Responsive design</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3">
                    <div className="bg-warning bg-opacity-10 rounded p-2 me-3">
                      <i className="bi bi-clock text-warning"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Real-time Updates</h6>
                      <p className="text-muted small mb-0">Live community alerts</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3">
                    <div className="bg-danger bg-opacity-10 rounded p-2 me-3">
                      <i className="bi bi-telephone text-danger"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Emergency Support</h6>
                      <p className="text-muted small mb-0">Contact guidance</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3">
                    <div className="bg-purple bg-opacity-10 rounded p-2 me-3">
                      <i className="bi bi-shield-check text-purple"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Safety Resources</h6>
                      <p className="text-muted small mb-0">Educational content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these CSS classes to your stylesheet
const additionalStyles = `
.shadow-sm-hover {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: box-shadow 0.15s ease-in-out;
}
.shadow-sm-hover:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.transition-all {
  transition: all 0.3s ease;
}
.bg-purple {
  background-color: #6f42c1;
}
.text-purple {
  color: #6f42c1;
}
`;