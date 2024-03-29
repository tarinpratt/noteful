export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
   (!folderId)
     ? notes
     : notes.filter(note => note.folder_id === parseInt(folderId))
)