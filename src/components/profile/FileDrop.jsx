import React, { useCallback, useRef, useState } from 'react';

export default function FileDrop({ label, multiple=false, accept, onFiles }) {
  const ref = useRef(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState(null);

  const handleFiles = useCallback((fileList) => {
    const arr = Array.from(fileList);
    // Basic accept filter (placeholder)
    if (accept) {
      const mimeAllowed = accept.split(',').map(s=>s.trim());
      const invalid = arr.filter(f => !mimeAllowed.some(a => f.type.includes(a) || f.name.endsWith(a)));
      if (invalid.length) {
        setError('Some files rejected by type');
      } else setError(null);
    }
    onFiles(multiple ? arr : arr.slice(0,1));
  }, [accept, multiple, onFiles]);

  const onDrop = (e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); };
  const onChange = (e) => handleFiles(e.target.files);

  return (
    <div className={`file-drop ${drag ? 'drag' : ''}`}
      onDragOver={e=>{e.preventDefault(); setDrag(true);}}
      onDragLeave={e=>{ if(!ref.current?.contains(e.relatedTarget)) setDrag(false); }}
      onDrop={onDrop}
      ref={ref}
    >
      <p><strong>{label}</strong> – Drag & drop or <button type="button" className="link-btn" onClick={()=>ref.current.querySelector('input').click()}>browse</button></p>
      <input type="file" onChange={onChange} multiple={multiple} accept={accept} hidden />
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}
