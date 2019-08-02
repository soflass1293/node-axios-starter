import FetchApi from '../src/FetchApi'
describe('FetchApi', () => {
    it('should be a class', () => {
        expect(typeof FetchApi).toBe("function")
    });

    describe('when Axios is not passed', () => {
        it('should throw NoAxiosError', () => {
            const endpoint = 'https://jsonplaceholder.typicode.com'

            expect(() => { new FetchApi() }).toThrowError(new Error('NoAxiosError! Please provide Axios.'));
            expect(() => { new FetchApi(undefined, endpoint) }).toThrowError(new Error('NoAxiosError! Please provide Axios.'))
        })
    });

    describe('when endpoint is not passed', () => {
        it('should throw NoEndpointError', () => {
            const axios = jest.fn()

            expect(() => { new FetchApi(axios) }).toThrowError(new Error('NoEndpointError! Please provide an endpoint.'))
        })
    });

    describe('when Axios and endpoint are passed', () => {
        it('should inject Axios and endpoint inside the new instance', () => {
            const axios = jest.fn()
            const endpoint = 'https://jsonplaceholder.typicode.com'

            const lib = new FetchApi(axios, endpoint);

            expect(lib.axios).toEqual(axios);
            expect(lib.endpoint).toEqual(endpoint);
        });
    });

    describe('getPosts', () => {
        let lib;
        let axios;
        let endpoint;
        beforeEach(() => {
            axios = { get: jest.fn() }
            endpoint = 'https://jsonplaceholder.typicode.com'
            lib = new FetchApi(axios, endpoint);
        });

        it('should be a function', () => {
            expect(typeof new FetchApi(axios, endpoint).getPosts).toBe('function');
        })

        describe('when no params are passed', () => {
            it('should call axios.get once with right params', async () => {
                expect.assertions(2);
                const expectedParam = "https://jsonplaceholder.typicode.com/posts"
                await lib.getPosts()
                expect(lib.axios.get.mock.calls.length).toBe(1)
                expect(lib.axios.get.mock.calls[0][0]).toEqual(expectedParam)
            })
        });

        it('should return data from axios.get', async () => {
            expect.assertions(1);
            const expected = { data: [{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }] }
            lib.axios.get = jest.fn().mockResolvedValue(expected)
            const result = await lib.getPosts()
            expect(result).toBe(expected)
        })
    });

    describe('getPostById', () => {
        let lib;
        let axios;
        let endpoint;
        beforeEach(() => {
            axios = { get: jest.fn() }
            endpoint = 'https://jsonplaceholder.typicode.com'
            lib = new FetchApi(axios, endpoint);
        });

        it('should be a function', () => {
            expect(typeof new FetchApi(axios, endpoint).getPostById).toBe('function');
        })

        describe('when param id is missing', () => {
            it('should return a rejected promise with error "MissingIdError! You must pass an ID."', async () => {
                expect.assertions(2);

                const expectedError = new Error('MissingIdError! You must pass an ID.')

                await expect(lib.getPostById({})).rejects.toEqual(expectedError)
                await expect(lib.getPostById()).rejects.toEqual(expectedError)
            })
        });

        describe('when params { id } is passed', () => {
            it('should call axios.get once with right params', async () => {
                expect.assertions(2);

                const expectedParam = "https://jsonplaceholder.typicode.com/posts/123"

                await lib.getPostById({ id: 123 })

                expect(lib.axios.get.mock.calls.length).toBe(1)
                expect(lib.axios.get.mock.calls[0][0]).toEqual(expectedParam)
            })

            it('should return data from axios.get', async () => {
                expect.assertions(1);

                const expected = { data: { id: 123, title: "Post 123" } }

                lib.axios.get = jest.fn().mockResolvedValue(expected)

                const result = await lib.getPostById({ id: 123 })

                expect(result).toBe(expected)
            })
        });
    });

    describe('getUsers', () => {
        let lib;
        let axios;
        let endpoint;
        beforeEach(() => {
            axios = { get: jest.fn() }
            endpoint = 'https://jsonplaceholder.typicode.com'
            lib = new FetchApi(axios, endpoint);
        });

        it('should be a function', () => {
            expect(typeof new FetchApi(axios, endpoint).getPosts).toBe('function');
        })

        describe('when no params are passed', () => {
            it('should call axios.get once with right params', async () => {
                expect.assertions(2);
                const expectedParam = "https://jsonplaceholder.typicode.com/users"
                await lib.getUsers()
                expect(lib.axios.get.mock.calls.length).toBe(1)
                expect(lib.axios.get.mock.calls[0][0]).toEqual(expectedParam)
            })
        });

        it('should return data from axios.get', async () => {
            expect.assertions(1);
            const expected = { data: [{ id: 1, username: "Bret" }, { id: 2, username: "Antonette" }] }
            lib.axios.get = jest.fn().mockResolvedValue(expected)
            const result = await lib.getUsers()
            expect(result).toEqual(expected)
        })
    });

    describe('getUserById', () => {
        let lib;
        let axios;
        let endpoint;
        beforeEach(() => {
            axios = { get: jest.fn() }
            endpoint = 'https://jsonplaceholder.typicode.com'
            lib = new FetchApi(axios, endpoint);
        });

        it('should be a function', () => {
            expect(typeof new FetchApi(axios, endpoint).getPostById).toBe('function');
        })

        describe('when param id is missing', () => {
            it('should return a rejected promise with error "MissingIdError! You must pass an ID."', async () => {
                expect.assertions(2);

                const expectedError = new Error('MissingIdError! You must pass an ID.')

                await expect(lib.getUserById({})).rejects.toEqual(expectedError)
                await expect(lib.getUserById()).rejects.toEqual(expectedError)
            })
        });

        describe('when params { id } is passed', () => {
            it('should call axios.get once with right params', async () => {
                expect.assertions(2);

                const expectedParam = "https://jsonplaceholder.typicode.com/users/123"

                await lib.getUserById({ id: 123 })

                expect(lib.axios.get.mock.calls.length).toBe(1)
                expect(lib.axios.get.mock.calls[0][0]).toEqual(expectedParam)
            })

            it('should return data from axios.get', async () => {
                expect.assertions(1);

                const expected = { data: { id: 123, title: "John" } }

                lib.axios.get = jest.fn().mockResolvedValue(expected)

                const result = await lib.getUserById({ id: 123 })

                expect(result).toBe(expected)
            })
        });
    });
});
