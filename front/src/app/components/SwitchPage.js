import React, { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker'; // Assuming you have a color picker component
import ReactSvgGauge from 'react-svg-gauge';

const SmartSwitch = () => {
    const [device, setDevice] = useState({
        json: {
            switch: 0,
            color: '#fff',
            mode: 1,
            strength: 25
        },
        name: '',
        firmware: ''
    });

    const [control, setControl] = useState({
        switch: 0,
        mode: 1,
        strength: 25
    });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('/api/iot/status/2000');
                const data = await response.json();
                if (data.device) {
                    setDevice(data.device);
                    setControl({
                        switch: data.device.json.switch,
                        mode: data.device.json.mode,
                        strength: data.device.json.strength
                    });
                }
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        const interval = setInterval(fetchStatus, 3000);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleControlChange = (col, value) => {
        const deviceControl = col === 'switch' ? (value ? 1 : 0) : value;

        const json = JSON.stringify({ deviceControl, deviceControlName: col });

        fetch('/api/iot/control/2000', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error updating control:', error));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    {device.json.switch == 1 && device.json.color == '#fff' && <img src="/assets/images/light_on.png" alt="Light On" style={{ maxWidth: '360px' }} />}

                    {device.json.switch == 1 && device.json.color == '#f05348' && <img src="/assets/images/light_on_red.png" alt="Light On Red" style={{ maxWidth: '360px' }} />}

                    {device.json.switch == 1 && device.json.color == '#f08848' && (
                        <img src={"/assets/images/light_on_orange.png"} alt="Light On Orange" style={{ maxWidth: '360px' }} />
                    )}
                    {device.json.switch == 1 && device.json.color === '#f0c048' && (
                        <img src={"/assets/images/light_on_yellow.png"} alt="Light On Yellow" style={{ maxWidth: '360px' }} />
                    )}
                    {device.json.switch == 1 && device.json.color === '#48f072' && (
                        <img src={"/assets/images/light_on_green.png"} alt="Light On Green" style={{ maxWidth: '360px' }} />
                    )}
                    {device.json.switch == 1 && device.json.color === '#486af0' && (
                        <img src={"/assets/images/light_on_blue.png"} alt="Light On Blue" style={{ maxWidth: '360px' }} />
                    )}
                    {device.json.switch == 1 && device.json.color === '#8348f0' && (
                        <img src={"/assets/images/light_on_indigo.png"} alt="Light On Indigo" style={{ maxWidth: '360px' }} />
                    )}
                    {device.json.switch == 1 && device.json.color === '#1d0f6b' && (
                        <img src={"/assets/images/light_on_purple.png"} alt="Light On Purple" style={{ maxWidth: '360px' }} />
                    )}
                    {device.json.switch == 0 && <img src="/assets/images/light_off.png" alt="Light Off" style={{ maxWidth: '360px' }} />}
                </div>

                <div className="col-md-8">
                    <div className="row">
                        <div className={`col switch ${device.json.switch == 1 ? 'bg-success' : 'bg-danger'}`}>
                            {device.json.switch == 1 ? 'ON' : 'OFF'}
                        </div>
                        <div className="w-100"></div>

                        <div className="col bg-light fw-bold">IoT Name</div>
                        <div className="col">{device.name}</div>
                        <div className="w-100"></div>

                        <div className="col bg-light fw-bold">Firmware Version</div>
                        <div className="col">{device.firmware}</div>
                        <div className="w-100"></div>

                        <div className="col bg-light fw-bold">Light Intensity</div>
                        <div className="col">
                            <div >
                                <ReactSvgGauge
                                    startAngle={-90}
                                    endAngle={90}
                                    value={device.json.strength}
                                    min={0}
                                    max={100}
                                    label=""
                                    separatorStep={2}
                                    separatorThickness={2}
                                    color={device.json.strength <= 30 ? '#2FA325' : device.json.strength >= 60 ? "#BC1E58" : '#F0A815'}

                                    scaleInterval={1}
                                >
                                    <div className="inner-text">
                                        <p>{device.json.strength}</p>
                                    </div>
                                </ReactSvgGauge>
                            </div>
                            <label className="form-label" htmlFor="customRange1">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control someInput"
                                        aria-label="strength"
                                        value={control.strength}
                                        onChange={(e) => setControl({ ...control, strength: e.target.value })}
                                    />
                                    <span className="input-group-text">lx</span>
                                </div>
                            </label>
                            <div className="range">
                                <input
                                    type="range"
                                    value={control.strength}
                                    min="0"
                                    max="100"
                                    className="form-range"
                                    id="customRange1"
                                    onChange={(e) => handleControlChange('strength', e.target.value)}
                                />
                                <datalist id="tickmarks">
                                    <option value="0">0</option>
                                    <option value="20">20</option>
                                    <option value="40">40</option>
                                    <option value="60">60</option>
                                    <option value="80">80</option>
                                    <option value="100">100</option>
                                </datalist>
                            </div>
                        </div>
                        <div className="w-100"></div>

                        <div className="col bg-light fw-bold">Color Selection</div>
                        <div className="col">
                            <ColorPicker
                                color={device.json.color}
                                onInputColor={(color) => handleControlChange('color', color)}
                            />
                        </div>

                        <div className="w-100"></div>

                        <div className="col bg-light fw-bold">Operation Mode</div>
                        <div className="col">
                            <select
                                className="form-select"
                                value={control.mode}
                                onChange={(e) => handleControlChange('mode', e.target.value)}
                            >
                                <option value="1">Common</option>
                                <option value="2">Subtle</option>
                                <option value="3">Twinkling</option>
                                <option value="4">Santa</option>
                            </select>
                            {/* Show images based on mode */}
                            {device.json.mode === 1 && <img src="/assets/images/normal.png" className="img-thumbnail" />}
                            {device.json.mode === 2 && <img src="/assets/images/soft.jpg" className="img-thumbnail" />}
                            {device.json.mode === 3 && <img src="/assets/images/disco.png" className="img-thumbnail" />}
                            {device.json.mode === 4 && <img src="/assets/images/xmas.png" className="img-thumbnail" />}
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
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    checked={control.switch === 1}
                                    onChange={() => handleControlChange('switch', !control.switch)}
                                />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartSwitch;
