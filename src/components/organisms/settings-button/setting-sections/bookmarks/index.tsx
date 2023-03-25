import { bookmarksTable } from '@src/lib/db';
import React, { ReactNode, useState } from 'react';

function BookmarkSettings() {
  const [file, setFile] = useState<File>();

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        bookmarksTable
          .bulkAdd(data.json)
          .then(() => {
            alert('success');
          })
          .catch((error) => {
            console.log(error);
            alert('some of the items cannot be imported');
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-3">
      <div className="flex items-center justify-end gap-3">
        <input
          className="text-box"
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              if (file) {
                if (file.type !== 'application/json') {
                  alert('only json files can be imported');
                } else {
                  setFile(file);
                }
              }
            }
          }}
        />
        <button onClick={handleUploadClick} className="btn float-right" disabled={!file}>
          Import
        </button>
      </div>
    </div>
  );
}

export default BookmarkSettings;
