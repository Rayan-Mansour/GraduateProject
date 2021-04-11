
const isEmpty = (string) => {
    if(string === '') return true;
    else return false;
};

exports.validateLoginData = (data) => {

    let errors = {};
    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    if(isEmpty(data.password)) errors.password = 'Must not empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0? true:false
    };
};

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validateSignUpData = (data) => {

    let errors = {};

    if(isEmpty(data.email)) {
        errors.email = 'Must not be empty';
    } else if(!isEmail(data.email)) {
        errors.email = 'Must be valid email address';
    }

    if(isEmpty(data.firstname)) errors.firstname = 'Must not be empty';
    if(isEmpty(data.lastname)) errors.lastname = 'Must not be empty';
    if(isEmpty(data.password)) errors.password = 'Must not be empty';
    if(isEmpty(data.confirmPassword)) errors.confirmPassword = 'Must not be empty';
    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    if(isEmpty(data.telephone)) errors.telephone = 'Must not be empty';
    if(isEmpty(data.store)) errors.store = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };

};

exports.validateSignUpDataUser = (data) => {

    let errors = {};

    if(isEmpty(data.email)) {
        errors.email = 'Must not be empty';
    } else if(!isEmail(data.email)) {
        errors.email = 'Must be valid email address';
    }

    if(isEmpty(data.password)) errors.password = 'Must not be empty';
    if(isEmpty(data.confirmPassword)) errors.confirmPassword = 'Must not be empty';
    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    if(isEmpty(data.tel)) errors.tel = 'Must not be empty';
    

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };

};