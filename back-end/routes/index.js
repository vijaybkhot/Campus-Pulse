import roommateRoutes from './roommateRoutes.js';

const constructorMethod = (app) => {

  app.use('/api/roommate-finder', roommateRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

export default constructorMethod;