import { useEffect, useState } from 'react';

export default function Outbreaks({ user }) {
  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Mock disease outbreak data
  const outbreaksData = {
    'All India': [
      {
        disease: 'Dengue Fever',
        icon: '🦟',
        regions: ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana'],
        status: 'ACTIVE',
        severity: 'HIGH',
        cases: 4250,
        newCases: 125,
        deaths: 8,
        trend: 'INCREASING',
        description: 'Dengue cases increasing in urban areas during monsoon season',
        precautions: ['Use mosquito repellent', 'Wear full sleeves', 'Keep surroundings clean', 'Seek immediate care if fever >101F']
      },
      {
        disease: 'COVID-19',
        icon: '🦠',
        regions: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'],
        status: 'ACTIVE',
        severity: 'MEDIUM',
        cases: 180,
        newCases: 12,
        deaths: 0,
        trend: 'STABLE',
        description: 'New variant detected. Vaccination still recommended for high-risk groups',
        precautions: ['Get vaccinated', 'Wear masks in crowded areas', 'Practice hygiene', 'Self-isolate if positive']
      },
      {
        disease: 'Influenza (Flu)',
        icon: '🤧',
        regions: ['Himachal Pradesh', 'Uttarakhand', 'Kashmir'],
        status: 'ACTIVE',
        severity: 'MEDIUM',
        cases: 650,
        newCases: 35,
        deaths: 2,
        trend: 'INCREASING',
        description: 'Seasonal flu outbreak in northern states during winter',
        precautions: ['Get flu vaccine', 'Avoid crowds', 'Stay warm', 'Rest and hydrate']
      },
      {
        disease: 'Cholera',
        icon: '💧',
        regions: ['Assam', 'West Bengal'],
        status: 'ACTIVE',
        severity: 'MEDIUM',
        cases: 120,
        newCases: 8,
        deaths: 1,
        trend: 'STABLE',
        description: 'Cholera outbreak in areas with poor sanitation',
        precautions: ['Boil water before drinking', 'Wash hands frequently', 'Eat cooked food only', 'Get ORS packets']
      },
      {
        disease: 'Measles',
        icon: '🔴',
        regions: ['Rajasthan', 'Madhya Pradesh'],
        status: 'MODERATE',
        severity: 'MEDIUM',
        cases: 230,
        newCases: 5,
        deaths: 0,
        trend: 'DECREASING',
        description: 'Measles outbreak in schools and communities with low vaccination rates',
        precautions: ['Get MMR vaccine', 'Avoid contact with infected', 'Isolate if infected', 'Consult doctor']
      },
      {
        disease: 'Malaria',
        icon: '🦗',
        regions: ['Odisha', 'Chhattisgarh', 'Jharkhand'],
        status: 'ENDEMIC',
        severity: 'MEDIUM',
        cases: 890,
        newCases: 42,
        deaths: 3,
        trend: 'STABLE',
        description: 'Malaria cases in monsoon and post-monsoon season in forested areas',
        precautions: ['Use mosquito nets', 'Apply repellent', 'Seek early treatment', 'Avoid stagnant water']
      },
      {
        disease: 'Typhoid',
        icon: '🌡️',
        regions: ['Punjab', 'Haryana'],
        status: 'ENDEMIC',
        severity: 'LOW',
        cases: 150,
        newCases: 3,
        deaths: 0,
        trend: 'DECREASING',
        description: 'Typhoid cases in areas with contaminated water supply',
        precautions: ['Get vaccinated', 'Drink clean water', 'Maintain hygiene', 'Cook food properly']
      },
      {
        disease: 'Hepatitis A',
        icon: '🏥',
        regions: ['Gujarat', 'Goa'],
        status: 'MODERATE',
        severity: 'LOW',
        cases: 200,
        newCases: 7,
        deaths: 0,
        trend: 'STABLE',
        description: 'Hepatitis A outbreak linked to contaminated food/water',
        precautions: ['Get vaccinated', 'Wash hands before eating', 'Drink clean water', 'Avoid street food']
      }
    ]
  };

  const regions = ['All India', 'North India', 'South India', 'East India', 'West India', 'Northeast India'];
  const currentOutbreaks = outbreaksData['All India'] || [];

  const filteredOutbreaks = filter === 'all'
    ? currentOutbreaks
    : currentOutbreaks.filter(outbreak => outbreak.status === filter);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'HIGH': return { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' };
      case 'MEDIUM': return { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' };
      case 'LOW': return { bg: '#e0f2fe', text: '#0c4a6e', border: '#bae6fd' };
      default: return { bg: '#e0f2fe', text: '#0c4a6e', border: '#bae6fd' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return '#dc2626';
      case 'MODERATE': return '#f59e0b';
      case 'ENDEMIC': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getTrendArrow = (trend) => {
    switch (trend) {
      case 'INCREASING': return '📈';
      case 'DECREASING': return '📉';
      case 'STABLE': return '➡️';
      default: return '➡️';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
          color: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(132, 204, 22, 0.2)'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            🗺️ Disease Outbreaks Map
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Track disease outbreaks and health alerts across regions
          </p>
        </div>

        {/* Filters */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Region Selection */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                📍 Select Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                🔴 Filter by Status
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['all', 'ACTIVE', 'MODERATE', 'ENDEMIC'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: filter === status ? '#84cc16' : '#f1f5f9',
                      color: filter === status ? 'white' : '#1e293b',
                      border: filter === status ? 'none' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    {status === 'all' ? '📊 All' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#dc2626', marginBottom: '0.5rem' }}>
              {filteredOutbreaks.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Active Outbreaks</div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f59e0b', marginBottom: '0.5rem' }}>
              {filteredOutbreaks.reduce((sum, o) => sum + o.cases, 0).toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total Cases</div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3b82f6', marginBottom: '0.5rem' }}>
              +{filteredOutbreaks.reduce((sum, o) => sum + o.newCases, 0)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>New Cases (24h)</div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#991b1b', marginBottom: '0.5rem' }}>
              {filteredOutbreaks.reduce((sum, o) => sum + o.deaths, 0)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Deaths</div>
          </div>
        </div>

        {/* Outbreaks List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#64748b' }}>Loading outbreak data...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredOutbreaks.map((outbreak, idx) => {
              const colors = getSeverityColor(outbreak.severity);
              return (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    border: `1px solid ${colors.border}`,
                    borderLeftWidth: '4px'
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ fontSize: '2.5rem' }}>{outbreak.icon}</div>
                      <div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', margin: 0, marginBottom: '0.5rem' }}>
                          {outbreak.disease}
                        </h3>
                        <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                          {outbreak.description}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          <span style={{
                            background: colors.bg,
                            color: colors.text,
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {outbreak.severity} Severity
                          </span>
                          <span style={{
                            background: 'white',
                            color: getStatusColor(outbreak.status),
                            border: `2px solid ${getStatusColor(outbreak.status)}`,
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            🔴 {outbreak.status}
                          </span>
                          <span style={{
                            background: '#f0f9ff',
                            color: '#0369a1',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {getTrendArrow(outbreak.trend)} {outbreak.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                    <div>
                      <small style={{ color: '#64748b', display: 'block' }}>Total Cases</small>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>
                        {outbreak.cases.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <small style={{ color: '#64748b', display: 'block' }}>New (24h)</small>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f59e0b' }}>
                        +{outbreak.newCases}
                      </div>
                    </div>
                    <div>
                      <small style={{ color: '#64748b', display: 'block' }}>Deaths</small>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#991b1b' }}>
                        {outbreak.deaths}
                      </div>
                    </div>
                    <div>
                      <small style={{ color: '#64748b', display: 'block' }}>Affected Regions</small>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>
                        {outbreak.regions.length} states
                      </div>
                    </div>
                  </div>

                  {/* Regions */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <small style={{ color: '#64748b', fontWeight: '600' }}>📍 Affected Regions:</small>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      {outbreak.regions.map((region, i) => (
                        <span
                          key={i}
                          style={{
                            background: '#f1f5f9',
                            color: '#334155',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '500'
                          }}
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Precautions */}
                  <div>
                    <small style={{ color: '#64748b', fontWeight: '600', display: 'block', marginBottom: '0.75rem' }}>
                      ✓ Preventive Measures:
                    </small>
                    <ul style={{ paddingLeft: '1.5rem', margin: 0, color: '#475569', lineHeight: '1.7' }}>
                      {outbreak.precautions.map((precaution, i) => (
                        <li key={i} style={{ fontSize: '0.9rem' }}>{precaution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div style={{
          background: 'linear-gradient(135deg, #e0f2fe, #dbeafe)',
          border: '1px solid #bae6fd',
          borderRadius: '16px',
          padding: '2rem',
          marginTop: '2rem',
          textAlign: 'center',
          color: '#0369a1'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>
            📞 Report Suspected Cases
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            If you suspect an outbreak or have symptoms, contact your nearest health center or call 108
          </p>
          <div style={{ fontSize: '0.9rem', color: '#0c4a6e' }}>
            💡 Last updated: Today at 2:30 PM IST
          </div>
        </div>
      </div>
    </div>
  );
}
