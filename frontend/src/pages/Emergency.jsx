import { useState } from 'react';

export default function Emergency({ user }) {
  const [selectedCity, setSelectedCity] = useState(user?.location || 'Hyderabad');

  const emergencyContacts = {
    'Hyderabad': {
      city: 'Hyderabad, Telangana',
      contacts: [
        { type: 'Police', number: '100', name: 'Emergency Police', icon: '👮' },
        { type: 'Ambulance', number: '108', name: 'Government Ambulance', icon: '🚑' },
        { type: 'Fire', number: '101', name: 'Fire Department', icon: '🚒' },
        { type: 'Woman Helpline', number: '1091', name: 'Women Safety', icon: '👩' },
        { type: 'Poison Control', number: '9962090010', name: 'Poison Information', icon: '☠️' },
        { type: 'Mental Health', number: '9154241000', name: 'AASRA Crisis Help', icon: '🧠' },
        { type: 'Hospital', number: '04027609999', name: 'Osmania Hospital', icon: '🏥' },
        { type: 'Doctor Helpline', number: '1075', name: 'Medical Consultation', icon: '👨‍⚕️' }
      ],
      hospitals: [
        'Osmania Hospital',
        'Nizam\'s Institute of Medical Sciences',
        'Apollo Hospitals',
        'Continental Hospitals',
        'Care Hospital'
      ]
    },
    'Bangalore': {
      city: 'Bangalore, Karnataka',
      contacts: [
        { type: 'Police', number: '100', name: 'Emergency Police', icon: '👮' },
        { type: 'Ambulance', number: '108', name: 'Government Ambulance', icon: '🚑' },
        { type: 'Fire', number: '101', name: 'Fire Department', icon: '🚒' },
        { type: 'Woman Helpline', number: '1091', name: 'Women Safety', icon: '👩' },
        { type: 'Poison Control', number: '9449002660', name: 'Poison Information', icon: '☠️' },
        { type: 'Mental Health', number: '9611411440', name: 'Mental Health Support', icon: '🧠' },
        { type: 'Hospital', number: '08026670000', name: 'St. Johns Medical College', icon: '🏥' },
        { type: 'Doctor Helpline', number: '1075', name: 'Medical Consultation', icon: '👨‍⚕️' }
      ],
      hospitals: [
        'St. Johns Medical College',
        'Manipal Hospital',
        'Apollo Hospitals',
        'Fortis Hospital',
        'Aster CMI Hospital'
      ]
    },
    'Chennai': {
      city: 'Chennai, Tamil Nadu',
      contacts: [
        { type: 'Police', number: '100', name: 'Emergency Police', icon: '👮' },
        { type: 'Ambulance', number: '108', name: 'Government Ambulance', icon: '🚑' },
        { type: 'Fire', number: '101', name: 'Fire Department', icon: '🚒' },
        { type: 'Woman Helpline', number: '1091', name: 'Women Safety', icon: '👩' },
        { type: 'Poison Control', number: '9445115555', name: 'Poison Information', icon: '☠️' },
        { type: 'Mental Health', number: '9840111000', name: 'Mental Health Support', icon: '🧠' },
        { type: 'Hospital', number: '04425319000', name: 'Government General Hospital', icon: '🏥' },
        { type: 'Doctor Helpline', number: '1075', name: 'Medical Consultation', icon: '👨‍⚕️' }
      ],
      hospitals: [
        'Government General Hospital',
        'Apollo Hospitals',
        'Fortis Malar Hospital',
        'Sri Ramakrishna Hospital',
        'Dr. Mehta\'s Hospital'
      ]
    },
    'Delhi': {
      city: 'Delhi',
      contacts: [
        { type: 'Police', number: '100', name: 'Emergency Police', icon: '👮' },
        { type: 'Ambulance', number: '108', name: 'Government Ambulance', icon: '🚑' },
        { type: 'Fire', number: '101', name: 'Fire Department', icon: '🚒' },
        { type: 'Woman Helpline', number: '1091', name: 'Women Safety', icon: '👩' },
        { type: 'Poison Control', number: '9958221222', name: 'Poison Information', icon: '☠️' },
        { type: 'Mental Health', number: '9530000007', name: 'Mental Health Support', icon: '🧠' },
        { type: 'Hospital', number: '01125434000', name: 'AIIMS Delhi', icon: '🏥' },
        { type: 'Doctor Helpline', number: '1075', name: 'Medical Consultation', icon: '👨‍⚕️' }
      ],
      hospitals: [
        'AIIMS Delhi',
        'Apollo Hospitals',
        'Max Healthcare',
        'Fortis Hospital',
        'Sir Ganga Ram Hospital'
      ]
    },
    'Mumbai': {
      city: 'Mumbai, Maharashtra',
      contacts: [
        { type: 'Police', number: '100', name: 'Emergency Police', icon: '👮' },
        { type: 'Ambulance', number: '108', name: 'Government Ambulance', icon: '🚑' },
        { type: 'Fire', number: '101', name: 'Fire Department', icon: '🚒' },
        { type: 'Woman Helpline', number: '1091', name: 'Women Safety', icon: '👩' },
        { type: 'Poison Control', number: '9987775557', name: 'Poison Information', icon: '☠️' },
        { type: 'Mental Health', number: '9821247007', name: 'Mental Health Support', icon: '🧠' },
        { type: 'Hospital', number: '02225608650', name: 'KEM Hospital', icon: '🏥' },
        { type: 'Doctor Helpline', number: '1075', name: 'Medical Consultation', icon: '👨‍⚕️' }
      ],
      hospitals: [
        'KEM Hospital',
        'Apollo Hospitals',
        'Breach Candy Hospital',
        'Kokilaben Hospital',
        'Wockhardt Hospitals'
      ]
    }
  };

  const cityList = Object.keys(emergencyContacts);
  const currentData = emergencyContacts[selectedCity];

  const quickTips = [
    '📞 Save these numbers in your phone contacts',
    '🚑 Call 108 for ambulance - free in most states',
    '🏥 Know the nearest hospital to your location',
    '👥 Keep emergency contact of 1-2 family members',
    '⏰ In emergency, clearly state your location and problem',
    '🆘 Remain calm and speak clearly to the operator',
    '📱 If landline unavailable, use mobile or public phone',
    '🌐 Many hospitals now have online booking systems'
  ];

  const emergencySteps = [
    { step: '1', title: 'Stay Calm', desc: 'Take a deep breath and assess the situation' },
    { step: '2', title: 'Call Emergency', desc: 'Dial 108 for ambulance or 100 for police' },
    { step: '3', title: 'Provide Details', desc: 'Clearly state your location and the problem' },
    { step: '4', title: 'Follow Instructions', desc: 'Listen carefully to the operator\'s guidance' },
    { step: '5', title: 'Wait for Help', desc: 'Stay on the line until help arrives' },
    { step: '6', title: 'Gather Documents', desc: 'Keep ID, insurance cards, medications ready' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2)'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            🚨 Emergency Services
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Quick access to emergency contacts and services in your area
          </p>
        </div>

        {/* City Selector */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0'
        }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
            📍 Select Your City
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {cityList.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: selectedCity === city ? '#ef4444' : '#f1f5f9',
                  color: selectedCity === city ? 'white' : '#1e293b',
                  border: selectedCity === city ? '2px solid #dc2626' : '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Emergency Contacts */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
              📞 Emergency Contacts - {currentData.city}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentData.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#fef2f2',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '2px solid #fecaca',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <div>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{contact.icon}</div>
                    <div style={{ fontWeight: '600', color: '#991b1b', marginBottom: '0.25rem' }}>
                      {contact.name}
                    </div>
                    <small style={{ color: '#64748b' }}>{contact.type}</small>
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#ef4444',
                      textDecoration: 'none',
                      padding: '1rem 1.5rem',
                      background: 'white',
                      borderRadius: '8px',
                      border: '2px solid #ef4444',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Steps */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
              ⚡ What To Do In Emergency
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {emergencySteps.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    background: '#eff6ff',
                    borderRadius: '12px',
                    border: '1px solid #bfdbfe'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#3b82f6',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    flexShrink: 0
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                      {item.title}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hospitals and Quick Tips */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Major Hospitals */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
              🏥 Major Hospitals in {currentData.city}
            </h2>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {currentData.hospitals.map((hospital, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: '0.75rem 0',
                    color: '#475569',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    borderBottom: '1px solid #e2e8f0'
                  }}
                >
                  {hospital}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Tips */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
              💡 Quick Safety Tips
            </h2>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {quickTips.map((tip, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: '0.75rem 0',
                    color: '#475569',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    borderBottom: '1px solid #e2e8f0'
                  }}
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Notice */}
        <div style={{
          background: '#fef3c7',
          border: '2px solid #fcd34d',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#92400e'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
            ⚠️ In Case of Life-Threatening Emergency
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Always call 108 for ambulance or 100 for police. Every second counts in an emergency.
            Keep emergency contact numbers in your phone contacts for quick access.
          </p>
        </div>
      </div>
    </div>
  );
}
