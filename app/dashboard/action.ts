'use server'

export interface CreatePostState {
    success: boolean;
    error?: string;
}

export const createPost = async (previousState: any, formData: FormData): Promise<CreatePostState> => {
    // form data
    const image = await formData.get('cover') as File;
    const title = formData.get('title');
    // const tag = formData.get('tag');
    const content = formData.get('content');
    console.log(image);


    try {
        // multer
        const uploadImageResponse = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/png', // Adjust based on the image type
            },
            body: image,
        })


        if (!uploadImageResponse.ok) {
            const errorResponse = await uploadImageResponse.json(); // Log the error response
            console.error('Upload error response:', errorResponse);
            throw new Error(`Failed to upload image: ${errorResponse.error}`);

        }

        const { url: imageURI } = await uploadImageResponse.json()
        // validation = zod

        const blogResponse = await fetch('http://localhost:3000/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, imageURI })
        })
        if (!blogResponse.ok) {
            throw new Error(`HTTP error! Status: ${blogResponse.status}`)
        }
        // const result = await blogResponse.json()
        console.info('blog created successfully!');
        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: false, error: error instanceof Error ? error.message : 'An error occurred' }; // 
    }
}
