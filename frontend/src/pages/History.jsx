import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000';

export default function History({ user }) {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchQueryHistory();
  }, [user]);

  const fetchQueryHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE}/ai/history/${user?.userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jj_token')}` }
      });
      setQueries(response.data.queries || []);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      // Fallback: Show mock data if API fails
      setQueries([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'health', 'education', 'climate', 'safety', 'general'];

  const filteredQueries = filter === 'all' 
    ? queries 
    : queries.filter(q => q.category === filter);

  const getCategoryColor = (category) => {
    const colors = {
      health: '#0dcaf0',
      education: '#0d6efd',
      climate: '#ff9800',
      safety: '#dc3545',
      general: '#6c757d'
    };
    return colors[category] || '#6c757d';
  };

  if (loading) {
    return (
      <div className="container-main text-center py-5">
        <div className="spinner-border"></div>
        <p className="mt-3">Loading your history...</p>
      </div>
    );
  }

  return (
    <div className="container-main">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">📜 Your Query History</h5>
              <small>All questions you've asked and responses received</small>
            </div>

            <div className="card-body">
              {/* Filter Buttons */}
              <div className="mb-4">
                <label className="form-label fw-bold">Filter by Category:</label>
                <div className="btn-group flex-wrap" role="group">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      className={`btn btn-sm ${filter === cat ? 'btn-info' : 'btn-outline-info'}`}
                      onClick={() => setFilter(cat)}
                    >
                      {cat === 'all' ? '📊 All' : `📁 ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
                    </button>
                  ))}
                </div>
              </div>

              {filteredQueries.length === 0 ? (
                <div className="alert alert-info text-center py-5">
                  <h6>📭 No history yet</h6>
                  <p className="text-muted mb-0">Start asking questions in the Chat section to see your history here!</p>
                </div>
              ) : (
                <div className="timeline">
                  {filteredQueries.map((query, idx) => (
                    <div key={idx} className="timeline-item mb-4">
                      <div className="card border-start" style={{ borderLeftColor: getCategoryColor(query.category), borderLeftWidth: '4px' }}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="card-title mb-1">❓ Your Question</h6>
                              <p className="mb-0 text-dark fw-500">{query.text}</p>
                            </div>
                            <span className="badge" style={{ backgroundColor: getCategoryColor(query.category) }}>
                              {query.category.toUpperCase()}
                            </span>
                          </div>

                          <hr className="my-2" />

                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">💬 AI Response</h6>
                            <p className="mb-2" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                              {query.response}
                            </p>
                          </div>

                          <div className="row g-2 mt-3 small">
                            <div className="col-auto">
                              <span className="badge bg-secondary">📍 {query.location || 'Unknown'}</span>
                            </div>
                            <div className="col-auto">
                              <span className="badge bg-secondary">🗣️ {query.language?.toUpperCase() || 'EN'}</span>
                            </div>
                            {query.severity && (
                              <div className="col-auto">
                                <span className="badge" style={{
                                  backgroundColor: query.severity === 'high' ? '#dc3545' :
                                                   query.severity === 'medium' ? '#ff9800' : '#198754'
                                }}>
                                  ⚠️ {query.severity.toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="col-auto ms-auto">
                              <span className="text-muted">{new Date(query.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
