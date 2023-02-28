import { Client } from 'pg';

const client = new Client ({
    connectionString: "postgres:Qc6NlxMq0Eewv4GbcQVx@containers-us-west-108.railway.app:7623/railway",
    ssl: true 
});

export default client;