import {connection} from "../connection";

import {selectCountOfUsersTemplate, selectUsersWithAddressesTemplate,} from "./query-templates";
import {User, UsersResponse} from "./types";
import {Address} from "../Addresses/types";

export const getUsersCount = (): Promise<number> =>
    new Promise((resolve, reject) => {
        connection.get<{ count: number }>(
            selectCountOfUsersTemplate,
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.count);
            }
        );
    });

export const getUsers = (
    pageNumber: number,
    pageSize: number
): Promise<UsersResponse> =>
    new Promise((resolve, reject) => {
        connection.all<User & Address>(
            selectUsersWithAddressesTemplate,
            [pageNumber * pageSize, pageSize],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                // Format the response to group user data and address into a single object
                const formattedResults = results?.length && results.map((result) => ({
                    id: result.id,
                    name: result.name,
                    username: result.username,
                    email: result.email,
                    phone: result.phone,
                    address: {
                        street: result.street,
                        city: result.city,
                        state: result.state,
                        zipcode: result.zipcode,
                    },
                })) || [];

                // Fetch the total count of users to calculate pagination
                connection.get<{ count: number }>(
                    selectCountOfUsersTemplate,
                    (countError, countResult) => {
                        if (countError) {
                            reject(countError);
                            return;
                        }

                        const totalRecords = countResult.count;
                        const totalPages = Math.ceil(totalRecords / pageSize);

                        // Resolve the final response with pagination data
                        resolve({
                            users: formattedResults,
                            totalRecords,
                            totalPages,
                            currentPage: pageNumber + 1, // Assuming pageNumber is 0-based
                        });
                    }
                );
            }
        );
    });
