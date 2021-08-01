export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Api Base',
            version: '1.0.0',
            description: 'api base created by @senixcode',
        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis: ["./src/routes/*ts"]
}