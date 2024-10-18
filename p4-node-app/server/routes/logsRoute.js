import express from 'express';
import { LogModel } from '../model/Log.js';

const router = express.Router();

// Route for Save a new Log
router.post('/logs', async (request, response) => {
    try {
      if (
        !request.body.distance ||
        !request.body.duration ||
        !request.body.avgSpeed ||
        !request.body.calBurned
      ) {
        return response.status(400).send({
          message: 'Send all required fields: distance, duration, avgSpeed, calBurned',
        });
      }
      const newLog = {
        distance: request.body.distance,
        duration: request.body.duration,
        avgSpeed: request.body.avgSpeed,
        calBurned: request.body.calBurned,
      };
  
      const log = await LogModel.create(newLog);
  
      return response.status(201).send(log);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Get All Logs from database
router.get('/logs', async (request, response) => {
    try {
      const logs = await LogModel.find({});
  
      return response.status(200).json({
        count: logs.length,
        data: logs,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Get One Log from database by id
router.get('/logs/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const log = await LogModel.findById(id);
  
      return response.status(200).json(log);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Update a Log
router.put('/logs/:id', async (request, response) => {
    try {
      if (
        !request.body.distance ||
        !request.body.duration ||
        !request.body.avgSpeed ||
        !request.body.calBurned
      ) {
        return response.status(400).send({
          message: 'Send all required fields: distance, duration, avgSpeed, calBurned',
        });
      }
  
      const { id } = request.params;
  
      const result = await LogModel.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Log not found' });
      }
  
      return response.status(200).send({ message: 'Log updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Delete a Log
router.delete('/logs/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await LogModel.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Log not found' });
      }
  
      return response.status(200).send({ message: 'Log deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  export default router;