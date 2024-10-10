import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';


const app = express();
app.use(cors())
app.use(bodyParser.json())

// User login
app.post('/login', async (req, res) => {

    try {
        
        const { email, password } = req.body; 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ userinfo: user, token });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }

});






app.listen(3001, () =>
    console.log("API is running on port 3001")
)