const axios = require('axios');
axios.post('http://localhost:5000/api/chat/message', { 
    message: 'Hello Bundeli Bot, what is Jhansi famous for?', 
    history: [] 
})
.then(r => console.log('✅ Success:', r.data.reply))
.catch(e => {
    console.log('❌ Error Status:', e.response?.status);
    console.log('❌ Error Data:', JSON.stringify(e.response?.data, null, 2));
});
