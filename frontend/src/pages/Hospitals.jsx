import { useState } from 'react';

export default function Hospitals({ user }) {
  const [selectedCity, setSelectedCity] = useState(user?.location || 'Hyderabad');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const hospitalsData = {
    'Hyderabad': [
      { name: 'Osmania Hospital', type: 'Government', specialties: ['General', 'Emergency', 'ICU'], distance: '8 km', rating: 4.2, beds: 2500, phone: '04027609999', address: 'Afzalgunj, Hyderabad' },
      { name: 'NIMS', type: 'Government', specialties: ['Cardiology', 'Neurology', 'Oncology'], distance: '12 km', rating: 4.4, beds: 1200, phone: '04023313333', address: 'Punjagutta, Hyderabad' },
      { name: 'Apollo Hospitals', type: 'Private', specialties: ['Cardiology', 'Orthopedics', 'Pediatrics'], distance: '5 km', rating: 4.8, beds: 600, phone: '08002882882', address: 'Jubilee Hills, Hyderabad' },
      { name: 'Continental Hospitals', type: 'Private', specialties: ['General', 'Surgery', 'Gastroenterology'], distance: '10 km', rating: 4.6, beds: 400, phone: '04027272727', address: 'Hyderabad' },
      { name: 'Care Hospital', type: 'Private', specialties: ['Emergency', 'Trauma', 'ICU'], distance: '6 km', rating: 4.5, beds: 350, phone: '04040505050', address: 'Hyderabad' }
    ],
    'Bangalore': [
      { name: 'St. Johns Medical College', type: 'Government', specialties: ['General', 'Emergency', 'Cardiology'], distance: '7 km', rating: 4.3, beds: 1800, phone: '08026670000', address: 'Bangalore' },
      { name: 'Manipal Hospital', type: 'Private', specialties: ['Cardiology', 'Neurology', 'Oncology'], distance: '4 km', rating: 4.7, beds: 700, phone: '08025951000', address: 'Bangalore' },
      { name: 'Apollo Hospitals', type: 'Private', specialties: ['All Specialties'], distance: '6 km', rating: 4.8, beds: 650, phone: '08040061000', address: 'Bangalore' },
      { name: 'Fortis Hospital', type: 'Private', specialties: ['Surgery', 'Orthopedics', 'Emergency'], distance: '5 km', rating: 4.6, beds: 500, phone: '08041256000', address: 'Bangalore' },
      { name: 'Aster CMI Hospital', type: 'Private', specialties: ['Cardiology', 'Gastroenterology', 'Nephrology'], distance: '8 km', rating: 4.5, beds: 400, phone: '08040851000', address: 'Bangalore' }
    ],
    'Chennai': [
      { name: 'Government General Hospital', type: 'Government', specialties: ['General', 'Emergency', 'Medicine'], distance: '10 km', rating: 4.1, beds: 3000, phone: '04425319000', address: 'Chennai' },
      { name: 'Apollo Hospitals', type: 'Private', specialties: ['Cardiology', 'All Specialties'], distance: '6 km', rating: 4.8, beds: 700, phone: '04428298298', address: 'Chennai' },
      { name: 'Fortis Malar Hospital', type: 'Private', specialties: ['Orthopedics', 'General', 'Pediatrics'], distance: '5 km', rating: 4.6, beds: 450, phone: '04429181818', address: 'Chennai' },
      { name: 'Sri Ramakrishna Hospital', type: 'Private', specialties: ['Cardiology', 'Neurology'], distance: '7 km', rating: 4.5, beds: 350, phone: '04427470470', address: 'Chennai' },
      { name: 'Dr. Mehta\'s Hospital', type: 'Private', specialties: ['Ophthalmology', 'General', 'Surgery'], distance: '4 km', rating: 4.4, beds: 250, phone: '04424301777', address: 'Chennai' }
    ],
    'Delhi': [
      { name: 'AIIMS Delhi', type: 'Government', specialties: ['All Specialties', 'Research'], distance: '15 km', rating: 4.5, beds: 2200, phone: '01125434000', address: 'Delhi' },
      { name: 'Apollo Hospitals', type: 'Private', specialties: ['All Specialties'], distance: '8 km', rating: 4.8, beds: 700, phone: '01129871234', address: 'Delhi' },
      { name: 'Max Healthcare', type: 'Private', specialties: ['Cardiology', 'Oncology', 'Trauma'], distance: '10 km', rating: 4.7, beds: 600, phone: '01145123456', address: 'Delhi' },
      { name: 'Fortis Hospital', type: 'Private', specialties: ['General', 'Surgery', 'Emergency'], distance: '7 km', rating: 4.6, beds: 500, phone: '01141651000', address: 'Delhi' },
      { name: 'Sir Ganga Ram Hospital', type: 'Private', specialties: ['Cardiology', 'Nephrology'], distance: '5 km', rating: 4.5, beds: 350, phone: '01125750000', address: 'Delhi' }
    ],
    'Mumbai': [
      { name: 'KEM Hospital', type: 'Government', specialties: ['General', 'Emergency', 'Medicine'], distance: '12 km', rating: 4.2, beds: 2000, phone: '02225608650', address: 'Mumbai' },
      { name: 'Apollo Hospitals', type: 'Private', specialties: ['All Specialties'], distance: '6 km', rating: 4.8, beds: 750, phone: '02228829999', address: 'Mumbai' },
      { name: 'Breach Candy Hospital', type: 'Private', specialties: ['Cardiology', 'Neurology', 'Orthopedics'], distance: '8 km', rating: 4.7, beds: 600, phone: '02263686868', address: 'Mumbai' },
      { name: 'Kokilaben Hospital', type: 'Private', specialties: ['Cardiology', 'Oncology', 'General'], distance: '4 km', rating: 4.8, beds: 700, phone: '02267680000', address: 'Mumbai' },
      { name: 'Wockhardt Hospitals', type: 'Private', specialties: ['Emergency', 'Trauma', 'General'], distance: '7 km', rating: 4.5, beds: 450, phone: '02241229999', address: 'Mumbai' }
    ]
  };

  const allSpecialties = ['General', 'Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Emergency', 'Surgery', 'Pediatrics', 'Gastroenterology'];

  const hospitals = hospitalsData[selectedCity] || [];
  const filteredHospitals = selectedSpecialty === 'all' 
    ? hospitals 
    : hospitals.filter(h => h.specialties.includes(selectedSpecialty));

  const getRatingColor = (rating) => {
    if (rating >= 4.7) return '#10b981';
    if (rating >= 4.3) return '#3b82f6';
    if (rating >= 4.0) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            🏥 Nearby Hospitals & Clinics
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Find the best hospitals near you with specialties and facilities
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
            {/* City Selection */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                📍 Select City
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {Object.keys(hospitalsData).map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: selectedCity === city ? '#f59e0b' : '#f1f5f9',
                      color: selectedCity === city ? 'white' : '#1e293b',
                      border: selectedCity === city ? '2px solid #d97706' : '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Specialty Selection */}
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                🔬 Filter by Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Hospitals List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          {filteredHospitals.map((hospital, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                      {hospital.name}
                    </h3>
                    <span style={{
                      background: hospital.type === 'Government' ? '#dbeafe' : '#f3e8ff',
                      color: hospital.type === 'Government' ? '#0c4a6e' : '#6b21a8',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {hospital.type}
                    </span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0.5rem 0' }}>
                    📍 {hospital.address} • {hospital.distance} away
                  </p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div>
                      <small style={{ color: '#64748b' }}>🛏️ Beds</small>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>{hospital.beds} beds</div>
                    </div>
                    <div>
                      <small style={{ color: '#64748b' }}>📞 Contact</small>
                      <div style={{ fontWeight: '600' }}>
                        <a href={`tel:${hospital.phone}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                          {hospital.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{
                    background: getRatingColor(hospital.rating),
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{hospital.rating}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>⭐ Rating</div>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <small style={{ color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>
                  🔬 Specialties:
                </small>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {hospital.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#f0f9ff',
                        color: '#0369a1',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        border: '1px solid #bae6fd'
                      }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call Button */}
              <button
                onClick={() => window.location.href = `tel:${hospital.phone}`}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  padding: '0.75rem',
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                📞 Call Hospital
              </button>
            </div>
          ))}

          {filteredHospitals.length === 0 && (
            <div style={{
              background: '#fef3c7',
              border: '2px solid #fcd34d',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              color: '#92400e'
            }}>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                No hospitals found with the selected specialty. Try a different filter.
              </p>
            </div>
          )}
        </div>

        {/* Tips */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff, #e0f2fe)',
          border: '1px solid #bae6fd',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: '#0369a1' }}>
            💡 Tips for Hospital Visit
          </h3>
          <ul style={{ paddingLeft: '1.5rem', color: '#0c4a6e', lineHeight: '1.8' }}>
            <li>Call ahead to confirm availability and appointment timing</li>
            <li>Keep your insurance details and ID ready</li>
            <li>Ask about emergency timings and ICU facilities</li>
            <li>Check if they have ambulance facilities</li>
            <li>Many hospitals now offer online consultations - ask if available</li>
            <li>Read reviews and ratings before choosing a specialist</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
