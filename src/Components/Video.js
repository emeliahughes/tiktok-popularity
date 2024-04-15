import React, { useState, useEffect } from 'react';
import useVideo from "./useVideo"

const Video = (fileName) => {
    const [key, setKey] = useState(fileName)

    let handleKeyChange = () => {
        setKey(fileName);
    }

    const useVideo = () => {
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
                    handleKeyChange(fileName)
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

    console.log("loading:" + fileName)
    const { loading, error, Video } = useVideo()
    
    if (error) {
        console.log(error)
        return (<div>'Error'</div>)
    }
    if(loading) return (<div>'Loading'</div>)
    return (
        <video
            controls
            className='col-6'
            key = {key}>
            <source src={Video} key={key} id={fileName} type="video/mp4"/>
        </video>
    )
}

export default Video