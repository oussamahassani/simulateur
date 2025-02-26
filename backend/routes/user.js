const express = require("express")
const router = require("express").Router();
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
let apps = express()
let User = require("../models/user.model");

let transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false,    //<<here
  auth: {
    user: '2453712db8fe53',
    pass: '4e83185e9c865c'
  }
});
transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.route("/getalluser").get((req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/getoneuser/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(User => res.json(User))
    .catch(err => res.status(200).json("Error: " + err));
});
router.route('/getcurentemail/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(User => res.json({ email: User.email, Nom: User.Nom, Prenom: User.Prenom }))
    .catch(err => res.status(200).json("Error: " + err));
})
router.route("/registeruser").post(async (req, res) => {
  const user = req.body
  console.log(user)
  let datenow = moment().format("DD/MM/YYYY, h:mm:ss a")
  try {
    bcrypt.hash(user.password, 10).then(async function (hash) {
      // Store hash in your password DB.
      const password = hash;
      Object.assign(user, { "password": password }, { "datecreation": datenow })
      User.findByEmail(user.email, (err, userresult) => {
        ;

        console.log("findUserByEmail")

        if (userresult == null) {
          User.create(user, (err, user) => {
            if (err) {
              return res.status(500).send({ message: 'Erreur lors de la récupération de l\'utilisateur' });
            }
            if (!user) {

              return res.status(404).send({ message: 'Utilisateur non trouvé' });
            }
            return res.status(200).send({ message: "User added!", data: user });
          });
        }
      })
    })
      .catch(err => {
        console.log(err)
        return res.status(200).send({ err: err })

      })
  }
  catch (err) {
    console.log(err)
  }
});
router.patch('/updateuser/:id', async (req, res, next) => {
  try {
    const user = req.body
    console.log("user", user.Prenom, user)
    if (user.oldpass == '') {
      User.findByIdAndUpdate(req.params.id, user)
        .then(() => res.json("Property updated!"))
        .catch(err => res.status(400).json("Error: " + err));

    }
    else {
      User.findById(req.params.id, (err, userbase) => {
        if (userbase) {
          let compare = bcrypt.compareSync(user.oldpass, userbase.password)
          if (compare) {
            bcrypt.hash(user.password, 10).then(function (hash) {

              user.password = hash
              User.findByIdAndUpdate(req.params.id, user)
                .then(() => res.json("Property updated!"))
                .catch(err => res.status(400).json("Error: " + err));
            })
          }
          else {
            res.json("mot de pass invalide!")
          }
        }
      })
    }
  }
  catch (err) {
    console.log(err)
  }

})
router.post('/loginuser', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    User.findByEmail(email, (err, userresult) => {
      if (userresult) {
        console.log(userresult)
        let userresultJson = JSON.parse(userresult);
        console.log(userresultJson)
        let compare = bcrypt.compareSync(password, userresultJson.password)
        if (compare) {
          const token = jwt.sign({ _id: userresultJson.id, typeuser: userresultJson.role }, "Bearer");

          res.cookie('jwt', token).send({ msg: "ok", jwt: token, status: true })
        }
        else
          res.send({ msg: "mot de passe invalide", status: false })
      }
      else
        res.send({ msg: "donner invalide", status: false })
    })
  }
  catch (err) {
    console.log(err)
  }
})
router.get('/alluser', async (req, res, next) => {
  try {
    User.findAll((err, userbase) => {
      if (err) {
        return res.send({ msg: err, data: null })

      }
      return res.send({ msg: "liste User", data: userbase })
    }
    )
  }

  catch (error) {
    console.log(error)
  }
  //next()
})
router.post('/sendemail', async (req, res, next) => {
  try {
    let donner = req.body
    console.log(donner)

    let content = `email: ${donner.email} \n  'nom et prenom' : ${donner.name} + {" "}   + ${donner.prenom} \n donner: ${donner.message} `;

    let mail = {
      from: "2453712db8fe53@gmail.com",
      to: "2453712db8fe53@gmail.com",
      subject: donner.subject,
      text: content
    }

    transport.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  }

  catch (error) {
    console.log(error)
  }
  //next()
})
router.post('/sendemailtoproprietaire', async (req, res, next) => {
  try {
    let donner = req.body.email


    let content = `email: ${donner.email} \n  'nom et prenom' : ${donner.name} + {" "}   + ${donner.prenom} \n donner: ${donner.message} `;

    let mail = {
      from: "2453712db8fe53@gmail.com",
      to: donner.to,
      cc: donner.email,
      subject: donner.subject,
      text: content
    }

    transport.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
        console.log("erre", err)
      } else {
        res.json({
          msg: 'success'
        })
        console.log("suuces", data)
      }
    })
  }

  catch (error) {
    console.log(error)
  }
  //next()
})


module.exports = router;