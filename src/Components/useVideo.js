import React, { useState, useEffect } from 'react';

const useVideo = (fileName, setKey) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [Video, setVideo] = useState(null)

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await import("./videos/" + fileName + ".mp4"); // change relative path to suit your needs
                console.log("fetched: " + fileName)
                setVideo(response.default)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
                setKey(fileName)
            }
        }

        fetchVideo()
    }, [fileName])

    return {
        loading,
        error,
        Video,
    }
}

export default useVideo