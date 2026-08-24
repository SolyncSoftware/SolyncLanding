import { json } from "@sveltejs/kit";

// utility function for processing and packaging errors. for use in catch(err)
const processError = (err: any) => {
    console.error('[Server error]', err.message);
    return json({
        error: err.message ? err.message : 'Internal server error'
    }, {
        status: err.cause ? err.cause.statusCode : 500
    });
}

export default processError;
