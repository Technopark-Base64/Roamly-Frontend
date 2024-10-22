import path from 'path';
import express from 'express';

const app = express();
const PORT = 8000;

const __dirname = path.resolve();
app.use('/', express.static(path.resolve(__dirname, './build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
