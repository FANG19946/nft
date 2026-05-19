const API_URL = 'http://localhost:5000/api/posts'

export async function fetchPosts() {

    try {

        const res = await fetch(API_URL)

        return await res.json()

    } catch (err) {

        console.error(err)

        return []
    }
}

export async function createPost(postData) {

    try {

        const res = await fetch(API_URL, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(postData),
        })

        return await res.json()

    } catch (err) {

        console.error(err)
    }
}