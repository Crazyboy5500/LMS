exports.checkvalidation = function (data) {

    const { username, phone } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        return ({ status: "400", conc: "username", message: 'Wrong Email Format' });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return ({ status: "400", conc: "phone", message: 'Invalid phone number. Please enter a 10-digit phone number' });
    }

    return ({ status: "200", conc: "success", message: '"Success"' });

};