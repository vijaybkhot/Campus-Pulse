export const getAllRoommates = async (req, res) => {
    try {
      const roommates = await Roommate.find(req.query);
      res.json(roommates);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
  
  export const getRoommateById = async (req, res) => {
    try {
      const roommate = await Roommate.findById(req.params.id);
      if (!roommate) {
        return res.status(404).json({ msg: 'Roommate not found' });
      }
      res.json(roommate);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
  
  export const createRoommate = async (req, res) => {
    try {
      const newRoommate = new Roommate(req.body);
      const roommate = await newRoommate.save();
      res.json(roommate);
    } catch (err) {
      res.status(400).json({ msg: 'Invalid data' });
    }
  };
  
  export const updateRoommate = async (req, res) => {
    try {
      const roommate = await Roommate.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!roommate) {
        return res.status(404).json({ msg: 'Roommate not found' });
      }
      res.json(roommate);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
  
  export const deleteRoommate = async (req, res) => {
    try {
      const roommate = await Roommate.findByIdAndDelete(req.params.id);
      if (!roommate) {
        return res.status(404).json({ msg: 'Roommate not found' });
      }
      res.json({ msg: 'Roommate removed' });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };