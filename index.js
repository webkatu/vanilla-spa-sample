const express = require('express');

const app = express();
const publicDir = __dirname + '/public';
const serverDir = __dirname + '/server';

app.use('/vanilla-spa-sample', express.static(publicDir, { index: false }));
app.use('/server/vanilla-spa-sample', express.static(serverDir));

app.get('*', (req, res, next) => {
	res.sendFile('/index.html', { root: publicDir });
});

app.listen(4000, () => {
	console.log('server started.');
});