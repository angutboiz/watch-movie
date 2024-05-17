// services/apiService.ts
const apiService = {
    get: async (endpoint: string) => {
        const res = await fetch(`${endpoint}`);
        if (!res.ok) {
            throw new Error(`Error fetching ${endpoint}: ${res.statusText}`);
        }
        return res.json();
    },
};

export default apiService;
