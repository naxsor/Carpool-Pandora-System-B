import emailjs from '@emailjs/browser';

const sendNotification = (params) => {

    emailjs.send('gmail', 'template_jtp56rx', params, '8PiGTDqTuqrobNR4d')
        .then(function(response) {
        console.log('Notification sent', response.status, response.text);
        }, function(error) {
        console.log('Failed to send notification', error);
        });
};

export default sendNotification;
