import axios from "axios";

const instance = axios.create({
    baseURL: 'https://www.fishwatch.gov/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export type PicturesResponseType = [
    {
        "Image Gallery": [
            {
                "src": string,
                "alt": string,
                "title": string
            },
        ],
    }
]

export const picturesAPI = {
    getPictures() {
        return instance.get<PicturesResponseType>(
            `species/red-snapper`
        ).then((res)=>res.data[0]["Image Gallery"])
    },
};
