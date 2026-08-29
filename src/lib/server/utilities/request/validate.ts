import type { ZodObject } from "zod";

// utility function to validate request against a given schema. returns cleaned-up data.
const validateRequest = async (request: Request, schema: ZodObject<any>, options : {
    contentType: "application/json" | "multipart/form-data"
} = {
    contentType: "application/json"
}) => {
    const contentType = request.headers.get('Content-Type');
    //  actually nvm, making this reusable for all types is kinda
    // difficult. to be considered later
    if (contentType?.includes("application/json") && options.contentType == "application/json") {
        const rawData = await request.json(); // json() should throw an error when it can't be parsed
        console.log("[Request JSON]", rawData);

        // ensuring data is an object
        if (!(typeof rawData === 'object' && rawData !== null && !Array.isArray(rawData))) {
            throw new Error("Invalid input type", { cause: { statusCode: 415 } });
        }

        // zod validation
        const validationResult = schema.safeParse(rawData);
        if (!validationResult.success) {
            throw new Error("Invalid input fields", { cause: { statusCode: 400 } });
        }
        return validationResult.data;
    }
    else {
        throw new Error("Invalid input type", { cause: { statusCode: 415 } });
    }
}

export default validateRequest;
