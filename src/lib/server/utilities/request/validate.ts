import type { ZodObject } from "zod";

// utility function to validate request against a given schema. returns cleaned-up data.
const validateRequest = async (request: Request, schema: ZodObject<any>) => {
    // check if input has the expected Content-Type
    const contentType = request.headers.get('Content-Type');
    // TODO: accept and process multipart/form-data for the /api/apply API endpoint,
    // especially the file upload part.
    if (!(contentType?.includes("application/json"))) {
        throw new Error("Invalid input type", { cause: { statusCode: 415 } });
    }

    const rawData = await request.json(); // json() should throw an error when it can't be parsed
    console.log("[Request JSON]", rawData);

    // ensuring data is an object
    if (!(typeof rawData === 'object' && rawData !== null && !Array.isArray(rawData))) {
        throw new Error("Invalid input type", { cause: { statusCode: 415 } });
    }

    // trim trailing whitespace for every string field
    const data = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [
            key,
            typeof value === 'string' ? value.trim() : value
        ]
    ));

    // zod validation
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
        throw new Error("Invalid input fields", { cause: { statusCode: 400 } });
    }
    return data;
}

export default validateRequest;
