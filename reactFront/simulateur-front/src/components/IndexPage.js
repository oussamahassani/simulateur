import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactSwitch from 'react-switch'; // Pour le switch
import ReactSvgGauge from 'react-svg-gauge';


// Assurez-vous que les images soient dans le bon dossier public ou importées correctement
const Boiler = () => {
  const [device, setDevice] = useState({
    json: {
      hope_temperature: 0,
      switch: 0,
      mode: 1,
      now_temperature: 25,
      humidity: 60,
      status: 'normal'
    }
  });
  const [control, setControl] = useState({
    switch: 0,
    mode: 1,
    hope_temperature: 25
  });

  // Récupérer l'état du dispositif depuis l'API
  const getStatus = () => {
    axios
      .get('/api/iot/status/1000')
      .then((res) => {
        const deviceData = res.data.device;
        if (deviceData) {
          setDevice(deviceData);
          setControl({
            switch: deviceData.json.switch,
            mode: deviceData.json.mode,
            hope_temperature: deviceData.json.hope_temperature
          });
        }
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });
  };

  // Mettre à jour le contrôle du dispositif
  const setControlValue = (col, value) => {
    console.log('Update Control', col, value);
    const deviceControl = col === 'switch' ? (value ? 1 : 0) : value;

    const json = JSON.stringify({
      deviceControl,
      deviceControlName: col
    });

    axios
      .put('/api/iot/control/1000', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log('Réponse de l\'API:', res.data);
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });
  };

  useEffect(() => {
    getStatus();
    const interval = setInterval(getStatus, 3000); // Récupérer les données toutes les 3 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle à la destruction du composant
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <img
            src={device.json.switch == 1 ? '/assets/images/boiler.png' : '/assets/images/boiler_off.png'}
            alt="Boiler"
          />
          <img
            src={device.json.switch == 1 ? '/assets/images/fire.gif' : '/assets/images/fireoff.png'}
            style={{ maxWidth: '360px' }}
            alt="Fire"
          />
        </div>
        <div className="col">
          <div className="row">
            <div
              className={`col switch ${device.json.switch == 1 ? 'bg-success' : 'bg-danger'}`}
            >
              {device.json.switch == 1 ? 'ON' : 'OFF'}
            </div>
            <div className="w-100"></div>

            <div className="col bg-light fw-bold">IoT</div>
            <div className="col">{device.name}</div>

            <div className="w-100"></div>
            <div className="col bg-light fw-bold">Firmware Version</div>
            <div className="col">{device.firmware}</div>

            <div className="w-100"></div>
            <div className="col bg-light fw-bold">Current Temperature</div>
            <div className="col">
              {/* Affichage du gauge pour la température actuelle */}
              <div >
                              <ReactSvgGauge
               startAngle={-90}
               endAngle={90}
               value={device.json.now_temperature}
               min={0}
               max={100}
               separatorStep={2}
               separatorThickness={2}
               color ={device.json.now_temperature<=30? '#2FA325' : device.json.now_temperature>=60? "#BC1E58": '#F0A815'   }


               scaleInterval={1}
             >
           
             </ReactSvgGauge>
                <p>{device.json.now_temperature}°C</p>
              </div>
            </div>

            <div className="w-100"></div>
            <div className="col bg-light fw-bold">Humidity</div>
            <div className="col">{device.json.humidity}%</div>

            <div className="w-100"></div>
            <div className="col bg-light fw-bold">Desired Temperature</div>
            <div className="col">
              <div >
              <ReactSvgGauge
               startAngle={-90}
               endAngle={90}
               value={device.json.hope_temperature}
               min={0}
               max={100}
               separatorStep={2}
               separatorThickness={2}
               color ={device.json.hope_temperature<=30? '#2FA325' : device.json.hope_temperature>=60? "#BC1E58": '#F0A815'   }

       
               scaleInterval={1}
             >
           
             </ReactSvgGauge>
                <p>{device.json.hope_temperature}°C</p>
              </div>
              <label className="form-label">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control someInput"
                    aria-label="hope temperature"
                    value={control.hope_temperature}
                    onChange={(e) =>
                      setControl((prev) => ({ ...prev, hope_temperature: e.target.value }))
                    }
                  />
                  <span className="input-group-text">°C</span>
                </div>
              </label>
              <div className="range">
                <input
                  type="range"
                  value={control.hope_temperature}
                  min="16"
                  max="36"
                  className="form-range"
                  onChange={(e) =>
                    setControlValue('hope_temperature', e.target.value)
                  }
                />
                <datalist id="tickmarks">
                  <option value="14">14</option>
                  <option value="20">20</option>
                  <option value="24">24</option>
                  <option value="28">28</option>
                  <option value="32">32</option>
                  <option value="36">36</option>
                </datalist>
              </div>
            </div>

            <div className="w-100"></div>
            <div className="col bg-light fw-bold">Operation Mode</div>
            <div className="col">
              <select
                className="form-select"
                value={control.mode}
                onChange={(e) => setControlValue('mode', e.target.value)}
              >
                <option value="1">Heating</option>
                <option value="2">Saving</option>
                <option value="3">Shower</option>
                <option value="4">Ondol</option>
                <option value="5">Outing</option>
                <option value="6">High Temperature</option>
              </select>
            </div>

            <div className="w-100"></div>
            <div className="col bg-light fw-bold">Situation</div>
            <div className="col">
              {device.json.status === 'normal' ? 'Normal' : 'Error'}
            </div>

            <div className="w-100"></div>
            <div className="col bg-light fw-bold">Everyone</div>
            <div className="col">
              <div className="form-switch form-switch-xl">
                <ReactSwitch
                  checked={control.switch == 1}
                  onChange={(checked) => setControlValue('switch', checked ? 1 : 0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boiler;
