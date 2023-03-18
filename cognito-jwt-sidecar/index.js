import express from 'express';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

// Create Express Server
const app = express();

const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.AWS_COGNITO_USER_POOL_CLIENT_ID,
});

// Configuration
const PORT = process.env.PORT;
const HOST = "0.0.0.0";
const API_SERVICE_URL = process.env.BACKEND_URL;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
}));

app.use('/api', async (req, res, next) => {
    try {
        const jwtToken = req.headers["authorization"].split(' ')[1];
        const payload = await verifier.verify(
            jwtToken,
        );
        console.log("Token valid!");
        req.headers.username = payload['username'];
    } catch (err) {
        console.log("Token not valid!");
    }
    next();
});

const proxyOptions = {
    target: API_SERVICE_URL,
    changeOrigin: true,
    onProxyReq: async (proxyReq, req, res) => {
        const username = req.headers.username;
        if (username) {
            proxyReq.setHeader('username', username);
        }
    }
};

const proxy = createProxyMiddleware(proxyOptions)

// Proxy endpoints
app.use('/api', proxy);

app.use('/honeycomb/traces', proxy);

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});