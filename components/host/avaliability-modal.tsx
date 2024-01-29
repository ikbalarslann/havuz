import React, { useState } from "react";
import Modal from "react-modal";
import { AvailabilitySchema } from "@/schemas/index";

interface EditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  availability: typeof AvailabilitySchema;
  onEdit: (updatedAvailability: typeof AvailabilitySchema) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  closeModal,
  availability,
  onEdit,
}) => {
  const [editedAvailability, setEditedAvailability] = useState({
    ...availability,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAvailability((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Perform validation if needed
    onEdit(editedAvailability);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Modal"
    >
      <h2>Edit Availability - {availability.id}</h2>
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={editedAvailability.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Free:
        <input
          type="text"
          name="free"
          value={editedAvailability.free}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </Modal>
  );
};

export default EditModal;
