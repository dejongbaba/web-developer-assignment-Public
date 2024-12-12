const baseUrl = import.meta.env.VITE_API_URL;
// Define request types
const requestMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
};

/**
 * Main function to handle HTTP requests
 * @param {string} url - The API endpoint.
 * @param {Object} options - Request options.
 * @param {string} options.method - HTTP method (GET, POST, PUT, etc.).
 * @param {Object} [options.headers] - Additional headers.
 * @param {Object} [options.body] - Request payload for POST/PUT/PATCH.
 * @returns {Promise<Object>} - Returns the parsed JSON response or throws an error.
 */
export async function request(url: string, {
    method = requestMethods.GET,
    headers = {},
    body
}: { method?: string, headers?: Record<string, any>, body?: Record<string, any> } = {}) {
    console.log('body', body)
    try {
        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            // Add the body only if it is defined (for methods like POST, PUT, PATCH)
            ...(body && {body: JSON.stringify(body)}),
        };

        const urlPath = [baseUrl, url].join('/'); // Combine base URL with the provided endpoint
        console.log('fetchOptions', fetchOptions)
        const response = await fetch(urlPath, fetchOptions);

        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(
                errorData?.message || `Request failed with status: ${response.status}`
            );
        }
        // Return parsed JSON or an empty object for no content
        return await response.json()

    } catch (error: any) {
        // Graceful error logging
        console.error(`HTTP Request Error: ${error.message}`);
        throw error; // Re-throw for higher-level handling
    }
}

// Convenience methods
export const get = (url: string, headers?: Record<string, any>) =>
    request(url, {method: requestMethods.GET, headers});

export const post = (url: string, body?: Record<string, any>, headers?: Record<string, any>) =>
    request(url, {method: requestMethods.POST, body, headers});

export const del = (url: string, headers?: Record<string, any>) =>
    request(url, {method: requestMethods.DELETE, headers});
