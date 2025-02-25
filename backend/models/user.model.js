const mysql = require('../config/database')();
const db = mysql.init();
mysql.db_open(db);
// Définir le modèle User
const User = {
  // Méthode pour trouver un utilisateur par son id
  findById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';  // Remplace 'users' par le nom de ta table
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Erreur de requête :', err);
        return callback(err, null);
      }
      // Si l'utilisateur est trouvé
      if (results.length > 0) {
        return callback(null, results[0]);
      } else {
        return callback(null, null); // Aucun utilisateur trouvé
      }
    });
  },
  // Méthode pour trouver un utilisateur par son id
  findByEmail: (id, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';  // Remplace 'users' par le nom de ta table
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Erreur de requête :', err);
        return callback(err, null);
      }
      // Si l'utilisateur est trouvé
      if (results.length > 0) {
        const jsonResult = JSON.stringify(results[0]);
        return callback(null, jsonResult);
      } else {
        return callback(null, null); // Aucun utilisateur trouvé
      }
    });
  },
  // Méthode pour trouver tous les utilisateurs
  findAll: (callback) => {
    const query = 'SELECT * FROM users';  // Remplace 'users' par le nom de ta table
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erreur de requête :', err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  // Méthode pour ajouter un nouvel utilisateur
  create: (userData, callback) => {
    const query = 'INSERT INTO users (name, email,role,password , datecreation) VALUES (?, ?, ?, ? , ?)';  // Remplace par les colonnes de ta table
    db.query(query, [userData.name, userData.email, userData.role, userData.password, userData.datecreation], (err, results) => {
      if (err) {
        console.error('Erreur de requête :', err);
        return callback(err, null);
      }
      return callback(null, results.insertId);  // Renvoie l'id de l'utilisateur créé
    });
  }
};

module.exports = User;
