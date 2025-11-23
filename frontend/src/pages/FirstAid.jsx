import { useState } from 'react';

export default function FirstAid() {
  const [selectedEmergency, setSelectedEmergency] = useState('cpr');

  const emergencyGuides = {
    cpr: {
      title: 'CPR (Cardiopulmonary Resuscitation)',
      icon: '❤️',
      severity: 'CRITICAL',
      description: 'Life-saving technique for cardiac arrest',
      steps: [
        { num: '1', title: 'Check Responsiveness', desc: 'Tap the person\'s shoulder and shout "Are you okay?" to check if they\'re conscious' },
        { num: '2', title: 'Call Emergency', desc: 'Call 108 immediately. Start CPR while waiting for ambulance' },
        { num: '3', title: 'Position the Body', desc: 'Place the person on a firm, flat surface (ground, floor). Tilt head back slightly' },
        { num: '4', title: 'Hand Position', desc: 'Place heel of one hand on center of chest, place other hand on top, fingers interlaced' },
        { num: '5', title: 'Chest Compressions', desc: 'Push hard and fast at 100-120 compressions per minute, 2 inches deep' },
        { num: '6', title: 'Airway Opening', desc: 'After 30 compressions, open airway by tilting head back, lift chin' },
        { num: '7', title: 'Rescue Breaths', desc: 'Give 2 rescue breaths - pinch nose, seal mouth, blow into mouth for 1 second' },
        { num: '8', title: 'Continue CPR', desc: 'Continue 30:2 ratio (compressions:breaths) until ambulance arrives or person recovers' }
      ],
      important: 'Continue CPR until professional help arrives or person shows signs of life',
      video: 'https://example.com/cpr-tutorial'
    },
    choking: {
      title: 'Choking / Airway Obstruction',
      icon: '🫁',
      severity: 'CRITICAL',
      description: 'Clearing blocked airway when someone can\'t breathe',
      steps: [
        { num: '1', title: 'Identify Choking', desc: 'Person cannot cough, speak, or cry. May have blue lips/face.' },
        { num: '2', title: 'Call for Help', desc: 'Shout for help and call 108 if available' },
        { num: '3', title: 'Back Blows (Adults)', desc: 'Stand behind, lean them forward, deliver 5 firm back blows between shoulder blades' },
        { num: '4', title: 'Abdominal Thrusts', desc: 'Stand behind, hands above navel, below ribcage. Thrust inward and upward 5 times' },
        { num: '5', title: 'Repeat Cycle', desc: 'Alternate 5 back blows and 5 abdominal thrusts until object is dislodged' },
        { num: '6', title: 'Check Mouth', desc: 'If object comes out, remove it. Be careful not to push it deeper' },
        { num: '7', title: 'Recovery Position', desc: 'Place person in recovery position if unconscious and breathing' },
        { num: '8', title: 'Medical Help', desc: 'Even if choking stops, seek medical evaluation as internal injury may occur' }
      ],
      important: 'Never hit the back if they can cough - let them try to cough first',
      video: 'https://example.com/choking-relief'
    },
    bleeding: {
      title: 'Severe Bleeding / Wound',
      icon: '🩹',
      severity: 'HIGH',
      description: 'Controlling blood loss from wounds',
      steps: [
        { num: '1', title: 'Safety First', desc: 'Wear gloves if available to avoid blood contact' },
        { num: '2', title: 'Call Emergency', desc: 'Call 108 if bleeding is severe or won\'t stop' },
        { num: '3', title: 'Apply Pressure', desc: 'Use clean cloth/gauze, apply direct pressure on wound' },
        { num: '4', title: 'Keep Pressure', desc: 'Don\'t remove the cloth - if soaked, add new cloth on top' },
        { num: '5', title: 'Elevate Limb', desc: 'Raise injured limb above heart level to reduce bleeding' },
        { num: '6', title: 'Use Tourniquet (Severe)', desc: 'For life-threatening limb bleeding, apply tourniquet 2-3 inches above wound' },
        { num: '7', title: 'Apply Bandage', desc: 'Once bleeding slows, wrap with elastic bandage - firm but not too tight' },
        { num: '8', title: 'Watch for Shock', desc: 'Keep person warm, elevate legs, monitor breathing until help arrives' }
      ],
      important: 'Keep pressure for 10-15 minutes. Don\'t remove bandages - layer if still bleeding',
      video: 'https://example.com/wound-care'
    },
    burns: {
      title: 'Burn Treatment',
      icon: '🔥',
      severity: 'HIGH',
      description: 'First aid for burn injuries',
      steps: [
        { num: '1', title: 'Stop Burning', desc: 'Remove person from heat source. If clothes are on fire, use blanket or roll on ground' },
        { num: '2', title: 'Cool the Burn', desc: 'Cool with running water (not ice) for 10-20 minutes. Remove jewelry/tight clothing' },
        { num: '3', title: 'Call Emergency', desc: 'Call 108 for burns larger than 3 inches or on face/joints' },
        { num: '4', title: 'Cover Burn', desc: 'Cover with clean, dry cloth. Don\'t use ice or grease' },
        { num: '5', title: 'Pain Relief', desc: 'Give paracetamol or ibuprofen for pain relief if conscious' },
        { num: '6', title: 'Monitor Breathing', desc: 'Watch for signs of shock - pale, weak pulse, rapid breathing' },
        { num: '7', title: 'Elevate Area', desc: 'Keep burned area elevated to reduce swelling' },
        { num: '8', title: 'Medical Care', desc: 'Apply antibiotic ointment if available. Seek professional help immediately' }
      ],
      important: 'Never use ice, butter, or oil on burns. Keep area clean and avoid infection',
      video: 'https://example.com/burn-care'
    },
    fracture: {
      title: 'Fracture / Bone Injury',
      icon: '🦴',
      severity: 'MEDIUM',
      description: 'Treating suspected broken or fractured bones',
      steps: [
        { num: '1', title: 'Immobilize Area', desc: 'Stop movement of injured area - don\'t move the limb' },
        { num: '2', title: 'Call Emergency', desc: 'Call 108 for severe fractures, especially neck, spine, or multiple bones' },
        { num: '3', title: 'Apply Ice', desc: 'Apply ice wrapped in cloth for 20 minutes to reduce swelling' },
        { num: '4', title: 'Elevate Limb', desc: 'Raise injured arm/leg above heart level if possible' },
        { num: '5', title: 'Create Sling', desc: 'Use scarf, belt, or cloth to immobilize arm against body' },
        { num: '6', title: 'Splint Leg', desc: 'For leg fracture, pad with pillows and bind legs together for support' },
        { num: '7', title: 'Pain Relief', desc: 'Give paracetamol or ibuprofen. Don\'t give food or water' },
        { num: '8', title: 'Transport', desc: 'Move as little as possible. Keep calm and wait for ambulance' }
      ],
      important: 'Never straighten a deformed bone. Immobilize in position found',
      video: 'https://example.com/fracture-care'
    },
    shock: {
      title: 'Shock (Medical Emergency)',
      icon: '😰',
      severity: 'CRITICAL',
      description: 'Recognizing and treating shock from accidents/injuries',
      steps: [
        { num: '1', title: 'Recognize Shock', desc: 'Look for: weakness, rapid/weak pulse, pale/cold skin, nausea, confusion' },
        { num: '2', title: 'Call Emergency', desc: 'Call 108 immediately - shock is life-threatening' },
        { num: '3', title: 'Lay Person Flat', desc: 'Place person on back on firm surface. Don\'t move if spinal injury suspected' },
        { num: '4', title: 'Elevate Legs', desc: 'Raise legs 8-10 inches above heart level to improve blood circulation' },
        { num: '5', title: 'Keep Warm', desc: 'Cover with blankets, coat, or warm clothing to maintain body temperature' },
        { num: '6', title: 'Monitor Vitals', desc: 'Check pulse and breathing every few minutes. Start CPR if needed' },
        { num: '7', title: 'Don\'t Give Fluids', desc: 'Don\'t give food or water - person might need surgery' },
        { num: '8', title: 'Stay Calm', desc: 'Comfort and reassure the person. Panic worsens shock. Speak calmly' }
      ],
      important: 'Shock can occur even without visible bleeding. Early recognition saves lives',
      video: 'https://example.com/shock-treatment'
    },
    poisoning: {
      title: 'Poisoning / Drug Overdose',
      icon: '☠️',
      severity: 'CRITICAL',
      description: 'Emergency response to poisoning or overdose',
      steps: [
        { num: '1', title: 'Call Poison Control', desc: 'Call 9962090010 (Hyderabad) or emergency poison center immediately' },
        { num: '2', title: 'Identify Poison', desc: 'If possible, identify what was ingested - keep container/bottle handy' },
        { num: '3', title: 'Don\'t Induce Vomiting', desc: 'Modern treatment recommends NOT making person vomit' },
        { num: '4', title: 'Activated Charcoal', desc: 'If conscious, give activated charcoal (if poison control advises)' },
        { num: '5', title: 'Monitor Consciousness', desc: 'Stay alert for changes - keep person on side if unconscious' },
        { num: '6', title: 'Don\'t Give Fluids', desc: 'Don\'t give food or water unless told by poison control' },
        { num: '7', title: 'Recovery Position', desc: 'Turn head to side to prevent choking if unconscious' },
        { num: '8', title: 'Hospital Care', desc: 'Seek immediate hospital care. Bring substance details if possible' }
      ],
      important: 'Always call poison control. Don\'t wait for symptoms. Early treatment is critical',
      video: 'https://example.com/poisoning-treatment'
    },
    heatstroke: {
      title: 'Heat Stroke / Heat Exhaustion',
      icon: '🌡️',
      severity: 'HIGH',
      description: 'Managing heat-related illnesses',
      steps: [
        { num: '1', title: 'Move to Cool Place', desc: 'Get person to shade or air-conditioned area immediately' },
        { num: '2', title: 'Call Emergency', desc: 'For heat stroke (body temp >104F): Call 108 immediately' },
        { num: '3', title: 'Remove Clothing', desc: 'Remove excessive clothing layers - help body cool down' },
        { num: '4', title: 'Cool the Body', desc: 'Apply wet cloths, ice packs to neck, armpits, groin where arteries are close' },
        { num: '5', title: 'Give Fluids', desc: 'If conscious and able to swallow, give cool water or sports drinks slowly' },
        { num: '6', title: 'Cool Bath', desc: 'If available, immerse in cool (not cold) water to lower core temperature' },
        { num: '7', title: 'Monitor Temperature', desc: 'Continue cooling until temperature drops. Rebound fever can occur' },
        { num: '8', title: 'Rest and Recover', desc: 'Rest in cool place. Avoid exertion for at least 24 hours' }
      ],
      important: 'Heat stroke is life-threatening. Rapid cooling is essential. Never ignore warning signs',
      video: 'https://example.com/heatstroke-treatment'
    }
  };

  const current = emergencyGuides[selectedEmergency];
  const emergencyList = Object.keys(emergencyGuides);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
          color: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(236, 72, 153, 0.2)'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            🆘 First Aid Guide
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Step-by-step emergency first aid instructions. In emergencies, always call 108!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* Emergency List */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            height: 'fit-content',
            position: 'sticky',
            top: '20px'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
              📋 Emergency Types
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {emergencyList.map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedEmergency(key)}
                  style={{
                    padding: '1rem',
                    background: selectedEmergency === key ? '#ec4899' : '#f8fafc',
                    color: selectedEmergency === key ? 'white' : '#1e293b',
                    border: selectedEmergency === key ? 'none' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedEmergency !== key) {
                      e.currentTarget.style.background = '#f1f5f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedEmergency !== key) {
                      e.currentTarget.style.background = '#f8fafc';
                    }
                  }}
                >
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                    {emergencyGuides[key].icon}
                  </div>
                  {emergencyGuides[key].title}
                </button>
              ))}
            </div>
          </div>

          {/* Guide Details */}
          <div style={{
            gridColumn: 'span 1',
            minWidth: 0
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0'
            }}>
              {/* Title */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '3rem' }}>{current.icon}</span>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                      {current.title}
                    </h2>
                    <div style={{
                      display: 'inline-block',
                      background: current.severity === 'CRITICAL' ? '#ef4444' : current.severity === 'HIGH' ? '#f59e0b' : '#f97316',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      marginTop: '0.5rem'
                    }}>
                      🔴 {current.severity}
                    </div>
                  </div>
                </div>
                <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
                  {current.description}
                </p>
              </div>

              {/* Steps */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
                  Step-by-Step Instructions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {current.steps.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: '1.25rem',
                        padding: '1.25rem',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: '#ec4899',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        flexShrink: 0,
                        fontSize: '1.1rem'
                      }}>
                        {step.num}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem', margin: 0 }}>
                          {step.title}
                        </h4>
                        <p style={{ color: '#64748b', margin: 0, lineHeight: '1.6' }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Note */}
              <div style={{
                background: '#fef3c7',
                border: '2px solid #fcd34d',
                borderRadius: '10px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ color: '#92400e', fontWeight: '700', marginBottom: '0.5rem' }}>
                  ⚠️ Important
                </div>
                <div style={{ color: '#78350f', lineHeight: '1.6' }}>
                  {current.important}
                </div>
              </div>

              {/* Emergency Contact */}
              <div style={{
                background: '#fee2e2',
                border: '2px solid #fecaca',
                borderRadius: '10px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#dc2626', marginBottom: '0.5rem' }}>
                  📞 108
                </div>
                <div style={{ color: '#991b1b', fontWeight: '600' }}>
                  Call Emergency Ambulance
                </div>
                <div style={{ color: '#991b1b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  For life-threatening emergencies
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* General Safety Tips */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          marginTop: '2rem'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
            💡 General First Aid Tips
          </h3>
          <ul style={{
            paddingLeft: '1.5rem',
            color: '#475569',
            lineHeight: '2',
            columns: 2,
            columnGap: '2rem'
          }}>
            <li>Always call emergency services first - don't try to self-treat severe injuries</li>
            <li>Wear gloves if available to prevent infection and bloodborne pathogens</li>
            <li>Keep a first aid kit at home and in your vehicle</li>
            <li>Learn CPR - it can save a life. Take a course if possible</li>
            <li>Never move a person with suspected spinal injury unless immediate danger</li>
            <li>Keep the person calm - your calm demeanor helps reduce their anxiety</li>
            <li>Document what happened - information helps medical professionals treat the person</li>
            <li>Follow up - check on the person and help with recovery if appropriate</li>
            <li>Get proper first aid training from certified organizations</li>
            <li>Remember: First aid is not a substitute for professional medical care</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
