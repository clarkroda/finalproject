const express = require('express');
const fs = require('fs');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.render('index');
  });

  router.get('/about', (req, res) => {
    res.render('about');
  });

  router.get('/services', (req, res) => {
    res.render('services');
  });

  router.get('/projects', (req, res) => {
    res.render('projects');
  });

  router.get('/contact', (req, res) => {
    res.render('contact');
  });

  router.get('/event_registration', (req, res) => {
    res.render('event_registration');
  });

  router.post('/contact_sent', (req, res) => {
    console.log(req.body);
    const data = req.body;

    if (
      !data.firstName &&
      !data.lastName &&
      !data.mobilePhone &&
      !data.email &&
      !data.company &&
      !data.file
    )
      return res.status(400).send('Bad Request. Form is empty!');
    if (!data.firstName) return res.status(400).send('Bad Request. Enter your First Name!');
    if (!data.lastName) return res.status(400).send('Bad Request. Enter your Last Name!');
    if (!data.mobilePhone)
      return res.status(400).send('Bad Request. Enter your Mobile Phone Number!');
    if (!data.email) return res.status(400).send('Bad Request. Enter your Email Address!');
    if (!data.company) return res.status(400).send('Bad Request. Enter your Company Name!');
    if (!data.file) return res.status(400).send('Bad Request. Upload a File!');

    const info = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobilePhone: Number(data.mobilePhone),
      email: data.email,
      company: data.company,
      file: data.file,
    };

    const arrOfData = [];
    arrOfData.push(info);
    const client = JSON.stringify(arrOfData, null, 5);

    if (fs.existsSync('clients.json')) {
      const datas = require('../clients.json');
      datas.push(info);
      fs.writeFile('clients.json', JSON.stringify(datas, null, 5), (error) => {
        if (error) throw error;
        res.send(info);
      });
    } else {
      fs.writeFile('clients.json', client, (error) => {
        if (error) throw error;
        res.send(info);
      });
    }

    return res.render('contact_sent');
  });

  router.post('/event_registered', (req, res) => {
    console.log(req.body);
    const data = req.body;
    let fee;

    if (!data.idNumber && !data.fullName && !data.address && !data.status)
      return res.status(400).send('Bad Request. Form is empty!');
    if (!data.idNumber) return res.status(400).send('Bad Request. Enter your ID Number!');
    if (!data.fullName) return res.status(400).send('Bad Request. Enter your Name!');
    if (!data.address) return res.status(400).send('Bad Request. Enter your Address!');
    if (!data.status) return res.status(400).send('Bad Request. Enter your Status!');

    switch (data.status) {
      case 'Student':
        fee = 10;
        break;
      case 'Staff':
        fee = 50;
        break;
      case 'Volunteer':
        fee = 0;
        break;
      default:
        console.log('Invalid Option!');
        break;
    }

    const info = {
      id: Number(data.idNumber),
      name: data.fullName,
      address: data.address,
      status: data.status,
      fee: fee,
    };

    const arrOfData = [];
    arrOfData.push(info);
    const attendee = JSON.stringify(arrOfData, null, 5);

    if (fs.existsSync('attendees.json')) {
      const datas = require('../attendees.json');
      datas.push(info);
      fs.writeFile('attendees.json', JSON.stringify(datas, null, 5), (error) => {
        if (error) throw error;
        res.send(info);
      });
    } else {
      fs.writeFile('attendees.json', attendee, (error) => {
        if (error) throw error;
        res.send(info);
      });
    }
  });

  return router;
};
