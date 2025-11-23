import Alert from '../models/Alert.js';

// Logging utility
const log = {
  info: (msg) => console.log(`✅ [ALERTS] ${msg}`),
  error: (msg) => console.error(`❌ [ALERTS] ${msg}`),
  warn: (msg) => console.warn(`⚠️  [ALERTS] ${msg}`),
  debug: (msg) => console.log(`🔍 [ALERTS] ${msg}`)
};

// Get all alerts
export const getAlerts = async (req, res) => {
  try {
    const { location, category } = req.query;
    log.debug(`Fetching alerts - Location: ${location}, Category: ${category}`);

    let query = {};
    if (location && location.trim() !== '') {
      query.area = location;
    }
    if (category && category.trim() !== '') {
      query.category = category;
    }

    log.debug(`Query object: ${JSON.stringify(query)}`);

    const alerts = await Alert.find(query)
      .sort({ detectedAt: -1 })
      .limit(20)
      .lean();

    log.info(`✅ Fetched ${alerts.length} alerts for location: ${location || 'all'}`);
    
    res.json({ 
      success: true, 
      alerts: alerts || [], 
      count: alerts?.length || 0 
    });
  } catch (error) {
    log.error(`Error fetching alerts: ${error.message}`);
    log.error(`Error stack: ${error.stack}`);
    res.status(500).json({ 
      error: 'Failed to fetch alerts', 
      success: false,
      message: error.message 
    });
  }
};

// Get alerts by location
export const getAlertsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    log.debug(`Fetching alerts for location: ${location}`);

    const alerts = await Alert.find({ area: location })
      .sort({ detectedAt: -1 });

    log.info(`Fetched ${alerts.length} alerts for ${location}`);
    res.json({ success: true, alerts, count: alerts.length, location });
  } catch (error) {
    log.error(`Error fetching alerts for ${location}: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch alerts', success: false });
  }
};

// Clear old alerts (24+ hours)
export const clearOldAlerts = async (req, res) => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    log.debug(`Clearing alerts older than ${oneDayAgo}`);

    const result = await Alert.deleteMany({
      detectedAt: { $lt: oneDayAgo }
    });

    log.info(`Cleared ${result.deletedCount} old alerts`);
    res.json({ message: 'Old alerts cleared', deletedCount: result.deletedCount, success: true });
  } catch (error) {
    log.error(`Error clearing alerts: ${error.message}`);
    res.status(500).json({ error: 'Failed to clear alerts', success: false });
  }
};

// Create test alerts (for development)
export const createTestAlerts = async (req, res) => {
  try {
    log.info('Creating test alerts for development...');

    // Clear existing test alerts first
    await Alert.deleteMany({ area: { $in: ['Hyderabad', 'Bangalore', 'Chennai', 'Delhi', 'Mumbai'] } });

    const testAlerts = [
      {
        area: 'Hyderabad',
        category: 'health',
        count: 7,
        severity: 'high',
        queries: [
          { userId: null, text: 'High fever and cough', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
          { userId: null, text: 'Fever 101F with cold', timestamp: new Date(Date.now() - 25 * 60 * 1000) },
          { userId: null, text: 'Cough and body pain', timestamp: new Date(Date.now() - 20 * 60 * 1000) },
          { userId: null, text: 'Temperature 102F', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
          { userId: null, text: 'Fever with cough relief', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
          { userId: null, text: 'High temperature cold symptoms', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
          { userId: null, text: 'Fever cough and headache', timestamp: new Date(Date.now() - 2 * 60 * 1000) }
        ]
      },
      {
        area: 'Bangalore',
        category: 'health',
        count: 5,
        severity: 'medium',
        queries: [
          { userId: null, text: 'Stomach pain and diarrhea', timestamp: new Date(Date.now() - 40 * 60 * 1000) },
          { userId: null, text: 'Food poisoning symptoms', timestamp: new Date(Date.now() - 35 * 60 * 1000) },
          { userId: null, text: 'Loose motion treatment', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
          { userId: null, text: 'Vomiting and stomach issue', timestamp: new Date(Date.now() - 25 * 60 * 1000) },
          { userId: null, text: 'Belly pain and nausea', timestamp: new Date(Date.now() - 20 * 60 * 1000) }
        ]
      },
      {
        area: 'Chennai',
        category: 'climate',
        count: 6,
        severity: 'medium',
        queries: [
          { userId: null, text: 'Heat stroke prevention', timestamp: new Date(Date.now() - 45 * 60 * 1000) },
          { userId: null, text: 'High temperature heat exhaustion', timestamp: new Date(Date.now() - 40 * 60 * 1000) },
          { userId: null, text: 'Tips to stay cool in extreme heat', timestamp: new Date(Date.now() - 35 * 60 * 1000) },
          { userId: null, text: 'Dehydration during hot weather', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
          { userId: null, text: 'Heat wave health precautions', timestamp: new Date(Date.now() - 25 * 60 * 1000) },
          { userId: null, text: 'Sunstroke symptoms relief', timestamp: new Date(Date.now() - 20 * 60 * 1000) }
        ]
      }
    ];

    const created = await Alert.insertMany(testAlerts);
    log.info(`✅ Created ${created.length} test alerts`);

    res.json({ 
      success: true, 
      message: 'Test alerts created successfully',
      count: created.length,
      alerts: created
    });
  } catch (error) {
    log.error(`Error creating test alerts: ${error.message}`);
    res.status(500).json({ error: 'Failed to create test alerts', success: false, message: error.message });
  }
};
