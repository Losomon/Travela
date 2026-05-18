/**
 * Travela SaaS - Validation
 * Reusable form and data validators
 */

var Validation = (function() {
    'use strict';

    var validators = {
        required: function(value) {
            if (value === undefined || value === null) return false;
            if (typeof value === 'string') return value.trim().length > 0;
            if (Array.isArray(value)) return value.length > 0;
            return true;
        },
        email: function(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());
        },
        phone: function(value) {
            return /^[\d\s\-+()]{7,20}$/.test(String(value));
        },
        url: function(value) {
            try { new URL(String(value)); return true; }
            catch (e) { return false; }
        },
        number: function(value) {
            return !isNaN(Number(value));
        },
        positive: function(value) {
            return Number(value) > 0;
        },
        integer: function(value) {
            return Number.isInteger(Number(value));
        },
        min: function(value, min) {
            return Number(value) >= min;
        },
        max: function(value, max) {
            return Number(value) <= max;
        },
        range: function(value, min, max) {
            var num = Number(value);
            return num >= min && num <= max;
        },
        minLength: function(value, length) {
            return String(value).length >= length;
        },
        maxLength: function(value, length) {
            return String(value).length <= length;
        },
        betweenLength: function(value, min, max) {
            var len = String(value).length;
            return len >= min && len <= max;
        },
        matches: function(value, pattern) {
            if (pattern instanceof RegExp) return pattern.test(String(value));
            return String(value) === String(pattern);
        },
        date: function(value) {
            return !isNaN(new Date(value).getTime());
        },
        futureDate: function(value) {
            var d = new Date(value);
            return !isNaN(d.getTime()) && d > new Date();
        },
        pastDate: function(value) {
            var d = new Date(value);
            return !isNaN(d.getTime()) && d < new Date();
        }
    };

    var messages = {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        url: 'Please enter a valid URL',
        number: 'Please enter a valid number',
        positive: 'Value must be positive',
        integer: 'Please enter a whole number',
        minLength: 'Must be at least {param} characters',
        maxLength: 'Must be at most {param} characters',
        min: 'Value must be at least {param}',
        max: 'Value must be at most {param}',
        range: 'Value must be between {min} and {max}',
        betweenLength: 'Must be between {min} and {max} characters',
        date: 'Please enter a valid date',
        futureDate: 'Date must be in the future',
        pastDate: 'Date must be in the past'
    };

    function getErrorMessage(rule, param) {
        var msg = messages[rule] || 'Invalid value for ' + rule;
        if (param !== undefined) {
            if (param.min !== undefined && param.max !== undefined) {
                msg = msg.replace('{min}', param.min).replace('{max}', param.max);
            } else {
                msg = msg.replace('{param}', param);
            }
        }
        return msg;
    }

    function validateField(value, rules) {
        var errors = [];
        for (var rule in rules) {
            if (rules.hasOwnProperty(rule)) {
                var param = rules[rule];
                var validator = validators[rule];
                if (validator) {
                    var pass = (param === true) ? validator(value) : validator(value, param);
                    if (!pass) errors.push(getErrorMessage(rule, param));
                }
            }
        }
        return errors;
    }

    function validateObject(obj, schema) {
        var errors = {};
        var isValid = true;
        for (var field in schema) {
            if (schema.hasOwnProperty(field)) {
                var fieldErrors = validateField(obj[field], schema[field]);
                if (fieldErrors.length) {
                    errors[field] = fieldErrors;
                    isValid = false;
                }
            }
        }
        return { isValid: isValid, errors: errors };
    }

    function validateBooking(booking) {
        return validateObject(booking, {
            customerName:  { required: true, minLength: 2, maxLength: 100 },
            customerEmail: { required: true, email: true },
            tourId:        { required: true, positive: true, integer: true },
            bookingDate:   { required: true, date: true },
            guests:        { required: true, positive: true, integer: true, min: 1, max: 20 }
        });
    }

    return {
        required:     validators.required,
        email:        validators.email,
        isEmail:      validators.email,
        phone:        validators.phone,
        isPhone:      validators.phone,
        url:          validators.url,
        number:       validators.number,
        positive:     validators.positive,
        isPositive:   validators.positive,
        integer:      validators.integer,
        min:          validators.min,
        max:          validators.max,
        range:        validators.range,
        minLength:    validators.minLength,
        maxLength:    validators.maxLength,
        betweenLength:validators.betweenLength,
        matches:      validators.matches,
        date:         validators.date,
        futureDate:   validators.futureDate,
        pastDate:     validators.pastDate,
        validateField:    validateField,
        validateObject:   validateObject,
        validateBooking:  validateBooking
    };
})();

window.Validation = Validation;
