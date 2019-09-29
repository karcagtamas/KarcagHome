/* Get MAC addresses */
CREATE OR REPLACE PROCEDURE getMacAddresses()
BEGIN
    SELECT * FROM macs
    ORDER BY name, deviceName, owner;
END;

/* Add new MAC address */
CREATE OR REPLACE PROCEDURE addMacAddress(_address CHAR(17), _owner VARCHAR(255), _name VARCHAR(100), _device VARCHAR(100), _ip VARCHAR(15))
BEGIN
    INSERT INTO macs (address, owner, name, deviceName, ip)
    VALUES(_address, _owner, _name, _device, _ip);
    SELECT LAST_INSERT_ID() AS last_inserted_id;
END;

/* Delete MAC address */
CREATE OR REPLACE PROCEDURE deleteMacAddress(_id int(11))
BEGIN
    DELETE FROM macs WHERE id = _id;
END;

/* Update MAC address */
CREATE OR REPLACE PROCEDURE updateMacAddress(_id INT(11), _address CHAR(17), _owner VARCHAR(255), _name VARCHAR(100), _device VARCHAR(100), _ip VARCHAR(15))
BEGIN
    UPDATE macs SET address = _address, owner = _owner, name = _name, deviceName = _device, ip = _ip WHERE id = _id;
END;
