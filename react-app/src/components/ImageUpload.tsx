import React from 'react';
import axios from 'axios';

const ImageUpload = (props: { uploaded: (url: string) => void}) => {

    const upload = async (files: FileList | null) => {
        if (files === null) return

        const formData = new FormData();
        formData.append('file', files[0]);
        await axios.post('upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log('res.data', res.data);
            props.uploaded(res.data);
        }).catch(err => {
            console.log('File Upload Error', err.response);
        });
    }
    return (
        <>
            <label className="btn btn-primary">
                Upload <input type="file" onChange={e => upload(e.target.files)} hidden />
            </label>
        </>
    );
};

export default ImageUpload;