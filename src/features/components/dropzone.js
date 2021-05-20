import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {UploadFilesIcon} from "./Icons";

function DropZone({ getFiles }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log('do something with the files', acceptedFiles);
    getFiles(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className='files-drop-zone' {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadFilesIcon classes='files-drop-zone__icon' />
      {
        isDragActive ?
          <p>Drop the files here</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
}

export default DropZone;
