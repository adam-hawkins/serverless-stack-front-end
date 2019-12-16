export default {
    MAX_ATTACHMENT_SIDE: 5000000,
    s3: {
        REGION: 'us-east-2',
        BUCKET: 'serverless.notes.app.uploads'
    },
    apiGateway: {
        REGION: 'us-east-2',
        URL: 'https://kykf17559d.execute-api.us-east-2.amazonaws.com/prod/'
    },
    cognito: {
        REGION: 'us-east-2',
        USER_POOL_ID: 'us-east-2_2JKUMAKOy',
        APP_CLIENT_ID: '3fn403v6pu6nsgblo2uu6q8pf4',
        IDENTITY_POOL_ID: 'us-east-2_2JKUMAKOy'
    }
};
