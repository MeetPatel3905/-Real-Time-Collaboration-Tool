import DocumentModel from '../models/documents.model.js';
import User from '../models/user.model.js';

export const getDocThroughSocket = async (docId) => {
  try {
    const doc = await DocumentModel.findById(docId);
    return doc;
  } catch (error) {
    console.log('Error getting document:', error);
  }
};

export const createDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    const existingDoc = await DocumentModel.findOne({ title });
    if (existingDoc) {
      return res.status(400).json({ message: `Document with title ${title} already exists` });
    }

    const newDocument = await DocumentModel.create({
      title,
      owner: userId,
      collaborators: [userId]
    });

    res.status(201).json({ document: newDocument, message: 'Document created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRespectedUserDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const documents = await DocumentModel.find({
      $or: [
        { owner: userId },
        { collaborators: userId }
      ]
    }).populate('owner', 'username email');

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleUserDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const document = await DocumentModel.findById(documentId).populate('owner', 'username email').populate('collaborators', 'username email');

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const { title } = req.body;

    const updatedDocument = await DocumentModel.findByIdAndUpdate(
      documentId,
      { title },
      { new: true }
    );

    res.status(200).json({ document: updatedDocument, message: 'Document updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    await DocumentModel.findByIdAndDelete(documentId);

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCollaborator = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const { collaboratorEmail } = req.body;

    const collaborator = await User.findOne({ email: collaboratorEmail });
    if (!collaborator) {
      return res.status(404).json({ message: 'User not found' });
    }

    const document = await DocumentModel.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (!document.collaborators.includes(collaborator._id)) {
      document.collaborators.push(collaborator._id);
      await document.save();
    }

    res.status(200).json({ document, message: 'Collaborator added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCollaborators = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const document = await DocumentModel.findById(documentId).populate('collaborators', 'username email');

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(document.collaborators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
