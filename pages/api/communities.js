import { SiteClient } from 'datocms-client';

async function requestsReceiver(request, response) {
    
    if (request.method === "POST") {
        const TOKEN = '24435637833e100618cfe52ccbb321';
        // console.log(TOKEN);
        const client = new SiteClient(TOKEN);

        const createdRecord = await client.items.create({
            itemType: '159604',
            ...request.body,
        });

        console.log(createdRecord);

        response.json({
            data: "Algum dado ai",
            createdRecord: createdRecord,
        });

        return;
    }

    response.status(404).json({
        message: "Não tem nada no GET, mas no POST tem"
    });

}

export default requestsReceiver;
